type Props = {
  data: any;
};

const Data: React.FC<Props> = ({ data }) => {
  return (
    <div className="border-4 mt-8 p-10 pt-3 h-auto border-secondary ">
      {data.data < 0 ? (
        <h1>hello</h1>
      ) : (
        <div>
          {data?.map((link: any) => (
            <div key={link.id}>
              <div className="pl-3 flex justify-between bg-secondary items-center  mt-2 rounded-lg">
                <h1 className="text-white font-semibold">{link.text}</h1>
                <button className="bg-tertiary p-5  items-center rounded-lg">
                  <h1 className="text-center text-white font-bold">
                    Copy Text
                  </h1>
                </button>
              </div>

              {link.image.length > 0 ? (
                <div className="pl-3 flex justify-between bg-secondary items-center  mt-2 rounded-lg">
                  <h1 className="text-white font-semibold">{link.image}</h1>
                  <button className="bg-tertiary p-5  items-center rounded-lg">
                    <h1 className="text-center text-white font-bold">
                      Open Image
                    </h1>
                  </button>
                </div>
              ) : null}

              {link.docs.length > 0 ? (
                <div className="pl-3 flex justify-between bg-secondary items-center  mt-2 rounded-lg">
                  <h1 className="text-white font-semibold">{link.docs}</h1>
                  <button className="bg-tertiary p-5  items-center rounded-lg">
                    <h1 className="text-center text-white font-bold">
                      Open Docs
                    </h1>
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Data;
