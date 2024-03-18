const params = new URLSearchParams(location.search);
const selector = document.querySelector("#searchBar");
selector.value = params.get("title");
document.querySelector("#searchButton").addEventListener("click", async (event) => {
  try {
    const text = selector.value;
    location.search = "title=" + text;
  } catch (error) {
    alert(error.message);
  }
});