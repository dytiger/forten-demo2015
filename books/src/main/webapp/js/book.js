// 页面中的全局变量
var lastPage;// 保存当前查询结果的总页数
var editEl;// 保存当前被快捷编辑的元素对象
var editOldValue;// 保存当前被快捷编辑元素的原始值
var editCurrValue;// 用户对快捷编辑元素修改后的值

// jQuery的主函数
// 会在页面中的所有元素加载完毕后执行
$(function() {
	// 执行全部数据的分页查询
	list();
	// 为添加按钮绑定单击事件，以打开添加对话框
	$('#open-save-dialgo-btn').on('click', function() {
		saveDialog.dialog('open');
	});
	// 为添加表单中的折扣滑动条绑定鼠标移动和键盘按下事件，当事件触发后可以在对话框中的折扣标签上显示出折扣值
	$('#discount').on('mousemove keydown', function() {
		$('#discount-span').text($('#discount').prop('value'));
	});
	// 为修改表单中的折扣滑动条绑定鼠标移动和键盘按下事件，当事件触发后可以在对话框中的折扣标签上显示出折扣值
	$('#update-discount').on('mousemove keydown', function() {
		$('#update-discount-span').text($('#update-discount').prop('value'));
	});
	// 为添加表单的日期控件绑定datepicker组件
	$("#pubDate").datepicker({
		// 设置日期格式（y表示两位的年份，yy表示四位的年份）
		dateFormat: "yy-mm-dd",
		// 控件中月份的显示文本
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
		// 控件中星期的显示文本
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六']
	});
	// 为修改表单的日期控件绑定datepicker组件
	$("#update-pubDate").datepicker({
		dateFormat: "yy-mm-dd",
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六']
	});
	
	// 为查询按钮和页面跳转按钮绑定单击事件，执行list函数的查询
	$("#search-btn").add("#page-jump-btn").on('click',list);
	
	// 首页跳转
	$("#first-page-btn").on('click',function(){
		// 修改当前页面中的页码input的值
		$('#pageNo').prop('value','1');
		// 执行list函数进行查询
		list();
	});
	// 上一页跳转
	$("#pre-page-btn").on('click',function(){
		// 修改当前页面中的页码input的值
		var toPage = parseInt($('#pageNo').prop('value'))-1;
		$('#pageNo').prop('value',toPage);
		// 执行list函数进行查询
		list();
	});
	// 下一页跳转
	$("#next-page-btn").on('click',function(){
		// 修改当前页面中的页码input的值
		var toPage = parseInt($('#pageNo').prop('value'))+1;
		$('#pageNo').prop('value',toPage);
		// 执行list函数进行查询
		list();
	});
	// 尾页跳转
	$("#last-page-btn").on('click',function(){
		// 修改当前页面中的页码input的值
		$('#pageNo').prop('value',lastPage);
		// 执行list函数进行查询
		list();
	});
	
	// 用于判断删除和修改按钮的disabled状态
	// 在tbody中选择class属性是id-check的元素，绑定change事件
	// 如果只有一个checkbox被选中，则删除和修改按钮的disabled属性设置为false（可用状态）
	// 如果有多于一个checkbox被选中，则只有删除按钮的disabled属性设置为false（可用状态）而修改按钮的disabled属性设置为true（不可用状态）
	// 如果没有checkbox被选中，则删除和修改按钮的disabled属性设置为true（不可用状态）
	$("tbody:first").on('change','.id-check',function(){
		// .id-check:checked的含义是class属性是id-check的并且已经被选中的（checked=true）那些checkbox元素
		var countChecked = $('.id-check:checked').length;
		if(countChecked==1){
			$('#delete-btn').add('#update-btn').prop('disabled',false);
		}else if(countChecked>1){
			$('#update-btn').prop('disabled',true);
		}else{
			$('#delete-btn').add('#update-btn').prop('disabled',true);
		}
	});
	
	// 为删除按钮绑定单击事件，以打开删除确认对话框
	$('#delete-btn').on('click',function(){
		deleteDialog.dialog('open');
	});
	
	// 为修改按钮绑定单击事件，以打开数据修改对话框
	$('#update-btn').on('click',function(){
		// 得到被选中的数据的id
		var id = $('.id-check:checked').first().val();
		// 得到要被修改的数据所在的TR对象中的所有td对象
		var dataTd = $('input[value="'+id+'"]').parent().parent('tr').children('td');
		// 把td中的数据文本设置到与之对应的编辑表单的控件上（回显）
		$('#update-name').val($(dataTd[1]).text());
		$('#update-author').val($(dataTd[2]).text());
		$('#update-type').val($(dataTd[3]).data('type'));
		$('#update-pubDate').val($(dataTd[4]).text());
		$('#update-price').val($(dataTd[5]).text());
		$('#update-discount').val($(dataTd[6]).text());
		$('#update-discount-span').text($(dataTd[6]).text());
		$('#update-id').val(id);
		
		updateDialog.dialog('open');
	});
	
	// 全选可全不选的checkbox功能实现
	$('#select-all').on('change',function(){
		// 把所有数据行中的checkbox的值统一为select-all这个checkbox的值
		$('.id-check').prop('checked',$(this).prop('checked'));
		// 把删除和编辑按钮的disabled状态设置为正确的值
		$('#delete-btn').prop('disabled',!$(this).prop('checked'));
		if($('.id-check:checked').length==1){
			$('#update-btn').prop('disabled',false);
		}else{
			$('#update-btn').prop('disabled',true);
		}
	});
	
	// 为排序查询按钮绑定单击事件
	$('.order-btn').on('click',function(){
		// 获取排序字段名
		var f = $(this).data('order-field');
		// 获取排序类型
		var t = $(this).data('order-type');
		// 为排序字段名的input设置值
		$('#orderField').prop('value',f);
		// 为排序类型的input设置值
		$('#orderType').prop('value',t);
		// 修改被排序字段的表头中排序的图标和排序类型input中的取值，为下次用户点击排序做准备
		$(this).children('img:first').attr('src',(t=='ASC'?'images/down.png':'images/up.png'));
		$(this).data('order-type',(t=='ASC'?'DESC':'ASC'));
		// 数据刷新
		list();
	});
	
	// 在class是edit-td的元素上单击，会打开快捷编辑按钮组
	$('tbody:first').on('click','.edit-td',function(e){
		// 为editEl赋值为当前被单击的元素对象
		editEl = $(this);
		// 为editOldValue赋值为当前被单击元素中的文本
		editOldValue = editEl.text();
		// 得到鼠标在页面单击时的位置
		var x = e.pageX;
		var y = e.pageY;
		// 为快捷编辑按钮组div设置css样式
		$('#fast-edit-btn-div').css({
			// 位置属性设置为绝对位置
			'position':'absolute',
			// 纵坐标设置为单击位置向下22个单位
			'top': y+22,
			// 横坐标设置为单击位置
			'left': x,
			// 设置元素的层次索引，可以让快捷编辑按钮组的div浮动在其它页面元素之上
			'z-index': 1
		});
		// 把快捷编辑按钮组显示到页面上
		$('#fast-edit-btn-div').show();
	});
	
	// 快捷编辑按钮的单击事件绑定，执行fastEdit函数
	$('#fast-edit-btn').on('click',fastEdit);

	// 快捷编辑中取消按钮的单击事件绑定
	$('#fast-cancel-btn').on('click',function(){
		// 把被编辑的td中的文本恢复为原始值
		editEl.text(editOldValue);
		// 隐藏快捷编辑按钮div
		$('#fast-edit-btn-div').hide();
	});
	
	// 让数据表格可以重定义大小
	$( "#data-table" ).resizable({animate: true});
});

