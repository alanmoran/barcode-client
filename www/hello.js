document.getElementById('say_hello').onclick = function () {
  return cordova.plugins.barcodeScanner.scan(function (result) {
    document.getElementById('hello_to').value = result.text;
    document.getElementById('cloudResponse').innerHTML = "<p>Calling Cloud.....</p>";
    $fh.cloud(
        {
          path: 'hello',
          data: {
            barcode: result.text
          }
        },
        function (res) {
          var product  = res[0];
          document.getElementById('cloudResponse').innerHTML = "<img src='" + product.imageurl + "'>" + 
          "<p>" + product.productname + "</p>";
        },
        function (code, errorprops, params) {
          alert('An error occured: ' + code + ' : ' + errorprops);
        }
    );
  }, function (error) {
    alert("Scanning failed: " + error);
  });
};
