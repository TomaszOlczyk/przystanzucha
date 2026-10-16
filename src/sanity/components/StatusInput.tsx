import { Card, Flex, Stack, Text } from "@sanity/ui";
import { useEditState, useFormValue, type StringInputProps } from "sanity";
import { LEAD_STATUSES } from "../crm";

const label = (v: unknown) => LEAD_STATUSES.find((s) => s.value === v)?.title ?? String(v ?? "—");

/**
 * Pole „Status” + ostrzeżenie, gdy zmiana nie jest opublikowana (15.10.2026: 4 zgłoszenia oznaczone
 * jako spam zostały w szkicu). Lead-hub czyta już status ze szkicu, ale opublikowanie jest pewniejsze,
 * a nowy lead dodany ręcznie bez publikacji w ogóle nie trafi do panelu.
 */
export function StatusInput(props: StringInputProps) {
  const id = String(useFormValue(["_id"]) ?? "");
  const publishedId = id.replace(/^drafts\./, "");
  const { draft, published, ready } = useEditState(publishedId, "submission");

  let warning: string | null = null;
  if (ready && draft) {
    if (!published) {
      warning = "Ten lead nie jest jeszcze opublikowany — nie trafi do panelu ani do statystyk. Kliknij „Opublikuj”.";
    } else if (draft.status !== published.status) {
      warning = `Zmiana statusu nie jest opublikowana (opublikowany: ${label(published.status)}). Kliknij „Opublikuj” albo użyj przycisku „✅ To lead” / „🚫 To spam”.`;
    }
  }

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {warning && (
        <Card padding={3} radius={2} tone="caution" border>
          <Flex gap={2}>
            <Text size={1}>⚠️</Text>
            <Text size={1}>{warning}</Text>
          </Flex>
        </Card>
      )}
    </Stack>
  );
}
