export const vertexShader = `
uniform vec3 uLightPos;

varying vec3 vNormal;
varying vec3 vSurfaceToLight;

void main(void) {
  
  vNormal = normalMatrix * normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  // General calculations needed for diffuse lighting
  // Calculate a vector from the fragment location to the light source
  vec3 surfaceToLightDirection = vec3( modelViewMatrix * vec4(position, 1.0));
  vec3 worldLightPos = vec3( viewMatrix * vec4(uLightPos, 1.0));
  vSurfaceToLight = normalize(worldLightPos - surfaceToLightDirection);
}

`;
export const fragmentShader = `
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform vec3 uColor;
uniform vec3 uLightColor;
uniform float uLightIntensity;
uniform float uNoiseScale;

varying vec3 vNormal;
varying vec3 vSurfaceToLight;

void main(void) {
  vec3 light_value = light_reflection(uLightColor);
  light_value *= uLightIntensity;

  // grain
  vec2 uv = gl_FragCoord.xy;
  uv /= uNoiseScale;

  vec3 colorNoise = vec3(snoise2(uv));

  gl_FragColor = vec4(colorNoise, 1.0);
}`;
