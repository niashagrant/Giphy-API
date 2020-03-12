var cartoons = [
  "Hey Arnold!",
  "Courage the Cowardly Dog",
  "CatDog",
  "Johnny Bravo",
  "Rocket Power",
  "The Wild Thornberrys",
  "Rugrats",
  "Dexter's Laboratory",
  "The Powerpuff Girls",
  "Ed, Edd n Eddy"
];

var cartoonBtn;

var newCartoon = "";

$(document).ready(function() {
  var makeButtons = function() {
    $("#gifButtons").empty();
    for (var i = 0; i < cartoons.length; i++) {
      button = $(
        `<button type="button" class="btn btn-info" id="cartoonBtns"  data-search="${cartoons[i]}">${cartoons[i]}</button>`
      );
      $("#gifButtons").append(button);
    }
  };

  // adding new buttons

  $("#addButton").submit(function(event) {
    event.preventDefault();
    var searchBar = $("#cartoonInput")
      .val()
      .trim();
    cartoons.push(searchBar);
    makeButtons();
  });
  makeButtons();

  $(document).on("click", "#cartoonBtns", function() {
    var searchItem = $(this).data("search");

    console.log(searchItem);
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      searchItem +
      "&api_key=13AaQy5ZjUsgBB2QuIhORlfE9ajog7CA&limit=10";
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        $("#gifArea").prepend(`
       <div class="col-4" id="theGifs"><div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${response.data[i].images.downsized.url}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text"> Rating: ${response.data[i].rating}</p>
        </div>
      </div></div>`);
      }
    });
  });
});
