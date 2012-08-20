h5
.userMedia({
	video: true
})
.stream(function(src){
	var video = document.getElementById("mycam");
	video.src = src;
	video.play();
})
.failed(function(){
	alert("Access to the media failed.");
})