document.getElementById('scan_barcode').onclick = function () {
  return cordova.plugins.barcodeScanner.scan(function (result) {
    document.getElementById('barcode_number').value = result.text;
    
  }, function (error) {
    alert("Scanning failed: " + error);
  });
};

document.getElementById('search').onclick = function () {
  document.getElementById('cloudResponse').innerHTML = "<p>Calling Cloud.....</p>";
  getBarcode(document.getElementById('barcode_number').value);
  document.getElementById('order_button').style.display = 'none';
};

document.getElementById('order_button').onclick = function () {
  $fh.cloud({
    method : 'post',
    path: "/orders",
    data: currentItem
  }, function(res) {
    loadOrders();
  }, function(msg, err) {
    alert('An error occured: ' + code + ' : ' + errorprops);
  });
};

// Load the most recent items scanned
document.addEventListener("DOMContentLoaded", function(event) { 
  loadRecent();
  loadOrders();
  
});
