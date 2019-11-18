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

    $(".devoured").on("click", function(event) {
      var id = $(this).data("id");
      var newDevoured = $(this).data("newdevoured");
  
      var newDevouredState = {
        devoured: newDevoured
      };
  

      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevouredState
      }).then(function(){
        console.log("changed devoured to", newDevoured);
        location.reload();
      });
    });
  
  });