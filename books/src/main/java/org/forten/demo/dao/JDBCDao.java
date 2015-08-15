package org.forten.demo.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.forten.util.LogUtil;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository("jdbcDao")
public class JDBCDao implements InitializingBean {
	private static final Logger log = Logger.getLogger(JDBCDao.class);
	public static final Map<String,Object> EMPTY_PARAMS = new HashMap<>();

	private DataSource dataSource;
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	@Resource
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
		this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
		LogUtil.info(log, "dataSource Bean已经注入到jdbcDao Bean中");
	}

	public <T> T findObject(String sql, Map<String, Object> params, RowMapper<T> mapper) {
		try {
			return namedParameterJdbcTemplate.queryForObject(sql, params, mapper);
		} catch (EmptyResultDataAccessException e) {
			e.printStackTrace();
			return null;
		}
	}

	public <T> List<T> findList(String sql, Map<String, Object> params, RowMapper<T> mapper) {
		try {
			return namedParameterJdbcTemplate.query(sql, params, mapper);
		} catch (EmptyResultDataAccessException e) {
			e.printStackTrace();
			return null;
		}
	}

	public <T> int update(String sql, Map<String, Object> params) {
		try {
			return namedParameterJdbcTemplate.update(sql, params);
		} catch (EmptyResultDataAccessException e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		if (dataSource == null) {
			throw new BeanCreationException("dataSource Bean没有被注入到jdbcDao Bean中");
		}
		if (namedParameterJdbcTemplate == null) {
			throw new BeanCreationException("jdbcDao Bean中的NamedParameterJdbcTemplate为null");
		}
	}
}
