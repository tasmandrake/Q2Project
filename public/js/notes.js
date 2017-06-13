$( document ).ready(function() {
  logout();

  // console.log($('.cke_wysiwyg_frame').contents().document)
  // var suck = $('.cke_wysiwyg_frame').contents().children().children()[1]
  //
  // suck.keypress((event)=>{
  //   console.log(event.which)
  // })
  // $('body').keypress((e)=>{
  //   console.log(e.which);
  // })

  // console.log(document.getElementsByTagName('iframe')[1].contentDocument.getElementsByTagName('body')[0])


  // setTimeout(function(){
  //   $('.cke_wysiwyg_frame').contents().children().children()[1].keypress((event)=>{
  //     console.log(event.which)
  //   })

    // $('.cke_wysiwyg_framer').load('notes.html', function(){
    //   console.log('try')
    // });

    //console.log($('.cke_wysiwyg_frame').contents().children().children('body').children().get(0))

    // console.log(document.getElementsByTagName('iframe')[1].contentDocument.getElementsByTagName('body')[0].children)
  //},5000)

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
