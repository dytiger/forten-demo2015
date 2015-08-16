package org.forten.demo.action;

import java.util.List;

import javax.annotation.Resource;

import org.forten.demo.bo.BookBo;
import org.forten.demo.dto.BookForList;
import org.forten.demo.dto.BookForSave;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// 声明这是一个Spring MVC的控制器Bean
@Controller
// 这个类下的方法都会设置到/book路径下
@RequestMapping("/book")
public class BookAction {
	// 注入ID是bookBo的Bean
	@Resource
	private BookBo bookBo;

	// 一个控制器方法，被设置到/book/listAll.do上
	@RequestMapping("listAll")
	// @ResponseBody会把方法返回的数据以JSON的形式传递到客户端
	public @ResponseBody List<BookForList> listAll() {
		return bookBo.queryAll();
	}

	// 一个控制器方法，被设置到/book/save.do上
	@RequestMapping("save")
	// @ResponseBody会把方法返回的数据以JSON的形式传递到客户端
	// @RequestBody会获得客户端发送来的JSON数据，并将其转换为BookForSave类型的一个对象
	public @ResponseBody BookForSave save(@RequestBody BookForSave book) {
		bookBo.doSave(book);
		return book;
	}
}
