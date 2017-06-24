var topics=["dog","cat","turtle","cow","horse","elephant","lion"];

function renderButtons() {
  $("#button-holder").empty()
  for (var i=0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.text(topics[i]);
    newButton.attr("type", "button");
    newButton.attr("class", "animals");
    $("#button-holder").append(newButton);
  }
}

$("#add-animal").on("click", function(event) {
  event.preventDefault();
  
  var animal = $("#animal-input").val().trim();
  if (animal.length > 0) {
    topics.push(animal);
  }
  renderButtons();
});

$(document).on("click", ".animals", displayGifs);

$(document).on("click", ".animal-image", function () {

  if ($(this).attr("state") === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("state", "still");
  }
  
});

function displayGifs() {
  var q = $(this).text();

  var queryURL="http://api.giphy.com/v1/gifs/search?q=" +
    q + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    var data = response.data;
    console.log(data);
    $("#gif-holder").empty();
    for (var i = 0; i < data.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("image-div");

      var p = $("<p>");
      var str = "Rating: " + data[i].rating.toUpperCase();
      p.text(str);
      newDiv.append(p);
      var gif = $("<img>");
      gif.attr("src", data[i].images.fixed_height_still.url);
      gif.attr("data-still", data[i].images.fixed_height_still.url);
      gif.attr("data-animate", data[i].images.fixed_height.url)
      gif.attr("state", "still");
      gif.addClass("animal-image");
      newDiv.append(gif);
      $("#gif-holder").append(newDiv);
    }

  });

}

renderButtons();