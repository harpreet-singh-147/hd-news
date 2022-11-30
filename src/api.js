import axios from "axios";

const articlesApi = axios.create({
  baseURL: `https://hd-news-be.cyclic.app/api`,
});

export function fetchAllArticles() {
  return articlesApi.get(`/articles`).then((res) => {
    return res.data;
  });
}

export function fetchAllTopics() {
  return articlesApi.get(`/topics`).then((res) => {
    return res.data;
  });
}

export function fetchAllArticlesByType(sortBy, order, topic) {
  let url;
  if (topic) {
    url = `/articles?sort_by=${sortBy}&topic=${topic}&order=${order}`;
  } else {
    url = `/articles?sort_by=${sortBy}&order=${order}`;
  }
  return articlesApi.get(url).then((res) => {
    return res.data;
  });
}

export function fetchAllArticlesByTopic(topic) {
  let url = `/articles?topic=${topic}`;
  return articlesApi.get(url).then((res) => {
    return res.data;
  });
}

export function fetchSingleArticle(article_id) {
  return articlesApi.get(`/articles/${article_id}`).then((res) => {
    return res.data;
  });
}

export function updateVotes(votes, article_id) {
  return articlesApi
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export function fetchCommentsByArticleId(article_id) {
  return articlesApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data;
  });
}

export function fetchUsers() {
  return articlesApi.get(`/users`).then((res) => {
    return res.data;
  });
}

export function postComment(article_id, username, body) {
  return articlesApi
    .post(`/articles/${article_id}/comments`, { username, body })
    .then((res) => {
      return res.data;
    });
}

export function deleteComment(comment_id) {
  return articlesApi.delete(`/comments/${comment_id}`).then((res) => {
    return res.data;
  });
}