// 当重置添加表单时执行的函数
var resetSaveForm = function() {
	// 重置表单数据
	$("#save-form")[0].reset();
	// 重置折扣标签的文本
	$("#discount-span").text('8');
};

// 添加数据函数
var save = function() {
	// 获得添加表单中的数据，转换为JSON串的数据形式
	var formData = $("#save-form").getFormDataJSON();
	// 调用ajax请求
	$.ajax({
		url: 'book/save.do',// 后台服务URL地址
		type: 'POST',// 请求方式
		dataType: 'json',// 获取到的响应数据格式
		contentType: "application/json",// 发送请求的数据格式
		data: formData// 发送的数据
	}).done(function(book) {
		// 如果当前数据大于1页，则执行数据的模拟显示
		if(parseInt($('#total-page').text())>1){
			// 选择tbody中的最后一个tr元素，进行删除
			$('tr:last','tbody').remove();
		}
		// 组装一个tbody中的行，用于给用户更好的界面体验
		var mockTr = '<tr><td>1</td><td>'+book.name+'</td><td>'+book.author+'</td><td>'+book.typeStr+'</td><td>'+book.pubDateStr+'</td><td>'+book.price+'</td><td>'+book.discount+'</td><td>'+book.finalPrice+'</td><td><input type="checkbox" /></td></tr>';
		// 执行把mockTr插入到tbody的首行动作
		$('tbody').prepend(mockTr);
		// 重新排列每一个数据行的序号
		$('td:first','tbody:first>tr').each(function(index,el){
			$(this).text(index+1);
		});
		// 构建对话框的内容
		buildMsgDialog('images/ok.png','书籍保存成功');
		// 打开对话框
		msgDialog.dialog('open');
	}).fail(function() {
		buildMsgDialog('images/error.png','书籍保存失败');
		msgDialog.dialog('open');
	}).always(function(){
		// 无论成功还是失败，都会把添加对话框关闭
		saveDialog.dialog('close');
	});
};

