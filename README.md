#Barcode Scanner project
(Cloud application is located [here](https://github.com/alanmoran/barcode-cloud))
##Step 1: Base Cloud App
* Has one route, /hello
* Gets mounted in `application.js`
* Handles the route in `lib/hello.js`
* We're going to modify this to accept barcodes.


###Step 2: UPS Barcode Soap Integration
We're going to take an online SOAP service which returns a mix of SOAP and CSV - neither of which are approprirate for a mobile API, and convert this response to mobile-friendly JSON.

* Include `soap` and `csv` dependencies
* Introduce our [UPC Search](http://www.searchupc.com/supc/service/UPCSearch.asmx) soap service
* Modify `/lib/hello.js` to include SOAP service

### Step 3: Document Barcode Service
* Document using API Blueprint Format
* Illustrates discovery of service

### Step 4: Create our client application.
* Uses the now changed `hello` route
* Has 1 input, 1 button which we're going to use

### Step 5: Update our client application to do barcode lookup
* Update the labels in `index.html`
* Update the params we send to the `/hello` cloud route
* Update what we display on the page to be the cover image & title

### Step 6: Add Barcode Scanner
* Add the barcode scanner to our app
* Update the button to trigger the barcode scanner