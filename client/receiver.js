// MODIFY THIS TO THE APPROPRIATE URL IF IT IS NOT BEING RUN LOCALLY
var socket = io.connect('https://192.168.1.118:8080');
var gallery = new Gallery();
gallery.setFrameSize(640,850);

var drawOverlay = function(WIDTH, HEIGHT){
	var overlayCanvas = document.getElementById('canvas-overlay');
	var overlayContext = overlayCanvas.getContext('2d');
	var overlay = new Image();
	var imgContainer = document.getElementById('overlay-container');
	//var imageElem = document.getElementById('overlay-img');
	//imageElem.src = "http://i.picasion.com/gl/86/8bHB.gif";
	
	console.log(gallery);
	gallery.get(gallery._imgs.length-1).show(imgContainer, gallery.getFrameSize());//imageElem);
	//"http://img72.laughinggif.com/pic/HTTP21lZGlhLmdpcGh5LmNvbS9tZWRpYS80anJwekpqYmp1V1J5L2dpcGh5LmdpZgloglog.gif";
	//"https://media.giphy.com/media/3oKIPqM8BJ0ofNQOzK/giphy.gif";
	//"border-48945_640.png";
	//"border-48407_640.png";
	//"https://media.giphy.com/media/NzSUEgbTWB7TW/giphy.gif";
	//"https://media.giphy.com/media/26BRyql7J3iOx875u/giphy.gif";
	//overlay.src = "http://i44.tinypic.com/25ymq.gif"; //"https://media.giphy.com/media/C3O0bpZFjTa36/giphy.gif";
	//overlayContext.drawImage(overlay, 0, 0, overlayCanvas.width, overlayCanvas.height);
};

drawOverlay();
var canvasFace = document.getElementById('canvas-face');
var context = canvasFace.getContext('2d');
var img = new Image();

// show loading notice
context.fillStyle = '#333';
context.fillText('Loading...', canvasFace.width / 2 - 30, canvasFace.height / 3);

socket.on('frame', function (data) {
	// Reference: http://stackoverflow.com/questions/24107378/socket-io-began-to-support-binary-stream-from-1-0-is-there-a-complete-example-e/24124966#24124966
	var uint8Arr = new Uint8Array(data.buffer);
	var str = String.fromCharCode.apply(null, uint8Arr);
	var base64String = btoa(str);

	img.onload = function () {
		context.drawImage(this, 0, 0, canvasFace.width, canvasFace.height);
	};
	
	img.src = 'data:image/png;base64,' + base64String;
});