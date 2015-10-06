/* global $ */
$(document).ready(function() {

});
var getData = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://labs.bible.org/api/?passage=random&formatting=plain&type=json', false);
  xhr.send();

  console.log(xhr.status);
  console.log(xhr.statusText);

  var str = xhr.responseText;
  var newStr = str.replace('[', '').replace(']', '');

  var parseStr = JSON.parse(newStr);
  console.log(parseStr.bookname +  ' ' +  parseStr.chapter + ':' + parseStr.verse);
  console.log(parseStr.text);

};
getData();
