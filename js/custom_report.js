$('#btn-print').click(function () {
  let wspFrame = document.getElementById('frame').contentWindow;
  wspFrame.focus();
  wspFrame.print();
});
