document.getElementById('say_hello').onclick = function () {
  document.getElementById('cloudResponse').innerHTML = "<p>Calling Cloud.....</p>";
  $fh.cloud(
      {
        path: 'hello',
        data: {
          barcode: document.getElementById('hello_to').value
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
};
