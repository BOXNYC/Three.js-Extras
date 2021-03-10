
THREE.HologramGeometry = function( width, height, feetOffset, widthSegments, heightSegments ) {
  
  THREE.PlaneGeometry.call( this, width, height, widthSegments, heightSegments );
  
  var _feetOffset = feetOffset || new THREE.Vector2();
  var _width = width;
  var _height = height;
  
  Object.defineProperty( this, 'feetOffset', {
    set: function( value ) {
      _feetOffset = value
      var x = ( _width * -( _feetOffset.x / 2 ) )
      var y = ( _height * 0.5 ) - ( _height * _feetOffset.y )
      this.userData = this.userData || {};
      if ( this.userData.currentTranslation ) {
        this.translate( -this.userData.currentTranslation.x, -this.userData.currentTranslation.y, 0 );
      }
      this.userData.currentTranslation = { x: x, y: y };
      this.translate( x, y, 0 );
    },
    get: function() {
      return _feetOffset;
    }
  });
  
  this.feetOffset = _feetOffset
  
}

THREE.HologramGeometry.prototype = Object.create( THREE.PlaneGeometry.prototype );
THREE.HologramGeometry.prototype.constructor = THREE.HologramGeometry;
THREE.HologramGeometry.prototype.isHologramGeometry = true;