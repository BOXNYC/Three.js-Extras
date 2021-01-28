
THREE.HologramGeometry = function( width, height, feetOffset, widthSegments, heightSegments ) {
  
  THREE.PlaneGeometry.call( this, width, height, widthSegments, heightSegments );
  
  var _feetOffset = feetOffset || new THREE.Vector2();
  var _width = width;
  var _height = height;
  
  Object.defineProperty( this, 'feetOffset', {
    set: function( value ) {
      _feetOffset = value
      var matrix = new THREE.Matrix4().makeTranslation( ( _width * -( _feetOffset.x / 2 ) ), ( _height * 0.5 ) - ( _height * _feetOffset.y ), 0 )
      this.applyMatrix4( matrix );
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
