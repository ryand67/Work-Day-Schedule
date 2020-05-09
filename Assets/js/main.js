$(document).ready(function() {
    //Grabs the date based on the number returned from the getDay/etc methods
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //Creates new Date object and formats the top of the page 
    var dateVar = new Date();
    $("#currentDay").text(weekdays[dateVar.getDay()] + ", " + month[dateVar.getMonth()] + " " + dateVar.getDate());
    //For every block, set the value to the local storage for the associated block
    $(".description").each(function() {
        $(this).val(localStorage.getItem("event" + $(this).attr("data-hour")));
    })
    //Timer compares current hour vs the associated block hour and assigns the past present/future class appropriately.  Removes any other classes that may have been assigned at another hour.  Updates every second. New date variable that's consisitenly updated.
    function startTimer() {
        var interval = setInterval(function() {
            var dateVar2 = new Date();
            $(".description").each(function(){
                var currentHour = parseInt($(this).attr("data-hour"));
                if(currentHour < dateVar2.getHours()) {
                    $(this).removeClass("future");
                    $(this).removeClass("present");
                    $(this).addClass("past");
                } else if(currentHour > dateVar2.getHours()) {
                    $(this).removeClass("present");
                    $(this).removeClass("past");
                    $(this).addClass("future");
                } else if(currentHour === dateVar2.getHours()) {
                    $(this).removeClass("future");
                    $(this).removeClass("past");
                    $(this).addClass("present");
                }
            })
        }, 1000)
    }
    //Assigns on click to every button, saves the textarea text to the conveinince variable calEvent and then sets the associated local storage space
    $(".btn").on("click", function() {
        var calEvent = $(this).siblings(".description").val(); 
        localStorage.setItem("event" + $(this).siblings(".description").attr("data-hour"), calEvent);
    })  
    //Stars the timer to keep the calendar colors updated
    startTimer();
})