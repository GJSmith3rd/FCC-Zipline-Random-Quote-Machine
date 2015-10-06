/* global $ */
$(document).ready(function() {
  getData();
  $('.btn').click(function() {
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
    jsonpCallback: 'updateData'
  });
}

function updateData(response) {
  console.log(response);

  $('h3').text(response.quoteText);
  $('h2').text(response.quoteAuthor);
  $('#link').attr('href', response.quoteLink);

}
