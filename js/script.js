function getUrl(section) {
  var url = "https://api.nytimes.com/svc/topstories/v2/" + section + ".json";
  url +=
    "?" +
    $.param({
      "api-key": "82f12f3e4189492f86578cb2d4e6add0"
    });
  return url;
}
$(function() {
  $(".dropdown").on("change", function(event) {
    $(".loading").css("display", "flex");
    $(".api-loader").empty();
    $(".flex-container").addClass("select");

    $.ajax({
      url: getUrl($("select").val()),
      method: "GET"
    })
      .done(function(data) {
        let newsCount = 0;
        const results = data.results;
        for (let i = 0; i < results.length; i++) {
          let result = data.results[i];
          if (result.multimedia.length < 4) {
            continue;
          }
          $(".api-loader")
            .append(
              '<a target="_blank" href="' +
                result.url +
                '"><div class="news-item"><p> ' +
                result.abstract +
                " </p></div></a>"
            )
            .css("color", "white");
          $(".news-item")
            .last()
            .css("background-image", 'url("' + result.multimedia[4].url + '")');
          newsCount++;
          if (newsCount >= 12) {
            break;
          }
        }
        $(".loading").css("display", "none");
      })
      .fail(function(err) {
        throw err;
      });
  });
});
