import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCommentsByArticleId,
  postComment,
  deleteComment,
} from "../utils/api";
import { displayDate } from "../utils/formatDate";
import Loading from "./Loading";
import Error from "./Error";

const Comments = ({ loggedInUser }) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorModal, setErrorModal] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(article_id)
      .then(({ articleComments }) => {
        setComments(articleComments);
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
          setIsLoading(false);
        }
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments((prevComment) => [...prevComment, commentInput]);
    setCommentInput("");

    postComment(article_id, loggedInUser.username, commentInput)
      .then(
        ({ addedComment: { comment_id, author, votes, body, created_at } }) => {
          const commentObj = {
            comment_id,
            author,
            votes,
            body,
            created_at,
          };
          setComments((prevComment) => [commentObj, ...prevComment]);
          setCommentInput("");
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (comment_id) => {
    if (comment_id) {
      setIsLoading(true);
      deleteComment(comment_id)
        .then((res) => {
          fetchCommentsByArticleId(article_id).then(({ articleComments }) => {
            setComments(articleComments);
          });
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  if (error)
    return (
      <Error
        error={error}
        errorModal={errorModal}
        setErrorModal={setErrorModal}
        comment="Comments not found"
      />
    );
  if (isLoading) return <Loading />;

  return (
    <>
      {loggedInUser ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <textarea
              aria-label="Add your comments here"
              className="text-area "
              type="text"
              cols="110"
              rows="8"
              required
              placeholder="Add your comments..."
              onChange={(e) => setCommentInput(e.target.value)}
              value={commentInput}
            ></textarea>
          </div>
          <div className="btn-cntr-mq">
            <button
              aria-label="Post your comment button"
              className="btn-dark btn-cntr-300mq"
              type="submit"
              disabled={isLoading}
            >
              Post a comment
            </button>
          </div>
        </form>
      ) : null}
      <h2 className="comments-title text-center">Comments</h2>
      {comments.map(({ comment_id, created_at, author, body }) => {
        return (
          <section className="card" key={comment_id}>
            <h3>@{author}</h3>
            <p>{body}</p>
            <p>Posted on: {displayDate(created_at)}</p>
            {loggedInUser && loggedInUser.username === author ? (
              <div className="d-flex justify-content-end">
                <button
                  aria-label="Delete comment button"
                  className="btn-danger"
                  onClick={() => handleDelete(comment_id)}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </section>
        );
      })}
    </>
  );
};

export default Comments;
