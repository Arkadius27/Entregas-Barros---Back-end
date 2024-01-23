const socket = io();

socket.on("all products", (data) => {
  console.log(data);
  data = data.map((each) => 
    `<div class="card-container d-flex flex-wrap justify-content-center">
      <div class="card" style="width: 18rem;">
        <img src="${each.photo}" class="card-img-top" alt="${each.title}" />
        <div class="card-body">
          <h5 class="card-title fw-bolder">${each.title}</h5>
          <p class="card-text">${each.price}</p>
          <p class="card-text fw-light">${each.stock} units in stock</p>
        </div>
      </div>
    </div>`
  ).join("");
  document.querySelector("#product-card").innerHTML = data;
});
