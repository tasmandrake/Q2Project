$( document ).ready(function() {

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
  })

  function makeNoteCards(id, panelTitle, img, description, videoTitle, videoUrl){

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
      'data-videoUrl': videoUrl
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

  function makeCard(title, img, id){

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
    $panel.data('id',id);
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
        let vids = data.items
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
            makeCard(title, img, id);
          }
        }
      });//end outer done
      $xhr.fail(function(err) {
          console.log(err);
      });//fail
    }
  });//end submit

  $('#myvids').click(function(e){
    let vidId = $(e.target).closest('.panel').data('videourl');
    let noteId =  $(e.target).closest('.panel').data('noteid');
    console.log(e.target);
    window.location.href = 'notes.html?id=' + vidId + '&noteId=' + noteId ;
  });//end panelRow Click



  $('#panelRow').click(function(e){
    var id = $(e.target).closest('.panel').data('id');
    window.location.href = 'notes.html?id=' + id;
  });//end panelRow Click
});
