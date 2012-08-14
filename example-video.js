var video, playButton;

video = h5.video({
	width: 640,
	height: 360,
	src: [{ src: 'http://mediapm.edgesuite.net/osmf/content/test/spacealonehd_sounas_640_700.mp4', type: 'video/mp4' }],
	poster: 'images/my_really_cool_image.png',
	controls: true,
	preload: 'autoplay'
});

document.body.appendChild(video.create());

video
	.onLoadStart(logEvent)
	.onProgress(logEvent)
	.onSuspend(logEvent)
	.onAbort(logEvent)
	.onError(logEvent)
	.onEmptied(logEvent)
	.onStalled(logEvent)
	.onLoadedMetaData(logEvent)
	.onLoadedData(logEvent)
	.onCanPlay(logEvent)
	.onCanPlayThrough(logEvent)
	.onPlaying(logEvent)
	.onWaiting(logEvent)
	.onSeeking(logEvent)
	.onSeeked(logEvent)
	.onEnded(logEvent)
	.onDurationChange(logEvent)
	.onTimeUpdate(logEvent)
	.onPlay(logEvent)
	.onPause(logEvent)
	.onRateChange(logEvent)
	.onVolumeChange(logEvent);

playButton = document.createElement('button');
playButton.innerHTML = 'PLAY';
playButton.style.display = 'block';
playButton.addEventListener('click', clickHandler, false);

document.body.appendChild(playButton);

function logEvent(e) {
	console.log(e.type);
}

function clickHandler() {
	video.fullscreen().play().pause().play();
}