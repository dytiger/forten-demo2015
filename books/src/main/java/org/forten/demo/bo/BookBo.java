package org.forten.demo.bo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.forten.demo.dao.JDBCDao;
import org.forten.demo.dto.BookForList;
import org.forten.demo.dto.BookForSave;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static org.forten.demo.dao.JDBCDao.EMPTY_PARAMS;

@Service("bookBo")
public class BookBo {
	@Resource
	private JDBCDao jdbcDao;

	@Transactional
	public void doSave(BookForSave book) {
		String sql = "INSERT INTO bb_book (name,author,type,price,discount,publish_date) VALUES (:name,:author,:type,:price,:discount,:pubDate)";
		Map<String, Object> params = new HashMap<>();
		params.put("name", book.getName());
		params.put("author", book.getAuthor());
		params.put("type", book.getType());
		params.put("price", book.getPrice());
		params.put("discount", book.getDiscount());
		params.put("pubDate", book.getPubDate());

		jdbcDao.update(sql, params);
	}

	@Transactional(readOnly = true)
	public List<BookForList> queryAll() {
		String sql = "SELECT id,name,author,type,price,discount,publish_date FROM bb_book";
		List<BookForList> list = jdbcDao.findList(sql, EMPTY_PARAMS, new RowMapper<BookForList>() {

			@Override
			public BookForList mapRow(ResultSet rs, int rowNum) throws SQLException {
				int id = rs.getInt("id");
				String name = rs.getString("name");
				String author = rs.getString("author");
				String type = rs.getString("type");
				int price = rs.getInt("price");
				double discount = rs.getDouble("discount");
				Date pubDate = rs.getDate("publish_date");

				return new BookForList(id, name, author, type, price, discount, pubDate);
			}
		});

		return list;
	}
}
