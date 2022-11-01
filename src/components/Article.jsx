import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "../api";
import { Link } from "react-router-dom";

const Article = () => {
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id)
      .then(({ article }) => {
        setSingleArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
      });
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Link to="/articles">
            <button>Back to all articles</button>
          </Link>
          <h1>{singleArticle.title}</h1>
          <p>{singleArticle.body}</p>
          <p>
            Written By: <b>{singleArticle.author}</b>
          </p>
          <p>Topic: {singleArticle.topic}</p>
          <p>{singleArticle.created_at}</p>

          <p>{singleArticle.comment_count} Comments</p>
        </>
      )}
    </div>
  );
};

export default Article;
