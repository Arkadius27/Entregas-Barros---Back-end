document.querySelector("#register").addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const data = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      photo: document.querySelector("#profilePic").value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/register", options);
    response = await response.json();
    alert(response.message);
    console.log(response.message);
    if (response.message === "Registered!") {
      window.location.replace("/users/auth/login");
    }
  } catch (error) {
    alert(error.message);
  }
});