var Control = (function(){

  /**
   * Control
   * Description: Constructor function for the Control
   */
  function Control(){
    this.io = null;
    this.data = {
      velocity: {
        x: 0,
        y: 0
      }
    };
  }

  /**
   * Control connect
   * Description: Connects Control to socket
   */
  Control.prototype.connect = function(){
    var self = this;
    self.io = io.connect();
    self.io.on('identity',function(){
      self.io.emit('identity', 'client');
    });
  };

  /**
   * Control updateVelocity
   * Description: Updates the velocity storage on the Control
   */
  Control.prototype.updateVelocity = function(x,y){
    this.data.velocity.x = x;
    this.data.velocity.y = y;
    this.emitData();
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

  /**
   * Control emitData
   * Description: Will emit the Control data to the server.
   */
  Control.prototype.emitData = function(){
    var self = this;
    if (!self.io) {
      throw new Error("Control not connected");
    } else {
      self.io.emit('updateData', self.data);
    }
  };

  /**
   * Control startCommunication
   * Description: Will start sending information to the display client every
   * 'intervalTime' (in ms)
   */
  Control.prototype.startCommunication = function(intervalTime) {
    var self = this;
    var interval = intervalTime || 1000;
    setInterval(function(){
      self.emitData();
    },interval);
  };

  return Control;

})();