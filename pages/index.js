import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../slices/postSlice";
import PostCard from "../components/PostCard";
import { ClipLoader } from "react-spinners"; 

export default function Home() {
  const { isLoading, posts, error } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <> 
      <div className="flex justify-center absolute left-0 right-0 top-[30%]">
        {isLoading && <ClipLoader color="" loading={isLoading} size={50} />}
      </div>
      {error && <h3>{error}</h3>}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 px-5 lg:grid-cols-4 gap-5">
        {posts &&
          posts.map((post) => <PostCard key={post.id} post={post}></PostCard>)}
      </section>
    </>
  );
}
