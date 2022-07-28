import { trpc } from "../utils/trpc";
import { useSession, signOut, getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Profile = () => {
  const { data: session, status } = useSession();

  const createUser = trpc.useMutation(["createUser"]);
  const user = trpc.useQuery(["getUser", { userId: session?.user?.email! }]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (user.data?.length === 0) {
      createUser.mutate({
        userId: session?.user?.email!,
        name: session?.user?.name!,
        email: session?.user?.email!,
        image: session?.user?.image!,
      });
      console.log("user created Sucessfully");
    }
  }, [user.data?.length]);

  if (status === "authenticated") {
    return (
      <div>
        <h1>Logged In As {session?.user?.email}</h1>
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
