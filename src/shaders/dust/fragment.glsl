uniform vec2 vUv;
uniform float uTime;
uniform float maxHeight;

varying vec3 vColor;
varying float modelPositionY;

void main()
{
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength *= 2.0;
    strength = 1.0 - strength;

    vec3 color = mix(vec3(0.0), vColor, strength);
    float alpha = 1.0 - (modelPositionY) / (maxHeight);

    gl_FragColor = vec4(color, 1.0);
}