/**
 * Jednorazowo: przenosi istniejące zgłoszenia na prywatne ID (`submission.<id>`),
 * żeby dane rodziców nie były czytelne przez publiczne API Sanity.
 * Uruchomienie: SANITY_AUTH_TOKEN=<token z uprawnieniem Editor> npx tsx scripts/private-submissions.ts
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "hzxqcvp2",
  dataset: "production",
  apiVersion: "2026-03-17",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
});

async function main() {
  const docs = await client.fetch(
    `*[_type == "submission" && !(_id in path("submission.**")) && !(_id in path("drafts.**"))]`
  );
  console.log(`Do przeniesienia: ${docs.length}`);

  for (const doc of docs) {
    const { _id, _rev, _createdAt, _updatedAt, ...rest } = doc;
    void _rev; void _createdAt; void _updatedAt;
    await client
      .transaction()
      .createIfNotExists({ ...rest, _id: `submission.${_id}` })
      .delete(_id)
      .delete(`drafts.${_id}`)
      .commit();
    console.log(`  ${_id} → submission.${_id}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
