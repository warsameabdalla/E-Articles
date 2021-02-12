import axios from "axios";

export const getArticles = (topic) => {
  return topic !== undefined
    ? axios
        .get(`http://nc-newsapi.herokuapp.com/api/articles?topic=${topic}`)
        .then(({ data }) => {
          return data;
        })
    : axios
        .get("http://nc-newsapi.herokuapp.com/api/articles")
        .then(({ data }) => {
          return data;
        });
};
export const getTopics = () => {
  return axios
    .get("http://nc-newsapi.herokuapp.com/api/topics")
    .then(({ data: { topics } }) => {
      return topics;
    });
};
export const getArticle = (id) => {
  return axios
    .get(`http://nc-newsapi.herokuapp.com/api/articles/${id}`)
    .then(({ data: { Article } }) => {
      return Article;
    });
};
export const getArticleComments = (id) => {
  console.log(id, "<-----id");
  return axios
    .get(`http://nc-newsapi.herokuapp.com/api/articles/${id}/comments`)
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
export const sortingArticles = (value) => {
  return axios
    .get(`http://nc-newsapi.herokuapp.com/api/articles?sort_by=${value}`)
    .then(({ data }) => {
      console.log(value, data);
      return data;
    });
};
export const addCommentById = (input) => {
  return axios
    .post(
      `http://nc-newsapi.herokuapp.com/api/articles/${input.article_id}/comments`,
      input
    )
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
export const deleteCommentById = (id) => {
  return axios
    .delete(`http://nc-newsapi.herokuapp.com/api/comments/${id}`)
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
export const updateStar = (id, starChange) => {
  return axios
    .patch(`http://nc-newsapi.herokuapp.com/api/articles/${id}`, {
      inc_votes: starChange,
    })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
export const updateCommentVote = (id, starChange) => {
  return axios
    .patch(`http://nc-newsapi.herokuapp.com/api/comments/${id}`, {
      inc_votes: starChange,
    })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
