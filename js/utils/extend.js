/**
 * Created with JetBrains WebStorm.
 * User: jchionh
 * Date: 2/20/13
 * Time: 11:40 PM
 * To change this template use File | Settings | File Templates.
 */
// create namespace
wa01.utils = wa01.utils || {};

//implement the extend using prototype inheritance extend method
wa01.utils.extend = function(newObject, baseObject) {
    newObject.prototype = new baseObject();
    newObject.prototype.constructor = newObject;
};
