var cnv = h5.canvas({
	width: 500,
	height: 500,
	matchDimensions: true // make the CSS dimensions match the attribute dimensions
});

document.body.append(cnv.create());

cnv
.clear()
.setStyles({
	alpha: 0.8,
	stroke: {
		width: 3,
		color: "#fc6"	
	},
	fill: {
		color: "#999"
	}
})
.startPath(10,10)
.defineSegments([
	{ lineTo: [200,200] },
	{ lineTo: [100,50] }
])
.endPath({
	close: true,
	stroke: true,
	fill: true
})
.pushState()
.setStyles({
	fill: {
		stroke: "black",
		color: "red"
	}
})
.rect({
	fill: [40,40,25,25]
})
.rect({
	stroke: [400,400,50,50]
})
.popState()
.startPath(350,350)
.defineSegments([
	{ arc: [350,350,Math.PI/2,3*Math.PI/2,true] }
])
.endPath({
	fill: true
});
