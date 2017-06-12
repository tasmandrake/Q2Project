
$(document).ready(function() {

  var clicked = 0;
  // var time = timeConvert(player.getCurrentTime());

  function timeConvert (time){
    if (time > 60){
      minutes = Math.floor(time / 60);
      seconds = time % 60;
    }
    if (seconds < 10){
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

  $("#notes").keyup(function() {
    if (clicked === 0){
      // alert("Key press detected!");
      clicked = 1;
      $("#middle").append(timeConvert(player.getCurrentTime()));
      // $(this).data(time);
      // $('input:textbox').val("new-text-message");
    }else if(clicked > 0){
    //do nothing
    }
  });

  $("#notes").keyup(function(e){
    if(e.keyCode == 13){
      // alert("Enter detected!");
      clicked = 0;
    }
  });

  // player.getCurrentTime():Number;
});
