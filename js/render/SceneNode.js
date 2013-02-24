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

    // here's our texture transforms
    // they are all 2D transforms, but we use vec3 simply
    // because that is what we have in our matrix library
    this.texTranslate = vec3.create();
    this.texRotate = vec3.create();
    this.texScale = vec3.create();

    // and here's our transform
    this.modelMatrix = mat4.create();
    this.texMatrix = mat4.create();

    // indentity our matrices
    mat4.identity(this.modelMatrix);
    mat4.identity(this.texMatrix);
};

// perform prototype extend
wa.utils.extend(wa.render.SceneNode, wa.utils.IntrusiveListNode);