$( document ).ready(function() {
  logout();
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
