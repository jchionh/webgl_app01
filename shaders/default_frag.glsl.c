// set medium precision on the frag shader
precision mediump float;

// here's the input shader
uniform sampler2D u_Texture;

// here's the interpolated vertex color for this fragment
varying vec4 v_Color;
// and the interpolated tex coord
varying vec2 v_TexCoord;

// main program
void main()
{
    // final color is the vertex color with the texture
    gl_FragColor = v_Color * texture2D(u_Texture, v_TexCoord);
}