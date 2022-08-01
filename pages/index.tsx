import type { NextPage } from "next";
import { signIn, getSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <div>Hello stranger</div>
    </>
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
