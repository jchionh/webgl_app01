/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 9:47 PM
 */
// namespace
wa.render = wa.render || {};

// quad shape constants
wa.render.QuadShapeConst = {};
wa.render.QuadShapeConst.NUM_VERTICES = 4;
wa.render.QuadShapeConst.VERTICES = [
    -0.5,  0.5, 0.0, // top left
    -0.5, -0.5, 0.0, // bot left
     0.5,  0.5, 0.0, // top right
     0.5, -0.5, 0.0  // bot right
];
wa.render.QuadShapeConst.VERTEX_COLORS = [
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0
];
wa.render.QuadShapeConst.TEX_COORDS = [
    0.0, 0.0, // top left
    0.0, 1.0, // bot left
    1.0, 0.0, // top right
    1.0, 1.0  // bot right
];

/**
 * Quad shape defines a quad
 * @constructor
 * @extends wa.render.Shape
 */
wa.render.QuadShape = function() {
    // call our base class ctor
    wa.render.Shape.call(this);

    // we new some storage vertices here
    this.vertexArray = new Array(wa.render.QuadShapeConst.NUM_VERTICES * wa.render.RenderConstants.FLOATS_PER_VTX);
    this.texCoordArray = new Array(wa.render.QuadShapeConst.NUM_VERTICES * wa.render.RenderConstants.FLOATS_PER_TEX_COORD);

    // now init our buffers
    this.initVertices(wa.render.QuadShapeConst.VERTICES);
    this.initVtxColors(wa.render.QuadShapeConst.VERTEX_COLORS);
    this.initTexCoords(wa.render.QuadShapeConst.TEX_COORDS);
};

// quad shape extends from shape
wa.utils.extend(wa.render.QuadShape, wa.render.Shape);

/**
 * here we set the dims of the quad, this will re-init the vertex buffers
 * @param {number} width
 * @param {number} height
 */
wa.render.QuadShape.prototype.setDimensions = function(width, height) {
    // iterate and set values into our temp float buffer
    // and set the values straight
    for (var i = 0; i < wa.render.QuadShapeConst.NUM_VERTICES; ++i) {
        // for every vertex, multiply with the width and height
        var row = i * wa.render.RenderConstants.FLOATS_PER_VTX;
        this.vertexArray[row + v.X] = wa.render.QuadShapeConst.VERTICES[row + v.X] * width;
        this.vertexArray[row + v.Y] = wa.render.QuadShapeConst.VERTICES[row + v.Y] * height;
        this.vertexArray[row + v.Z] = 0.0;
    }
    // init a new vertex buffer
    this.initVertices(this.vertexArray);
};

/**
 * set the dimensions of the texture mapping
 * @param {number} width
 * @param {number} height
 */
wa.render.QuadShape.prototype.setTexDimensions = function(width, height) {
    // iterate and set tex coords dimensions
    for (var i = 0; i < wa.render.QuadShapeConst.NUM_VERTICES; ++i) {
        // for every vertex, set the tex coord values
        var row = i * wa.render.RenderConstants.FLOATS_PER_TEX_COORD;
        this.texCoordArray[row + v.X] = wa.render.QuadShapeConst.TEX_COORDS[row + v.X] * width;
        this.texCoordArray[row + v.Y] = wa.render.QuadShapeConst.TEX_COORDS[row + v.Y] * height;
    }
    // then we init our tex coords
    this.initTexCoords(this.texCoordArray);
};
