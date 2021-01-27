
THREE.Hologram = function( video, options ) {
	
	options = options || {
  	// chromaKey, chromaRange, initVideoScale, feetOffset, widthSegments, heightSegments
	};
	options.initVideoScale = options.initVideoScale || 0.01;
	
	var scope = this;
	
  function loadeddata(e) {
    
    scope.material = new THREE.ChromaKeyVideoShaderMaterial( video, options.chromaKey, options.chromaRange );
    scope.geometry = new THREE.HologramGeometry(
      video.videoWidth * options.initVideoScale,
      video.videoHeight * options.initVideoScale,
      options.feetOffset,
      options.widthSegments,
      options.heightSegments
    );
    
  }
  
  video.addEventListener( 'loadeddata', loadeddata );
	
	THREE.HologramMesh.call( this );
	
}

THREE.Hologram.prototype = Object.create( THREE.HologramMesh.prototype );
THREE.Hologram.prototype.constructor = THREE.Hologram;
THREE.Hologram.prototype.isHologram = true;
