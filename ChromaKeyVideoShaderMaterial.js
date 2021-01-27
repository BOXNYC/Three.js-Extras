
THREE.ChromaKeyVideoShaderMaterial = function( video, chromaKey, range ) {
	
	THREE.ShaderMaterial.call( this );
	
	var videoTexture = new THREE.VideoTexture( video );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	
	this.setValues({

		uniforms: {
			tex: {
				type: 't',
				value: videoTexture
			},
			chromaKey: {
				type: 'c',
				value: new THREE.Color( chromaKey || 0xd400 )
			},
			range: {
        type: 'r',
        value: range || 0.5
      }
		},
		
		vertexShader: [
  		'varying vec2 vUv;                                             ',
    	'void main() {                                                 ',
    	'  vUv = uv;                                                   ',
    	'  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );  ',
    	'  gl_Position = projectionMatrix * mvPosition;                ',
    	'}                                                             '
		].join( "\n" ),
		
		fragmentShader: [
  		'uniform sampler2D tex;                               ',
    	'uniform vec3 chromaKey;                                  ',
    	'uniform float range;                                 ',
    	'varying vec2 vUv;                                    ',
    	'void main() {                                        ',
    	'  vec3 tColor = texture2D( tex, vUv ).rgb;           ',
    	'  float a = (length(tColor - chromaKey) - range) * 7.0;  ',
    	'  gl_FragColor = vec4(tColor, a);                    ',
    	'}                                                    '
		].join( "\n" ),

		transparent: true
		
	});
	
	Object.defineProperty( this, 'chromaKey', {
    set: function( value ) {
      this.uniforms.chromaKey.value = new THREE.Color( value )
    },
    get: function(){
      return this.uniforms.chromaKey.value
    }
  });
	
	Object.defineProperty( this, 'range', {
    set: function( value ) {
      this.uniforms.range.value = value
    },
    get: function(){
      return this.uniforms.range.value
    }
  });
  
  Object.defineProperty( this, 'map', {
    get: function(){
      return videoTexture;
    }
  });
  
  Object.defineProperty( this, 'video', {
    get: function(){
      return videoTexture.image;
    }
  });
	
}

THREE.ChromaKeyVideoShaderMaterial.prototype = Object.create( THREE.ShaderMaterial.prototype );
THREE.ChromaKeyVideoShaderMaterial.prototype.constructor = THREE.ChromaKeyVideoShaderMaterial;
THREE.ChromaKeyVideoShaderMaterial.prototype.isChromaKeyVideoShaderMaterial = true;
