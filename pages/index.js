import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../slices/postSlice";
import PostCard from "../components/PostCard";

export default function Home() {
  const { isLoading, posts, error } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Head>
        <title>Softic Blogs</title>
      </Head>
      {isLoading && <h3>Loading</h3>}
      {error && <h3>{error}</h3>}
      <section className="container mx-auto grid grid-cols-4 gap-5">
        {posts &&
          posts.map((post) => <PostCard key={post.id} post={post}></PostCard>)}
      </section>
    </>
  );
}
