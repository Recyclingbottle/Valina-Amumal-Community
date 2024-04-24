document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const content = urlParams.get("content");
  const image = urlParams.get("image");

  const postTitleInput = document.getElementById("post-title");
  const postContentInput = document.getElementById("post-content");
  const postImageLabel = document.getElementById("post-image-label");

  postTitleInput.value = title || "";
  postContentInput.value = content || "";

  if (image) {
    postImageLabel.textContent = image;
  }

  postTitleInput.addEventListener("input", () => {
    if (postTitleInput.value.length > 26) {
      postTitleInput.value = postTitleInput.value.substring(0, 26);
    }
  });
});

const submitPost = () => {
  alert("수정 완료");
  window.location.href = "./posts.html";
};
