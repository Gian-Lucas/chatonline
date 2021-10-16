const btn = document.querySelector(".btn");
const username = document.querySelector("#username");

const setLocalStorageName = (username) =>
  localStorage.setItem("username", username);

const getLocalStorageName = () => localStorage.getItem("username");

if (getLocalStorageName()) {
  username.value = getLocalStorageName();
}

btn.addEventListener("click", () => {
  setLocalStorageName(username.value);
});
