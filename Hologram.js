
THREE.Hologram = function( video, options ) {
  
  var scope = this;
  
  options = options || {
    // chromaKey, chromaRange, chromaMult,
    // initVideoScale, feetOffset, widthSegments, heightSegments,
    // sillouetteShadow, sillouetteShadowOpacity,
    // blurShadow, blurShadowOpacity **TODO
  };
  if ( options.chromaRange ) options.range = options.chromaRange;
  if ( options.chromaMult ) options.mult = options.chromaMult;
  delete options.chromaRange;
  delete options.chromaMult;
  
  options.initVideoScale = options.initVideoScale || 0.01;
  options.sillouetteShadowOpacity = options.sillouetteShadowOpacity || 0.4;
  
  function loadeddata() {
    
    scope.material = new THREE.ChromaKeyVideoShaderMaterial( video, options );
    scope.geometry = new THREE.HologramGeometry(
      video.videoWidth * options.initVideoScale,
      video.videoHeight * options.initVideoScale,
      options.feetOffset,
      options.widthSegments,
      options.heightSegments
    );
    
    if ( options.sillouetteShadow ) {
      var hologramShadow = new THREE.Mesh(
        scope.geometry,
        new THREE.ChromaKeyVideoShaderMaterialShadow( scope.material.map, options )
      );
      hologramShadow.rotateX( THREE.Math.degToRad( -90 ) )
      scope.add( hologramShadow );
    }
    
  };
  
  video.addEventListener( 'loadeddata', loadeddata );
  if ( video.videoWidth ) loadeddata.call( video )
  
  THREE.HologramMesh.call( this );
  
  this.renderOrder = 1;
  
}

THREE.Hologram.prototype = Object.create( THREE.HologramMesh.prototype );
THREE.Hologram.prototype.constructor = THREE.Hologram;
THREE.Hologram.prototype.isHologram = true;
