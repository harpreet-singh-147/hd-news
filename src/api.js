import axios from "axios";

const articlesApi = axios.create({
  baseURL: `https://hdnews.herokuapp.com/api`,
});

export function fetchAllArticles() {
  return articlesApi.get(`/articles`).then((res) => {
    return res.data;
  });
}
