import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", ...fontFamily.sans],
      },
      animation: {
        float:
          "float 6s ease-in-out infinite, opacityFade 6s ease-in-out infinite",
        lightFloat: "float 8s ease-in-out infinite",
      },
      keyframes: {
        // opacityFade: {
        //   "0%, 100%": {
        //     opacity: "0.5",
        //   },
        //   "50%": {
        //     opacity: "1.0",
        //   },
        // },
        // float: {
        //   "0%, 100%": {
        //     transform: "translateY(0) rotate(45deg)",
        //   },
        //   "50%": {
        //     transform: "translateY(5%)  rotate(45deg)",
        //   },
        // },
      },
    },
  },
  plugins: [],
} satisfies Config;
