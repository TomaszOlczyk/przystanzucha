import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const CLIENT_ID = "Ov23lirHzGuZsuZgLHtu";
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";

  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return new NextResponse("Missing code parameter", { status: 400 });
  }

  if (!CLIENT_SECRET) {
    return new NextResponse("Server config error: missing client secret", {
      status: 500,
    });
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    }
  );

  const data = await tokenResponse.json();

  if (data.error) {
    return new NextResponse(`Auth error: ${data.error_description}`, {
      status: 401,
    });
  }

  const html = `<!DOCTYPE html><html><body><script>
    (function() {
      function recieveMessage(e) {
        console.log("recieveMessage %o", e);
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: "github" })}',
          e.origin
        );
        window.removeEventListener("message", recieveMessage, false);
      }
      window.addEventListener("message", recieveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script></body></html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
