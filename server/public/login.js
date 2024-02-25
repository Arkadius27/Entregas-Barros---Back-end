document.querySelector("#login").addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    //console.log(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(data),
      },
    };
    let response = await fetch("/api/sessions/login", options);
    response = await response.json();
    alert(response.message);
  } catch (error) {
    alert(error.message);
  }
});