// 修改函数
var update = function() {
	// 获得添加表单中的数据，转换为JSON串的数据形式
	var formData = $("#update-form").getFormDataJSON();
	$.ajax({
		url: 'book/update.do',
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: formData
	}).done(function(flag) {
		// 构建对话框的内容
		buildMsgDialog('images/ok.png','书籍修改成功');
		// 打开对话框
		msgDialog.dialog('open');
	}).fail(function() {
		buildMsgDialog('images/error.png','书籍修改失败');
		msgDialog.dialog('open');
	}).always(function(){
		updateDialog.dialog('close');
		list();
	});
};

// 快捷编辑函数
var fastEdit = function(){
	// 得到当前编辑对象的文本，赋值给editCurrValue
	editCurrValue = editEl.text();
	// 得到当前被编辑对象所对应的字段名
	var fieldName = editEl.data('field-name');
	// 得到当前被编辑对象的id值
	var bookId = editEl.parent('tr').children('td').last().children(':checkbox').val();
	// 组装发送的json串
	var jsonStr = '{"id":"'+bookId+'","fieldName":"'+fieldName+'","value":"'+editCurrValue+'"}';
	$.ajax({
		url: 'book/fastEdit.do',
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: jsonStr
	}).done(function(flag) {
		buildMsgDialog('images/ok.png','书籍修改成功');
		msgDialog.dialog('open');
	}).fail(function() {
		buildMsgDialog('images/error.png','书籍修改失败');
		msgDialog.dialog('open');
	}).always(function(){
		$('#fast-edit-btn-div').hide();
	});
}

