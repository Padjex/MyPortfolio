attribute float aScale;
attribute vec3 aColor;
attribute float aUpSpeedRandomness;


uniform float uSize;
uniform float uTime;
uniform bool uStartAnimation;
uniform float uSpeedUp;

varying vec3 vColor;


 void main()
{
    /**
     * Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // DustAnimation
    float animationPositionY = uTime * aUpSpeedRandomness * uSpeedUp; 
    // modelPosition.y = mix(0.0,animationPositionY,uStartAnimation);
    modelPosition.y += animationPositionY;
    
 
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

   

    /**
     * Size
     */
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / -viewPosition.z);

    vColor = aColor;
}