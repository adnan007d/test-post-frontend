import { FC } from "react";
import AddEdit from "../components/AddEdit";
import Header from "../components/Header";
import PostFeed from "../components/PostFeed";

const Home: FC = () => {
  return (
    <div>
      <Header />
      <PostFeed />
      <AddEdit />
    </div>
  );
};

export default Home;
