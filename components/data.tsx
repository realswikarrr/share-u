import DocsContent from "./docsContent";
import ImageContent from "./imageContent";
import Text from "./textContent";

type Props = {
  data: any;
};

const Data: React.FC<Props> = ({ data }) => {
  return (
    <div className="border-4 mt-8 mx-10 p-10 pt-3 h-auto border-secondary ">
      {data.length === 0 ? (
        <div className="text-center ">
          <h1 className="mt-5">
            Sheesh You Have Nothing Here Start Adding ..... 🚀{" "}
          </h1>
        </div>
      ) : (
        <div>
          {data?.map((link: any) => (
            <div key={link.id}>
              {link.text.length > 0 ? <Text text={link.text} /> : null}

              {link.image.length > 0 ? (
                <ImageContent image={link.image} />
              ) : null}

              {link.docs.length > 0 ? <DocsContent docs={link.docs} /> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Data;
