import { NextResponse } from "next/server";

const CLIENT_ID = "Ov23lirHzGuZsuZgLHtu";
const AUTH_URL = "https://github.com/login/oauth/authorize";

export async function GET() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    scope: "repo,user",
  });

  return NextResponse.redirect(`${AUTH_URL}?${params.toString()}`);
}
