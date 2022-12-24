import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const PostCard = ({ post }) => {
  const { id, userId, title, body } = post;
  const [authorImg, setAuthorImg] = useState("");
  const [author, setAuthor] = useState({});
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    try {
      // load author image
      axios
        .get(`https://jsonplaceholder.typicode.com/photos/${userId}`)
        .then((res) => setAuthorImg(res.data.thumbnailUrl));

      // load author name and website
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) => setAuthor(res.data));

      // load comment counter length
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then((res) => setCommentCount(res.data.length));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <article className="border p-4 rounded-md hover:shadow-lg">
      <img
        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        alt=""
      />
      <Link href={`/post/${id}`}>
        <h5
          className="font-semibold text-xl whitespace-nowrap w-full overflow-hidden text-ellipsis"
          title={title}
        >
          {title}
        </h5>
      </Link>
      <p>
        {body.slice(0, 115)}...
        <Link href={`/post/${id}`} className="font-semibold text-blue-600">
          more
        </Link>
      </p>
      <div>
        <span>{commentCount}</span>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <img src={authorImg} className="w-11 rounded-full" alt="" />
        <div>
          <h6 className="font-semibold">{author.name}</h6>
          <p>{author.website}</p>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
