import { trpc } from "../utils/trpc";

const Profile = () => {
  const hello = trpc.useQuery(["getLinks"]);
  console.log(hello.data);
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data[0]?.links[0]?.text}</p>
    </div>
  );
};

export default Profile;
