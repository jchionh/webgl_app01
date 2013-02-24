/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 9:05 PM
 */
// namespace
wa.render = wa.render || {};

/**
 * Shape contains the information to define a 3D shape
 * - the vertex buffers
 * - the texture coordinate buffers
 * - the vertex colors
 * @constructor
 */
wa.render.Shape = function() {
    this.vertices = null;
    this.vtxColors = null;
    this.texCoords = null;
    this.numVertices = 0;
};

/**
 *
 * @param {Array.<number>} vertexArray
 */
wa.render.Shape.prototype.initVertices = function(vertexArray) {
    this.vertices = new Float32Array(vertexArray);
    this.numVertices = vertexArray.length / wa.render.RenderConstants.FLOATS_PER_VTX;
};

/**
 *
 * @param {Array.<number>} vtxColorArray
 */
wa.render.Shape.prototype.initVtxColors = function(vtxColorArray) {
    this.vtxColors = new Float32Array(vtxColorArray);
};

/**
 *
 * @param {Array.<number>} texCoordArray
 */
wa.render.Shape.prototype.initTexCoords = function(texCoordArray) {
    this.texCoords = new Float32Array(texCoordArray);
};

/**
 *
 * @return {number} the number of vertices
 */
wa.render.Shape.prototype.getNumVertices = function() {
    return this.numVertices;
};

/**
 *
 * @return {Float32Array} vertex array
 */
wa.render.Shape.prototype.getVertices = function() {
    return this.vertices;
};

/**
 *
 * @return {Float32Array} the vertex colors
 */
wa.render.Shape.prototype.getVtxColors = function() {
    return this.vtxColors;
};

/**
 *
 * @return {Float32Array} the texture coords
 */
wa.render.Shape.prototype.getTexCoords = function() {
    return this.texCoords;
};