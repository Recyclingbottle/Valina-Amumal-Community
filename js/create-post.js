document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("post-form");
  const titleInput = document.getElementById("post-title");
  const contentTextarea = document.getElementById("post-content");
  const submitButton = document.querySelector(".submit-button");
  const helperText = document.getElementById("create-helper");

  const updateUI = () => {
    const title = titleInput.value;
    const content = contentTextarea.value;
    const bothFilled = title && content;

    submitButton.style.backgroundColor = bothFilled ? "#7F6AEE" : "#ACAOEB";
    submitButton.disabled = !bothFilled;
    helperText.textContent = bothFilled
      ? ""
      : "*제목, 내용을 모두 작성해주세요";
  };

  const limitTitleInput = () => {
    if (titleInput.value.length > 26) {
      titleInput.value = titleInput.value.substr(0, 26);
    }
    updateUI();
  };

  titleInput.addEventListener("input", limitTitleInput);
  contentTextarea.addEventListener("input", updateUI);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateUI();
    if (!submitButton.disabled) {
      alert("게시글 작성 완료");
      window.location.href = "./posts.html";
    } else {
      helperText.textContent = "*제목, 내용을 모두 작성해주세요";
    }
  });
});
