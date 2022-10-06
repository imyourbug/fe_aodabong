<template>
  <div class="mt-2" :style="commentMargin">
    <div class="row comment">
      <div class="col-1 user-img mt-2">
        <img :src="`${domain}/storage/uploads/default.jpg`" />
      </div>
      <div class="col-11 infor-comment mt-3">
        <div class="name-user">
          <a href="#">{{ comment.user.name }}</a>
        </div>
        <div class="line-comment" v-if="showEditComment.includes(comment.id)">
          <input
            class="form-control"
            v-model="comment.content"
            @keyup.enter="editComment(comment.id, comment.content)"
          />
        </div>
        <div class="line-comment" v-else>{{ comment.content }}</div>
        <a class="like-comment"
          ><small><i class="fa-regular fa-thumbs-up"></i> Like</small> </a
        >&ensp;
        <a class="reply-comment" @click="showReply(comment.id)"
          ><small> &bull; Phản hồi</small>
        </a>
        &ensp;
        <a class="change-comment" @click="showEdit(comment.id)"
          ><small> &bull; Sửa</small>
        </a>
        &ensp;

        <a class="delete-comment" @click="deleteComment(comment.id)"
          ><small> &bull; Xóa</small>
        </a>
      </div>
    </div>
    <div class="row block-edit mt-1" v-if="showRepComment === comment.id">
      <input
        class="form-control"
        placeholder="Trả lời"
        v-model="reply_content"
        @keyup.enter="repComment(comment, reply_content)"
      />
    </div>
  </div>
  <div v-if="hasChildren">
    <Comment
      v-for="cmt in comment.children"
      :key="cmt.id"
      :comment="cmt"
      :spacing="spacing + 70"
      :showRepComment="showRepComment"
      :showEditComment="showEditComment"
      :reply_content="reply_content"
      :domain="domain"
    />
  </div>
</template>

<script setup>
import { computed, defineProps, inject, ref } from "vue";
import Comment from "@/components/comments/Comment.vue";

const emitter = inject("emitter");

const reply_content = ref("");

const props = defineProps({
  comment: Object,
  spacing: {
    type: Number,
    default: 0,
  },
  showEditComment: Array,
  showRepComment: Array,
  domain: String,
});

const commentMargin = computed(() => {
  return `margin-left:${props.spacing}px`;
});

const hasChildren = computed(() => {
  const { children } = props.comment;
  return children && children.length > 0;
});

const showEdit = (comment_id) => {
  emitter.emit("showEdit", comment_id);
};

const showReply = (comment_id) => {
  reply_content.value = "";
  emitter.emit("showReply", comment_id);
};

const editComment = (comment_id, new_content) => {
  let new_comment = {
    id: comment_id,
    content: new_content,
  };
  if (new_content.trim()) {
    emitter.emit("editComment", new_comment);
  }
};

const repComment = (comment, rep_content) => {
  if (rep_content.trim()) {
    let rep_comment = {
      user_id: comment.user_id,
      product_id: comment.product_id,
      reply_id: comment.id,
      content: rep_content,
    };
    emitter.emit("repComment", rep_comment);
  }
};

const deleteComment = (comment_id) => {
  emitter.emit("deleteComment", comment_id);
};
</script>

<style scoped>
a {
  text-decoration: none;
}
/* block-comment */
.block-edit {
  margin-left: 150px;
  width: 50%;
}
.like-comment:hover,
.change-comment:hover,
.reply-comment:hover,
.delete-comment:hover,
label.radio {
  cursor: pointer;
}

/* .show-commnet */
.comment {
  display: flex;
}
.user-img img {
  width: 80px;
  height: 80px;
}
.line-comment {
  font-weight: bold;
}
.delete-comment {
  margin-top: 10px;
  color: rgb(39, 133, 209);
  background-color: transparent;
}
.delete-comment:hover {
  color: #ed1a29;
}
</style>
