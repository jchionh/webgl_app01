/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 4:11 AM
 */

// namesapce
wa.render = wa.render || {};

/**
 * SceneNode
 *
 * This is a data structure that contains transform information.
 *
 * It has pointers to its sibling and first child, implemented as intrusive lists
 *
 * @constructor
 * @extends wa.utils.IntrusiveListNode
 */
wa.render.SceneNode = function() {
    // call the base class ctor
    wa.utils.IntrusiveListNode.call(this);

    // now here's our transforms
    this.position = vec3.create();
    this.scale = vec3.create();
    this.orientation = vec3.create();
    // set scale to 1
    this.scale[v.X] = 1.0;
    this.scale[v.Y] = 1.0;
    this.scale[v.Z] = 1.0;

    // here's our texture transforms
    // they are all 2D transforms, but we use vec3 simply
    // because that is what we have in our matrix library
    this.texTranslate = vec3.create();
    this.texRotate = vec3.create();
    this.texScale = vec3.create();

    // set tex scale to 1
    this.texScale[v.X] = 1.0;
    this.texScale[v.Y] = 1.0;
    this.texScale[v.Z] = 1.0;

    // and here's our transform
    this.modelMatrix = mat4.create();
    this.texMatrix = mat4.create();

    // indentity our matrices
    mat4.identity(this.modelMatrix);
    mat4.identity(this.texMatrix);

    // we also have a shape object that defines our vertices to draw
    this.shape = null;
};

// perform prototype extend
wa.utils.extend(wa.render.SceneNode, wa.utils.IntrusiveListNode);

/**
 * here we calculate our model matrix
 */
wa.render.SceneNode.prototype.calcModelMatrix = function() {
    mat4.identity(this.modelMatrix);
    mat4.translate(this.modelMatrix, this.position);
    mat4.rotateX(this.modelMatrix, this.orientation[o.PITCH]);
    mat4.rotateY(this.modelMatrix, this.orientation[o.YAW]);
    mat4.rotateZ(this.modelMatrix, this.orientation[o.ROLL]);
    mat4.scale(this.modelMatrix, this.scale);
}

/**
 * calculate our tex matrix
 */
wa.render.SceneNode.prototype.calcTexMatrix = function() {
    mat4.identity(this.texMatrix);
    mat4.translate(this.texMatrix, this.texTranslate);
    mat4.rotateZ(this.texMatrix, this.texRotate[o.ROLL]);
    mat4.scale(this.texMatrix, this.texScale);
}

/**
 * takes the renderer and then draws the scene node
 * @param {wa.render.Renderer} renderer
 */
wa.render.SceneNode.prototype.draw = function(renderer) {
    //console.log("SceneNode: render: " + this.id);
    /*
    var shape = this.shape;
    var i = 0;
    i++;
    var b = i + 2;
    */
}
