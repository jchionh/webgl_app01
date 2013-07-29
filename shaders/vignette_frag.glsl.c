// set medium precision on the frag shader
precision mediump float;

// here's the input shader
uniform sampler2D u_Texture;
uniform bool u_doVignette;
uniform float u_vigOuterBorder;
uniform float u_vigFade;
uniform float u_fStop;
uniform float u_texCenterU;
uniform float u_texCenterV;

// here's the interpolated vertex color for this fragment
varying vec4 v_Color;
// and the interpolated tex coord
varying vec2 v_TexCoord;

// user vars
float vigInnerBorder = 0.0;

float vignette()
{
    if (!u_doVignette) {
        return 1.0;
    }
    float dist = distance(v_TexCoord.xy, vec2(u_texCenterU, u_texCenterV));
    dist = smoothstep(u_vigOuterBorder + (u_fStop / u_vigFade), vigInnerBorder + (u_fStop / u_vigFade), dist);
    return clamp(dist, 0.0, 1.0);
}

// main program
void main()
{
    // final color is the vertex color with the texture
    gl_FragColor = vignette() * v_Color * texture2D(u_Texture, v_TexCoord);
    gl_FragColor.a = 1.0;
}