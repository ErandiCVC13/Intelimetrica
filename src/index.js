const requestURL = "https://melp-b6ca6.firebaseio.com/melp.json";
const print = document.getElementById("print-data");
const order = document.getElementById("order");
const orderal = document.getElementById("orderal");

function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  //   console.log(xmlHttp.responseText);
  return JSON.parse(xmlHttp.responseText);
}

const data = httpGet(requestURL);

console.log(data);

const functionPrint = data => {
  print.innerHTML = "";
  data.map(element => {
    print.innerHTML += `<li> Restaurant: ${
      element.name
    } Rating: ${element.rating + 1}</li>`;
  });
};

// functionPrint(data);

order.addEventListener("click", () => {
  data.sort((a, b) => b.rating - a.rating);

  functionPrint(data);
});

orderal.addEventListener("click", () => {
  data.sort((a, b) => a.name.localeCompare(b.name));
  functionPrint(data);
});
