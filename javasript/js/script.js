window.onload=function(){

	waterfall('main','box');

    var dataInt={"data":[{"src":'31.jpg'},{"src":'32.jpg'},{"src":'33.jpg'},{"src":'34.jpg'}]}
	
	window.onscroll=function(){
		if (checkscrollside()){
			var oParent=document.getElementById('main');
			//将数据块渲染到页面尾部
			for (var i = 0; i < dataInt.data.length; i++) {
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var opic=document.createElement('div');
				opic.className='pic';
				oBox.appendChild(opic);
				var oImg=document.createElement('img');
				oImg.src="js/images/"+dataInt.data[i].src;
				opic.appendChild(oImg);

			}
			waterfall('main','box');

		};
		
	}
}

function waterfall(parent,box){
	//将main下的所有class为box元素取出
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面显示的列数（页面宽、box的宽）
	var oBoxsW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxsW);
	//设置main宽度
	oParent.style.cssText='width:'+oBoxsW*cols+'px;margin:0 auto';
	var hArr=[];    //存放每一列高度数组
	for (var i = 0; i < oBoxs.length; i++) {
		if (i<cols) {
			hArr.push(oBoxs[i].offsetHeight);
		} else{
			var minH=Math.min.apply(null,hArr);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			//oBoxs[i].style.left=oBoxsW*index+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;


		}
	}
	console.log(hArr);
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr=new Array(),  //用来存储获取到所有class为box的元素
        oElements=parent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
    	if(oElements[i].className==clsName){
    		boxArr.push(oElements[i]);
    	}
    }
    return boxArr;
}

function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;		}
	}

}

//检测是否具备滚条加载数据块条件
function checkscrollside(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//注意解决兼容性
	var height=document.documentElement.clientHeight || document.body.clientHeight;//页面高度
	return(lastBoxH<scrollTop+height)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}  