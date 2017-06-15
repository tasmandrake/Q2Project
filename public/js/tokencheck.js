checkToken();

function checkToken() {
  const options = {
    contentType: 'application/json',
    type: 'GET',
    url: '/token'
  };
  $.ajax(options)
    .done((data) => {
      if (!data) {
        window.location.href = '/index.html';
      }
    })
    .fail(() => {
      window.location.href = '/index.html';
    });
}
