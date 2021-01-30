
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
      hologramShadow.name = 'hologramSillouetteShadow';
      hologramShadow.material.name = 'hologramSillouetteShadowMaterial';
      hologramShadow.rotateX( THREE.Math.degToRad( -90 ) );
      scope.add( hologramShadow );
      if ( typeof options.sillouetteShadowRotation === 'number' )
        scope.sillouetteShadowRotation = options.sillouetteShadowRotation;
      if ( typeof options.sillouetteShadowHeight === 'number' )
        scope.sillouetteShadowHeight = options.sillouetteShadowHeight;
    }
    
    if ( options.bitmapShadow ) {
      var bitmapShadow = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(),
        new THREE.MeshBasicMaterial({
          map: options.bitmapShadowTexture || new THREE.TextureLoader().load( THREE.radialBitmapShadowBase64 ),
          transparent: true,
          depthTest: false,
          opacity: options.bitmapShadowOpacity || 0.4
        })
      );
      bitmapShadow.name = 'hologramBitmapShadow';
      bitmapShadow.material.name = 'hologramBitmapShadowMaterial';
      bitmapShadow.rotateX( THREE.Math.degToRad( -90 ) );
      scope.add( bitmapShadow );
      if ( typeof options.bitmapShadowSize === 'number' )
        scope.bitmapShadowSize = options.bitmapShadowSize;
    }
    
  };
  
  video.addEventListener( 'loadeddata', loadeddata );
  if ( video.videoWidth ) loadeddata.call( video );
  
  THREE.HologramMesh.call( this );
  
  this.renderOrder = 1;
  
  Object.defineProperty( this, 'sillouetteShadowRotation', {
    set: function( value ) {
      var shadow = this.getObjectByName( 'hologramSillouetteShadow' );
      if ( shadow ) shadow.rotation.z = THREE.Math.degToRad( value );
    },
    get: function(){
      var shadow = this.getObjectByName( 'hologramSillouetteShadow' );
      if ( shadow ) return THREE.Math.radToDeg( shadow.rotation.z );
      return null;
    }
  });
  
  Object.defineProperty( this, 'sillouetteShadowHeight', {
    set: function( value ) {
      var shadow = this.getObjectByName( 'hologramSillouetteShadow' );
      if ( shadow ) shadow.scale.y = value;
    },
    get: function(){
      var shadow = this.getObjectByName( 'hologramSillouetteShadow' );
      if ( shadow ) return shadow.scale.y;
      return null;
    }
  });
  
  Object.defineProperty( this, 'sillouetteShadowOpacity', {
    set: function( value ) {
      var shadow = this.getObjectByName( 'hologramSillouetteShadow' );
      if ( shadow ) shadow.material.opacity = value;
    },
    get: function(){
      var shadow = this.getObjectByName( 'hologramSillouetteShadow' );
      if ( shadow ) return shadow.material.opacity;
      return null;
    }
  });
  
  Object.defineProperty( this, 'bitmapShadowSize', {
    set: function( value ) {
      var shadow = this.getObjectByName( 'hologramBitmapShadow' );
      if ( shadow ) shadow.scale.set( value, value, value );
    },
    get: function(){
      var shadow = this.getObjectByName( 'hologramBitmapShadow' );
      if ( shadow ) return shadow.scale.x;
      return null;
    }
  });
  
  Object.defineProperty( this, 'bitmapShadowOpacity', {
    set: function( value ) {
      var shadow = this.getObjectByName( 'hologramBitmapShadow' );
      if ( shadow ) shadow.material.opacity = value;
    },
    get: function(){
      var shadow = this.getObjectByName( 'hologramBitmapShadow' );
      if ( shadow ) return shadow.material.opacity;
      return null;
    }
  });
  
  Object.defineProperty( this, 'video', {
    get: function(){
      return this.material.video;
    }
  });
  
}

THREE.Hologram.prototype = Object.create( THREE.HologramMesh.prototype );
THREE.Hologram.prototype.constructor = THREE.Hologram;
THREE.Hologram.prototype.isHologram = true;

Object.defineProperty( THREE, 'radialBitmapShadowBase64', {
  get: function() {
    return 'data:image/png;base64,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';
  }
});
