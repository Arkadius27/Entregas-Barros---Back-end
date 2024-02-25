const selector = document.querySelector("#login");

selector.addEventListener("click", async () => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      }),
    }
    await fetch("/api/sessions/login", options);
  } catch (error) {
    alert(error.message);
  }
});
