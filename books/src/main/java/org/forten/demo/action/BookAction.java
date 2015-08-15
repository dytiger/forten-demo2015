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

@Controller
@RequestMapping("/book")
public class BookAction {
	@Resource
	private BookBo bookBo;

	@RequestMapping("listAll")
	public @ResponseBody List<BookForList> listAll() {
		return bookBo.queryAll();
	}

	@RequestMapping("save")
	public @ResponseBody BookForSave save(@RequestBody BookForSave book) {
		bookBo.doSave(book);
		return book;
	}
}
