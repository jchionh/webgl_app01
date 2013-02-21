/**
 * User: jchionh
 * Date: 2/21/13
 * Time: 1:24 AM
 */
// create namespace
wa01.utils = wa01.utils || {};

/**
 *
 * we search the document for the script tag that contains the shader
 * and we compile it and return it.
 *
 * @param {Object} gl the gl context
 * @param {string} id the id of the script tag that has this shader
 */
wa01.utils.compileShaderFromScriptElement = function (gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    // get the shader source text
    var shaderSource = shaderScript.text;

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    // load the source into our shader object
    gl.shaderSource(shader, shaderSource);

    // compile our shader object
    gl.compileShader(shader);

    // check our compile status
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        // get the error for our compile
        var errorStr = gl.getShaderInfoLog(shader);
        console.log("Error compiling shader: " + errorStr);
        gl.deleteShader(shader);
        return null;
    }
    console.log("Shader compiled: " + id);
    return shader;
}