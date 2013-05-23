/**
 * User: jchionh
 * Date: 3/3/13
 * Time: 10:31 PM
 */
// namespace
wa.states = wa.states || {};

/**
 *
 * // loads up images and floats them in 3D space
 *
 * @constructor
 * @extends wa.runstate.GLRunState
 */
wa.states.FloatyImages = function() {
    // call the super class init
    wa.runstate.GLRunState.call(this, wa.runstate.RunFlag.SUSPEND_LOWER);
    this.scene = new wa.render.Scene();
    /**
     *
     * @type {Array<wa.entity.ImageEntity>}
     */
    this.imageEntities = [];
};

// extend from GLRunState
wa.utils.extend(wa.states.FloatyImages, wa.runstate.GLRunState);


/**
 * onstart
 * @override
 */
wa.states.FloatyImages.prototype.onStart = function() {
    console.log('FloatyImages::onStart');
    var root = this.scene.getRoot();

    var canvasWidth = wa.gCanvasElement.clientWidth;
    var halfCanvasWidth = canvasWidth / 2.0;
    var canvasHeight = wa.gCanvasElement.clientWidth;
    var halfCanvasHeight = canvasHeight / 2.0;

    // create our image entities
    this.imageEntities = wa.utils.createImageEntityArray(wa.data.ImageListURLs);

    // now init all our images to positions, and add to our scene
    for (var i = 0; i < this.imageEntities.length; ++i) {
        var imageEntity = this.imageEntities[i];
        // randomize positions
        imageEntity.position[v.X] = Math.floor(Math.random() * canvasWidth) - halfCanvasWidth;
        imageEntity.position[v.Y] = Math.floor(Math.random() * canvasHeight) - halfCanvasHeight;
        imageEntity.position[v.Z] = Math.floor(Math.random() * -1000.0);
        imageEntity.rotationSpeed = Math.random() * 0.003;
        imageEntity.translateSpeed = Math.random() * 5.0;

        // add to our scene
        wa.utils.inList.addChild(root, imageEntity);
    }
};

/**
 * onstop
 * @override
 */
wa.states.FloatyImages.prototype.onStop = function() {
    // cleanup
    var count = this.imageEntities.length;
    for (var i = 0; i < count; ++i) {
        this.imageEntities[i].release();
        this.imageEntities[i] = null;
    }
    // clear the array
    this.imageEntities.length = 0;
    this.imageEntities = null;

    // release our scene
    this.scene.release();
    this.scene = null;
    console.log('FloatyImages::onStop');
};

/**
 * update
 * @override
 * @param {number} dt
 */
wa.states.FloatyImages.prototype.onUpdate = function(dt) {
    //console.log('FloatyImages::onUpdate');
    // traverse through our image entites and update them
    var count = this.imageEntities.length;
    for (var i = 0; i < count; ++i) {
        //this.imageEntities[i].update(dt);
        this.floatImage(this.imageEntities[i], dt);
    }
};

/**
 * float animate the images
 * @param {wa.entity.ImageEntity} imageEntity
 * @param {number} dt
 */
wa.states.FloatyImages.prototype.floatImage = function(imageEntity, dt) {
    imageEntity.orientation[o.PITCH] += imageEntity.rotationSpeed;
    if (imageEntity.orientation[o.PITCH] > 360.0) {
        imageEntity.orientation[o.PITCH] -= (imageEntity.orientation[o.PITCH] - 360.0);
    }

    imageEntity.orientation[o.ROLL] -= imageEntity.rotationSpeed;
    if (imageEntity.orientation[o.ROLL] < 0.0) {
        imageEntity.orientation[o.ROLL] += (360.0 - imageEntity.orientation[o.ROLL]);
    }

    if (imageEntity.position[v.Z] > 0.0 || imageEntity.position[v.Z] < -1000.0) {
        imageEntity.direction *= -1.0;
        imageEntity.rotationSpeed = Math.random() * 0.003;
        imageEntity.translateSpeed = Math.random() * 5.0;
        imageEntity.position[v.Z] += (imageEntity.direction * 5.5);
    }
    imageEntity.position[v.Z] += (imageEntity.direction * imageEntity.translateSpeed);
};

/**
 * @override
 * @param {number} dt
 * @param {WebGLRenderingContext} gl
 */
wa.states.FloatyImages.prototype.onRender = function(dt, gl) {
    //console.log('FloatyImages::onRender');
    wa.gRenderer.render(gl, this.scene);
};

