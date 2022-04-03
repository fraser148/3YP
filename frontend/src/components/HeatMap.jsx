import React, { useEffect, useRef } from "react";

const HeatMap = ({data}) => {
  
    const canvasRef = useRef(null)
    
    useEffect(() => {
        
    function simpleheat(canvas) {
        if (!(this instanceof simpleheat)) return new simpleheat(canvas);
    
        this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    
        this._ctx = canvas.getContext('2d');
        this._width = canvas.width;
        this._height = canvas.height;
    
        this._max = 1;
        this._data = [];
    }
    
    simpleheat.prototype = {
    
        defaultRadius: 25,
    
        defaultGradient: {
            0.2: 'blue',
            0.3: 'cyan',
            0.35: 'lime',
            0.4: 'yellow',
            0.5: 'red'
        },
    
        data: function (data) {
            this._data = data;
            return this;
        },
    
        max: function (max) {
            this._max = max;
            return this;
        },
    
        add: function (point) {
            this._data.push(point);
            return this;
        },
    
        clear: function () {
            this._data = [];
            return this;
        },
    
        radius: function (r, blur) {
            blur = blur === undefined ? 15 : blur;
    
            // create a grayscale blurred circle image that we'll use for drawing points
            var circle = this._circle = this._createCanvas(),
                ctx = circle.getContext('2d'),
                r2 = this._r = r + blur;
    
            circle.width = circle.height = r2 * 2;
    
            ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
            ctx.shadowBlur = blur;
            ctx.shadowColor = 'black';
    
            ctx.beginPath();
            ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
    
            return this;
        },
    
        resize: function () {
            this._width = this._canvas.width;
            this._height = this._canvas.height;
        },
    
        gradient: function (grad) {
            // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
            var canvas = this._createCanvas(),
                ctx = canvas.getContext('2d'),
                gradient = ctx.createLinearGradient(0, 0, 0, 256);
    
            canvas.width = 1;
            canvas.height = 256;
    
            for (var i in grad) {
                gradient.addColorStop(+i, grad[i]);
            }
    
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1, 256);
    
            this._grad = ctx.getImageData(0, 0, 1, 256).data;
            
            return this;
        },
        
        draw: function (minOpacity) {
            if (!this._circle) this.radius(this.defaultRadius);
            if (!this._grad) this.gradient(this.defaultGradient);
            
            var ctx = this._ctx;
            
            ctx.clearRect(0, 0, this._width, this._height);
            
            // draw a grayscale heatmap by putting a blurred circle at each data point
            
            
            
            for (var i = 0, len = this._data.length, p; i < len; i++) {
                p = this._data[i];
                ctx.globalAlpha = Math.min(Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity), 0.5);
                ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
            }
            
            
            // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
            var colored = ctx.getImageData(0, 0, this._width, this._height);
            this._colorize(colored.data, this._grad);
            ctx.putImageData(colored, 0, 0);


            // Anything from here is in the background
            ctx.globalCompositeOperation = 'destination-over';

            ctx.globalAlpha = 1;
            var background = new Image();
            background.src = "https://maps.googleapis.com/maps/api/staticmap?center=51.75316362611822,-1.2432909575780062&zoom=16&size=300x300&maptype=satellite&key=AIzaSyCl4sjXh_chPd5qt_6-Sp5Hz7QILghSBXA";
            background.crossOrigin = "Anonymous";
            // Make sure the image is loaded first otherwise nothing will draw.
            background.onload = function(){
                ctx.drawImage(background,0,0);   
            }
            
    
            return this;
        },
    
        _colorize: function (pixels, gradient) {
            for (var i = 0, len = pixels.length, j; i < len; i += 4) {
                j = pixels[i + 3] * 4; // get gradient color from opacity value
    
                if (j) {
                    pixels[i] = gradient[j];
                    pixels[i + 1] = gradient[j + 1];
                    pixels[i + 2] = gradient[j + 2];
                }
            }
        },
    
        _createCanvas: function () {
            if (typeof document !== 'undefined') {
                return document.createElement('canvas');
            } else {
                // create a new canvas instance in node.js
                // the canvas class needs to have a default constructor without any parameter
                return new this._canvas.constructor();
            }
        }
    };

      const canvas = canvasRef.current
      

      var heat = simpleheat(canvas).data(data);
      heat.data(data);
      heat.draw();
      heat.max(2);
    }, [data])
    
    return <canvas className="heatmap" ref={canvasRef}  width="300" height="300"/>
}

export default HeatMap;