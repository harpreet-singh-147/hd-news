import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "../utils/api";
import { Link } from "react-router-dom";
import { updateVotes, fetchCommentsByArticleId } from "../utils/api";
import Comments from "./Comments";
import Error from "./Error";
import { displayDate } from "../utils/formatDate";
import Loading from "./Loading";

const Article = ({ loggedInUser }) => {
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id)
      .then(({ article }) => {
        setSingleArticle(article);
        setIsLoading(false);
        setError(null);
      })
      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          setError({ msg, status });
          setIsLoading(true);
        }
      );
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

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="container">
      <Link to="/articles">
        <button className="btn-dark">Back to all articles</button>
      </Link>
      <div className="card">
        <h1>{singleArticle.title}</h1>
        <p>{singleArticle.body}</p>
        <p>
          Written By: <b>{singleArticle.author}</b>
        </p>
        <p>Topic: {singleArticle.topic}</p>
        <p>Posted on: {displayDate(singleArticle.created_at)}</p>

        <p>{singleArticle.comment_count} Comments</p>
        {loggedInUser ? (
          <div>
            <div className="d-flex">
              <button
                className="btn-dark"
                onClick={() => {
                  voteButtonHandler(1);
                }}
              >
                <i className="arrow up"></i>
              </button>
              <p>up vote article</p>
            </div>

            <p>{singleArticle.votes} votes</p>
            <div className="d-flex">
              <button
                className="btn-dark"
                onClick={() => {
                  voteButtonHandler(-1);
                }}
              >
                <i className="arrow down"></i>
              </button>
              <p>down vote article</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="container">
        <Comments loggedInUser={loggedInUser} />
      </div>
    </div>
  );
};

export default Article;
