import { useEffect, useState } from "react";
import {
  useDocumentOperation,
  type DocumentActionComponent,
  type DocumentActionProps,
  type DocumentActionsResolver,
} from "sanity";
import { INITIAL_STATUS } from "../crm";

/**
 * Szybka weryfikacja zgłoszenia: ustawia `status` i od razu publikuje dokument.
 * Działa też dla prywatnych ID `submission.<uuid>` — `useDocumentOperation` dostaje
 * opublikowane ID, a patch trafia do szkicu `drafts.submission.<uuid>`, który publish scala.
 */
function createVerifyAction(
  status: "nowy" | "spam",
  label: string,
  tone: "positive" | "critical",
  placement: "primary" | "menu"
): DocumentActionComponent {
  const Action: DocumentActionComponent = (props: DocumentActionProps) => {
    const { patch, publish } = useDocumentOperation(props.id, props.type);
    const [busy, setBusy] = useState(false);
    const current = (props.draft ?? props.published)?.status;

    // Koniec zapisu: status dokumentu się zmienił.
    useEffect(() => {
      if (current === status) setBusy(false);
    }, [current]);

    // Resolver akcji nie zna treści dokumentu, więc każda akcja jest w dwóch miejscach
    // (na górze i na końcu listy) i sama decyduje, czy się pokazać.
    const awaiting = isAwaitingVerification(current);
    if ((placement === "primary") !== awaiting) return null;

    return {
      label: busy ? "Zapisuję…" : label,
      tone,
      disabled: busy || Boolean(patch.disabled) || current === status,
      title: current === status ? "Zgłoszenie ma już ten status" : undefined,
      onHandle: () => {
        setBusy(true);
        patch.execute([{ set: { status } }]);
        publish.execute();
        props.onComplete();
      },
    };
  };
  Action.displayName = `VerifyAction_${status}_${placement}`;
  return Action;
}

const leadPrimary = createVerifyAction("nowy", "✅ To lead", "positive", "primary");
const spamPrimary = createVerifyAction("spam", "🚫 To spam", "critical", "primary");
const leadMenu = createVerifyAction("nowy", "✅ To lead", "positive", "menu");
const spamMenu = createVerifyAction("spam", "🚫 To spam", "critical", "menu");

/** Zgłoszenie czeka na weryfikację: status `do_weryfikacji` albo brak statusu (stare dokumenty). */
export function isAwaitingVerification(status: unknown): boolean {
  return status === undefined || status === null || status === INITIAL_STATUS;
}

/**
 * Akcje dokumentu `submission`. Gdy zgłoszenie czeka na weryfikację, „To lead” jest głównym
 * przyciskiem, a „To spam” obok (przed „Opublikuj”). W pozostałych statusach obie akcje
 * są na końcu — w menu „…”.
 */
export function submissionActions(
  input: Parameters<DocumentActionsResolver>[0]
): DocumentActionComponent[] {
  // Duplikat dostałby publiczne ID (zwykłe UUID) — wyłączamy dla leadów.
  const rest = input.filter(({ action }) => action !== "duplicate");
  return [leadPrimary, spamPrimary, ...rest, leadMenu, spamMenu];
}
