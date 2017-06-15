$(document).ready(() => {
  hideLogIn();
  hideAcc();
  login();
  newUser();

  $('a').tooltip();

  function login() {
    $('#userLogin').click((event) => {
      event.preventDefault();
      const email = $('#username').val();
      const password = $('#password').val();
      const data = { email, password };
      const options = {
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        type: 'POST',
        url: '/token'
      };

      if (!email) {
        return toasts('Please enter your email');
      } else if (!password) {
        return toasts('Please enter your password');
      }
      $.ajax(options)
        .done(() => {
          window.location.href = '/userhub.html';
        })
        .fail(($xhr) => {
          return toasts($xhr.responseText);
        });
    });
  }

  function newUser() {
    $('#newAccount').click((event) => {
      event.preventDefault();
      const email = $('#newUsername').val();
      const password = $('#newPassword').val();
      const first_name = $('#first_name').val();
      const last_name = $('#last_name').val();
      const username = $('#newUsername').val();
      const data = {
        first_name,
        last_name,
        email,
        username,
        password
      };
      const options = {
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        type: 'POST',
        url: '/users'
      };

      if (!email) {
        return toasts('Please enter your email');
      } else if (!password) {
        return toasts('Please enter a password');
      } else if (!first_name) {
        return toasts('Please enter your first name');
      } else if (!last_name) {
        return toasts('Please enter your last name');
      } else if (!username) {
        return toasts('Please enter a username');
      }
      $.ajax(options)
        .done(() => {
          window.location.href = '/userhub.html';
        })
        .fail(($xhr) => {
          return toasts($xhr.responseText);
        });
    });
  }

  function toasts(message) {
    const $snackbar = $('#snackbar');
    $snackbar.text(message);
    $snackbar.addClass('show');
    setTimeout(() => {
      $snackbar.toggleClass('show');
    }, 3000);
  }

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
});
