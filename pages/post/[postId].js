import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../slices/commentSlice";

const postId = () => {
  const { isLoading, comments, error } = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(1));
  }, []);

  return (
    <div>
      this post
      {isLoading && <h3>Loading</h3>}
      {error && <h3>{error}</h3>}
      <section>
        {comments &&
          comments.map((comment) => (
            <article key={comment.id}>
                <h5>{comment.name}</h5>
            </article>
          ))}
      </section>
    </div>
  );
};

export default postId;
