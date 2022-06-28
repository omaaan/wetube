import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("videoComment");
const commentDeleteBtns = document.querySelectorAll(".video__comment-delete");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comments-comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const span2 = document.createElement("button");
  span2.className = "video__comment-delete";
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    retrun;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
    textarea.value = "";
  }
};

const handleDelete = async (event) => {
  const commentDeleteBtn = event.srcElement.parentNode;
  const {
    dataset: { id: commentId },
  } = commentDeleteBtn;
  const videoId = videoContainer.dataset.id;
  console.log(`삭제버튼 클릭: ${commentId}댓글`);
  await fetch(`/api/videos/${videoId}/comment`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      alert("댓글 삭제 실패");
      return;
    }
    commentDeleteBtn.remove();
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

commentDeleteBtns.forEach((btn) => {
  btn.addEventListener("click", handleDelete);
});
