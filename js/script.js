
$('select').on('change', function() {
$('.flex-container').addClass('select');
$('.api-loader').empty();

    console.log('test');
    var url = "https://api.nytimes.com/svc/topstories/v2/" + $('select').val() + ".json";
url += '?' + $.param({
  'api-key': "82f12f3e4189492f86578cb2d4e6add0"
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  for(var i=0; i<12; i++) {
    $('.api-loader').append('<a href="'+result.results[i].url+'"><div class="news-item"><p> '+ result.results[i].abstract +' </p></div></a>').css('color', 'white');
    $('.news-item').last().css('background-image', 'url("'+result.results[i].multimedia[4].url+'")');
  }
  console.log(url);
}).fail(function(err) {
  throw err;
});
});