import Image from "next/image"

export function UnauthenticatedView() {
  return (
    <div className="container mx-auto my-8 bg-slate-100 px-3 py-[50px] shadow-sm sm:rounded-lg">
      <p className="mb-4 text-center text-2xl font-semibold">
        Please Sign in!!
      </p>
      <p className="mb-2 text-center md:text-xl">
        Shiori は読書管理用アプリです
      </p>
      <Image
        src="/screenshot.png"
        width={1200}
        height={400}
        alt="application screenshot"
        className="mx-auto mb-4 border shadow-md"
      />
      <ul className="md:px-3">
        <li className="md:text-xl">
          自分がほしいと考えている本や、どこまで読んだか、どれだけ読んだかを記録できます
        </li>
        <li className="md:text-xl">
          このアプリは開発者自身が今まで読んできた本を記録したいとの考えから作成されました
        </li>
        <li className="md:text-xl">
          スプレッドシートで入力して管理する方法との差別化として、現在の状態、日付等を簡単に入力できるようになっています
        </li>
      </ul>
    </div>
  )
}
