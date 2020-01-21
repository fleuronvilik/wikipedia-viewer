const formElt = document.querySelector("form");
const [searchElt,] = formElt.children;
const results = document.querySelector("dl");
const params = {
  action: "query",
  format: "json",
  list: "search"
};

let endpoint = "https://en.wikipedia.org/w/api.php";
let url = endpoint + "?";

searchElt.oninput = function() {
  params.srsearch = searchElt.value;
  Object.keys(params).forEach(key => {
    url += key + "=" + params[key] + "&";
  })

  url += "origin=*";
  //console.log(url);
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.responseType = "json";
  request.onload = function() {
    if (request.status == 200) {
      results.innerHTML = "";
      if (request.response.query) {
        //console.log(request.response);
        displayResults(request.response.query.search);
      }
    }
  };
  request.send();
}

function displayResults(data) {
  data.forEach(item => {
    const listTitle = document.createElement("dt");
    const listDescription = document.createElement("dd");
    listTitle.innerHTML = `<a href="https://en.wikipedia.org/?curid=${item.pageid}">${item.title}</a>`;
    listDescription.innerHTML += item.snippet;
    results.appendChild(listTitle);
    results.appendChild(listDescription);
  })
}
//https://www.mediawiki.org/wiki/API:Search