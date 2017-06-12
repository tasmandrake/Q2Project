'use strict';

(() => {
  $('#userLogin').click((event) => {
    event.preventDefault();
    const email = $('#username').val();
    const password = $('#password').val();
    const data = {
      email: email,
      password: password
    };
    // if(!username){
    //   //return toast
    // }
    // if(!password){
    //   //return toast
    // }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      type: 'POST',
      url: '/token'
    };

    $.ajax(options)
      .done((jsonData) => {
        window.location.href = '/userhub.html';
      })
      .fail(($xhr) => {
        // Materialize.toast($xhr.responseText, 3000);
    });
  });

  $('#newAccount').click((event) => {
    event.preventDefault();
    const email = $('#newUsername').val();
    const password = $('#newPassword').val();
    const first_name = $('#first_name').val();
    const last_name = $('#last_name').val();
    const username = $('#newUsername').val();
    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      username: username,
      password: password
    };
    // if(!username){
    //   //return toast
    // }
    // if(!password){
    //   //return toast
    // }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      type: 'POST',
      url: '/users'
    }
    $.ajax(options)
      .done((jsonData) => {
        window.location.href = '/userhub.html';
      })
      .fail(($xhr) => {
        // Materialize.toast($xhr.responseText, 3000);
    });
  });
})();
