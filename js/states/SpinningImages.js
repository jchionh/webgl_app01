/**
 * User: jchionh
 * Date: 5/3/13
 * Time: 9:54 PM
 */
// namespace
wa.states = wa.states || {};

/**
 *
 * // loads up images and spins them
 *
 * @constructor
 * @extends wa.runstate.GLRunState
 */
wa.states.SpinningImages = function() {
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
wa.utils.extend(wa.states.SpinningImages, wa.runstate.GLRunState);


/**
 * onstart
 * @override
 */
wa.states.SpinningImages.prototype.onStart = function() {
    console.log('SpinningImages::onStart');
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
wa.states.SpinningImages.prototype.onStop = function() {
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
    console.log('SpinningImages::onStop');
};

/**
 * update
 * @override
 * @param {number} dt
 */
wa.states.SpinningImages.prototype.onUpdate = function(dt) {
    //console.log('SpinningImages::onUpdate');
    // traverse through our image entites and update them
    var count = this.imageEntities.length;
    for (var i = 0; i < count; ++i) {
        //this.imageEntities[i].update(dt);
        this.spinImage(this.imageEntities[i], dt);
    }
};


/**
 * spin animate the images
 * @param {wa.entity.ImageEntity} imageEntity
 * @param {number} dt
 */
wa.states.SpinningImages.prototype.spinImage = function(imageEntity, dt) {
    imageEntity.orientation[o.ROLL] += imageEntity.rotationSpeed;
};



/**
 * @override
 * @param {number} dt
 * @param {WebGLRenderingContext} gl
 */
wa.states.SpinningImages.prototype.onRender = function(dt, gl) {
    //console.log('SpinningImages::onRender');
    wa.gRenderer.render(gl, this.scene);
};