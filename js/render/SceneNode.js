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

};

// perform prototype extend
wa.utils.extend(wa.render.SceneNode, wa.utils.IntrusiveListNode);