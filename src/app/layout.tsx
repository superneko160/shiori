import type { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"

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
    <html lang="ja">
      <body className="">
        <Header />
        <main>{props.children}</main>
        <Toaster />
      </body>
    </html>
  )
}
