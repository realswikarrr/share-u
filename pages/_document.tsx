import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark">
      <Head />
      <body className="dark:bg-gray-800 transition ease-in-out ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
