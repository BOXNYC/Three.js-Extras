# Three.js ~ ChromaKeyVideoShaderMaterial.js
Chroma Key Shader Material w/ Video Texture

## Arguments
ChromaKeyVideoShaderMaterial( video: \<HTMLVideoElement\>, [chromaKey: \<color\>, range: \<float\>] ): ShaderMaterial
- video [HTMLVideoElement] HTML Video Element.
- chromaKey [Mixed] Color name passed to THREE.Color(). Default: 0xd400
- range [float] Color range to key. Default 0.5

## Properiets
- .chromaKey - Gets and sets the .uniforms.chromaKey THREE.Color() instance object value
- .range - Gets and sets the .uniforms.range float value.
- .map - Gets the THREE.VideoTexture() instance object value.
- .video - Gets the HTMLVideoElement THREE.VideoTexture().image value.

## Useage Example
```javascript
var videoEl = document.getElementById('video')
var videoPlane = null
function loadeddata(e) {
  var videoMaterial = new THREE.ChromaKeyVideoShaderMaterial( videoEl );
  var videoGeo = new THREE.PlaneGeometry( videoEl.videoWidth, videoEl.videoHeight, 1 );
  videoPlane = new THREE.Mesh( videoGeo, videoMaterial );
  var scale = 0.01;
  videoPlane.scale.set( scale, scale, scale );
  scene.add( videoPlane );
}
videoEl.addEventListener( 'loadeddata', loadeddata )
```
