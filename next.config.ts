import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  env: {
    TZ: "Asia/Tokyo",
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  // CORS設定
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              "https://frontend-api.clerk.services, https://accounts.clerk.services",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ]
  },
}

// ビルド時に環境変数をチェック
if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  console.warn("⚠️  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set")
}

export default nextConfig
