// API KEY: IkUqnuOr2U0TMXYMPulxtaXuIwprxIoK

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