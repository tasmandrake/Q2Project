$(document).ready(function() {
  logout();

  var clicked = 0;


  $("#notes").keyup(function() {
    if (clicked === 0){
      // alert("Key press detected!");
      clicked = 1;
      //console.log(player.getCurrentTime());
      $("#middle").append(player.getCurrentTime());
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
  function logout() {
    $('#logout').click(() => {
      const options = {
        contentType: 'application/json',
        type: 'DELETE',
        url: '/token'
      };
      $.ajax(options)
        .done(() => {
          window.location.href = '/index.html';
        });
    })
  }
});
