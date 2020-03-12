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
        `<button type="button" class="btn btn-info"  data-search="${cartoons[i]}">${cartoons[i]}</button>`
      );
      $("#gifButtons").append(button);
    }
  };
  makeButtons();
});
