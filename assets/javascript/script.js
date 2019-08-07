// API KEY: IkUqnuOr2U0TMXYMPulxtaXuIwprxIoK

var CreatureList = ["Witch", "Selkie", "Unicorn", "Ghost"];

// Function for displaying movie data
function SpawnButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#ButtonHolder").empty();

    // Looping through the array of movies
    for (var i = 0; i < CreatureList.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var ButtonMaker = $("<button>");
        // Adding a class
        ButtonMaker.addClass("btn btn-danger");
        // Adding some light css.
        ButtonMaker.css("margin", "2px")
        // Adding a data-attribute with a value of the movie at index i
        ButtonMaker.attr("data-creature", CreatureList[i]);
        // Providing the button's text with a value of the movie at index i
        ButtonMaker.text(CreatureList[i]);
        // Adding the button to the HTML
        $("#ButtonHolder").append(ButtonMaker);
    }
}

      // This function handles events where one button is clicked
      $("#AddCreature").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var NewCreature = $("#MonsterInput").val().trim();
        // The movie from the textbox is then added to our array
        CreatureList.push(NewCreature);

        // calling renderButtons which handles the processing of our movie array
        SpawnButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of movies
      SpawnButtons();


$("button").on("click", function(){
    var creature = $(this).attr("data-creature");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + creature + "&api_key=IkUqnuOr2U0TMXYMPulxtaXuIwprxIoK&limit=10";
    

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
    
        console.log(response);

        var results = response.data

        for (var i=0; i < results.length; i++){
            var CreatureDiv = $("<div style='float:left;padding:10px'>");
            var CreatureImg = $("<img>");
            var Rating = results[i].rating;
            var RatingWriter = $("<p>").html("Rating: " + "<b>" + Rating + "</b>");
            CreatureImg.attr("src", results[i].images.fixed_height.url);
            CreatureDiv.prepend(CreatureImg);
            CreatureDiv.prepend(RatingWriter);
            $("#GifsHere").prepend(CreatureDiv);
        }
      });
});