
THREE.HologramMesh = function( geometry, material ) {
	
	THREE.Mesh.call( this, geometry, material );
	
	this.rotateYToCamera = function( camera ){
  	var meshPosition = new THREE.Vector3();
    this.getWorldPosition( meshPosition );
    var cameraPosition = new THREE.Vector3();
    camera.getWorldPosition( cameraPosition );
  	this.rotation.set( 0, Math.atan2( cameraPosition.x - meshPosition.x, cameraPosition.z - meshPosition.z ), 0 )
	}
	
}

THREE.HologramMesh.prototype = Object.create( THREE.Mesh.prototype );
THREE.HologramMesh.prototype.constructor = THREE.HologramMesh;
THREE.HologramMesh.prototype.isHologramMesh = true;