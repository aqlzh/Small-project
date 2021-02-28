/* 功能需求
	1.点击tab栏可以切换效果
	2.点击+好 可以添加他不想 和内容项
	3.点击x好 可以删除当前的tab项和内容项
	4.双击tab项文字或内容项文字 可以修改里面的文字内容
	抽象 对象 Tab对象
	1.该对象具有切换功能
	2.该对象具有添加功能
	3.该对象具有删除功能
	4.该对象具有修改功能
 */
var that;
class Tab{
	constructor(id) {
		//获取元素
		that = this;//获取指向tab的this指针
	    this.main = document.querySelector(id);
	   this.add = this.main.querySelector('.tabadd');
	   //li的父元素 ul
	   this.ul = this.main.querySelector('.firstnav ul:first-child');
	   //section的父元素
	   this.fsection = this.main.querySelector('.tabscon');
	   this.init();//使得一旦new了对象 就会调用这个函数
	}
	//初始化操作
	init(){
		//调用获取元素的函数
		this.updateNode();
		//让相关的元素绑定事件
		this.add.onclick = this.addTab;
		for(var i = 0; i < this.lis.length; i++){
			this.lis[i].index = i;
			this.lis[i].onclick = this.toggleTab;
			this.remove[i].onclick = this.removeTab;
			this.spans[i].ondblclick = this.editTab;
			this.sections[i].ondblclick = this.editTab;
		}
	}
	//获取所有元素  因为如果在init里面获取 只能够获取到一开始  定义的
	//后面追加的元素无法获取到  所以将 li section 元素的获取封装成一个函数
	//追加了新元素后重新调用一下获取元素的函数
	updateNode(){
		this.sections = this.main.querySelectorAll('section');
	    this.lis = this.main.querySelectorAll('li');
		this.remove = this.main.querySelectorAll('.icon');
		this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
	}
	//切换功能
	toggleTab(){
		//console.log(this.index);
		that.clearClass();
		this.className = 'liactive';
		that.sections[this.index].className = 'conactive';
	}
	clearClass(){
		for(var i = 0; i < this.lis.length; i++){
			this.lis[i].className = '';
			this.sections[i].className = ';'
		}
	}
	//添加功能
	addTab(){
		that.clearClass();
		//创建li元素和section元素
		var li = '<li class="liactive"><span>新选项卡</span><span class="icon">x</span></li>';
		var section = '<section class="conactive">新选项卡</section>'
		//把这两个元素追加到对应的父元素里
		//以前的做法是先动态创建元素createElement 但是元素里面内容太多需要innerHTML赋值
		//在使用appendchild追加到父元素里面
		//现在的做法 利用insertAdjacentHTML()可以直接把字符串格式元素添加到父元素中
		//appendchild不支持追加字符串的子元素 insertadjacenthtml支持追加字符串子元素
		that.ul.insertAdjacentHTML('beforeend',li);
		that.fsection.insertAdjacentHTML('beforeend',section);
		that.init();//添加新的元素后 重新初始化 获取到新增的元素
	}
	//删除功能
	removeTab(e){
		/* 核心思路
			1.点击x好可以删除当前li选项卡和当前section
			2.x好是没有索引号的 但是他的父亲li有索引号 这个索引号就是我们想要的索引号
			3.所以核心思路就是点击x好可以删除这个索引号对应的li和section
		 */
		e.stopPropagation();//阻止冒泡 防止切换效果产生
		var index = this.parentNode.index;
		console.log(index);
		//根据索引号删除对应的li 和section remove()方法可以直接删除
		that.lis[index].remove();
		that.sections[index].remove();
		that.init();//删除元素后重新获取元素
		//当我们删除的不是选定状态的li时 原来的选定状态保持不变
		if(document.querySelector('.liactive')) return;
		//如果当前页面有选定状态直接结束函数
		
		//当我们删除了选中状态的这个li时 让他的前一个li处于选定状态
		index--;
		that.lis[index] && that.lis[index].click();//手动调用点击事件
	}
	//修改功能
	editTab(){
		/* 核心思路：
			1.双击选项卡li或者是section 里面的文字 可以实现修改功能
			2.双击事件 ondblclick
			3.如果双击文字 会默认选定文字 此时需要双击禁止选中文字
			4.window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
			5.双击文字的时候 在里面生成一个文本框 当失去焦点或者按下回车 然后把文本框输入的值
			  赋给原先的元素
		 */
		var str = this.innerHTML;
		//双击禁止选中文字
		window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
		//alert(11);
		this.innerHTML = '<input type = "text"/>';
		var input = this.children[0];
		input.value = str;
		input.select();//使文本框里面的文字处于选定状态
		//当我们离开文本框就把文本框里面的值给span
		input.onblur = function(){
			this.parentNode.innerHTML = this.value;
		}
		//按下回车也可以把文本框里面的内容赋给span
		input.onkeyup = function(e){
			if(e.keyCode === 13){//判断按下的是否是空格键
				//手动调用表单失去焦点事件 不需要鼠标离开操作
				this.blur();
			}
		}
	}
}
var tab = new Tab('#tab');
tab.init();