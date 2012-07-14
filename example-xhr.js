var data = H5.formData(document.getElementById("my_form"));

H5
.xhr({ method: "POST" })
.connect("http://example.com")
.send(data)
.error(function(status,statusText){
	console.error("XHR Error: " + status + " " + statusText);
})
.progress(function(info){
	console.log("Progress: " + 
		Math.round(info.bytesLoaded / info.bytesTotal * 100) + "%"
	);
})
.success(function(res){
	console.log(res);
	console.log(this.__raw__.getAllResponseHeaders());
});
