import { FC, useState } from "react";
import { PencilIcon, ThumbUpIcon, TrashIcon } from "@heroicons/react/solid";
import {
  IPost,
  updatePosts,
  deletePost as delPost,
  setSelectedPost,
} from "../slices/postSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { deletePost, likePost } from "../actions/postsActions";
import { onOpenModal } from "../slices/modalSlice";
import { selectUser } from "../slices/userSlice";
import moment from "moment";

const Post: FC<IPost> = ({
  id,
  title,
  description,
  likes,
  user: postUser,
  createdAt,
  updatedAt,
}) => {
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const handleLikeClick = async () => {
    setLikeLoading(true);
    const response = await likePost(id);
    if (!response.error) dispatch(updatePosts(response.data));
    setLikeLoading(false);
  };

  const handleDeleteClick = async () => {
    setDeleteLoading(true);
    const response = await deletePost(id);

    if (!response.error) dispatch(delPost(response.data));

    setDeleteLoading(false);
  };

  const handleEditClick = async () => {
    dispatch(
      setSelectedPost({
        id,
        title,
        description,
      })
    );
    dispatch(onOpenModal());
  };

  return (
    <div className="bg-gray-800 text-white my-4 p-5 rounded-2xl w-10/12 max-w-screen-xl">
      <div className="flex items-center">
        <div className="flex items-center space-x-2 p-2 bg-gray-700 rounded-md w-max">
          <img
            className="h-10 rounded-full object-contain"
            src={postUser?.photoURL}
            loading="lazy"
            alt={postUser?.displayName.charAt(0)}
          />
          <p>{postUser?.displayName}</p>
        </div>
        <p className="test-sm text-gray-400 ml-2">
          {moment(createdAt).fromNow()}
        </p>
      </div>

      {/* title  and edit bar*/}

      <div className="border-b border-gray-400 pb-1 flex justify-between items-center">
        <h1 className="text-2xl">{title}</h1>
        {user?.uid === postUser?.uid && (
          <button className="icon_button" onClick={handleEditClick}>
            <PencilIcon className="h-5" />
          </button>
        )}
      </div>

      {/* description */}

      <p className="text-sm mt-2 bg-gray-600 p-2 rounded-md mb-1 shadow-lg">
        {description}
      </p>

      <div className="flex justify-between bg-gray-700 p-2 rounded-md items-center">
        {/* like button */}
        <button
          className={`icon_button ${!user && "bg-red-700 cursor-not-allowed"}`}
          disabled={likeLoading || !user}
          onClick={handleLikeClick}
        >
          <ThumbUpIcon className="h-5" /> <span>{likes?.length}</span>
        </button>
        {user?.uid === postUser?.uid && (
          <button
            className="icon_button"
            disabled={deleteLoading}
            onClick={handleDeleteClick}
          >
            <TrashIcon className="h-5" />
          </button>
        )}
        {/* delete button */}
      </div>
    </div>
  );
};

export default Post;
