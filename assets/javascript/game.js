//Declare variable topics as an array of strings
var topics = ["Hulk", "Spider-Man", "Vision", "Iron-Man", "Wolverine"];
//Function to display information from giphy api
function displayInfo() {
	$("#heroView").empty();
	var hero = $(this).attr("data-name");
	var api = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: api,
		method: "GET"
	}).done(function(response) {
		var results = response.data;
        //Loop to get 10 still gifs 
        for (var i = 0; i < 10; i++) {
        	var gifDiv = $("<div class='item'>");
        	var rating = results[i].rating;
        	var p = $("<p>").text("Rating: " + rating);
        	var heroImage = $("<img class='pause'>");
        	heroImage.attr({
        		src: results[i].images.fixed_height_still.url,
        		"data-still": results[i].images.fixed_height_still.url,
        		"data-animate": results[i].images.fixed_height.url,
        		"data-state": "still",
        	});
        	gifDiv.append(p);
        	gifDiv.append(heroImage);
        	gifDiv.addClass("gifs");
        	$("#heroView").prepend(gifDiv);
        }
        //On mouse click gif will animate. If clicked again image will pause. 
        $(".pause").on("click", function() {
        	var state = $(this).attr("data-state");
        	if (state == "still") {
        		$(this).attr("src", $(this).data("animate"));
        		$(this).attr("data-state", "animate");
        	} else {
        		$(this).attr("src", $(this).data("still"));
        		$(this).attr("data-state", "still");
        	}
        })
    })
}
//Render buttons
function renderButtons() {
	$("#buttonsView").empty();
	$.each(topics, function(index, element) {
		var button = $("<button/>").addClass("hero").attr("data-name", element).text(element);
		$("#buttonsView").append(button);
	});
};
$("#addHero").on("click", function() {
	var hero = $("#hero-input").val().trim();
	topics.push(hero);
	renderButtons();
        //Clear hero input after submit hero
        $("#hero-input").val("");
        return false;
    })
    //When load page
    $(document).on("click", ".hero", displayInfo);
    renderButtons();