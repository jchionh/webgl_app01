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

    this.rotationSpeed = 0.0;

    var that = this;
    this.image.onload = function() {
        // cache the values
        var imageWidth = that.image.width * 1.0;
        var imageHeight = that.image.height * 1.0;

        // when we get an image, we'll need to scale it down to our max texture dimension
        var widthScale =  wa.render.RenderConstants.MAX_TEXTURE_DIMENSION / imageWidth;
        var heightScale = wa.render.RenderConstants.MAX_TEXTURE_DIMENSION / imageHeight;
        // we'll choose the smallest scale to scale both dimesnions down
        var scale = widthScale < heightScale ? widthScale : heightScale;
        // we apply the scale only if we need to scale down to fit the maximum dims
        scale = scale < 1.0 ? scale : 1.0;
        var scaledImageWidth = imageWidth * scale;
        var scaledImageHeight = imageHeight * scale;
        that.image.width = Math.floor(scaledImageWidth);
        that.image.height = Math.floor(scaledImageHeight);

        // now let's set our quad dimensions based on scaled image loaded values
        var quadWidthScale = wa.render.RenderConstants.MAX_QUAD_DIMENSION / scaledImageWidth;
        var quadHeightScale = wa.render.RenderConstants.MAX_QUAD_DIMENSION / scaledImageHeight;
        var quadScale = quadWidthScale < quadHeightScale ? quadWidthScale : quadHeightScale;
        quadScale = quadScale < 1.0 ? quadScale : 1.0;
        var scaledQuadWidth = scaledImageWidth * quadScale;
        var scaledQuadHeight = scaledImageHeight * quadScale;

        that.setDimensions(Math.floor(scaledQuadWidth), Math.floor(scaledQuadHeight));

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


/**
 * @override
 * @param {WebGLRenderingContext} gl
 * @param {wa.render.Renderer} renderer
 */
wa.entity.ImageEntity.prototype.draw = function(gl, renderer) {

    this.orientation[o.PITCH] += this.rotationSpeed;
    if (this.orientation[o.PITCH] > 360.0) {
        this.orientation[o.PITCH] -= (this.orientation[o.PITCH] - 360.0);
    }

    this.orientation[o.ROLL] -= this.rotationSpeed;
    if (this.orientation[o.ROLL] < 0.0) {
        this.orientation[o.ROLL] += (360.0 - this.orientation[o.ROLL]);
    }

    // call the super class draw
    wa.render.SceneNode.prototype.draw.call(this, gl, renderer);
};


