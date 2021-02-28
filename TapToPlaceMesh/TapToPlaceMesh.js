

(function( THREE ){

  if ( !THREE ) return console.error('Missing THREE.')
  
  THREE.TapToPlaceMesh = function( options ) {
    
    options = options || {}
    options.surfaceName = options.surfaceName || 'surface'
    options.name = options.name || 'tap-to-place-surface-target'
    options.messageName = options.messageName || 'tap-to-place-surface-target-message'
    options.texturesPath = options.texturesPath || ''
    options.imageFileNameColor = options.imageFileNameColor || 'white'
    options.imageFileName = options.imageFileName || 'tap-to-place-surface-target-'+options.imageFileNameColor+'.png'
    options.messageImageFileName = options.messageImageFileName || 'tap-to-place-surface-target-message.png'
    options.initYPosition = options.initYPosition || -0.2
    options.width = options.width || 5
    options.height = options.height || 5
    options.messageWidth = options.messageWidth || 4
    options.messageHeight = options.messageHeight || 2
    THREE.Mesh.call( this, 
      new THREE.PlaneGeometry( options.width, options.height, 1, 1 ),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: options.opacity || 1.0,
        map: new THREE.TextureLoader().load( options.texturesPath + '/' + options.imageFileName ),
        side: THREE.DoubleSide
      })
    )
    this.visible = false
    this.name = options.name
    this.position.y = options.initYPosition
    this.rotateX( -Math.PI / 2 )
    const message = new THREE.Mesh(
      new THREE.PlaneGeometry( options.messageWidth, options.messageHeight, 1, 1 ),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: options.messageOpacity || 1.0,
        map: new THREE.TextureLoader().load( options.texturesPath + '/' + options.messageImageFileName ),
        side: THREE.DoubleSide
      })
    )
    message.name = options.messageName
    message.position.z = options.messageHeight
    message.rotateX( Math.PI / 2 )
    this.add( message )
    // instance options
    this.userData.options = options
    this.userData.raycaster = new THREE.Raycaster()
    this.userData.point = new THREE.Vector2( 0, options.initYPosition )
    
    Object.defineProperty( this, 'message', {
      get: ()=> {
        return this.getObjectByName( this.userData.options.messageName )
      }
    })
    
    this.show = ()=> {
      this.visible = true
    }
    
    this.hide = ()=> {
      this.visible = false
    }
    
    this.dispose = ()=> {
      if ( this.parent ) this.parent.remove( this )
      this.userData.raycaster = null
      this.userData.point = null
      this.userData.options = null
      this.children.forEach( ob =>{
        if ( ob.parent ) ob.parent.remove( ob )
        if ( ob.material ) ob.material.dispose()
        if ( ob.geometry ) ob.geometry.dispose()
      })
      if ( this.material ) this.material.dispose()
      if ( this.geometry ) this.geometry.dispose()
      this.userData.disposed = true
    }
    
    this.update = ( camera, surface )=> {
      if ( this.userData.disposed ) return
      if ( !this.parent ) return
      if ( !this.visible ) return
      if ( !camera ) return
      this.userData.raycaster.setFromCamera( this.userData.point, camera )
      surface = surface || this.parent.getObjectByName( this.userData.options.surfaceName )
      if ( !surface ) return
      const intersects = this.userData.raycaster.intersectObject( surface )
      if ( !intersects.length ) return
      //if ( camera.position.distanceTo( intersects[0].point ) < 5 ) {
        this.position.x = intersects[0].point.x
        this.position.z = intersects[0].point.z
      //}
      this.rotation.z = Math.atan2(
        camera.position.x - this.position.x,
        camera.position.z - this.position.z
      )
    }
    
  }
  
  THREE.TapToPlaceMesh.prototype = Object.create( THREE.Mesh.prototype );
  THREE.TapToPlaceMesh.prototype.constructor = THREE.TapToPlaceMesh;
  THREE.TapToPlaceMesh.prototype.isTapToPlaceMesh = true;
  
})( window.THREE )