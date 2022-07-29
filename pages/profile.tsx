import { trpc } from "../utils/trpc";
import { useSession, signOut, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Info from "../components/info";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data, refetch } = trpc.useQuery([
    "getUser",
    { userId: session?.user?.email! },
  ]);
  const createUser = trpc.useMutation(["createUser"], {
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    if (data?.length === 0) {
      createUser.mutate({
        userId: session?.user?.email!,
        name: session?.user?.name!,
        email: session?.user?.email!,
        image: session?.user?.image!,
      });
      console.log("user created Sucessfully");
      router.reload();
    }
  }, [data?.length]);

  if (status === "loading") {
    return <div>Loading....</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <h1>Logged In As {session?.user?.email}</h1>
        <Info />
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
