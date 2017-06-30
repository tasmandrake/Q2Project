$(document).ready(() => {
  logout();
  const sharedOptions = {
    contentType: 'application/json',
    type: 'GET',
    url: '/notes',
    headers: {
      userid: 0
    }
  };
  $.ajax(sharedOptions)
    .done((data) => {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const descrip = d.description;
        const id = d.id;
        const img = d.img;
        const noteTitle = d.note_title;
        const vidTitle = d.video_title;
        const vidUrl = d.video_url;
        const $sharedVidsRow = $('#sharedvidsrow');
        makeNoteCards(id, noteTitle, img, descrip, vidTitle, vidUrl, $sharedVidsRow);
      }
    });

  $('[data-toggle="tooltip"]').tooltip();

  $.getJSON('/notes')
    .done((data) => {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const descrip = d.description;
        const id = d.id;
        const img = d.img;
        const noteTitle = d.note_title;
        const vidTitle = d.video_title;
        const vidUrl = d.video_url;
        const $myVidsRow = $('#myvidsrow');
        makeNoteCards(id, noteTitle, img, descrip, vidTitle, vidUrl, $myVidsRow);
      }
    })
    .fail($xhr => console.error($xhr));

  function makeNoteCards(id, panelTitle, img, description, videoTitle, videoUrl, $row) {
    const $panel = $("<div class='panel panel-default'></div>");
    const $panelHead = $("<div class='panel-heading pHead text-center'>");
    const $panelBody = $("<div class='panel-body'>");
    const $panelImg = $("<img class = 'img-responsive center-block panelImg'>");
    const $panelDes = $("<p class='descript'></p>");
    const $a = $("<a class='titlea' href='#'></a>");

    $panel.attr({
      'data-noteid': id,
      'data-videoUrl': videoUrl,
      'data-description': (description)
    });

    $a.attr({
      'title': videoTitle,
      'data-placement': 'top',
      'data-toggle': 'tooltip'
    });

    videoTitle = $.trim(videoTitle)
      .substring(0, 25)
      .split(' ')
      .slice(0, 25)
      .join(' ') + '...';

    $a.text(videoTitle);
    $panelImg.attr('src', img);
    $panelHead.append($a);
    $panelDes.text(description);

    $panel.append($panelHead);
    $panel.append($panelBody);
    $panelBody.prepend($panelImg);
    $row.append($panel);
    $('[data-toggle="tooltip"]').tooltip();
  }

  function makeCard(title, img, id, description, live) {
    const $panel = $("<div class='panel panel-default'></div>");
    const $panelHead = $("<div class='panel-heading pHead text-center'>");
    const $panelBody = $("<div class='panel-body'>");
    const $panelRow = $('#panelRow');
    const $panelImg = $("<img class = 'img-responsive center-block panelImg'>");
    const $a = $("<a class='titlea' href='#'></a>");

    $panel.append($panelHead);
    $panel.attr({
      'data-id': id,
      'data-live': live,
      'data-description': description,
      'data-img': img,
      'data-title': title
    });

    $a.attr({
      'title': title,
      'data-placement': 'top',
      'data-toggle': 'tooltip'
    });

    title = $.trim(title)
      .substring(0, 25)
      .split(' ')
      .slice(0, 25)
      .join(' ') + '...';

    $a.text(title);
    $panelHead.append($a);
    $panelBody.append($panelImg);
    $panel.append($panelBody);
    $panelImg.attr('src', img);
    $panelRow.append($panel);
    $('[data-toggle="tooltip"]').tooltip();
  }

  $('form').submit((event) => {
    $('#panelRow').children().remove();
    event.preventDefault();
    const text = $('#search').val().replace(' ', '+');
    if (text.length > 0) {
      const $xhr = $.getJSON('https://www.googleapis.com/youtube/v3/search/?part=snippet&q=' + text + '&maxResults=12&key=AIzaSyDfn1macKBkdTwflQ2VdPvZ-0EblTF8z-c');
      $xhr.done((data) => {
        const vids = data.items;
        if ($xhr.status !== 200) {
          return;
        } else {
          for (let i = 0; i < vids.length; i++) {
            const title = vids[i].snippet.title;
            const img = vids[i].snippet.thumbnails.medium.url;
            const id = vids[i].id.videoId;
            const description = vids[i].snippet.description;
            let live = false;
            if (vids[i].snippet.liveBroadcastContent === 'live') {
              live = true;
            }

            makeCard(title, img, id, description, live);
          }
        }
      });
      $xhr.fail((err) => {
        console.error(err);
      });
    }
  });

  $('#sharedvidsrow').click((e) => {
    const element = $(e.target).closest('.panel');
    const vidId = element.data('videourl');
    const noteId = element.data('noteid');
    window.location.href = 'notes.html?id=' + vidId + '&noteId=' + noteId + '&user=' + 0;
  });

  $('#myvidsrow').click((e) => {
    const element = $(e.target).closest('.panel');
    const vidId = element.data('videourl');
    const noteId = element.data('noteid');
    const description = element.data('description');
    window.location.href = 'notes.html?id=' + vidId + '&noteId=' + noteId + '&description=' + description;
  });


  $('#panelRow').click((e) => {
    const element = $(e.target).closest('.panel');
    const id = element.data('id');
    const title = element.data('title');
    const live = element.data('live');
    const description = element.data('description');
    const img = element.data('img');
    const data = {
      video_url: id,
      img,
      title,
      description
    };
    const options = {
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      type: 'POST',
      url: '/videos'
    };

    $.ajax(options).done(() => {
      window.location.href = 'notes.html?id=' + id + '&live=' + live;
    });
  });

  $('.btn').click(() => {
    $('#resultspg').fadeIn();
    $('.btn').css('background', 'rgb(220,212,175)');
    $('.btn').css('color', 'black');
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
