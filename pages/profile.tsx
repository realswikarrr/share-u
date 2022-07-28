import { trpc } from "../utils/trpc";
import { useSession, signOut, getSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();
  const hello = trpc.useQuery(["getLinks"]);

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <h1>Logged In As {session?.user?.email}</h1>
        <p>{hello.data[0]?.links[0]?.text}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
};

export default Profile;

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
