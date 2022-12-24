import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../slices/postSlice";
import Link from "next/link";

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
      <section>
        {posts &&
          posts.map((post) => (
            <article key={post.id}>
              <Link href={`/post/${post.id}`}>
                <h5>{post.title}</h5>
              </Link>
            </article>
          ))}
      </section>
    </>
  );
}
