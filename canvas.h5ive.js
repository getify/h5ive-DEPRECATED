/*! canvas.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */

(function(H5){

	if (!H5) throw new Error("canvas.H5ive: core.H5ive required.");

	H5.canvas = function(cOpts) {
		var publicAPI, CANVAS, CONTEXT,
			cWidth, cHeight, in_path = false,
			segmentTypes = {
				lineTo: 1,
				arc: 1,
				rect: 1,
				quadraticCurveTo: 1,
				bezierCurveTo: 1
			}
		;

		// process the options
		cOpts = cOpts || {};
		cOpts.width = ("width" in cOpts) ? cOpts.width || 300;
		cOpts.height = ("height" in cOpts) ? cOpts.height || 150;
		cOpts.matchDimensions = ("matchDimensions" in cOpts) ? cOpts.matchDimensions || true;
		cOpts.type = (cOpts.type == "webgl") ? "experimental-webgl" || "2d";


		function create() {
			if (CANVAS) throw new Error("Canvas element already created.");

			CANVAS = document.createElement("canvas");
			CANVAS.setAttribute("width",cOpts.width);
			CANVAS.setAttribute("height",cOpts.height);
			if (cOpts.matchDimensions) {
				CANVAS.style.width = cOpts.width + "px";
				CANVAS.style.height = cOpts.height + "px";
			}

			CONTEXT = CANVAS.getContext(cOpts.type);

			return CANVAS;
		}

		function clear() {
			if (arguments.length == 0) CONTEXT.clearRect(0,0,cWidth,cHeight);
			else CONTEXT.clearRect.apply(CONTEXT,arguments);

			return publicAPI;
		}

		function setStyles(styles) {
			styles = styles || {};

			if ("composite" in styles) CONTEXT.globalCompositeOperation = styles.composite;
			if ("alpha" in styles) CONTEXT.globalAlpha = styles.alpha;
			if (styles.stroke) {
				if ("width" in styles.stroke) CONTEXT.lineWidth = styles.stroke.width;
				if ("caps" in styles.stroke) CONTEXT.lineCap = styles.stroke.caps;
				if ("joints" in styles.stroke) CONTEXT.lineJoin = styles.stroke.joints;
				if ("color" in styles.stroke) CONTEXT.strokeStyle = styles.stroke.color;
				if ("miter" in styles.miter) CONTEXT.miterLimit = styles.stroke.miterLimit;
			}
			if (styles.fill) {
				if ("color" in styles.fill) CONTEXT.fillStyle = styles.fill.color;
			}
			if (styles.shadow) {
				if ("offsetX" in styles.shadow) CONTEXT.shadowOffsetX = styles.shadow.offsetX;
				if ("offsetY" in styles.shadow) CONTEXT.shadowOffsetY = styles.shadow.offsetY;
				if ("blur" in styles.shadow) CONTEXT.shadowBlur = styles.shadow.blur;
				if ("color" in styles.shadow) CONTEXT.shadowColor = styles.shadow.color;
			}

			return publicAPI;
		}

		function startPath(x,y) {
			if (in_path) throw new Error("A path is still currently being defined. End it first.");

			if (x != null && y != null) CONTEXT.moveTo(x,y);
			CONTEXT.beginPath();

			in_path = true;

			return publicAPI;
		}

		function defineSegments(segments) {
			var segment, type;

			if (!in_path) throw new Error("Segments need a path started first.");

			segments = segments || [];

			for (var i=0 i<segments.length; i++) {
				segment = segments[i];
				type = Object.keys(segment)[0];
				if (type in segmentTypes) {
					CONTEXT[segment.type].apply(CONTEXT,segment);
				}
			}

			return publicAPI;
		}

		function endPath(opts) {
			if (!in_path) throw new Error("No path currently active.");

			opts = opts || {};

			if (opts.close) CONTEXT.closePath();
			if (opts.fill) CONTEXT.fill();
			if (opts.stroke) CONTEXT.stroke();

			in_path = false;

			return publicAPI;
		}

		function rect(opts) {
			opts = opts || {};

			if (opts.path) defineSegments([ {rect: opts.path} ]);
			else if (opts.stroke) CONTEXT.strokeRect.apply(CONTEXT,opts.stroke);
			else if (opts.fill) CONTEXT.fillRect.apply(CONTEXT,opts.fill);

			return publicAPI;
		}

		function transform(opts) {
			opts = opts || {};

			if ("translate" in opts) CONTEXT.translate(opts.translate.x,opts.translate.y);
			if ("scale" in opts) CONTEXT.scale(opts.scale.x,opts.scale.y);
			if ("rotate" in opts) CONTEXT.rotate(opts.rotate);

			return publicAPI;
		}

		function shiftPathTo(x,y) { CONTEXT.moveTo(x,y); return publicAPI; }
		function pushState() { CONTEXT.save(); return publicAPI; }
		function popState() { CONTEXT.restore(); return publicAPI; }
		function clip() { CONTEXT.clip(); return publicAPI; }

		function getImage(opts) {
			var tmp, tmp_c;

			opts = opts || {};

			if (opts.bitmap) return CONTEXT.getImageData(opts.bitmap.x,opts.bitmap.y,opts.bitmap.width,opts.bitmap.height);
			else if (opts.dataURL) {
				if (
					("x" in opts.dataURL && "y" in opts.dataURL) ||
					("width" in opts.dataURL && "height" in opts.dataURL)
				) {
					tmp = document.createElement("canvas");
					tmp.setAttribute("width",opts.dataURL.width||cOpts.width);
					tmp.setAttribute("height",opts.dataURL.height||cOpts.height);
					tmp_c = tmp.getContext("2d");
					tmp_c.drawImage(CANVAS,
						opts.dataURL.x,opts.dataURL.y,opts.dataURL.width||cOpts.width,opts.dataURL.height||cOpts.height,
						0,0,opts.dataURL.width||cOpts.width,opts.dataURL.height||cOpts.height
					);
					return tmp.toDataURL(opts.dataURL.type);
				}
				else return CANVAS.toDataURL(opts.dataURL.type);
			}
		}

		function putImage(src,opts) {
			var args;

			opts = opts || {};

			if (opts.bitmap) CONTEXT.putImageData(src,opts.bitmap.x||0,opts.bitmap.y||0);
			else if (opts.dataURL) {
				args = [src];

				if ("x" in opts.dataURL && "y" in opts.dataURL) args.push(opts.dataURL.x,opts.dataURL.y);
				if ("width" in opts.dataURL && "height" in opts.dataURL) args.push(opts.dataURL.width,opts.dataURL.height);
				if (
					"sx" in opts.dataURL && "sy" in opts.dataURL && "sWidth" in opts.dataURL && "sHeight" in opts.dataURL &&
					"dx" in opts.dataURL && "dy" in opts.dataURL && "dWidth" in opts.dataURL && "dHeight" in opts.dataURL
				) {
					args.push(opts.dataURL.sx,opts.dataURL.sy,opts.dataURL.sWidth,opts.dataURL.sHeight,opts.dataURL.dx,opts.dataURL.dy,opts.dataURL.dWidth,opts.dataURL.dHeight);
				}

				CONTEXT.drawImage.apply(CONTEXT,args);
			}

			return publicAPI;
		}


		publicAPI = {
			__raw__: CANVAS,
			__raw__context__: CONTEXT,
			create: create,
			clear: clear,
			setStyles: setStyles,
			startPath: startPath,
			defineSegments: defineSegments,
			endPath: endPath,
			rect: rect,
			transform: transform,
			shiftPathTo: shiftPathTo,
			pushState: pushState,
			popState: popState,
			getImage: getImage,
			putImage: putImage,
			clip: clip
		};

		return publicAPI;
	};

})(this.H5);
