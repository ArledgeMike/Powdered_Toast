function Powdered_Toast(size, type, location, content){
  this.size = size;
  this.location = location;
  this.content = content;
  this.type = type;
  this.toast_el = $('<div id="toast"/>');
  this.$toast;
  this.anim;
  this.init();
};

Powdered_Toast.prototype = {
  constructor: Powdered_Toast,
  init:function(){
    this.toast_el.addClass(this.size).
      addClass(this.type).
      addClass(this.location).
      html(this.content).
      appendTo('body');
    
    this.$toast = $('#toast');
    this.$toast.on("click", this.destroy_toast.bind(this));
    this.anim = document.getElementById("toast");
    this.prefixed_event( this.anim, "AnimationEnd", "add", this.animate_toast_out.bind(this));

    this.animate_toast_in();
  },
  
  animate_toast_in:function(){
    this.$toast.addClass("active_toast");
  },
  
  animate_toast_out:function(){
    var t = this;

    window.setTimeout(function(){  
     t.$toast.addClass("inactive_toast"); 
     t.prefixed_event( t.anim, "AnimationEnd", "remove", t.animate_toast_in.bind(t));
     t.prefixed_event( t.anim, "AnimationEnd", "add", t.destroy_toast.bind(t));

    }, 2000);
  },
  
  destroy_toast:function(){
    this.$toast.remove();
  },
  
  prefixed_event:function(element, type, action, callback) {
    var pfx = ["webkit", "moz", "MS", "o", ""];
    for (var p = 0; p < pfx.length; p++) {
		  if (!pfx[p]) type = type.toLowerCase();
		  if(action == "add"){
        element.addEventListener(pfx[p]+type, callback, false);
      }else{
        element.addEventListener(pfx[p]+type, callback, false);
      }
	  }
  }
}