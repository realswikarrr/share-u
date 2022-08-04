import useClipboard from "react-use-clipboard";

const Text = ({ text }: any) => {
  const [isCopied, setCopied] = useClipboard(text);

  const handleClick = () => {
    setCopied();
  };

  return (
    <div className=" pl-3 flex justify-between bg-secondary items-center  mt-2 rounded-lg">
      <h1 className="text-white font-semibold max-w-max overflow-hidden">
        {text}
      </h1>
      <button
        onClick={handleClick}
        className="bg-tertiary p-5  items-center rounded-lg text-center text-white font-bold "
      >
        Copy Text
      </button>
    </div>
  );
};

export default Text;
