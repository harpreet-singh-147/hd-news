const Comments = ({ comments }) => {
  return (
    <div className="comment-container">
      <h2 className="comments-title">Comments</h2>
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
