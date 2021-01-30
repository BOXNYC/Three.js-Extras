
THREE.ChromaKeyVideoShaderMaterialShadow = function( videoTexture, options ) {
  
  options = options || {};
  options.chromaKey = new THREE.Color( options.chromaKey || 0xd400 );
  options.range = options.range || 0.5;
  options.mult = options.mult || 7.0;
  options.opacity = options.sillouetteShadowOpacity || 0.4;
  delete options.sillouetteShadowOpacity;
  
  THREE.ShaderMaterial.call( this, { depthTest: false } );
  
  this.setValues({

    uniforms: {
      tex: {
        type: 't',
        value: videoTexture
      },
      chromaKey: {
        type: 'c',
        value: options.chromaKey
      },
      range: {
        type: 'r',
        value: options.range
      },
      mult: {
        type: 'r',
        value: options.mult
      },
      opacity: {
        type: 'r',
        value: options.opacity
      }
    },
    
    vertexShader: '                                             \
      varying vec2 vUv;                                          \
      void main() {                                               \
        vUv = uv;                                                  \
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );  \
        gl_Position = projectionMatrix * mvPosition;                 \
      }                                                               \
    ',
    
    fragmentShader: '                                 \
      uniform sampler2D tex;                           \
      uniform vec3 chromaKey;                           \
      uniform float range;                               \
      uniform float mult;                                 \
      uniform float opacity;                               \
      varying vec2 vUv;                                     \
      void main() {                                          \
        vec3 tColor = texture2D( tex, vUv ).rgb;              \
        float a = (length(tColor - chromaKey) - range) * mult; \
        vec4 sum = vec4(0, 0, 0, min(a, opacity));              \
        gl_FragColor = sum;                                      \
      }                                                           \
    ',

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
  
  Object.defineProperty( this, 'mult', {
    set: function( value ) {
      this.uniforms.mult.value = value
    },
    get: function(){
      return this.uniforms.mult.value
    }
  });
  
  Object.defineProperty( this, 'opacity', {
    set: function( value ) {
      this.uniforms.opacity.value = value
    },
    get: function(){
      return this.uniforms.opacity.value
    }
  });
  
  Object.defineProperty( this, 'map', {
    set: function( value ){
      return this.uniforms.tex.value = value
    },
    get: function(){
      return this.uniforms.tex.value;
    }
  });
  
  Object.defineProperty( this, 'video', {
    get: function(){
      return this.map.image;
    }
  });
  
}

THREE.ChromaKeyVideoShaderMaterialShadow.prototype = Object.create( THREE.ShaderMaterial.prototype );
THREE.ChromaKeyVideoShaderMaterialShadow.prototype.constructor = THREE.ChromaKeyVideoShaderMaterialShadow;
THREE.ChromaKeyVideoShaderMaterialShadow.prototype.isChromaKeyVideoShaderMaterialShadow = true;
