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
    // constants
    this.MAX_NUM_RENDER_OBJECTS = 100;

    // members
    this.gl = gl;
    // our shaderhandle refs sturcture
    this.shaderHandleRefs = new wa01.render.ShaderHandleRefs();
    this.currentRenderObjectIndex = 0;
    this.lastRenderObjectIndex = 0;
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
    this.shaderHandleRefs.shaderProgram = shaderProgram;
    // get our arrtibute handles
    this.shaderHandleRefs.posHandle = this.gl.getAttribLocation(shaderProgram, "a_Position");
    this.shaderHandleRefs.colorHandle = this.gl.getAttribLocation(shaderProgram, "a_Color");
    this.shaderHandleRefs.texCoordHandle = this.gl.getAttribLocation(shaderProgram, "a_TexCoord");
    this.shaderHandleRefs.matrixHandle = this.gl.getUniformLocation(shaderProgram, "u_MVPMatrix");
    this.shaderHandleRefs.texMatrixHandle = this.gl.getUniformLocation(shaderProgram, "u_TexMatrix");
    this.shaderHandleRefs.texSamplerHandle = this.gl.getUniformLocation(shaderProgram, "u_Texture");
    //console.log("texSamplerHandle: " + this.shaderHandleRefs.texSamplerHandle);
}

/**
 * here is our render function that iterates over our render objects and render them
 */
wa01.render.Renderer.prototyp.render = function() {

}