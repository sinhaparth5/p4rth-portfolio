import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      blur: {
        xs: '1px',
      },
      fontFamily: {
        sans: [
          "DM Sans",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
