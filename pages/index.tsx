import type { NextPage } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <div>Hello stranger</div>
      <button onClick={() => signIn("google")}>SignIn</button>
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
