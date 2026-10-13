import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Przystań Zucha — przedszkole Montessori w Łodzi",
    short_name: "Przystań Zucha",
    start_url: "/",
    display: "browser",
    background_color: "#f6f0e6",
    theme_color: "#f6f0e6",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
