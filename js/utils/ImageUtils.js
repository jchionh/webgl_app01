/**
 * User: jchionh
 * Date: 2/28/13
 * Time: 10:38 PM
 */

// namespace
wa.utils = wa.utils || {};

/**
 *
 * @param {number} x
 * @return {Boolean}
 */
wa.utils.isPowerOfTwo = function(x) {
    return (x & (x - 1)) == 0;
};

/**
 *
 * @param {number} x
 * @return {number}
 */
wa.utils.nextHighestPowerOfTwo = function(x) {
    --x;
    for (var i = 1; i < 32; i <<= 1) {
        x |= x >> i;
    }
    return x + 1;
};

/**
 *
 * given a array of string for the urls of the images, create and return
 * the array of image entities backed by these images.
 *
 * @param {Array.<string>} imageUrlArray
 * @return {Array.<wa.entity.ImageEntity>} the array of image entities
 */
wa.utils.createImageEntityArray = function(imageUrlArray) {
    var imageEntityArray = [];
    // now init all our images in the imageList
    for (var i = 0; i < imageUrlArray.length; ++i) {
        var imageEntity = new wa.entity.ImageEntity();
        // load images
        imageEntity.loadImageURL(imageUrlArray[i]);
        // add them to our array
        imageEntityArray.push(imageEntity);
    }
    return imageEntityArray;
};
