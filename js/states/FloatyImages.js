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

    var canvasWidth = wa.gCanvasElement.width * 1.0;
    var halfCanvasWidth = canvasWidth / 2.0;
    var canvasHeight = wa.gCanvasElement.height * 1.0;
    var halfCanvasHeight = canvasHeight / 2.0;

    // now init all our images in the imageList
    for (var i = 0; i < wa.data.ImageListURLs.length; ++i) {
        var imageEntity = new wa.entity.ImageEntity();
        // load images
        imageEntity.loadImageURL(wa.data.ImageListURLs[i]);

        // randomize positions
        imageEntity.position[v.X] = Math.floor(Math.random() * canvasWidth) - halfCanvasWidth;
        imageEntity.position[v.Y] = Math.floor(Math.random() * canvasHeight) - halfCanvasHeight;
        imageEntity.position[v.Z] = Math.floor(Math.random() * -1000.0);
        imageEntity.rotationSpeed = Math.random() * 0.003;
        imageEntity.translateSpeed = Math.random() * 5.0;

        // add to our scene
        wa.utils.inList.addChild(root, imageEntity);
        this.imageEntities.push(imageEntity);
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
        this.imageEntities[i].update(dt);
    }
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

