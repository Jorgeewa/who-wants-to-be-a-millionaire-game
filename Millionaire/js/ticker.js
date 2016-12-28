(function(){

function $recursiveAnimation($delay, $movePix){
	$self = this;
	var $timeTracker = 0;
	function $animate($time){
			var $timeDelay = (($time - $timeTracker) >= $delay) ? true : false;
			if($timeDelay){
				$timeTracker = $time;
				$self.$ul.style.left = $movePix + "px";
				$movePix--;
				if($self.$parentStyleLeft-$self.$width == $movePix){ 
					$movePix = $self.$parentWidth;
					$self.$ul.style.left = self.$parentWidth + "px";
				}
			}
			$self.$cancelAnimation = requestAnimationFrame($animate);
	}
	
	
	$self.$cancelAnimation = requestAnimationFrame($animate);
}

function $ticker($id,$idParent, $delay){
	this.$id = $id;
	this.$ul = document.querySelector($id);
	this.$parent = document.querySelector($idParent);
	this.$li = this.$ul.getElementsByTagName("li");
	this.$li[0].style.paddingLeft = "0";
	this.$parentWidth = this.$parent.offsetWidth;
	this.$parentStyleLeft = parseInt(document.defaultView.getComputedStyle(this.$parent, null).getPropertyValue("left"));
	this.$childWidth = 0;
	for(var i = 0; i < this.$li.length; i++){
		this.$childWidth += this.$li[i].offsetWidth;
	}
	this.$width = this.$childWidth;
	this.$delay = $delay;
	this.$left = this.$parentWidth;
	this.$cancelAnimation = 0;
}

$ticker.prototype.$move = function(){
	var $movePix =this.$parentWidth;
	this.$attach();
	$recursiveAnimation.call(this,this.$delay, $movePix);
}

$ticker.prototype.$pause = function(){
	cancelAnimationFrame(this.$cancelAnimation);
}
$ticker.prototype.$resume = function(){
	$self = this;
	$movePix = parseInt(document.defaultView.getComputedStyle($self.$ul, null).getPropertyValue("left"));
	$recursiveAnimation.call(this,this.$delay, $movePix);
}
$ticker.prototype.$attach = function(){
	$self = this;
	this.$ul.onmouseover = function(){
		$self.$pause();
	}
	
	this.$ul.onmouseout = function(){
		$self.$resume();
	}
	
}
newsTicker = new $ticker("#tickerUl","#tickerDiv-child",3)
newsTicker.$move();
})();