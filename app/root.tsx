import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { HeadersFunction, LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import "./tailwind.css";
import { crsfToken, generateToken, securityHeaders } from "./utils/security.server";

export const headers: HeadersFunction = () => {
  return {
    ...securityHeaders
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const existingToken = await crsfToken.parse(request.headers.get("Cookie"));
  
  if (!existingToken) {
    const newToken = await generateToken();
    return json(
      { csrf: newToken },
      {
        headers: {
          "Set-Cookie": await crsfToken.serialize(newToken)
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
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
