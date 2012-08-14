var video, playButton;

video = h5.video({
	width: 640,
	height: 360,
	src: [
		{ src: 'videos/my_really_cool_video.mp4', type: 'video/mp4' },
		{ src: 'videos/my_really_cool_video.ogv', type: 'video/ogg' },
		{ src: 'videos/my_really_cool_video.webm', type: 'video/webm' }
	],
	poster: 'images/my_really_cool_image.png',
	controls: true,
	preload: 'preload',
	autoplay: true,
	muted: true,
	loop: true
});

document.body.appendChild(video.create());

video
	.play()
	.pause()
	.fullscreen()
	.load([
		{ src: 'videos/my_other_really_cool_video.mp4', type: 'video/mp4' },
		{ src: 'videos/my_other_really_cool_video.ogv', type: 'video/ogg' },
		{ src: 'videos/my_other_really_cool_video.webm', type: 'video/webm' }
	]);