// 定义添加的对话框
var saveDialog = $('#save-dialog').dialog({
	autoOpen: false,// 不自动打开
	height: 600,// 高600
	width: 400,// 宽400
	modal: true,// 当对话框打开时屏蔽背景页面中的操作
	buttons: {
		"保存": save,
		"取消": function() {
			saveDialog.dialog("close");
		}
	},
	close: resetSaveForm
});
// 定义修改的对话框
var updateDialog = $('#update-dialog').dialog({
	autoOpen: false,
	height: 600,
	width: 400,
	modal: true,
	buttons: {
		"修改": update,
		"取消": function() {
			updateDialog.dialog("close");
		}
	}
});
// 删除数据函数
var deleteBook = function(){
	// 得到被勾选的checkbox的数量
	var countChecked = $('.id-check:checked').length;
	// 组装一个JSON形式的id数组字符串
	var ids="[";
	$('.id-check:checked').each(function(index,idCheck){
		ids = ids+$(idCheck).prop('value');
		if(index<countChecked-1){
			ids=ids+",";
		}
	});
	ids=ids+"]";
	// 调用后台服务进行删除操作
	$.ajax({
		url: 'book/deleteBook.do',
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: ids
	}).done(function(c){
		buildMsgDialog('images/ok.png','成功的删除了'+c+"条数据");
		msgDialog.dialog('open');
		list();
	}).fail(function(xhr,status,errorText){
		buildMsgDialog('images/error.png','删除失败');
		msgDialog.dialog('open');
	}).always(function(){
		deleteDialog.dialog('close');
	});
};

// 删除确认对话框
var deleteDialog = $('#delete-dialog').dialog({
	autoOpen: false,
	height: 220,
	width: 450,
	modal: true,
	buttons: {
		"确定": deleteBook,
		"取消": function() {
			deleteDialog.dialog("close");
		}
	}
});
// 消息对话框
var msgDialog = $('#msg-dialog').dialog({
	autoOpen: false,
	height: 220,
	width: 400,
	modal: true,
	buttons: {
		"确定": function() {
			msgDialog.dialog("close");
		}
	}
});
// 构建消息对话框的图标和内容文本函数
var buildMsgDialog = function(iconSrc,msg){
	$('#msg-dialog>div:first').html('<img src="'+iconSrc+'" />');
	$('#msg-dialog>div:last').html(msg);
};
// 数据查询函数
var list = function(){
	// 对查询表单进行JSON数据形式的转换
	var qoData = $("#searchForm").getFormDataJSON();
	$.ajax({
		url: 'book/list.do',
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: qoData
	}).done(function(ro){
		// ro是后台服务响应到前端的数据对象（javascript对象）
		// 先把数据显示区域中的内容清空
		$('tbody:first').empty();
		// 如果ro中没有数据，则显示‘没有符合查询条件的数据’
		if(ro.emptyData){
			$('tbody:first').html('<tr><td colspan="9"><h2>没有符合查询条件的数据</h2></td></tr>');
		}else{
			// 如果ro中有数据，则执行以下操作
			// 得到数据的总页数，赋值给lastPage全局变量
			lastPage = ro.page.totalPage;
			// 对数据进行遍历
			$.each(ro.bookList,function(index,book){
				// 组装第一条数据的tr元素
				var dataTr = '<tr><td>'+(index+1)+'</td><td contenteditable="true" class="edit-td" data-field-name="name">'+book.name+'</td><td>'+book.author+'</td><td data-type="'+book.type+'">'+book.typeStr+'</td><td>'+book.pubDateStr+'</td><td>'+book.price+'</td><td>'+book.discount+'</td><td>'+book.finalPrice+'</td><td><input name="bookId" class="id-check" type="checkbox" value="'+book.idStr+'" /></td></tr>';
				// 把数据的tr元素追加到数据显示区域（tbody）
				$('tbody:first').append(dataTr);
			});
			// 显示分页信息
			$('#curr-page').text(ro.page.pageNo);
			$('#total-page').text(ro.page.totalPage);
			$('#start-row').text(ro.page.firstResultNum+1);
			$('#end-row').text(ro.page.lastResultNum);
		}
		// 重置全选和数据选择的checkbox
		$('.id-check').prop('checked',false);
		$('#select-all').prop('checked',false);
		// 重置删除和修改按钮的disabled属性为true（不可用）
		$('#delete-btn').prop('disabled',true);
		$('#update-btn').prop('disabled',true);
	}).fail(function(xhr,status,errorMsg){
		buildMsgDialog('images/error.png','加载数据失败');
		msgDialog.dialog('open');
		$('tbody:first').html('<tr><td colspan="9"><h2>加载数据失败</h2></td></tr>');
	});
}