// Globals
var NoiseGenerator = require("./noise-generator.js");
var p, font, xNoise, yNoise;
var canvasSize = {
    width: 500,
    height: 200 
};
var logoText = "Words";
var fontSize = 200;
var fontPath = "../assets/fonts/leaguegothic-regular-webfont.ttf";

// Start sketch
new p5(function (_p) {
    p = _p;
    p.preload = preload;
    p.setup = setup;
    p.draw = draw;
});

function preload() {
    font = p.loadFont(fontPath);
}

function setup() {
    p.createCanvas(canvasSize.width, canvasSize.height);
    xNoise = new NoiseGenerator(p, -100, 100, 0.02);
    yNoise = new NoiseGenerator(p, -100, 100, 0.02, 100);
    p.background(255);
    p.textFont(font);
    p.textSize(fontSize);
    p.textAlign(p.CENTER, p.CENTER);
    p.stroke(255);
    p.fill("#FF8132");
    p.strokeWeight(3);
}

function draw() {
    var x = p.width / 2 + xNoise.generate();
    var y = p.height / 2 + yNoise.generate();
    p.text(logoText, x, y);
}