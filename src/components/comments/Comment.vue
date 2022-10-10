<template>
  <div class="mt-2" :style="commentMargin">
    <div class="row comment">
      <div class="col-1 user-img mt-2">
        <img
          :src="
            comment.user.avatar ??
            'http://localhost:8000/storage/uploads/default.jpg'
          "
        />
      </div>
      <div class="col-6 infor-comment mt-1">
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
        <a
          class="change-comment"
          @click="showEdit(comment.id)"
          v-if="comment.user.id === user.id"
          ><small> &bull; Sửa</small>
        </a>
        &ensp;

        <a
          class="delete-comment"
          @click="deleteComment(comment.id)"
          v-if="comment.user.id === user.id"
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
  <p
    class="show-child-comment mt-1"
    v-if="hasChildren"
    @click="showChild(comment.id)"
    :style="
      showChildComment.includes(comment.id)
        ? 'display:none'
        : `margin-left:${spacing + 100}px;`
    "
  >
    <i class="fa-solid fa-arrow-right"></i>&ensp;Hiển thị
    {{ comment.children.length }} phản hồi
  </p>
  <div v-if="hasChildren && showChildComment.includes(comment.id)">
    <Comment
      v-for="cmt in comment.children"
      :key="cmt.id"
      :comment="cmt"
      :spacing="spacing + 70"
      :showRepComment="showRepComment"
      :showEditComment="showEditComment"
      :showChildComment="showChildComment"
      :reply_content="reply_content"
      :domain="domain"
    />
  </div>
</template>

<script setup>
import { computed, defineProps, inject, onUnmounted, ref } from "vue";
import Comment from "@/components/comments/Comment.vue";

const emitter = inject("emitter");

const reply_content = ref("");
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";

const props = defineProps({
  comment: Object,
  spacing: {
    type: Number,
    default: 0,
  },
  showEditComment: Array,
  showChildComment: Array,
  showRepComment: Number,
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

const showChild = (comment_id) => {
  emitter.emit("showChild", comment_id);
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

const repComment = (comment) => {
  if (!user.id) {
    alert("Bạn cần đăng nhập để bình luận");
  } else {
    if (reply_content.value.trim()) {
      let rep_comment = {
        user_id: user.id,
        product_id: comment.product_id,
        reply_id: comment.id,
        content: reply_content.value,
      };
      emitter.emit("repComment", rep_comment);
    }
  }
};

const deleteComment = (comment_id) => {
  emitter.emit("deleteComment", comment_id);
};

onUnmounted(() => {
  emitter.off("repComment");
  emitter.off("deleteComment");
});
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
  border-top: 1px solid rgb(199, 191, 191);
}
.user-img img {
  border-radius: 50%;
}
.comment {
  display: flex;
}
.user-img img {
  width: 60px;
  height: 60px;
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
.show-child-comment {
  cursor: pointer;
  color: #0084fe;
  font-size: 14px;
}
.show-child-comment i {
  color: rgb(39, 36, 36);
}
</style>
