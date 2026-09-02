import path from "node:path";
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  /* This app lives in a sub-folder of the repo — pin the trace root to it. */
  outputFileTracingRoot: path.join(__dirname),
};

export default config;
