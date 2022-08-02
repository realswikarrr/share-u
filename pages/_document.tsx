import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark">
      <Head />
      <body className="bg-quaternary dark:bg-gray-800 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
