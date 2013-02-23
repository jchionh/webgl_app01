/**
 * User: jchionh
 * Date: 2/21/13
 * Time: 10:52 PM
 */

// create namespace
wa.render = wa.render || {};

/**
 *
 * @param {WebGLRenderingContext} gl
 * @constructor
 */
wa.render.Renderer = function(gl) {
    // constants
    this.MAX_NUM_RENDER_OBJECTS = 100;
    // our shaderhandle refs sturcture
    this.shaderHandleRefs = new wa.render.ShaderHandleRefs();
    this.currentRenderObjectIndex = 0;
    this.lastRenderObjectIndex = 0;
    gl.clearColor(0.3, 0.3, 0.3, 1.0);
    gl.enable(gl.DEPTH_TEST);
}

/**
 * init our shaders and shader program
 * @param {WebGLRenderingContext} gl
 * @param {string} vtxShaderId the script tag id that has our vertex shader
 * @param {string} fragShaderId the script tag id that has out fragment shader
 */
wa.render.Renderer.prototype.initDefaultShaders = function(gl, vtxShaderId, fragShaderId) {
    // first we compile our shaders
    var vtxShader = wa.utils.compileShaderFromScriptElement(gl, "vtxShader");
    var fragShader = wa.utils.compileShaderFromScriptElement(gl, "fragShader");
    // then let's link our program
    var attribNames = ["a_Position", "a_Color", "a_TexCoord"];
    var shaderProgram = wa.utils.createShaderProgram(gl, vtxShader, fragShader, attribNames);
    // assign to tour shader refs
    this.shaderHandleRefs.shaderProgram = shaderProgram;
    // get our arrtibute handles
    this.shaderHandleRefs.posHandle = gl.getAttribLocation(shaderProgram, "a_Position");
    this.shaderHandleRefs.colorHandle = gl.getAttribLocation(shaderProgram, "a_Color");
    this.shaderHandleRefs.texCoordHandle = gl.getAttribLocation(shaderProgram, "a_TexCoord");
    this.shaderHandleRefs.matrixHandle = gl.getUniformLocation(shaderProgram, "u_MVPMatrix");
    this.shaderHandleRefs.texMatrixHandle = gl.getUniformLocation(shaderProgram, "u_TexMatrix");
    this.shaderHandleRefs.texSamplerHandle = gl.getUniformLocation(shaderProgram, "u_Texture");
    //console.log("texSamplerHandle: " + this.shaderHandleRefs.texSamplerHandle);
}

/**
 * here is our render function that iterates over our render objects and render them
 * @param {WebGLRenderingContext} gl
 * @param {wa.Scene} scene renderer traverses the scene graph and renders every scene node
 */
wa.render.Renderer.prototype.render = function(gl, scene) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}