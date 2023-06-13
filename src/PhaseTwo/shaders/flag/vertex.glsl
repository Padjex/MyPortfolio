uniform float uTime;

varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // float x = modelPosition.z;

    // modelPosition.x -= sin(modelPosition.z ) * uBigElevation * x;

    modelPosition.z += sin((uv.x * 40.0) + uTime) * (uv.x) * 0.8 ;
    modelPosition.z += sin((uv.y * 10.0) + uTime) * (1.0 - uv.y) * 0.4;
    
    // modelPosition.x = 5.0;
   
    


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;
}