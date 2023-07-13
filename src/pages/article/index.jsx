import { useParams } from "react-router-dom";
import Blogs from "../blog/blogs/db";
import "./style.scss";

const Article = () => {
  const { id } = useParams();
  const blog = Blogs.find((blog) => blog.id === parseInt(id));

  return (
    <article className="article-wrapper">
      <h1>{blog.title}</h1>
      {blog.body
        .split("\n")
        .map((paragraph, index) => paragraph && <p key={index}>{paragraph}</p>)}
    </article>
  );
};

export default Article;
