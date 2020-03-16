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
    searchBar = $("#cartoonInput").val("");
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
        <img class="card-img-top gif" src="${response.data[i].images.fixed_height_still.url}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text"> Rating: ${response.data[i].rating}</p>
        </div>
      </div></div>`);
      }

      $("#gifArea").on("click", ".gif", function() {
        var src = $(this).attr("src");
        if ($(this).hasClass("playing")) {
          //stop
          $(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
          $(this).removeClass("playing");
        } else {
          //play
          $(this).addClass("playing");
          $(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
        }
      });
    });
  });
});
