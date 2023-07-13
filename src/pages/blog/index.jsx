import Blogs from "./blogs/db";
import { Link } from "react-router-dom";
import "./style.scss";

const Blog = () => {
  return (
    <main className="blog-w">
      <section className="blog-card-section">
        {Blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <div className="blog-card">
              <div className="left-content">
                <img
                  src={blog.picture_src}
                  alt="blog-card-image"
                  className="blog-card-image"
                />
              </div>
              <div className="right-content">
                <h1>{blog.title}</h1>
                <h4>Date: {blog.date}</h4>
                <h4>Category: {blog.category}</h4>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Blog;
