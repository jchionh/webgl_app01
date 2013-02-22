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
    this.shaderProgram = null; // WebGLProgram
    this.posHandle = 0; // GLint
    this.colorHandle = 0; // GLint
    this.matrixHandle = null; // WebGLUniformLocation
    this.texMatrixHandle = null; // WebGLUniformLocation
    this.texSamplerHandle = null; // WebGLUniformLocation
    this.texCoordHandle = 0; // GLint
}
