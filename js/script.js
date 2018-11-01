$('.dropdown').on('change', function(event){
  $('.loading').css('display', 'flex');
  $('.api-loader').empty();
  $('.flex-container').addClass('select');
    var url = "https://api.nytimes.com/svc/topstories/v2/" + $('select').val() + ".json";
url += '?' + $.param({
  'api-key': "82f12f3e4189492f86578cb2d4e6add0"
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  let newsCount = 0; /* Replaced var with let */
  for(const i=0; i<result.results.length; i++) { /* replaced var with const */
    if (result.results[i].multimedia.length < 4) {
      continue;}
    $('.api-loader').append('<a target="_blank" href="'+result.results[i].url+'"><div class="news-item"><p> '+ result.results[i].abstract +' </p></div></a>').css('color', 'white');
    $('.news-item').last().css('background-image', 'url("'+result.results[i].multimedia[4].url+'")');
 newsCount++;
 if (newsCount>=12){
   break;
 }
  }
  $('.loading').css('display', 'none');
}).fail(function(err) {
  throw err;
});

});
