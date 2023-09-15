// varying vec2 vUv;
// uniform vec2 cursorUV;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    // float strength = random(vUv);
    // vec2 gridUv = vec2(floor(vUv.x * 40.0) / 10.0, floor(vUv.y * 40.0) / 10.0);
    // float strength = random(gridUv);
    // float alpha = 0.5 - 0.05 / (distance(vUv, cursorUV));
    // if(cursorUV.x == 2.0){
    //     alpha = 0.5;
    // }
    // gl_FragColor = vec4(strength - 0.2, strength, strength-0.4,alpha);
    gl_FragColor = vec4(1.0, 1.0,0.0,0.1);
}