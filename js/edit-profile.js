document.addEventListener("DOMContentLoaded", () => {
  const profileImg = document.getElementById("profileImg");
  const userEmail = localStorage.getItem("userEmail");
  const userNickname = localStorage.getItem("userNickname");
  const userProfileImage = localStorage.getItem("userProfileImage");
  const helperText = document.getElementById("helper-text");
  const nicknameInput = document.getElementById("nickname");
  const updateButton = document.querySelector(".signup-button");

  updateButton.disabled = true;

  document.querySelector("#email").innerText = userEmail || "";
  nicknameInput.value = userNickname || "";

  if (userProfileImage) {
    profileImg.src = userProfileImage;
    profileImg.style.cssText =
      "width: 149px; height: 149px; border-radius: 100%;";
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("../data/UserInfo.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  let users = [];
  fetchUsers().then((data) => (users = data));

  const validateNickname = async () => {
    const newNickname = nicknameInput.value.trim();
    helperText.textContent = "";
    updateButton.disabled = true;

    if (!newNickname) {
      helperText.textContent = "*닉네임을 입력해주세요.";
      return false;
    }
    if (newNickname.length > 10) {
      helperText.textContent = "*닉네임은 최대 10자 까지 작성 가능합니다.";
      return false;
    }

    const isDuplicate = users.some(
      (user) => user.nickname.toLowerCase() === newNickname.toLowerCase()
    );
    if (isDuplicate) {
      helperText.textContent = "*중복된 닉네임 입니다.";
      return false;
    }
    updateButton.disabled = false;
    return true;
  };

  nicknameInput.addEventListener("input", validateNickname);

  updateButton.addEventListener("click", () => {
    if (validateNickname()) {
      alert("수정 완료되었습니다.");
      window.location.href = "posts.html";
    }
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "posts.html";
  });

  profileImg.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImg.src = e.target.result;
        localStorage.setItem("userProfileImage", e.target.result);
      };
      reader.readAsDataURL(file);
    };
    fileInput.click();
  });

  const modal = document.getElementById("myModal");
  const cancelButton = modal.querySelector(".cancel");
  const confirmButton = modal.querySelector(".confirm");

  document.querySelector(".go-to-login").addEventListener("click", () => {
    modal.style.display = "block";
  });

  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  confirmButton.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
