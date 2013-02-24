/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 4:29 AM
 */

// namespace
wa.utils = wa.utils || {};

/**
 * this is a intrusive list node (extra parent and child added for use in a tree)
 * @constructor
 */
wa.utils.IntrusiveListNode = function() {
    this.nParent = null;
    this.nSibling = null;
    this.nFirstChild = null;
};
