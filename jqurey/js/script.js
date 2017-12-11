$( window ).on('load',function () {
    waterfall();
    var dataInt={"data":[{"src":'31.jpg'},{"src":'32.jpg'},{"src":'33.jpg'},{"src":'34.jpg'}]}
    $(window).on('scroll',function(){
    	if (checkScrollSlide) {
    		$.each(dataInt.data,function(key,value){
    			var oBox = $('<div>').addClass('box').appendTo($('#main'));
    			var oPic = $('<div>').addClass('pic').appendTo($(oBox));
    			var oImg = $('<img>').attr('src','./images/'+$(value).attr('src')).appendTo($(oPic));
    			     
    		})
    		waterfall();
    	}
    })
})

function waterfall(){
	var $boxs = $('#main>div');
	var w = $boxs.eq(0).outerWidth();  //获取宽度
	var cols = Math.floor($(window).width()/w);  //计算列数
	$('#main').width(w*cols).css('margin','0 auto');
	var hArr = [];
	$boxs.each(function(index,value){
		var h = $boxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index] = h;
		}else{
			var minH=Math.min.apply(null,hArr);  //求高度最小
			var minHIndex=$.inArray(minH,hArr);   //求最小高度索引值
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*w+'px'
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();


		}
	})
	
} 

function checkScrollSlide() {
	var $lastBox=$('#main>div').last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerheight()/2);  //最后一个盒子距离顶部距离+自身一半
	var scrollTop=$(window).scrollTop();  //滚走的距离
	var documentH=$(window).height();    //页面的高度
	return (lastBoxDis<scrollTop+documentH)?true:false;

}