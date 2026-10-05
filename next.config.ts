import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/hangman" : undefined,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
