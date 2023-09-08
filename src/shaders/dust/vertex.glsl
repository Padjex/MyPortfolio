attribute float aScale;
attribute vec3 aColor;
attribute float aUpSpeedRandomness;


uniform float uSize;
uniform float uTime;
uniform float uSpeedUp;
uniform float centerX;
uniform float centerZ;
uniform float maxHeight;
uniform float maxWidth;

varying vec3 vColor;
varying float modelPositionY;


 void main()
{
    /**
     * Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // DustAnimation Y
    float animationPositionY = uTime * uSpeedUp * aUpSpeedRandomness; 
    modelPosition.y += sin(animationPositionY * maxWidth) * maxHeight;

    // DustAnimation X
    float animationPositionX = uTime * uSpeedUp * aUpSpeedRandomness;
    float xDirection = step(centerX,modelPosition.x);
    animationPositionX = mix(-animationPositionX,animationPositionX,xDirection);
    // modelPosition.x += animationPositionX * abs(modelPosition.x);
    
    // DustAnimation Z
    float animationPositionZ = uTime * uSpeedUp * aUpSpeedRandomness;
    float zDirection = step(centerZ,modelPosition.z);
    animationPositionZ = mix(-animationPositionZ,+animationPositionZ,       zDirection);
    // modelPosition.z += animationPositionZ * abs(modelPosition.z);

 
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

   

    /**
     * Size
     */
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / -viewPosition.z);

    vColor = aColor;
    modelPositionY = modelPosition.y;
}