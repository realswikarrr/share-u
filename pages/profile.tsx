import { trpc } from "../utils/trpc";
import { useSession, signOut, getSession } from "next-auth/react";
import Info from "../components/info";

const Profile = () => {
  const { data: session, status } = useSession();

  const { data, refetch } = trpc.useQuery([
    "getUser",
    { userId: session?.user?.email! },
  ]);

  const createUser = trpc.useMutation(["createUser"], {
    onSuccess: () => refetch(),
  });

  const handleClick = () => {
    createUser.mutate({
      userId: session?.user?.email!,
      name: session?.user?.name!,
      email: session?.user?.email!,
      image: session?.user?.image!,
    });
    console.log("user created Sucessfully");
  };

  if (status === "authenticated") {
    return (
      <>
        {data === undefined ? (
          <div>
            <h1>loading....</h1>
          </div>
        ) : data?.email === session?.user?.email ? (
          <div>
            <h1>Logged In As {session?.user?.email}</h1>
            <Info />
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        ) : (
          <>
            <h1>Logged In As {session?.user?.email}</h1>
            <h1>Create Your Data Links</h1>
            <button onClick={handleClick}>Get Started</button>
          </>
        )}
      </>
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
