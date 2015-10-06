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
  console.log($('#twitter').attr('data-url'));
  if (res.quoteText.length + res.quoteAuthor.length > 140) {
    console.log('>140');
    $('#tweet').hide();
  } else {
    console.log('<140');
    $('#tweet').show();
  }

}

function tweetQuote(res) {
  console.log(res);
  console.log('Tweet Quote!');

}
