$( document ).ready(function() {
  logout();

  // var options = {
  //   contentType: 'application/json',
  //   data: JSON.stringify(data),
  //   dataType: 'json',
  //   type: 'GET',
  //   url: '/notes'
  // }

  $.getJSON('/notes')
  .done((data)=>{
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let d = data[i];
      let descrip = d.description;
      let id = d.id;
      let img = d.img;
      let noteTitle = d.note_title;
      let vidTitle = d.video_title;
      let vidUrl = d.video_url;
      makeNoteCards(id, noteTitle, img, descrip, vidTitle, vidUrl);
    }
  })
  .fail(($xhr)=>{
    console.log('fail');
  });

  function makeNoteCards(id, panelTitle, img, description, videoTitle, videoUrl, title){

    //elements
    let $myVidsRow = $('#myvidsrow');
    let $col = $("<div class=' col-xs-12'></div>");
    let $panel = $("<div class='panel panel-default'></div>");
    let $panelHead = $("<div class='panel-heading'>");
    let $panelBody = $("<div class='panel-body'>");
    let $panelImg = $("<img class = 'img-responsive center-block'>");

    //text
    $panel.attr({
      'data-noteid': id,
      'data-videoUrl': videoUrl,
      'data-description': btoa(description)
    });
    $panelImg.attr('src', img)
    $panelHead.text(panelTitle);
    $panelBody.text(description);

    //appending
    $col.append($panel);
    $panel.append($panelHead);
    $panel.append($panelBody);
    $panelBody.prepend($panelImg);
    $myVidsRow.append($col);
  }

  function makeCard(title, img, id, description, live){

    //elements
    let $col = $("<div class=' col-xs-6'></div>");
    let $panel = $("<div class='panel panel-default'></div>");
    let $panelHead = $("<div class='panel-heading'>");
    let $panelBody = $("<div class='panel-body'>");
    let $panelRow = $('#panelRow');
    let $panelImg = $("<img class = 'img-responsive center-block'>");
    let $hidden = $("<div class='urlContainer'></div");

    //appending the panels
    $hidden.text(id);
    $panel.append($panelHead);
    // $panel.data('id',id);
    $panel.attr({
      'data-id': id,
      'data-live': live,
      'data-description': description,
      'data-img': img,
      'data-title': title
    });

    $panelHead.text(title);
    $panelBody.append($panelImg);
    $panelBody.append($hidden);
    $panel.append($panelBody);
    $panelImg.attr("src", img);
    $col.append($panel);
    $panelRow.append($col);
  }

  $('form').submit(function(event){
    event.preventDefault();
    var text = $('#search').val().replace(' ', "+");
    if(text.length > 0){
      var $xhr = $.getJSON('https://www.googleapis.com/youtube/v3/search/?part=snippet&q='+text+'&maxResults=10&key=AIzaSyC0b4jxH6E1DbtJm3S_ZOZx5ahcOmthPDk');
      $xhr.done(function(data){
        console.log(data)
        let vids = data.items;
        if ($xhr.status !== 200){
            return;
        }
        else {
          var resultbox = $('#results');
          for (let i = 0; i < vids.length; i++) {
            var title = vids[i].snippet.title;
            var img = vids[i].snippet.thumbnails.medium.url;
            var id = vids[i].id.videoId;
            var description = vids[i].snippet.description;
            var live = false;
            if(vids[i].snippet.liveBroadcastContent === 'live'){
              live = true;
            }

            makeCard(title, img, id, description, live);
          }
        }
      });//end outer done
      $xhr.fail(function(err) {
          console.log(err);
      });//fail
    }
  });//end submit

  $('#myvids').click(function(e){
    let element = $(e.target).closest('.panel');
    let vidId = element.data('videourl');
    let noteId =  element.data('noteid');
    let description = element.data('description');
    let img = element.data('img');
    let title = element.data('title');
    console.log(e.target);
    window.location.href = 'notes.html?id=' + vidId + '&noteId=' + noteId + '&description=' + description;
  });//end panelRow Click


  $('#panelRow').click(function(e){
    console.log($(e.target).closest('.panel'));
    let element = $(e.target).closest('.panel')
    let id = element.data('id');
    let title = element.data('title');
    let live = element.data('live');
    let description = element.data('description');
    let img = element.data('img');
    let data = {
      video_url: id,
      img: img,
      title: title,
      description: description
    }
    let options = {
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      type: 'POST',
      url: '/videos'
    }
    $.ajax(options).done((data)=>{
      console.log('notes.html?id=' + id +'&live=' + live)
      window.location.href = 'notes.html?id=' + id +'&live=' + live;
    })

  });//end panelRow Click

  $(".btn").click(function (){
    $("#resultspg").fadeIn();
    $(".btn").css("background", "rgb(220,212,175)");
    $(".btn").css("color", "black");
  });//end click to show results label

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
