import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  env: {
    TZ: "Asia/Tokyo",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        /* googleのユーザ画像をImage要素で利用するために許可 */
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
