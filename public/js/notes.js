$(document).ready(() => {
  logout();

  function findNotes() {
    const hardTag = new Promise((resolve) => {
      window.setTimeout(() => {
        resolve($('.cke_wysiwyg_frame')
          .contents()
          .children()
          .children('body'));
      }, 3000);
    });
    return hardTag;
  }
  findNotes()
    .then((done) => {
      const query = {};
      window.location.href.split('?')[1]
        .split('&')
        .map((e) => {
          const kv = e.split('=');
          query[kv[0]] = kv[1];
        });
      if (!query.noteId) {
        const videoOptions = {
          contentType: 'application/json',
          type: 'GET',
          url: '/videos/url?vidurl=' + query.id
        };
        $.ajax(videoOptions).done((data) => {
          if (data[0].note_file) {
            $('.cke_wysiwyg_frame')
              .contents()
              .children()
              .children('body')
              .html(data[0].note_file);
            $('#right').attr('data-noteid', data[0].notesId);
          } else {
            const noteData = {
              video_id: data[0].vidId,
              note_file: $('.cke_wysiwyg_frame')
                .contents()
                .children()
                .children('body')
                .html()
            };
            const input = {
              contentType: 'application/json',
              data: JSON.stringify(noteData),
              dataType: 'json',
              type: 'POST',
              url: '/notes'
            };
            $.ajax(input)
              .done((returning) => {
                $('#right').attr('data-noteid', returning[0].id);
              })
              .catch(error => console.error(error));
          }
        });
        done.keydown((e) => {
          if (e.which === 13) {
            const time = player.getCurrentTime();
            $($('.cke_wysiwyg_frame')
                .contents()
                .children()
                .children('body')
                .children()
                .last()
                .prev())
                .attr('data-time', time);
            $($('.cke_wysiwyg_frame')
                .contents()
                .children()
                .children('body')
                .children()
                .last()
                .prev())
                .addClass('time');

            const data = {
              note_file: $('.cke_wysiwyg_frame')
                .contents()
                .children()
                .children('body')
                .html()
            };
            const notesOptions = {
              contentType: 'application/json',
              data: JSON.stringify(data),
              dataType: 'json',
              type: 'PATCH',
              url: '/notes/' + $('#right').data('noteid')
            };
            $.ajax(notesOptions)
              .done()
              .catch(error => console.error(error));
          }
        });
      } else if (query.noteId) {
        const getOptions = {
          contentType: 'application/json',
          type: 'GET',
          url: '/notes/' + query.noteId
        };
        if (query.user === '0') {
          getOptions.headers = { userid: 0 };
        }
        $.ajax(getOptions).done((data) => {
          const noteData = data[0].note_file;

          $('.cke_wysiwyg_frame')
            .contents()
            .children()
            .children('body')
            .html(noteData);
        })
        .catch(err => console.error(err));

        done.keydown((e) => {
          if (e.which === 13) {
            const time = player.getCurrentTime();
            $($('.cke_wysiwyg_frame')
                .contents()
                .children()
                .children('body')
                .children()
                .last()
                .prev())
                .attr('data-time', time);
            $($('.cke_wysiwyg_frame')
                .contents()
                .children()
                .children('body')
                .children()
                .last()
                .prev())
                .addClass('time');

            const data = {
              note_file: $('.cke_wysiwyg_frame')
                .contents()
                .children()
                .children('body')
                .html()
            };
            const notesOptions = {
              contentType: 'application/json',
              data: JSON.stringify(data),
              dataType: 'json',
              type: 'PATCH',
              url: '/notes/' + query.noteId
            };
            $.ajax(notesOptions)
              .done()
              .catch(error => console.error(error));
          }
        });
      }

      done.click((e) => {
        const $tag = $(e.target).closest('.time').attr('data-time');
        const time = Math.round($tag);
        if (time) {
          player.seekTo(time, true).playVideo();
        }
      });
    });

  $('#share').click(() => {
    const query = {};
    window.location.href.split('?')[1]
      .split('&')
      .map((e) => {
        const kv = e.split('=');
        query[kv[0]] = kv[1];
      });
    const videoOptions = {
      contentType: 'application/json',
      type: 'GET',
      url: '/videos/url?vidurl=' + query.id
    };
    $.ajax(videoOptions).done((data) => {
      const shareData = {
        note_file: $('.cke_wysiwyg_frame')
          .contents()
          .children()
          .children('body')
          .html(),
        user_id: 0,
        video_id: data[0].vidId,
      };
      const sharePost = {
        contentType: 'application/json',
        data: JSON.stringify(shareData),
        dataType: 'json',
        type: 'POST',
        url: '/notes'
      };
      $.ajax(sharePost)
        .done(() => toasts('Your video has been shared'))
        .catch(error => console.error(error));
    });
  });

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
    });
  }

  $(window).on('load', () => {
    const viewportWidth = $(window).width();
    if (viewportWidth < 1199) {
      $('#left').addClass('col-xs-offset-1');
    }
  });

  $(window).resize(() => {
    const viewportWidth = $(window).width();
    if (viewportWidth < 1199) {
      $('#left').addClass('col-xs-offset-1');
    } else if (viewportWidth > 1199) {
      $('#left').removeClass('col-xs-offset-1');
    }
  });

  function toasts(message) {
    const $snackbar = $('#snackbar');
    $snackbar.text(message);
    $snackbar.addClass('show');
    setTimeout(() => {
      $snackbar.toggleClass('show');
    }, 3000);
  }
});
