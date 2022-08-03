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
}