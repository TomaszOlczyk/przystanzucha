"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, createDrawable, createScope, createTimeline, splitText, stagger, type JSAnimation } from "animejs";

/**
 * Ruch strony (anime.js 4). Elementy deklarują animację atrybutami — bez osobnych komponentów klienckich:
 *   data-hero="title"  nagłówek hero — słowa wyjeżdżają spod linii
 *   data-hero="fade"   kolejne elementy hero (kolejność z DOM)
 *   data-hero="pop"    znaczek (np. „Grupa 2”) — wskakuje z obrotem
 *   data-photo         zdjęcie w hero — tylko transform (nie opóźnia LCP)
 *   data-draw="hero"   ścieżka SVG rysowana po załadowaniu
 *   data-draw="scroll" ścieżka rysowana przy wejściu w widok (rodzic z data-draw-root)
 *   data-split         nagłówek sekcji — słowa przy wejściu w widok
 *   data-stagger       kontener — dzieci wjeżdżają kaskadą przy wejściu w widok
 *   data-spin / data-bob  pętle dekoracji
 * Przy prefers-reduced-motion nic się nie animuje (klasa .m nie jest ustawiana — patrz layout).
 */
export default function Motion({ podglad = false }: { podglad?: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // W podglądzie Studio bez animacji: splitText tnie nagłówki na słowa i gubi znaczniki stega (klik w tekst
    // przestaje otwierać pole), a ukryte na start elementy utrudniają edycję. Zdejmujemy klasę .m — wszystko widoczne od razu.
    if (podglad) root.classList.remove("m");
    if (!root.classList.contains("m")) return;

    // splitText nie jest cofany przez scope.revert() — pilnujemy podziałów sami (StrictMode, zmiana strony).
    const splits: { revert: () => unknown }[] = [];
    const split = (el: HTMLElement) => {
      const s = splitText(el, { words: { wrap: "clip" } });
      splits.push(s);
      return s;
    };

    // Wejście w widok: IntersectionObserver odpala animację raz (onScroll z anime.js po revert() przestaje reagować).
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          pending.get(e.target)?.forEach((a) => a.play());
          pending.delete(e.target);
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    const pending = new Map<Element, JSAnimation[]>();
    const onView = (el: Element, a: JSAnimation) => {
      pending.set(el, [...(pending.get(el) ?? []), a]);
      io.observe(el);
    };

    const scope = createScope({ root: document.body }).add(() => {
      const q = <T extends Element = HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

      // HERO
      const tl = createTimeline({ defaults: { ease: "outExpo" } });
      const title = document.querySelector<HTMLElement>('[data-hero="title"]');
      if (title) {
        const s = split(title);
        title.style.opacity = "1";
        tl.add(s.words, { y: ["110%", "0%"], duration: 1300, delay: stagger(60) }, 0);
      }
      const fades = q('[data-hero="fade"]');
      if (fades.length) tl.add(fades, { opacity: [0, 1], y: [18, 0], duration: 900, delay: stagger(110) }, 500);
      const photos = q("[data-photo]");
      // obrót z transformu dodaje się do klasy rotate-[…] z Tailwinda, więc animujemy tylko „nadwyżkę” do zera
      photos.forEach((el, i) => tl.add(el, { y: [40, 0], rotate: [i ? 8 : -3, 0], duration: 1400 }, 150 + i * 350));
      const heroDraw = q<SVGPathElement>('[data-draw="hero"]');
      if (heroDraw.length) tl.add(createDrawable(heroDraw), { draw: ["0 0", "0 1"], duration: 1300, ease: "inOutQuad", delay: stagger(350) }, 750);
      const pops = q('[data-hero="pop"]');
      if (pops.length) tl.add(pops, { opacity: [0, 1], scale: [0.2, 1], rotate: [-90, 0], duration: 1100, ease: "outBack(1.8)" }, 1000);

      // PĘTLE
      q("[data-spin]").forEach((el) => animate(el, { rotate: 360, duration: 26000, loop: true, ease: "linear" }));
      q("[data-bob]").forEach((el) => animate(el, { y: [-3, 3], rotate: [-2, 2], duration: 2600, alternate: true, loop: true, ease: "inOutSine" }));

      // SCROLL
      q("[data-split]").forEach((el) => {
        const s = split(el);
        onView(el, animate(s.words, { y: ["110%", "0%"], duration: 1100, delay: stagger(45), ease: "outExpo", autoplay: false }));
      });
      q("[data-stagger]").forEach((el) => {
        const kids = Array.from(el.children);
        onView(el, animate(kids, { opacity: [0, 1], y: [36, 0], duration: 1000, delay: stagger(130), ease: "outExpo", autoplay: false }));
      });
      q("[data-draw-root]").forEach((wrap) => {
        const paths = Array.from(wrap.querySelectorAll<SVGPathElement>('[data-draw="scroll"]'));
        if (paths.length) onView(wrap, animate(createDrawable(paths), { draw: ["0 0", "0 1"], duration: 2200, ease: "inOutQuad", autoplay: false }));
      });
    });

    // Zabezpieczenie (wysokie okna renderujące, np. Googlebot, zrzuty, karta w tle): po 3 s wszystko,
    // co jest w oknie, dostaje stan końcowy bez czekania na przewinięcie.
    const failsafe = window.setTimeout(() => {
      pending.forEach((anims, el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          anims.forEach((a) => a.complete());
          pending.delete(el);
          io.unobserve(el);
        }
      });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
      scope.revert();
      splits.forEach((s) => s.revert());
    };
  }, [pathname, podglad]);

  return null;
}
