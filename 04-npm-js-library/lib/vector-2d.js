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
