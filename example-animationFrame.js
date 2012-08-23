var aFrame = h5.animationFrame,
	body = document.body,
	text, id1, id2, id3
;

id1 = aFrame.queue(function(){
	// canceled, won't ever get called
	text = document.createTextNode("##");
	body.appendChild(text);
});
id2 = aFrame.queueAfter(function(){
	// canceled, won't ever get called
	text = document.createTextNode("!!");
	body.appendChild(text);
});
id3 = aFrame.queueAfter(function(){
	// canceled, won't ever get called
	text = document.createTextNode("$$");
	body.appendChild(text);
});

aFrame.queueAfter(function(){
	text = document.createTextNode("third.");
	body.appendChild(text);
});
aFrame.queue(function(){
	aFrame.cancel(id3); // still time to cancel something before the next frame
	text = document.createTextNode("second.");
	body.appendChild(text);
});

aFrame.cancel(id1);
aFrame.cancel(id2);

text = document.createTextNode("first.");
body.appendChild(text);
