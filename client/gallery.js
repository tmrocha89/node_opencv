var POSITIONS = {
    TL: {
        id:0,
        getPosition: function(imgWidth, imgHeight, frameWidth, frameHeight){
            return {ml:0, mt:0};
        }
    },
    TM: {
        id:1,
        getPosition: function(imgWidth, imgHeight, frameWidth, frameHeight){
            return {ml:(frameWidth/2 - imgWidth/2), mt:0};
        }
    },
    TR: {
        id:2,
        getPosition: function(imgWidth, imgHeight, frameWidth, frameHeight){
            return {ml:(frameWidth - imgWidth), mt:0};
        }
    },
    ML: {
        id:3,
        getPosition: function(imgWidth, imgHeight, frameWidth, frameHeight){
            return {ml:0, mt:(frameHeight/2 - imgHeight/2)};
        }
    },
    MM: {
        id:4,
        getPosition: function(imgWidth, imgHeight, frameWidth, frameHeight){
            return {ml:(frameWidth/2 - imgWidth/2), mt:(frameHeight/2 - imgHeight/2)};
        }
    },
    MR: {
        id:5,
        getPosition: function(imgWidth, imgHeight, frameWidth, frameHeight){
            return {ml:(frameWidth - imgWidth), mt:(frameHeight/2 - imgHeight/2)};
        }
    },
    BL: {
        id:6,
        getPosition: function(imgWidth, imgHeight, frameWidth, frameHeight){
            return {ml:0, mt:(frameHeight - imgHeight)};
        }
    },
    BM: {
        id:7,
        getPosition: function(imgWidth, imgHeight, frameWidth, frameHeight){
            return {ml:(frameWidth/2 - imgWidth/2), mt:(frameHeight - imgHeight)};
        }
    },
    BR: {
        id:8,
        getPosition: function(imgWidth, imgHeight, frameWidth, frameHeight){
            return {ml:(frameWidth - imgWidth), mt:(frameHeight - imgHeight)};
        }
    }
};

function WeddingImage(path, position, width, height){
    this._path = path;
    this._width = width;
    this._height = height;
    this._position = position;
}
WeddingImage.prototype.show = function(htmlElement, frameSize){
    htmlElement.src = this._path;
    var style = "";
    var coords = this._position.getPosition(this._width || htmlElement.width, this._height || htmlElement.height, htmlElement.width, htmlElement.height);
    if(this._width) style += "width:"+this._width+"px;";
    if(this._height) style += "height:"+this._height+"px;"; 
    style += "margin-left:"+coords.ml+"px;";
    style += "margin-top:"+coords.mt+"px;";
    htmlElement.style = style;
};

function MultipleWeddingImages(path, positions, styles, width, height){
    this._path = path;
    this._width = width;
    this._height = height;
    this._positions = positions;
    this._styles = styles;
}

MultipleWeddingImages.prototype.show = function(container, frameSize){
    console.log(frameSize)
    for(var i=0; i < this._positions.length; i++){
        var coords = this._positions[i].getPosition(this._width || frameSize.width, this._height || frameSize.height, frameSize.width, frameSize.height);
        console.log(coords)
        var img = document.createElement('img');
        img.src = this._path;

        var style = "";
        style += "width:"+this._width+"px;";
        style += "height:"+this._height+"px;"; 
        style += "margin-left:"+coords.ml+"px;";
        style += "margin-top:"+coords.mt+"px;";
        var tmpStyle = this._styles ? this._styles[i] : undefined;
        if(tmpStyle){
            style += tmpStyle;
        }
        img.style = style;
        container.appendChild(img);
    }
    

};

var getMirrorImageStyle = function(){
    return "-moz-transform: scaleX(-1);"+
    "-o-transform: scaleX(-1);"+
    "-webkit-transform: scaleX(-1);"+
    "transform: scaleX(-1);"+
    "filter: FlipH;"+
    "-ms-filter: \"FlipH\"";
}

var initImgs = function(){
    this._imgs.push(new MultipleWeddingImages("border-48407_640.png", [POSITIONS.MM]));
    this._imgs.push(new MultipleWeddingImages("border-48945_640.png", [POSITIONS.MM]));
    this._imgs.push(new MultipleWeddingImages("heart-47950_640.png", [POSITIONS.TL], [], 200));
    //this._imgs.push(new MultipleWeddingImages("giphy.gif", [POSITIONS.MM]));
    this._imgs.push(new MultipleWeddingImages("giphy01.webp", [POSITIONS.MM]));
    //this._imgs.push(new MultipleWeddingImages("giphy02.webp", [POSITIONS.MM]));
    this._imgs.push(new MultipleWeddingImages("giphy03.webp", [POSITIONS.MM]));
    this._imgs.push(new MultipleWeddingImages("hearts01.webp", [POSITIONS.BR], [], 100, 100));
    this._imgs.push(new MultipleWeddingImages("giphy04.webp", [POSITIONS.MM]));
    this._imgs.push(new MultipleWeddingImages("giphy02.gif", [POSITIONS.MM]));
    this._imgs.push(new MultipleWeddingImages("giphy03.gif", [POSITIONS.BR], [], 100, 100));
    this._imgs.push(new MultipleWeddingImages("giphy03.gif", [POSITIONS.BR, POSITIONS.LT], [], 100, 100));
    this._imgs.push(new MultipleWeddingImages("heart-47950_640.png", [POSITIONS.TL, POSITIONS.TR], ["", getMirrorImageStyle()], 200));
}

function Gallery(images){
    this.width = undefined;
    this.height = undefined;
    this._imgs = images || [];
    initImgs.call(this);
}

Gallery.prototype.get = function(index){
    if(index > -1 && index < this._imgs.length){
        return this._imgs[index];
    }
    return undefined;
};

Gallery.prototype.setFrameSize = function(width, height){
    this.width = width;
    this.height = height;
};

Gallery.prototype.getFrameSize = function(){
    return {width: this.width, height: this.height};
};
/*
var gallery = [];
gallery.push(new WeddingImage("border-48407_640.png", POSITIONS.MM));
gallery.push(new WeddingImage("border-48945_640.png", POSITIONS.MM));
gallery.push(new WeddingImage("heart-47950_640.png", POSITIONS.LEFT, "10%"));
//gallery.push(new WeddingImage("giphy.gif", POSITIONS.MM));
gallery.push(new WeddingImage("giphy01.webp", POSITIONS.MM));
//gallery.push(new WeddingImage("giphy02.webp", POSITIONS.MM));
gallery.push(new WeddingImage("giphy03.webp", POSITIONS.MM));
gallery.push(new WeddingImage("hearts01.webp", POSITIONS.BR, 100, 100));
gallery.push(new WeddingImage("giphy04.webp", POSITIONS.MM));
gallery.push(new WeddingImage("giphy02.gif", POSITIONS.MM));
gallery.push(new WeddingImage("giphy03.gif", POSITIONS.BR, 100, 100));
gallery.push(new MultipleWeddingImages("giphy03.gif", [POSITIONS.BR, POSITIONS.LT], 100, 100));
*/

