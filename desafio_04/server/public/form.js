const socket = io();

socket.on("welcome", (message) => {
  alert(message);
});
socket.emit("new product", {
  title: "Xbox Series S",
  photo: "https://m.media-amazon.com/images/I/61f1agMOeTL.jpg",
  price: 590,
  stock: 7,
});
socket.on("new success", (message) => {
  alert(message);
});