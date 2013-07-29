// here's the calculated model-view-projection matrix
uniform mat4 u_MVPMatrix;
// here's the texture transform matrix
uniform mat4 u_TexMatrix;

// per-vertex position
attribute vec3 a_Position;
// per-vertex color
attribute vec4 a_Color;
// texture coordinate
attribute vec2 a_TexCoord;

// tex coord to pass to the frag shader
varying vec2 v_TexCoord;
// color passed to the frag shader
varying vec4 v_Color;

// main program
void main()
{
    // vertex color passed into the varying (to be interpolated per fragment)
    v_Color = a_Color;

    // transform our vertex coords here
    vec4 texTransformed = u_TexMatrix * vec4(a_TexCoord.x, a_TexCoord.y, 0.0, 1.0);
    v_TexCoord = texTransformed.xy;

    // transform our vertex here
    gl_Position = u_MVPMatrix * vec4(a_Position, 1.0);
}