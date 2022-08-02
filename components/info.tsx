import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Data from "./data";

const Info = () => {
  const { data: session } = useSession();

  const [text, setText] = useState("");
  const [email, setEmail] = useState(session?.user?.email!);

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
    <div className="info">
      {status === "loading" ? (
        <div>Loading....</div>
      ) : (
        <>
          <Data data={data} />
        </>
      )}

      <form onSubmit={submitHander}>
        <label>
          <h1>Link To Save</h1>
        </label>
        <input
          type="text"
          placeholder="Link To Save"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Info;
