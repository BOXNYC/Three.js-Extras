(function() {
  if (typeof THREE !== 'object') return;
  function curveVector(g, z){
    z = typeof z === 'number' ? z : 10;
    var p = g.parameters;
    var hw = p.width * 0.5;
    var a = new THREE.Vector2(-hw, 0);
    var b = new THREE.Vector2(0, z);
    var c = new THREE.Vector2(hw, 0);
    var ab = new THREE.Vector2().subVectors(a, b);
    var bc = new THREE.Vector2().subVectors(b, c);
    var ac = new THREE.Vector2().subVectors(a, c);
    var r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));
    var center = new THREE.Vector2(0, z - r);
    var baseV = new THREE.Vector2().subVectors(a, center);
    var baseAngle = baseV.angle() - (Math.PI * 0.5);
    var arc = baseAngle * 2;
    var uv = g.attributes.uv;
    var pos = g.attributes.position;
    var mainV = new THREE.Vector2();
    for (var i = 0; i < uv.count; i++){
    var uvRatio = 1 - uv.getX(i);
      var y = pos.getY(i);
      mainV.copy(c).rotateAround(center, (arc * uvRatio));
      pos.setXYZ(i, mainV.x, y, -mainV.y);
    }
    pos.needsUpdate = true;
    return z;
  }
   // Define SubClass based on the type
  // of constructior the super class is.
  var superIsClass = String(THREE.PlaneGeometry).indexOf('class')===0;
  if (superIsClass) {
    class CurvedPlaneGeometry extends THREE.PlaneGeometry {
      constructor(width, height, widthSegments, heightSegments, curve) {
        super(width, height, widthSegments, heightSegments);
        this.curve = curve;
      }
      set curve(amount) {
        this.curved = curveVector(this, amount);
      }
      get curve() {
        return this.curved;
      }
    }
    THREE.CurvedPlaneGeometry = CurvedPlaneGeometry;
  } else {
    THREE.CurvedPlaneGeometry = function(width, height, widthSegments, heightSegments, curve) {
      THREE.PlaneGeometry.apply(this, arguments);
      var inst = this;
      Object.defineProperty(this, 'curve', {
        set: function(amount) {
          inst.curved = curveVector(inst, amount);
        },
        get: function() {
          return inst.curved;
        }
      });
      this.curve = curve;
    }
    THREE.CurvedPlaneGeometry.prototype = Object.create(THREE.PlaneGeometry.prototype);
    THREE.CurvedPlaneGeometry.prototype.constructor = THREE.CurvedPlaneGeometry;
  }
})();
