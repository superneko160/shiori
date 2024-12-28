import type { Metadata } from "next";
import { type FC } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Shiori",
  description: "読書管理アプリ",
};

const RootLayout: FC<RootLayoutProps> = (props) => {
  return (
    <html lang="ja">
      <body className="">
        {props.children}
      </body>
    </html>
  );
}

export default RootLayout;
