(function ($) {
  // create matrix table
  const ip2 = $('#ip2').val();
  const ip3 = $('#ip3').val();
  const ip4 = $('#ip3').val();
  const createMatrixIp2 = ip2.split(',');
  const createMatrixIp3 = ip3.split(',');
  const createMatrixIp4 = ip4.split(',');
  // create table header
  var headerTr = '<tr><th scope="col">Locale(IP3)</th>';
  for (var tri = 0; tri < createMatrixIp2.length; tri++) {
    const headerTrValue = createMatrixIp2[tri].split('=');
    const headerTrFirstValue = headerTrValue.splice(0, 1).join('');
    const plValue = headerTrFirstValue.replace('pl', '');
    headerTr = headerTr + `<th scope="col">${headerTrFirstValue},Br${plValue}</th>`;
  }
  $('.matrix-table').append(headerTr + '</tr>');

  for (var tdi = 0; tdi < createMatrixIp3.length; tdi++) {
    const colValue = createMatrixIp3[tdi].split('=');
    const colFirstValue = colValue.splice(0, 1).join('');
    const tr = '<tr>';
    var dtTr = `<th scope="row">${colFirstValue}</th>`;
    for (var tdj = 0; tdj < createMatrixIp2.length; tdj++) {
      const dtValue = createMatrixIp2[tdj].split('=');
      const dtFirstValue = dtValue.splice(0, 1).join('');
      dtTr = dtTr + `<td class="${colFirstValue}${dtFirstValue}"></td>`;
    }
    $('.matrix-table').append(tr + dtTr + '</tr>');
  }

  var valuesTable = [];
  for (var tablei = 0; tablei < createMatrixIp2.length; tablei++) {
    const seqValue = createMatrixIp2[tablei].split('=');
    const dtSeqValue = seqValue.splice(0, 1).join('').replace('pl', '');
    const sumUp = (parseInt(processIP(createMatrixIp2, 'pl' + dtSeqValue)) + parseInt(processIP(createMatrixIp3, 'l' + dtSeqValue)) + parseInt(processIP(createMatrixIp4, 'br' + dtSeqValue)));
    valuesTable.push(sumUp + '.' + dtSeqValue);
  }
  // Removing the commas. You can add more characters to remove to the set
  valuesTable.sort(function (a, b) {
    var lhs = parseInt(a.replace(/,/g, ''));
    var rhs = parseInt(b.replace(/,/g, ''));
    return (lhs - rhs);
  });

  valuesTable.reverse();

  function processIP (createMatrix, searchText) {
    var searchedValue;
    for (var processi = 0; processi < createMatrix.length; processi++) {
      var extractValue = createMatrix[processi].split('=');
      var firstValue = extractValue.splice(0, 1).join('');
      var secondValue = extractValue[0];
      if (searchText === firstValue.trim()) {
        searchedValue = secondValue;
        break;
      }
    }
    return searchedValue;
  }
  // shade
  for (var shadei = 0; shadei < valuesTable.length; shadei++) {
    var afterDot = valuesTable[shadei].substr(valuesTable[shadei].indexOf('.') + 1);
    $('.l' + afterDot + 'pl' + afterDot).css('background-color', getRandomColor());
    $('.l' + afterDot + 'pl' + afterDot).html('pr' + shadei);
  }
  // random color codes
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

})(jQuery);
