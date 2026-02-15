import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  /**
   * Cloudflare Pages does NOT support Next Image optimization.
   * This prevents Next from trying to generate image transforms at build time.
   */
  images: {
    unoptimized: true,
  },

  /**
   * Reduce memory usage during build
   * Cloudflare Pages has strict limits.
   */
  webpack: (config, { isServer }) => {
    // Disable filesystem cache (this is what caused the 68MB .pack file)
    config.cache = false;

    // Prevent Node-only polyfills from bloating client bundles
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
      };
    }

    return config;
  },

  /**
   * Force Next to be explicit about runtime behavior
   * (helps avoid accidental edge/node confusion)
   */
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
    },
  },


  /**
   * Reduce unnecessary dev-only overhead
   */
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
