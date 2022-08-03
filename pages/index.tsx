import type { NextPage } from "next";
import { signIn, getSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto text-center mt-5">
      <h1 className="text-3xl">Hello And Welcome 🫣</h1>
      <h1 className="mt-4 text-xl">
        This Web App Helps You To Copy And Paste Links Across Multiple Devices{" "}
        <br />
        All You Have To Do Is Follow The Below Steps ⤵️
      </h1>

      <h1 className="mt-5 text-2xl">Steps To Follow 🕹️</h1>
      <ul className="mt-2 bg-secondary p-2 text-center rounded-lg max-w-lg mx-auto">
        <li className="text-white text-bold">
          Step 1 : Sign Up Using Google Account ✨
        </li>
        <li className="mt-2 text-white text-bold">
          Step 2 : Click On Get Started 🖱️{" "}
        </li>
        <li className="mt-2 text-white text-bold">
          Step 3 : Enjoy Sharing Links 🤯{" "}
        </li>
      </ul>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/profile",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
