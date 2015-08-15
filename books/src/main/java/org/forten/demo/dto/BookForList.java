package org.forten.demo.dto;

import java.util.Date;

import org.forten.util.DateUtil;

public class BookForList {
	private int id;
	private String name;
	private String author;
	private String type;
	private int price;
	private double discount;
	private Date pubDate;
	private String pubDateStr;

	public BookForList() {
		super();
	}

	public BookForList(int id, String name, String author, String type, int price, double discount, Date pubDate) {
		super();
		this.id = id;
		this.name = name;
		this.author = author;
		this.type = type;
		this.price = price;
		this.discount = discount;
		this.pubDate = pubDate;
		if (pubDate != null) {
			this.pubDateStr = DateUtil.convertDateToString(pubDate, "yyyy年MM月");
		}
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public Date getPubDate() {
		return pubDate;
	}

	public void setPubDate(Date pubDate) {
		this.pubDate = pubDate;
		if (pubDate != null) {
			this.pubDateStr = DateUtil.convertDateToString(pubDate, "yyyy年MM月");
		}
	}

	public String getPubDateStr() {
		return pubDateStr;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BookForList other = (BookForList) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "BookForList [id=" + id + ", name=" + name + ", author=" + author + ", type=" + type + ", price=" + price
				+ ", discount=" + discount + ", pubDate=" + pubDate + "]";
	}
}
