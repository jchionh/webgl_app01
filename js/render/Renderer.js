/**
 * User: jchionh
 * Date: 2/21/13
 * Time: 10:52 PM
 */

// create namespace
wa01.render = wa01.render || {};

/**
 *
 * @param {WebGLRenderingContext} gl
 * @constructor
 */
wa01.render.Renderer = function(gl) {
    this.gl = gl;
    // our shaderhandle refs sturcture
    this.shaderHandleRefs = new wa01.render.ShaderHandleRefs();
}

/**
 * init our shaders and shader program
 * @param {string} vtxShaderId the script tag id that has our vertex shader
 * @param {string} fragShaderId the script tag id that has out fragment shader
 */
wa01.render.Renderer.prototype.initDefaultShaders = function(vtxShaderId, fragShaderId) {
    // first we compile our shaders
    var vtxShader = wa01.utils.compileShaderFromScriptElement(this.gl, "vtxShader");
    var fragShader = wa01.utils.compileShaderFromScriptElement(this.gl, "fragShader");
    // then let's link our program
    var attribNames = ["a_Position", "a_Color", "a_TexCoord"];
    var shaderProgram = wa01.utils.createShaderProgram(this.gl, vtxShader, fragShader, attribNames);
    // assign to tour shader refs
    this.shaderHandleRefs.programHandle = shaderProgram;
}
