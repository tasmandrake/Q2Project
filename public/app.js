// $( document ).ready(function() {
//     //console.log( "ready!" );g
// });

(function (){
  $('#search').on('click', function(event){
    event.preventDefault();
    var request = gapi.client.youtube.search.list({
      part: "snippit",
      type: "video",
      q: encodeURIComponent$(('#search').val()).replace(/%20/g, "+"),
      maxResults: 3,
      order: "viewCount",
    });
    request.execute(function(response){
      console.log(response);
    });
  });
});

function init() {
  gapi.client.setApiKey('AIzaSyC0b4jxH6E1DbtJm3S_ZOZx5ahcOmthPDk');
  gapi.client.load('youtube', 'v3', function(){
    //ytapi is ready
  })
}
