'use strict';

(() => {
  hideLogIn();
  hideAcc();
  hideOAuth();

  function hideLogIn() {
    $('#log').click(() => {
      $('#info').toggleClass('hidden');
    });
    $('#login').on('hide.bs.modal', () => {
      $('#info').toggleClass('hidden');
    });
  }
  function hideAcc() {
    $('#acc').click(() => {
      $('#info').toggleClass('hidden');
    });
    $('#newUser').on('hide.bs.modal', () => {
      $('#info').toggleClass('hidden');
    });
  }
  function hideOAuth() {
    $('#oAuth').click(() => {
      $('#info').toggleClass('hidden');
    });
    $('#oauth').on('hide.bs.modal', () => {
      $('#info').toggleClass('hidden');
    });
  }

  $('#userLogin').click((event) => {
    event.preventDefault();
    const email = $('#username').val();
    const password = $('#password').val();
    const data = {
      email: email,
      password: password
    };
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
        console.log($xhr.responseText);
      })
  });
})();
