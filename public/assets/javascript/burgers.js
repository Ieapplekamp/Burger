$(function() {
  
    $("#submitButton").on("click", function(event) {
      // preventDefault
      event.preventDefault();

      var newBurger = {
          burger_name: $("#burgerNew").val().trim(),
          devoured: 0
      };

      // Send the POST request
      $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
      }).then(
          function() {
              console.log("created new burger");
              // Reload the page to get the updated list
              location.reload();
          }
      );
    });

    $(".change-devour").on("click", function(event) {
      var id = $(this).data("id");
      var newDevour = $(this).data("newdevour");
  
      var newDevourState = {
        devoured: newDevour 
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevourState
      }).then(() => {
        console.log("changed devour to", newDevour);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
  });