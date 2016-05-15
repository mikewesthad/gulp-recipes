module.exports = NoiseGenerator;

/**
 * A utility class for generating noise values
 * @constructor
 * @param {object} p               Reference to a p5 sketch
 * @param {number} [min=0]         Minimum value for the noise
 * @param {number} [max=1]         Maximum value for the noise
 * @param {number} [increment=0.1] Scale of the noise, used when updating
 * @param {number} [offset=0]      A value used to ensure multiple noise
 *                                 generators are returning "independent" values
 */
function NoiseGenerator(p, min, max, increment, offset) {
    this.p = p;
    this.min = (min !== undefined) ? min : 0;
    this.max = (max !== undefined) ? max : 1;
    this.increment = (increment !== undefined) ? increment : 0.1;
    this.position = (offset !== undefined) ? offset : 0;
}

/**
 * Update the min and max noise values
 * @param  {number} min Minimum noise value
 * @param  {number} max Maximum noise value
 */
NoiseGenerator.prototype.updateBounds = function (min, max) {
    if (min !== undefined) this.min = min;
    if (max !== undefined) this.max = max;
};

/** 
 * Generate the next noise value
 * @return {number} A noisy value between object's min and max
 */
NoiseGenerator.prototype.generate = function () {
    this._update();
    var n = this.p.noise(this.position);
    n = this.p.map(n, 0, 1, this.min, this.max);
    return n;
};

/**
 * Internal update method for generating next noise value
 * @private
 */
NoiseGenerator.prototype._update = function () {
    this.position += this.increment;
};