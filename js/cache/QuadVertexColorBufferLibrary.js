/**
 * User: jchionh
 * Date: 2/24/13
 * Time: 4:56 PM
 */

// namespace
wa.cahce = wa.cache || {};
wa.cache.QuadShapeConst.VERTEX_COLORS = new Float32Array([
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0
]);
wa.cache.QuadShapeConst.ColorKey = {};
wa.cache.QuadShapeConst.ColorKey.WHITE = "WHITE";


/**
 * This is a library of vertex buffers.
 * it creates vertex buffers for re-use
 * @param {WebGLRenderingContext} gl
 * @constructor
 */
wa.cache.QuadVertexColorBufferLibrary = function(gl) {
    // store a reference to the gl context, in order
    // to create and delete buffers
    this.gl = gl;

    // this is our cache object that caches VBOs for re-use
    this.cache = {};

    // let's init a default VBO of white;
    this.createVBO(wa.cache.QuadShapeConst.ColorKey.WHITE, wa.cache.QuadShapeConst.VERTEX_COLORS);
};

/**
 * here we find a already created VBO of this dimension. if it does not exist, create it
 * @param {string} color
 * @return {WebGLBuffer} the vbo for this dimensions
 */
wa.cache.QuadVertexColorBufferLibrary.prototype.getVBO = function(color) {
    // create a key for lookup
    var key = "" + color;
    var vbo = this.cache[key];
    if (typeof vbo !== 'undefined') {
        // return if we found it
        return vbo;
    }
    return null;
};

/**
 * create a color vbo with color as the key and the data
 * @param {string} color the key to the cache
 * @param {Float32Array} data
 * @return {WebGLBuffer}
 */
wa.cache.QuadVertexColorBufferLibrary.prototype.createVBO = function(color, data) {
    // if not, let's create a vbo
    var buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

    // set the data into the vbo
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    buffer.itemSize = wa.render.RenderConstants.FLOATS_PER_COLOR;
    buffer.numItems = wa.cache.QuadShapeConst.NUM_VERTICES;

    var key = color;
    // now we have our buffer, let's store it into our cache
    this.cache[key] = buffer;
    // and return this buffer
    return buffer;
};