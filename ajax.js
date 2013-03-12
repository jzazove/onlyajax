/*
Only Ajax - http://zazove.org
Licensed under the MIT license

Copyright (c) 2013 Jonathan Zazove

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function(){
window.AJAX = window.AJAX || {};
window.AJAX = function(j){
	this.globalError = function(code){
		var txt = (code === 404) ? "404 Not Found" : "Oh dear.  Something is very wrong";
		alert(txt);
	};
	this.globalLogin = function(){
		//add your login logic here
	};

	//dispatch request based on method (GET/POST)
	if(j.hasOwnProperty("method") && j.method === "POST"){
		this.postRequest(j);
	} else {
		this.getRequest(j)
	}

};
AJAX.prototype.postRequest = function(j){
	var ct =  "application/x-www-form-urlencoded";
	var post_data = j.data;
	if(j.hasOwnProperty("contentType")){
		 ct = j.contentType;
		 if(ct.indexOf("application/json") !== -1){
		 	post_data = JSON.stringify(j.data);
		 }
	};

	this.xmlhttp = this.getxmlhttpObj(); 
	this.xmlhttp.open("POST", j.url, true); 
	this.xmlhttp.setRequestHeader("Content-type", ct);
	this.xmlhttp.onreadystatechange = (function(b){
		return function(){
			b;
		};
	})(this.checkResponse(j));
	this.xmlhttp.send(post_data);
};
AJAX.prototype.getRequest = function(j){
	this.xmlhttp = this.getxmlhttpObj();
	this.xmlhttp.open("GET", j.url, true); 
	this.xmlhttp.onreadystatechange = (function(b){
		return function(){
			b;
		};
	})(this.checkResponse(j));
	this.xmlhttp.send(null);
};
AJAX.prototype.checkResponse = function(j){
	var self = this;
	var t; 
	if (this.xmlhttp.readyState !== 4) {
		t = setTimeout(function(){self.checkResponse(j)}, 20)
	} else {
		this.getResponse(j)
	}; 
}; 
AJAX.prototype.getResponse = function(j) { 
	switch (this.xmlhttp.status){ 
		case(200): 
		case(204): 
			return j.onSuccess(JSON.parse(this.xmlhttp.responseText)); 
			break; 	
		case(401): 
			this.globalLogin();
			break;
		case(400): 			
		case(403): 
		case(404): 
		case(500): 
			this.globalError(this.xmlhttp.status);
			break; 
		default:
			this.globalError();
	}; 
}; 
AJAX.prototype.getxmlhttpObj = function() {
	return (window.XMLHttpRequest) ? new XMLHttpRequest() : ((window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : null); 
};
})();