$(document).ready(function() {

  // handler to orginize functions

var handlers = {

  // iterate through cities hash to return the individual cities
  // list_cities: function(cities){
  //   var table = $('#cities').find('tbody').empty();
  //   $.each(cities, function(index,city){
  //     var tr = $('<tr id="indv_city">').appendTo(table);
  //     $('<td>').text(city.name).data("name", city.name).appendTo(tr);
  //   });
  // }
  list_cities: function(cities){
    $.each(cities, function(index,city){

      $("#list").append($("<li>"+city.name+"</li>")
        .data("name", city.name)
      );

    });
  },
    show_forecast: function(forecast){
      $("#forecast").append("<li>"+forecast+"</li>");
    }
};

// ajax call to search for cities matching the search query on the submit event

  $("#search_form").on('submit',function(){

    // event.preventDefault();
      $.ajax({
          url: "http://autocomplete.wunderground.com/aq?query="+this.search.value,
          dataType: "jsonp",
          jsonp: "cb",
          data: "{}",
          success: function(data){
            var cities_search = data.RESULTS;
            handlers.list_cities(cities_search);
          },
          error: function(){
            console.log("Somthing went wrong");
          }
      });

    $("#list").on("click","li", function(){
      $.ajax({
        url: "http://api.wunderground.com/api/8be3128637e04c8c/forecast/q/"+$(this).data().name+".json",
        data: "{}",
        success: function(data){
          var forecast = data.forecast.simpleforecast.forecastday[0].high.celsius;
          handlers.show_forecast(forecast);
        },
        error: function(){
          console.log("hello");

        }
      });

    });
    return false;
  });
});
