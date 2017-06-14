$(document).ready(() => {
  logout();

  let index = 0;

  function findNotes() {
    const hardTag = new Promise((resolve) => {
      window.setTimeout(() => {
        resolve($('.cke_wysiwyg_frame').contents().children().children('body'));
      }, 1000);
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
          if (data[0].notesId) {
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
            let time = player.getCurrentTime();
            if (query.live === 'true') {
              time = player.getDuration();
            }
            $($('.cke_wysiwyg_frame')
                .contents()
                .children()
                .children('body')
                .children()[index])
              .attr('data-time', time);
            index++;

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
                .children()[index])
              .attr('data-time', time);
            index++;

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
      } else {
        done.keydown((e) => {
          if (e.which === 13) {
            const time = player.getCurrentTime();
            $($('.cke_wysiwyg_frame')
                .contents()
                .children()
                .children('body')
                .children()[index])
              .attr('data-time', time);
            index++;

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
            $.ajax(notesOptions).done().catch((error) => {
              console.error(error);
            });
          }
        });
      }

      done.click((e) => {
        const $tag = $(e.target).attr('data-time');
        const time = Math.round($tag);
        if (time) {
          player.seekTo(time, true).playVideo();
        }
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
});
