import { useState } from "react";

const Comments = ({ loggedInUser, comments }) => {
  const [commentInput, setCommentInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="comment-container">
      <h2 className="comments-title">Comments</h2>
      {loggedInUser ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Comment</label>
            <input
              type="text"
              required
              placeholder="add comment here"
              onChange={(e) => setCommentInput(e.target.value)}
              value={commentInput}
            />
            <button type="submit">Post a comment</button>
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
