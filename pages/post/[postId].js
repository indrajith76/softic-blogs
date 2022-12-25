import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../slices/commentSlice";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const postId = (props) => {
  const { isLoading, comments, error } = useSelector((state) => state.comments);
  const [post, setPost] = useState(props.post);
  const [authorImg, setAuthorImg] = useState("");
  const [author, setAuthor] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(props.post.id));

    // load author image
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/${post.userId}`)
      .then((res) => setAuthorImg(res.data.thumbnailUrl));

    // load author name
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      .then((res) => setAuthor(res.data));
  }, []);

  return (
    <section className="md:w-3/4 lg:w-2/5 mx-auto my-5 px-2 md:px-0">
      {isLoading && <ClipLoader color="" loading={isLoading} size={50} />}
      {error && <h3>{error}</h3>}
      <div>
        <h1 className="md:text-2xl font-semibold text-slate-800 mb-1">
          {post.title}
        </h1>
        <img
          className=""
          src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          alt=""
        />
      </div>
      <div className="flex justify-between items-center">
        <h4 className="md:text-xl font-semibold text-slate-800 my-5">
          Comments ({comments.length})
        </h4>
        <div className="flex items-center gap-3">
            <img className="w-10 rounded-full" src={authorImg} alt="" />
            <div>
                <h6 className="font-semibold">{author.name}</h6>
                <small>{author.website}</small>
            </div>
        </div>
      </div>
      <section>
        {comments &&
          comments.map((comment) => (
            <article
              className="border p-3 mb-5 rounded-lg hover:shadow-xl"
              key={comment.id}
            >
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

  const postData = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await postData.json();

  return {
    props: { post },
  };
}

export default postId;
