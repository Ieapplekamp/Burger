$(function() {
  
    $("#submitButton").on("click", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burgerNew").val().trim(),
            devoured: 0
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            location.reload();
        });
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
            location.reload();
        });
    });

    $(".deleteBurger").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        var newDevoured = $(this).data("throwaway");

        var newDevouredState = {
            devoured: newDevoured
        };

        $.ajax('/api/burgers/' + id, {
            type: 'DELETE',
            data: newDevouredState
        }).then(function() {
            location.reload();
        });
    });
  
});