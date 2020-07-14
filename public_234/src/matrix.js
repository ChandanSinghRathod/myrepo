(function ($) {
  // create matrix table
  for (let i = 1; i < 6; i++) {
    const tr = '<tr>';
    const td1 = `<th scope="row">l${i}</th>`;
    const td2 = `<td class="l${i}pl1"></td>`;
    const td3 = `<td class="l${i}pl2"></td>`;
    const td4 = `<td class="l${i}pl3"></td>`;
    const td5 = `<td class="l${i}pl4"></td>`;
    const td6 = `<td class="l${i}pl5"></td></tr>`;
    $('.matrix-table').append(tr + td1 + td2 + td3 + td4 + td5 + td6);
  }

  const ip2 = $('#ip2').val();
  const ip3 = $('#ip3').val();

  const createMatrixIp2 = ip2.split(',');
  const createMatrixIp3 = ip3.split(',');
  var valuesTable = [];
  for (var i = 1; i <= createMatrixIp2.length; i++) {
    const sumUp = (parseInt(processIP(createMatrixIp2, 'pl' + i)) + parseInt(processIP(createMatrixIp3, 'l' + i)));
    valuesTable.push(sumUp + '.' + i);
  }
  // Removing the commas. You can add more characters to remove to the set
  valuesTable.sort(function(a,b){
    var lhs = parseInt(a.replace(/,/g,""));
    var rhs = parseInt(b.replace(/,/g,""));
    return( lhs - rhs);
  });

  valuesTable.reverse();

  function processIP (createMatrix, searchText) {
    var searchedValue;
    for (var i = 0; i < createMatrix.length; i++) {
      var extractValue = createMatrix[i].split('=');
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
   for(var i=0; i<valuesTable.length;i++){
    var afterDot = valuesTable[i].substr( valuesTable[i].indexOf('.') + 1 );
    $('.l'+afterDot+'pl'+afterDot).css('background-color', 'red');
    $('.l'+afterDot+'pl'+afterDot).html('pr'+i);
   }
})(jQuery);
