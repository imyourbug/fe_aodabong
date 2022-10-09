import Repository from "@/api/repositories/Repository";

const baseDomain = "http://localhost:8000";
const baseUrl = `${baseDomain}/api/comments`;

export default {
  getAllComments() {
    return Repository.get(`${baseUrl}/list`);
  },
  createComment(comment) {
    return Repository.post(`${baseUrl}/create`, {
      user_id: comment.user_id,
      product_id: comment.product_id,
      reply_id: comment.reply_id,
      content: comment.content,
    });
  },
  updateContentComment(comment_id, content) {
    return Repository.put(`${baseUrl}/update`, {
      id: comment_id,
      content: content,
    });
  },
  deleteComment(comment_id) {
    return Repository.delete(`${baseUrl}/delete`, {
      data: {
        id: comment_id,
      },
    });
  },
};
