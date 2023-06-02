uniform float uBigElevation;

varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float x = modelPosition.z;

    // modelPosition.x -= sin(modelPosition.z ) * uBigElevation * x;

    modelPosition.z += cos((uv.x * 40.0)) * (1.0 - uv.x);
    // modelPosition.x = 5.0;
   
    


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;
}