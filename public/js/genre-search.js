$(document).ready(() => {});

// list.js function for search bar
const bookList = new List('test-list', {
  valueNames: ['genre']
});

const $filter = $('#filter');
const $search = $('#search');

$filter.change(() => {
  const $val = $filter.val();
  $search.val($val);
  $search.keyup();
});
