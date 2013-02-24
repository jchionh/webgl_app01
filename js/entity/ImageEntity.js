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
};

wa.utils.extend(wa.entity.ImageEntity, wa.entity.Entity);

/**
 * set the image dimensions
 * @param {number} width
 * @param {number} height
 */
wa.entity.ImageEntity.prototype.setDimensions = function(width, height) {
    this.shape.setDimensions(width, height);
};
