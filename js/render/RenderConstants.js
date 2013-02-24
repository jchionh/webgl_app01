/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 8:40 PM
 */
// namespace
wa.render = wa.render || {};
// static object for constants
wa.render.RenderConstants = {};

wa.render.RenderConstants.FLOATS_PER_VTX = 3;
wa.render.RenderConstants.FLOATS_PER_TEX_COORD = 2;

// these are in sort form for ease
var v = {};
v.X = 0;
v.Y = 1;
v.Z = 2;
v.W = 3;

var o = {};
o.PITCH = 0;
o.YAW   = 1;
o.ROLL  = 2;
