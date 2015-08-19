var Control = (function(){

  /**
   * Control
   * Description: Constructor function for the Control
   */
  var Control = function() {
    this.data = {
      velocity: {
        x: 0,
        y: 0
      },
      decelerate: false,
      accelerate: false
    };
  };

  /**
   * Control updateVelocity
   * Description: Updates the velocity storage on the Control
   */
  Control.prototype.updateVelocity = function(x,y){
    this.data.velocity.x = x;
    this.data.velocity.y = y;
    // need to send a constant request here to the server
    // $();
  };

  /**
   * Control decelerateStart
   * Description: Handles the deceleration start event, i.e. when the touchstart
   * event gets called on the decelerate button.
   */
  Control.prototype.decelerateStart = function(){
    this.data.decelerate = true;
  };

  /**
   * Control decelerateEnd
   * Description: Handles the deceleration end event, i.e. when the touchend
   * event gets called on the decelerate button.
   */
  Control.prototype.decelerateEnd = function(){
    this.data.decelerate = false;
  };

  /**
   * Control accelerateStart
   * Description: Handles the acceleration start event, i.e. when the touchstart
   * event gets called on the accelerate button.
   */
  Control.prototype.accelerateStart = function(){
    this.data.accelerate = true;
  };

  /**
   * Control accelerateEnd
   * Description: Handles the acceleration start event, i.e. when the touchend
   * event gets called on the accelerate button.
   */
  Control.prototype.accelerateEnd = function(){
    this.data.accelerate = false;
  };

  return Control;

})();