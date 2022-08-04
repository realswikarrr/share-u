import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Data from "./data";
import Loader from "./loader";
import { toast } from "react-toastify";

const Info = () => {
  const { data: session } = useSession();

  const [text, setText] = useState("");
  const [email, setEmail] = useState(session?.user?.email!);
  const [file, setFile] = useState("");

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
      docs: "",
    });
    setText("");
    toast("🔮 Sending Please Wait", { theme: "dark" });
  };

  const fileSubmitHandler = async (e: any) => {
    e.preventDefault();

    toast.loading("Uploading...", {
      position: toast.POSITION.TOP_CENTER,
      progressClassName: "success-progress-bar",
      toastId: 2,
      theme: "dark",
    });

    const form = e.currentTarget;
    const fileInput: any = Array.from(form.elements).find(
      ({ name }: any) => name === "file"
    );

    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOURDINARY_NAME);

    const data = await fetch(process.env.NEXT_PUBLIC_CLOURDINARY_URL, {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    if (!data.secure_url) {
      toast("Loading...", { theme: "dark" });
    } else {
      createLink.mutate({
        userId: email,
        text: "",
        docs: data.secure_url,
      });
      toast.update(2, {
        render: "Upload Complete",
        type: "success",
        hideProgressBar: true,
        autoClose: 1000,
        isLoading: false,
        theme: "dark",
      });
      setText("");
    }
  };

  return (
    <div className="info ">
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

      <form
        onSubmit={fileSubmitHandler}
        className="mt-5 mx-10 flex justify-between rounded-lg bg-secondary items-center text-center"
      >
        <label className="bg-tertiary p-5 items-center rounded-lg">
          <input
            type="file"
            className="hidden"
            value={file}
            name="file"
            onChange={(e) => setFile(e.target.value)}
          />
          <span className="text-center text-white font-bold">
            Select a file
          </span>
        </label>
        <h1 className="text-center text-white font-bold">Start Uploading</h1>
        <button
          type="submit"
          className="bg-tertiary p-5 items-center rounded-lg"
        >
          <h1 className="text-center text-white font-bold">
            Send File {file.length > 0 ? "✅" : "❌"}
          </h1>
        </button>
      </form>
    </div>
  );
};

export default Info;
