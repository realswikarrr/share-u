const ImageContent = ({ image }: any) => {
  return (
    <div className="pl-3 flex justify-between bg-secondary items-center  mt-2 rounded-lg">
      <h1 className="text-white font-semibold max-w-max overflow-hidden">
        {image}
      </h1>
      <button className="bg-tertiary p-5  items-center rounded-lg">
        <h1 className="text-center text-white font-bold">Open Image</h1>
      </button>
    </div>
  );
};

export default ImageContent;
