import { createCookie } from "@remix-run/node";
import crypto from 'crypto';

export const csrfToken = createCookie("csrf-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
});

export async function generateToken() {
    const token = crypto.randomBytes(32).toString("hex");
    return token;
}

export const securityHeaders = {
    "Content-Security-Policy":
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://static.cloudflareinsights.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: blob: https:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://api.github.com https://medium.com https://cloudflareinsights.com; " +
    "frame-ancestors 'none';",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Permission-Policy": "camera=(), microphone=(), geolocation=()",
    "Cache-Control": "public, max-age=3600",

  // Custom headers
  "X-Owned-By": "Parth Sinha"
}