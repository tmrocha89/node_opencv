var errorMessages = function(errorType){
	if(errorType === "DevicesNotFoundError"){
		return "Device not found!";
	}
	return "Not Supported";
};

(function () {
	var canvas = document.getElementById('canvas');
	var width = 640;
	var height = 480;

	function takepicture(video) {
		return function () {

			var context = canvas.getContext('2d');
			if (width && height) {
				canvas.width = width;
				canvas.height = height;
				context.drawImage(video, 0, 0, width, height);
				var jpgQuality = 0.6;
				var theDataURL = canvas.toDataURL('image/jpeg', jpgQuality);
				socket.emit('img', theDataURL);
			}
		}
	}

	navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);

	navigator.getMedia(
		// constraints
		{
			video: true,
			audio: false
		},

		// success callback
		function (mediaStream) {
			var video = document.getElementsByTagName('video')[0];
			video.src = window.URL.createObjectURL(mediaStream);
			video.play();
			setInterval(takepicture(video), 1000 / 10);
		},
		//handle error
		function (error) {
			console.log(error);
			alert(errorMessages(error.name));
		})
})();


function takePhoto(){
	var canvas = document.getElementById('canvas');
	var width = 640;
	var height = 480;


	var video = document.getElementsByTagName('video')[0];
	var container = document.getElementById('overlay-container');


	var context = canvas.getContext('2d');
	
	canvas.width = width;
	canvas.height = height;
	context.drawImage(video, 0, 0, width, height);
	console.log( container.childElementCount);
	for(var i=0; i < container.childElementCount; i++){
		console.log(container.children[i].style.marginLeft);
		var style = container.children[i].style;
		var ml = Number(style.marginLeft.substring(0, style.marginLeft.length-2));
		var mt = Number(style.marginTop.substring(0, style.marginTop.length-2));
		var w = Number(style.width.substring(0, style.width.length-2));
		var h = Number(style.height.substring(0, style.height.length-2) || height);
		console.log(w +" x "+ h);
		context.drawImage(container.children[i], ml, mt, w, h);
	}
	
	var jpgQuality = 0.9;
	var theDataURL = canvas.toDataURL('image/jpeg', jpgQuality);
	socket.emit('save', theDataURL);
}