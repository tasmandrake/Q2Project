(function (){
  $('.touch').click(function(event){
    event.preventDefault();
    const email= $('#username').val();
    const password = $('#password').val();

    // if(!username){
    //   //return toast
    // }
    // if(!password){
    //   //return toast
    // }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({email: email, password: password}),
      dataType: 'json',
      type: 'POST',
      url: '/token'
    }

    $.ajax(options)
      .done((data) => {
        window.location.href = '/login.html';
      })
      .fail(($xhr) => {
        console.log('fail');
        // Materialize.toast($xhr.responseText, 3000);
    });
  });
})();
