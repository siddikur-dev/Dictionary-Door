const getValue = (id) => {
  const value = document.getElementById(id).value;
  value * 1;
  return value;
};

document.getElementById("getStartedBtn").addEventListener("click", function () {
  //get user name and password
  const userName = getValue("userName");
  const password = getValue("password");
  console.log(userName, password);
  if (userName === "siddikur-dev" && password === "1234") {
    window.location.href = "./index.html";
  } else {
    alert("please give correct password");
  }
});
