import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../slices/commentSlice";

const postId = (props) => {
  const { isLoading, comments, error } = useSelector((state) => state.comments);
  const [post, setPost] = useState(props.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(props.post.id));
  }, []);

  return (
    <section className="md:w-3/4 lg:w-2/5 mx-auto my-5 px-2 md:px-0">
      {isLoading && <h3>Loading</h3>}
      {error && <h3>{error}</h3>}
      <div>
        <h1 className="md:text-2xl font-semibold text-slate-800 mb-1">{post.title}</h1>
        <img className="" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="" />
      </div>
      <h4 className="md:text-xl font-semibold text-slate-800 my-5">Comments ({comments.length})</h4>
      <section>
        {comments &&
          comments.map((comment) => (
            <article className="border p-3 mb-5 rounded-lg hover:shadow-xl" key={comment.id}>
              <h5 className="md:text-lg font-semibold mb-2">{comment.email}</h5>
              <p>{comment.body}</p>
            </article>
          ))}
      </section>
    </section>
  );
};

export async function getServerSideProps(context) {
  const { postId } = context.query;

  const data = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await data.json();

  return {
    props: { post },
  };
}

export default postId;
