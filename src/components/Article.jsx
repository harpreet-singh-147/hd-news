import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "../api";
import { Link } from "react-router-dom";
import { updateVotes } from "../api";

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

  const voteButtonHandler = (vote) => {
    setSingleArticle({
      ...singleArticle,
      votes: singleArticle.votes + vote,
    });

    updateVotes(vote, singleArticle.article_id)
      .then(({ updatedArticle }) => {
        setSingleArticle({ ...singleArticle, ...updatedArticle });
      })
      .catch((err) => {
        alert("something went wrong");
      });
  };

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Link to="/articles">
            <button>Back to all articles</button>
          </Link>
          <div className="card">
            <h1>{singleArticle.title}</h1>
            <p>{singleArticle.body}</p>
            <p>
              Written By: <b>{singleArticle.author}</b>
            </p>
            <p>Topic: {singleArticle.topic}</p>
            <p>{singleArticle.created_at}</p>

            <p>{singleArticle.comment_count} Comments</p>
            <p>up vote article</p>
            <button
              onClick={() => {
                voteButtonHandler(1);
              }}
            >
              <i className="arrow up"></i>
            </button>
            <p>{singleArticle.votes} votes</p>
            <button
              onClick={() => {
                voteButtonHandler(-1);
              }}
            >
              <i className="arrow down"></i>
            </button>
            <p>downvote vote article</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Article;
