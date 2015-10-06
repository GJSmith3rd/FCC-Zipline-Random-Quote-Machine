/* global $ */
$(document).ready(function() {
  getData();

  $('#link').click(function() {
    getData();
  });
  $('#tweet').click(function() {
    tweetQuote();
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

  $('h3').text(res.quoteText);
  $('h2').text(res.quoteAuthor);
  $('#link').attr('href', res.quoteLink);
  console.log(res.quoteText.length + res.quoteAuthor.length);
  if (res.quoteText.length + res.quoteAuthor.length > 140) {
    console.log('>140');
    $('#tweet').hide();
  } else {
    console.log('<140');
    $('#tweet').show();
    tweetQuote();
  }

}

function tweetQuote(res) {
  console.log('Tweet Quote!');
}
