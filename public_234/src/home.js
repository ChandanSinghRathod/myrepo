(function ($) {
  // generate random numbers
  $('#ip1').change(function () {
    const ip1 = $('#ip1').val();
    // create random numbers
    var i;
    var ip2String = '';
    var ip3String = '';
    for (i = 1; i < 6; i++) {
      // generate ip2 random numbers
      if (ip2String === '') {
        ip2String = 'pl' + i + '=' + getRandomInt(parseInt(ip1), 30);
      } else {
        ip2String = ip2String + ',pl' + i + '=' + getRandomInt(parseInt(ip1), 30);
      }
      // generate ip3 random numbers
      if (ip3String === '') {
        ip3String = 'l' + i + '=' + getRandomInt(parseInt(ip1) - 1, 30);
      } else {
        ip3String = ip3String + ',l' + i + '=' + getRandomInt(parseInt(ip1) - 1, 30);
      }
    }
    $('#ip2').val(ip2String);
    $('#ip3').val(ip3String);
  });

  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})(jQuery);
