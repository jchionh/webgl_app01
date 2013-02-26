/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 11:02 PM
 */
// namespace
wa.entity = wa.entity || {};

/**
 * Image entity is a rectangle in 3D space which texture maps to an image
 * @constructor
 * @extends wa.entity.Entity
 */
wa.entity.ImageEntity = function() {
    // calls the base class ctor
    wa.entity.Entity.call(this);

    // now we have a shape
    this.shape = new wa.render.QuadShape();

    // let's have an image object to store image data too
    this.image = new Image();

    // here's out texture object used for texture mapping
    // it's inited with the default untextured 1x1 white texture
    this.texture = wa.gTextureLibrary.getTexture(wa.render.RenderConstants.DEFAULT_TEXTURE_ID);

    var that = this;
    this.image.onload = function() {
        //that.setDimensions(that.image.width, that.image.height);
        // onload, add this image to the textture library
        // and get a texture object in return for drawing
        var texture = wa.gTextureLibrary.addTexture(that.image);
        //console.log("w: " + that.image.width + " h: " + that.image.height);
        that.texture = texture;
    };
};

// extend image entity from entity
wa.utils.extend(wa.entity.ImageEntity, wa.entity.Entity);

/**
 * set the image dimensions
 * @param {number} width
 * @param {number} height
 */
wa.entity.ImageEntity.prototype.setDimensions = function(width, height) {
    this.shape.setDimensions(width, height);
};

/**
 * load the image data
 * on URL assignment into the Image object, it will fetch the image data
 * from the URL, and then call the callback onload() when done.
 * @param {string} imageURL
 */
wa.entity.ImageEntity.prototype.loadImageURL = function(imageURL) {
    this.image.src = imageURL;
};

/**
 * override the draw texture method to draw textures here
 * @override
 * @param {WebGLRenderingContext} gl
 * @param {wa.render.ShaderHandleRefs} shaderHandleRefs
 */
wa.entity.ImageEntity.prototype.drawTexture = function(gl, shaderHandleRefs) {

    // set the active texture and bind
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture.textureHandle);
    gl.uniform1i(shaderHandleRefs.texSamplerHandle, 0);

    var texCoordBuffer = this.shape.getTexCoordBufferObject();
    var texCoordHandle = shaderHandleRefs.texCoordHandle;
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.enableVertexAttribArray(texCoordHandle);
    gl.vertexAttribPointer(texCoordHandle, wa.render.RenderConstants.FLOATS_PER_TEX_COORD, gl.FLOAT, false, 0, 0);

    // now let's calculate our texture matrix
    this.calcTexMatrix();

    // and send this tex matrix up into the shader
    gl.uniformMatrix4fv(shaderHandleRefs.texMatrixHandle, false, this.texMatrix);
};

