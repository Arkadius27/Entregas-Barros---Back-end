const socket = io();

document.querySelector("#submitProduct").addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const photo = document.querySelector("#photo").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const data = {};
  title && (data.title = title);
  photo && (data.photo = photo);
  price && (data.price = price);
  stock && (data.stock = stock);

  console.log(data);

  socket.emit("new product", data);
});
