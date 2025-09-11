import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  env: {
    TZ: "Asia/Tokyo",
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
}

// ビルド時に環境変数をチェック
if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  console.warn("⚠️  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set")
}

export default nextConfig
