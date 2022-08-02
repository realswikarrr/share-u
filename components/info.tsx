import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Data from "./data";
import Loader from "./loader";

const Info = () => {
  const { data: session } = useSession();

  const [text, setText] = useState("");
  const [email, setEmail] = useState(session?.user?.email!);
  const [file, setFile] = useState("");

  console.log(file);

  const { data, refetch, status } = trpc.useQuery([
    "getLinks",
    { userId: email },
  ]);
  const createLink = trpc.useMutation(["createLink"], {
    onSuccess: () => refetch(),
  });

  const submitHander = (e: any) => {
    e.preventDefault();
    createLink.mutate({
      userId: email,
      text,
      image: "",
      docs: "",
    });
    setText("");
  };

  return (
    <div className="info h-screen">
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <Data data={data} />
        </>
      )}

      <form
        onSubmit={submitHander}
        className="mt-5 mx-10 flex justify-between rounded-lg bg-secondary "
      >
        <input
          type="text"
          placeholder="Link or Text To Save"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-white font-semibold bg-secondary pl-2 rounded-lg w-full focus:outline-none "
        />

        <button
          type="submit"
          className="bg-tertiary p-5 items-center rounded-lg"
        >
          <h1 className="text-center text-white font-bold">Send</h1>
        </button>
      </form>

      {/* File Input */}

      <div className="mt-5 mx-10 flex justify-between rounded-lg bg-secondary items-center text-center">
        <label className="bg-tertiary p-5 items-center rounded-lg">
          <input
            type="file"
            className="hidden"
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
          <span className="text-center text-white font-bold">
            Select a file
          </span>
        </label>
        <button
          type="submit"
          className="bg-tertiary p-5 items-center rounded-lg"
        >
          <h1 className="text-center text-white font-bold">Send</h1>
        </button>
      </div>
    </div>
  );
};

export default Info;
