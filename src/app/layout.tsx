import type { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"
import { ClerkProvider } from "@clerk/nextjs"

import { Header } from "./components/Header"

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
    <ClerkProvider>
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
