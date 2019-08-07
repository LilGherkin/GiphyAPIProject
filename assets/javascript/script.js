$(document).ready(function(){

    // API KEY: IkUqnuOr2U0TMXYMPulxtaXuIwprxIoK
    //Initial starting creatures
    var CreatureList = ["Witch", "Selkie", "Unicorn", "Ghost"];
    
    // Function that creates all move buttons
    function SpawnButtons() {
    
        // Deletes buttons to preven duplicates
        $("#ButtonHolder").empty();
    
        // Looping through CreatureList
        for (var i = 0; i < CreatureList.length; i++) {
    
            // Dynamically generate buttons
            var ButtonMaker = $("<button>");
            // Adding a class
            ButtonMaker.addClass("btn btn-danger");
            // Adding some light css.
            ButtonMaker.css("margin", "2px")
            // Adding a data-attribute with a value of the creature at index i
            ButtonMaker.attr("data-creature", CreatureList[i]);
            // Providing the button's text with a value of the movie at index i
            ButtonMaker.text(CreatureList[i]);
            // Adding the button to the HTML
            $("#ButtonHolder").append(ButtonMaker);
        }
    }
    
    // This function handles events where one button is clicked. For some reason, it prevents all other buttons from working once clicked however. Reinvestigate later.
    $("#AddCreature").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
    
        // Grabs text from the monster input box.
        var NewCreature = $("#MonsterInput").val().trim();
        //Pushes to our list of creatures
        CreatureList.push(NewCreature);
    
        // Calls the render/spawn
        SpawnButtons();
    });
    
    // Render initial buttons on load.
    SpawnButtons();
    
    $(".GIF").on("click", function() {
        console.log(data-state);
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state" , "animate");    
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        };
    });
    
    
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
                CreatureImg.attr({
                    "src": results[i].images.fixed_height_still.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "still"
                });
                CreatureImg.addClass("GIF")
                CreatureDiv.prepend(CreatureImg);
                CreatureDiv.prepend(RatingWriter);
                $("#GifsHere").prepend(CreatureDiv);
            }
          });
    });
    
});