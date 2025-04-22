import type { Config } from "tailwindcss";

import { mtConfig } from "@material-tailwind/react";



const config: Config = {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [mtConfig],
}



export default config;
