/* global $ */
$(document).ready(function() {

  $('#getQuote').click(function () {
    getData();
  });

  var getData = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://labs.bible.org/api/?passage=random&formatting=plain&type=json', false);
    xhr.send();

    console.log(xhr.status);
    console.log(xhr.statusText);
    console.log(xhr.response);

    var str = xhr.responseText;
    var newStr = str.replace('[', '').replace(']', '');

    var parseStr = JSON.parse(newStr);
    console.log(parseStr.bookname + ' ' + parseStr.chapter + ':' + parseStr.verse);
    console.log(parseStr.text);

    $('h2').text(parseStr.text);
    $('h3').text(parseStr.bookname + ' ' + parseStr.chapter + ':' + parseStr.verse);

  };

  getData();

});
