/* global $ */
$(document).ready(function() {
  getData();

  $('#newQuote').click(function() {
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

  console.log(combinedQuote + res.quoteLink);
  console.log(combinedQuote.length + res.quoteLink.length - 13);

  if (combinedQuote.length + res.quoteLink.length - 13 >= 140) {

    console.log('>=140');
    $('#tweetDiv').empty();

  } else {
    console.log('<140');

    var beginA = '<a ';
    var hrefA = 'href="https://twitter.com/share" ';
    var classA = 'class="twitter-share-button tweetBtn" ';
    var dataUrlA = 'data-url="' + res.quoteLink + '" ';
    var dataTextA = 'data-text="' + combinedQuote + '" ';
    var dataCntA = 'data-count="none"';
    var endA = '>Tweet</a>';
    var tweetA = beginA + hrefA + classA + dataUrlA + dataTextA + dataCntA + endA;

    console.log(tweetA);

    $('#tweetDiv').empty();
    $('#tweetDiv').append(tweetA);
    $('#link').attr('href', res.quoteLink);

    $.getScript('https://platform.twitter.com/widgets.js');
    // twttr.widgets.load();
  }

}
