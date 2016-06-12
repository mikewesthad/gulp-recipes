// Including dest/vector-2d.min.js in a script tag in the HTML gives us
// access to a global constructor function: Vector2D

var v1 = new Vector2D(10, 0);
var v2 = new Vector2D(25, 25);
v1.add(v2);

console.log("Vector math:", v1.x, v1.y);