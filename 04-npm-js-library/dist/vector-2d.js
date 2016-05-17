(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Vector2D = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = Vector2D;

function Vector2D(x, y) {
    this.x = (x !== undefined) ? x : 0;
    this.y = (y !== undefined) ? y : 0;
}

Vector2D.add = function (v1, v2) {
    return new Vector2D(v1.x + v2.x, v1.y + v2.y);
};

Vector2D.prototype.add = function (v2) {
    this.x += v2.x;
    this.y += v2.y;
};

Vector2D.subtract = function (v1, v2) {
    return new Vector2D(v1.x - v2.x, v1.y - v2.y);
};

Vector2D.prototype.subtract = function (v2) {
    this.x -= v2.x;
    this.y -= v2.y;
};

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvdmVjdG9yLTJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBWZWN0b3IyRDtcclxuXHJcbmZ1bmN0aW9uIFZlY3RvcjJEKHgsIHkpIHtcclxuICAgIHRoaXMueCA9ICh4ICE9PSB1bmRlZmluZWQpID8geCA6IDA7XHJcbiAgICB0aGlzLnkgPSAoeSAhPT0gdW5kZWZpbmVkKSA/IHkgOiAwO1xyXG59XHJcblxyXG5WZWN0b3IyRC5hZGQgPSBmdW5jdGlvbiAodjEsIHYyKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHYxLnggKyB2Mi54LCB2MS55ICsgdjIueSk7XHJcbn07XHJcblxyXG5WZWN0b3IyRC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHYyKSB7XHJcbiAgICB0aGlzLnggKz0gdjIueDtcclxuICAgIHRoaXMueSArPSB2Mi55O1xyXG59O1xyXG5cclxuVmVjdG9yMkQuc3VidHJhY3QgPSBmdW5jdGlvbiAodjEsIHYyKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHYxLnggLSB2Mi54LCB2MS55IC0gdjIueSk7XHJcbn07XHJcblxyXG5WZWN0b3IyRC5wcm90b3R5cGUuc3VidHJhY3QgPSBmdW5jdGlvbiAodjIpIHtcclxuICAgIHRoaXMueCAtPSB2Mi54O1xyXG4gICAgdGhpcy55IC09IHYyLnk7XHJcbn07XHJcbiJdfQ==
