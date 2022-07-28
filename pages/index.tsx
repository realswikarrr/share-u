import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div>Hello {session?.user?.email}</div>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <div>Hello stranger</div>
        <button onClick={() => signIn()}>SignIn</button>
      </>
    );
  }
};

export default Home;
