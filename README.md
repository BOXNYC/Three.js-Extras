# Three.js ~ Holograms
Tools for creating Three.js Hologram Plannar videos!

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

## Hologram Geometry & Mesh
HologramGeometry( width, height, feetOffset, widthSegments, heightSegments ): PlaneGeometry
- width & height : Same as PlaneGeometry
- feetOffset [Vector2] Pivot offset from bottom center. Default: new THREE.Vector2()
- widthSegments & heightSegments : Same as PlaneGeometry

HologramMesh( geometry, material ): Mesh
- geometry & material : Same as Mesh

## Properties
- HologramGeometry().feetOffset - Gets and sets the offset pivot. Default: new THREE.Vector2()

## Methods
- HologramMesh().rotateYToCamera( camera \<PerspectiveCamera\> )

