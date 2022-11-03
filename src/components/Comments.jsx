import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByArticleId, postComment } from "../api";

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

    postComment(article_id, loggedInUser.username, commentInput)
      .then(({ addedComment: { author, votes, body, created_at } }) => {
        const commentObj = {
          author,
          votes,
          body,
          created_at,
        };
        setComments((prevComment) => [commentObj, ...prevComment]);
        setCommentInput("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="comment-container">
      <h2 className="comments-title">Comments</h2>
      {loggedInUser ? (
        <div className="card">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>Comment</label>
            <textarea
              className="text-area"
              type="text"
              required
              placeholder="add comment here"
              onChange={(e) => setCommentInput(e.target.value)}
              value={commentInput}
            ></textarea>
            <button type="submit" disabled={isLoading}>
              Post a comment
            </button>
          </form>
        </div>
      ) : null}

      {comments.map(({ comment_id, votes, created_at, author, body }) => {
        return (
          <section className="card">
            <h3>{author}</h3>
            <p>{body}</p>
            <p>Posted on {created_at}</p>
          </section>
        );
      })}
    </div>
  );
};

export default Comments;
