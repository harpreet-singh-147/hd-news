import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCommentsByArticleId,
  postComment,
  deleteComment,
} from "../utils/api";
import { displayDate } from "../utils/formatDate";
import Loading from "./Loading";

const Comments = ({ loggedInUser }) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(article_id)
      .then(({ articleComments }) => {
        setComments(articleComments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
    console.log("Comment ID in handle Delete:", comment_id);
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

  if (isLoading) return <Loading />;
  return (
    <div className="container">
      {loggedInUser ? (
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <textarea
                className="text-area form-control"
                type="text"
                cols="110"
                rows="8"
                required
                placeholder="Add your comments..."
                onChange={(e) => setCommentInput(e.target.value)}
                value={commentInput}
              ></textarea>
            </div>
            <button className="btn-dark" type="submit" disabled={isLoading}>
              Post a comment
            </button>
          </form>
        </div>
      ) : null}
      <h2 className="comments-title">Comments</h2>
      {comments.map(({ comment_id, votes, created_at, author, body }) => {
        return (
          <section className="card" key={comment_id}>
            <h3>{author}</h3>
            <p>{body}</p>
            <p>Posted on: {displayDate(created_at)}</p>
            <p>Votes: {votes}</p>
            {loggedInUser && loggedInUser.username === author ? (
              <div className="d-flex justify-content-end">
                <button
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
    </div>
  );
};

export default Comments;
