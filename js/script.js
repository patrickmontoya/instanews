
$('select').on('change', function() {
    
    console.log('test');
    var url = "https://api.nytimes.com/svc/topstories/v2/" + $('select').val() + ".json";
url += '?' + $.param({
  'api-key': "82f12f3e4189492f86578cb2d4e6add0"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
    $('api-loader').append('<p> '+ result.results[0].abstract +' </p>')
  console.log(url);
  alert(url);
}).fail(function(err) {
  throw err;
});
});