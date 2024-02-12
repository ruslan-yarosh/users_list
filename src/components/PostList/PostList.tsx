import React, { useEffect, useState } from "react";
import { Post } from "../../types/Post";
import { getPosts } from "../../helpers/fetchData";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { userId } = useParams();

  if (!userId) {
    return;
  }

  useEffect(() => {
    const handleGetPosts = async () => {
      try {
        const data: Post[] = await getPosts(+userId);
        setPosts(data);
      } catch {
        console.log('Failed to get posts');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    handleGetPosts();
  }, [userId]);

  return (
    <div className="block">
      {isError && (
        <ErrorMessage />
      )}

      {isLoading ? (
        <Loader />
      ) : (
        posts.map(post => (
          <div className="box" key={post.id}>
            <h3 className="title">{post.title}</h3>
            <p className="is-size-5">{post.body}</p>
          </div>
        ))
      )}
    </div>
  )
}