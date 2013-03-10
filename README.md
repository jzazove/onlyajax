#Only Ajax
*1kb script to handle your front-end Ajax calls*

##Why
Ajax is essential and this library is tiny (1kb) and helps you bake your app logic within requests/responses. 

##How to Use
Add and the ajax.min.js into a `<script>` tag right before the closing of the `</body>` tag.

```javascript
var a = new AJAX({"method": "GET", "url": "/test/b.js", "onSuccess": function(res){//handle response}});
```

```javascript
var a = new AJAX({"method": "POST", "url": "/test/b.js", "data": "artist=jz&lyrics=true", "onSuccess": function(res){OUT.innerHTML = JSON.stringify(res); } });
```

```javascript
var a = new AJAX({"method": "POST", "url": "/test/b.js", "contentType": "application/json", "data": {"artist": "jz", "lyrics": true}, "onSuccess": function(res){OUT.innerHTML = JSON.stringify(res); } }); 
```

##Customization
Right now, it's fairly easy to plug in your login and error logic into the AJAX object. If anyone gets stuck, message me. 

##API Disclaimer
Right now, Only Ajax only supports JSON responses from the Ajax endpoint.  This seems fine for now.  If you are supporting XML responses, I am sorry.

##Browser Compatibility 
- IE 6+, Firefox, Chrome, Safari, Opera - if you add [json2.js](https://github.com/douglascrockford/JSON-js)
- IE 8+, Firefox, Chrome, Safari, Opera - without json2.js

