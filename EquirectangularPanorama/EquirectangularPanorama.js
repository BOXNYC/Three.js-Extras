class EquirectangularPanorama extends THREE.Mesh {
  
  constructor( textureSrc, options ) {
    
    options = options || {};
    options.geometry = options.geometry || {};
    options.texture = options.texture || {};
    options.material = options.material || {};
    
    // Geometry
    const geometry = new THREE.SphereGeometry(
      options.geometry.radius,
      options.geometry.widthSegments,
  		options.geometry.heightSegments,
  		options.geometry.phiStart,
  		options.geometry.phiLength,
  		options.geometry.thetaStart,
  		options.geometry.thetaLength
    );
    geometry.scale( -1, 1, 1 );
    
    // Texture
    const texture = new THREE.TextureLoader().load(
      textureSrc,
      options.texture.onLoad,
      options.texture.onProgress,
      options.texture.onError
    );
		
		// Material
		options.material.map = texture;
		const material = new THREE.MeshBasicMaterial(options.material);
		
		// Mesh
		super( geometry, material );
		this.type = 'EquirectangularPanorama';
    
  }
  
}
THREE.EquirectangularPanorama = EquirectangularPanorama;
