import { FC } from "react";
import Post from "./Post";
import { useAppSelector } from "../app/hook";
import { selectPosts } from "../slices/postSlice";

const PostFeed: FC = () => {
  const posts = useAppSelector(selectPosts);

  return (
    <div className="flex flex-col items-center mx-10 bg-black">
      {posts?.map((post, i) => (
        <Post
          key={post.id || i}
          id={post.id}
          title={post.title}
          description={post.description}
          likes={post.likes}
          user={post.user}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
        />
      ))}
    </div>
  );
};

export default PostFeed;
