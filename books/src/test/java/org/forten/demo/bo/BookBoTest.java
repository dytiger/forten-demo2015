package org.forten.demo.bo;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.forten.demo.dto.BookForList;
import org.forten.demo.dto.BookForSave;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath*:/spring/app-*.xml")
public class BookBoTest {
	@Resource
	private BookBo bo;

	@Test
	public void testDoSave() throws Exception {
		BookForSave book = new BookForSave("新华字典", "新华", "工具", 50, 8.0, new Date());
		bo.doSave(book);
	}

	@Test
	public void testQueryAll() throws Exception {
		List<BookForList> list = bo.queryAll();
		for (BookForList bookForList : list) {
			System.out.println(bookForList);
		}
	}
}
