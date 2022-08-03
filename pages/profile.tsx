import { trpc } from "../utils/trpc";
import { useSession, signOut, getSession } from "next-auth/react";
import Info from "../components/info";
import Loader from "../components/loader";

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
          <Loader />
        ) : data?.email === session?.user?.email ? (
          <div>
            <Info />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="text-center ">
              <h1 className="mt-5">
                Whohooo You Made It Start By Creating Your First Link Below 🚀
              </h1>
            </div>
            <button
              className="bg-tertiary p-4 mt-4 mx-auto rounded-lg "
              onClick={handleClick}
            >
              Get Started
            </button>
          </div>
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
