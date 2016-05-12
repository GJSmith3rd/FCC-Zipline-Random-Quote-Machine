/* global $ */

$(document).ready(function () {

  var stopGoogleAds = false;

  switch (true) {
    //Remove Google Analytics Codepen - Run Google Ads
    case (/codepen/.test(location.hostname)):
      $.getScript('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
      break;
    default:
      //Remove Google Adsense and Google Github + Codepen Anaytics
      //Test for local dev network
      if (stopGoogleAds) {
        // Remove Adsense from DOM
        $('.adsense').remove();
      } else {
        $.getScript('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
      }
  }

  getData();

  $('#newQuote').click(function () {
    getData();
  });

});

function getData() {

  $.ajax({
    cache: true,
    type: 'POST',
    crossDomain: true,
    url: 'http://api.forismatic.com/api/1.0/',
    data: {
      method: 'getQuote',
      format: 'jsonp',
      lang: 'en'
    },
    dataType: 'jsonp',
    jsonp: 'jsonp',
    jsonpCallback: 'updateHTML'
  });

}

function updateHTML(res) {

  $('#quote').text(res.quoteText);
  $('#author').text(res.quoteAuthor);
  $('#link').attr('href', res.quoteLink);

  var combinedQuote = res.quoteAuthor + ' - ' + res.quoteText;

  if (combinedQuote.length > 140) {

    $('#tweetDiv').empty();

  } else {

    $('#tweetDiv').empty();
    var tweetA = '<a id="tweet" class="btn btn-default btn-xs btn-success" ';
    tweetA += 'href="https://twitter.com/intent/tweet?text=' + combinedQuote.replace(/ /g, '+');
    tweetA += '" target="_blank" class="col-xs-6" role="button">Tweet</a>';
    $('#tweetDiv').append(tweetA);
    $.getScript('https://platform.twitter.com/widgets.js');

  }

}
