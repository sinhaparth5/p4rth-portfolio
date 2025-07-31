import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { HeadersFunction, LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Analytics } from "@vercel/analytics/remix";

import "./tailwind.css";
import { csrfToken, generateToken, securityHeaders } from "./utils/security.server";
import { ClientOnly } from "remix-utils/client-only";
import CustomCursor from "./components/Cursor";
import { SpeedInsights } from "@vercel/speed-insights/remix";

export const headers: HeadersFunction = () => {
  return {
    ...securityHeaders
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const existingToken = await csrfToken.parse(request.headers.get("Cookie"));
  
  if (!existingToken) {
    const newToken = await generateToken();
    return json(
      { csrf: newToken },
      {
        headers: {
          "Set-Cookie": await csrfToken.serialize(newToken)
        }
      }
    );
  }
  return json({ csrf: existingToken });
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-black">
        <ClientOnly>
          {() => <CustomCursor />}
        </ClientOnly>
        {children}
        <SpeedInsights />
        <Analytics />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
