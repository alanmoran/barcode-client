var currentItem; // Storage for when we need to place an order - hax
function getBarcode(number){
  document.getElementById('cloudResponse').innerHTML = 'Loading..'
  $fh.cloud({
    path: "/barcode/read",
    data: {
      "barcode": number
    }
  }, function(res) {
    currentItem = res;
    document.getElementById('cloudResponse').innerHTML = "<img src='" + res.imagebase64 + "'>" + 
    "<p>" + res.productname + "</p>" + 
    "<span>$" + res.price + "</span>";
    document.getElementById('order_button').style.display = 'block';
    
    // Store our currently scanned item in case we want to order it
    currentItem = {
      price : res.price,
      barcode : number,
      quantity : 1
    };
  }, function(msg, err) {
    alert('An error occured: ' + code + ' : ' + errorprops);
  });
}

function loadOrders(){
  $fh.cloud({ 
    path : '/orders', method : 'get'
  }, function success(orderItems){ 
    var orders = document.getElementById('orders');
    orders.innerHTML = '';
    orderItems.forEach(function(item){
      var li = document.createElement('li'),
      deleteLink = document.createElement('a');
      li.innerHTML = '<strong>' + item.barcode + '</strong> - ' + item.quantity + 'X @ $' + item.price;
      deleteLink.innerHTML = 'Delete &raquo;';
      deleteLink.dataset.orderid = item.id;
      li.appendChild(deleteLink);
      orders.appendChild(li);
      deleteLink.addEventListener('click', deleteOrder);
    });
  },
  function error(){ 
    console.log(arguments);
  });  
}

function loadRecent(){
  $fh.cloud({ 
    path : '/barcode/recent', method : 'get'
  }, function success(recentItems){ 
    var recent = document.getElementById('recent');
    recent.innerHTML = '';
    recentItems.forEach(function(item){
      var li = document.createElement('li');
      li.textContent = item;
      recent.appendChild(li);
      li.addEventListener('click', function(e){
        var el = e.target;
        getBarcode(el.textContent);
      });  
    });
  },
  function error(){ 
    console.log(arguments);
  });
}

function deleteOrder(ev){
  var deleteLink = ev.target;
  $fh.cloud({ 
    path : '/orders/' + deleteLink.dataset.orderid, method : 'delete', contentType : 'text/plain', data : { id : deleteLink.dataset.orderid}
  }, function success(recentItems){ 
    loadOrders();
  },
  function error(){ 
    console.log(arguments);
  });
}
