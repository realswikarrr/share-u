import Head from "next/head";
import React, { ReactNode } from "react";
import NavBar from "../navbar";

type Props = {
  children: ReactNode;
};

const Main = ({ children }: Props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Share U</title>
        <meta name="description" content="ShareU HomePage" />
        <meta name="author" content="Swikar Adhikari" />
        <meta name="author" content="swikarr_" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Swikar Adhikari" />
        <meta name="og:title" content="Swikar Adhikari" />
        <meta property="og:type" content="website" />
      </Head>

      <NavBar />
      <div className="container mx-auto  max-w-7xl">{children}</div>

      <h1 className="text-center mt-10">
        &copy; {new Date().getFullYear()} Swikar Adhikari. All Rights Reserved.
      </h1>
    </>
  );
};

export default Main;
