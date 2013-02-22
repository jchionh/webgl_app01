/**
 * User: jchionh
 * Date: 2/21/13
 * Time: 11:00 PM
 */

// namespace
wa01.render = wa01.render || {};
/**
 * structure that stores reference to the shader
 * @constructor
 */
wa01.render.ShaderHandleRefs = function() {
    this.programHandle = 0;
    this.posHandle = 0;
    this.colorHandle = 0;
    this.matrixHandle = 0;
    this.texMatrixHandle = 0;
    this.texSamplerHandle = 0;
    this.texCoordHandle = 0;
}
