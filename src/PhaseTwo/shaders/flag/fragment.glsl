varying vec2 vUv;

#define M_PI 3.1415926535897932384626433832795

void main()
{

    float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);
    strength = strength - 0.5;
    gl_FragColor = vec4(0.2,strength,0.4, 1.0);
}