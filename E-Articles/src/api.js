import axios from "axios";

export const getArticles = (topic, sort_by, order) => {
  return axios
    .get(`//nc-newsapi.herokuapp.com/api/articles`, {
      params: {
        topic,
        sort_by,
        order,
      },
    })
    .then(({ data }) => {
      return data;
    });
};
export const getTopics = () => {
  return axios
    .get("//nc-newsapi.herokuapp.com/api/topics")
    .then(({ data: { topics } }) => {
      return topics;
    });
};
export const getArticle = (id) => {
  return axios
    .get(`//nc-newsapi.herokuapp.com/api/articles/${id}`)
    .then(({ data: { Article } }) => {
      return Article;
    });
};
export const getArticleComments = (id) => {
  return axios
    .get(`//nc-newsapi.herokuapp.com/api/articles/${id}/comments`)
    .then(({ data }) => {
      return data;
    });
};
// export const sortingArticles = (value) => {
//   return axios
//     .get(`//nc-newsapi.herokuapp.com/api/articles?sort_by=${value}`)
//     .then(({ data }) => {
//       return data;
//     });
// };
export const addCommentById = (input) => {
  return axios
    .post(
      `//nc-newsapi.herokuapp.com/api/articles/${input.article_id}/comments`,
      input
    )
    .then(({ data }) => {
      return data;
    });
};
export const deleteCommentById = (id) => {
  return axios
    .delete(`//nc-newsapi.herokuapp.com/api/comments/${id}`)
    .then(({ data }) => {
      return data;
    });
};
export const updateStar = (id, starChange) => {
  return axios
    .patch(`//nc-newsapi.herokuapp.com/api/articles/${id}`, {
      inc_votes: starChange,
    })
    .then(({ data }) => {
      return data;
    });
};
export const updateCommentVote = (id, starChange) => {
  return axios
    .patch(`//nc-newsapi.herokuapp.com/api/comments/${id}`, {
      inc_votes: starChange,
    })
    .then(({ data }) => {
      return data;
    });
};
