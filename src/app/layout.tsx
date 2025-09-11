import type { Metadata } from "next"
import { Header } from "@/app/components/Header"
import { Toaster } from "@/components/ui/sonner"
import { ClerkProvider } from "@clerk/nextjs"

import "@/styles/globals.css"

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Shiori",
  description: "読書管理アプリ",
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="ja">
        <body>
          <Header />
          <main>{props.children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
