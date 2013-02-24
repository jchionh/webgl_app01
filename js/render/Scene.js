/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 4:05 AM
 */

// namespace
wa.render = wa.render || {};

/**
 * Scene is a structure that is a tree.
 * Data structure of the tree is implemented using intrusive lists.
 * @constructor
 */
wa.render.Scene = function() {
    this.nRoot = new wa.render.SceneNode();
};

/**
 *
 * @param sceneNode
 */
wa.render.Scene.prototype.add = function(sceneNode) {

};
