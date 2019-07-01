const requestURL = "https://melp-b6ca6.firebaseio.com/melp.json";
const print = document.getElementById("print-data");
const orderByRatingDes = document.getElementById("order-by-rating-des");
const ordeByNameAsc = document.getElementById("order-by-name-asc");
const orderByRatingAsc = document.getElementById("order-by-rating-asc");
const ordeByNameDes = document.getElementById("order-by-name-des");
const showData = document.getElementById("show-data");

function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  //   console.log(xmlHttp.responseText);
  return JSON.parse(xmlHttp.responseText);
}

// function httpGetAsync(theUrl, callback) {
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.onreadystatechange = function() {
//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//       callback(xmlHttp.responseText);
//   };
//   xmlHttp.open("GET", theUrl, true); // true for asynchronous
//   xmlHttp.send(null);
// }

const data = httpGet(requestURL);

const functionPrint = data => {
  print.innerHTML = "";
  data.map(element => {
    const startPercentage = `${((element.rating + 1) / 5) * 100}%`;

    print.innerHTML += `
    <div class="card my-4">
    <div class="card-header">
        <h5 class="card-title .bg-secondary font-weight-bold"> <img class="icon-rest" src="./assets/restaurant.png"
                alt=""> ${element.name}</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"><i class="fas fa-map-marked-alt"></i><a href="https://www.google.com/maps/@${
          element.address.location.lat
        },${
      element.address.location.lng
    },20z" class="text-dark" target="_blank" title="Location">
                Calle ${element.address.street}, Ciudad de ${
      element.address.city
    }, Estado de ${element.address.state}. </a></li>

        <li class="list-group-item"><i class="fas fa-phone-square-alt"></i>
            ${element.contact.phone}</td>
        </li>

        <li class="list-group-item"><i class="fas fa-envelope-square"></i>
            <a class="text-dark" href="mailto:${
              element.contact.email
            }" title="Email"> ${element.contact.email}</a></li>

        <li class="list-group-item"><i class="fab fa-chrome"></i>
            <a href="${element.contact.site}" target="_blank" title="Site"> ${
      element.contact.site
    }</a></li>
        <div class="card-footer">
            <small class="text-muted "> RATING: <div class="stars-outer">
                    <div class="stars-inner" style="width:${startPercentage} ;"></div>
                </div>
    </ul>
</div>
   
 
  `;
  });
};

showData.addEventListener("click", () => {
  functionPrint(data);
});

orderByRatingDes.addEventListener("click", () => {
  data.sort((a, b) => b.rating - a.rating);

  functionPrint(data);
});

ordeByNameAsc.addEventListener("click", () => {
  data.sort((a, b) => a.name.localeCompare(b.name));
  functionPrint(data);
});

orderByRatingAsc.addEventListener("click", () => {
  data.sort((a, b) => a.rating - b.rating);

  functionPrint(data);
});

ordeByNameDes.addEventListener("click", () => {
  data.sort((a, b) => b.name.localeCompare(a.name));
  functionPrint(data);
});
