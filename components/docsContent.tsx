const DocsContent = ({ docs }: any) => {
  return (
    <div className="pl-3 flex justify-between bg-secondary items-center  mt-2 rounded-lg">
      <h1 className="text-white font-semibold max-w-max overflow-hidden">
        {docs}
      </h1>
      <a
        href={docs}
        target="_blank"
        className="bg-tertiary p-5  items-center rounded-lg"
        rel="noreferrer"
      >
        <h1 className="text-center text-white font-bold">Open Docs</h1>
      </a>
    </div>
  );
};

export default DocsContent;
