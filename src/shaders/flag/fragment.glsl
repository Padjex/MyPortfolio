varying vec2 vUv;
varying float vElevation;
uniform sampler2D uTexture;

#define M_PI 3.1415926535897932384626433832795

void main()
{
    float square1 = step(0.1,max(abs(vUv.x-0.5), abs(vUv.y-0.5)));
    float square2 = 1.0 - step(0.14, max(abs(vUv.x - 0.5), abs(vUv.y-0.5)));
    float strength = square1 * square2;
    vec4 textureColor = texture2D(uTexture,vUv);
    textureColor.rgb *= vElevation + 2.2;

    gl_FragColor = textureColor;
}