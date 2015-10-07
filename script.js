/* global $ */
$(document).ready(function() {
  getData();

  $('#newQuote').click(function() {
    getData();
  });

});

function getData() {
  $.ajax({
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
  console.log(res);

  $('#quote').text(res.quoteText);
  $('#author').text(res.quoteAuthor);
  $('#link').attr('href', res.quoteLink);

  var combinedQuote = res.quoteAuthor + ' - ' + res.quoteText;
  console.log(combinedQuote);

  console.log(res.quoteText.length + res.quoteAuthor.length);

  if (combinedQuote.length > 140) {
    console.log('>140');
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
    $.getScript('https://platform.twitter.com/widgets.js');
    // twttr.widgets.load();
  }

}

function tweetQuote(res) {
  console.log(res);
  console.log('Tweet Quote!');

}
