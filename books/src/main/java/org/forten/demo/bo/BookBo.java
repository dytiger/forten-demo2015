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

/**
 * 书籍的业务逻辑Bean
 * 
 * @author duyi
 */
// 声明这是一个Spring的Bean，并设置这个Bean的ID是bookBo
@Service("bookBo")
public class BookBo {
	// 把id是jdbcDao的Bean注入到这个Bean中
	@Resource
	private JDBCDao jdbcDao;

	/**
	 * 保存书籍数据
	 * 
	 * @param book
	 *            要保存的数据对象
	 */
	// 声明这个方法是一个事务
	@Transactional
	public void doSave(BookForSave book) {
		// 使用命名参数的SQL语句
		String sql = "INSERT INTO bb_book (name,author,type,price,discount,publish_date) VALUES (:name,:author,:type,:price,:discount,:pubDate)";

		// 声明参数Map对象
		Map<String, Object> params = new HashMap<>();
		// 设置参数
		params.put("name", book.getName());
		params.put("author", book.getAuthor());
		params.put("type", book.getType());
		params.put("price", book.getPrice());
		params.put("discount", book.getDiscount());
		params.put("pubDate", book.getPubDate());

		// 执行更新
		jdbcDao.update(sql, params);
	}

	/**
	 * 查询所有数据
	 * 
	 * @return 所有书籍数据
	 */
	// 声明这个方法是一个只读事务
	@Transactional(readOnly = true)
	public List<BookForList> queryAll() {
		// SQL语句
		String sql = "SELECT id,name,author,type,price,discount,publish_date FROM bb_book";
		// 执行查询，因为语句中没有参数，所以使用EMPTY_PARAMS做为第二个参数
		List<BookForList> list = jdbcDao.findList(sql, EMPTY_PARAMS, new RowMapper<BookForList>() {
			// 数据结果集合到对象映射关系的建立
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
