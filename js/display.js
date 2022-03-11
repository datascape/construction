
function loadMarkupPage(pagePath, divID, target) {
  d3.text(pagePath).then(function(data) {
    var converter = new showdown.Converter({tables:true}),
    html = converter.makeHtml(data);
    document.getElementById(divID).innerHTML = html;
  });
}

function addColumns() {
  addColumnsAgain();
  setTimeout( function() {
    addColumnsAgain();
  }, 500 );

  setTimeout( function() {
    addColumnsAgain();
  }, 1500 );

  setTimeout( function() {
    addColumnsAgain();
  }, 3000 );
}

function addColumnsAgain() {
    $('.totalrow').remove();
    $('#totals').html("");
    let allTables = $('#readmeDiv table');
    let grandTotalMin = 0;
    let grandTotalMax = 0;
    for (var i = 1; i <= allTables.length; i++) {
      //alert(allTables[i].innerHTML); 

      let min = 0;
      let max = 0;

      // the selector must be adjusted to the actual html
      $('#readmeDiv table:nth-of-type(' + i + ') td:nth-child(2):visible').each(function(){
         var value = $(this).text().slice(1).replace(/,/g,'');
         min += +value;
      });
      //alert(min);

      $('#readmeDiv table:nth-of-type(' + i + ') td:nth-child(3):visible').each(function(){
         var value = $(this).text().slice(1).replace(/,/g,'');
         max += +value;
      });
      //alert(max);

      $('#readmeDiv table:nth-of-type(' + i + ') > tbody:last-child').append('<tr class="totalrow"><td></td><td>$' + min.toLocaleString("en") + '</td><td>$' + max.toLocaleString("en") + '</td></tr>');

      grandTotalMin += min;
      grandTotalMax += max;
    }
    let totalsText = "<table id='totaltable'><tr><td style='font-weight:bold;'>Estimated Cost Range</td><td>$" + grandTotalMin.toLocaleString("en") + "</td><td>$" + grandTotalMax.toLocaleString("en") + "</td></tr></table>";
    $('#totals').html(totalsText)
}