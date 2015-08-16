package org.forten.demo.dto;

import java.util.Date;

/**
 * 用于保存书籍时使用的数据传输对象
 * 
 * @author Duyi
 */
public class BookForSave {
	private String name;
	private String author;
	private String type;
	private int price;
	private double discount;
	private Date pubDate;

	public BookForSave() {
		super();
	}

	public BookForSave(String name, String author, String type, int price, double discount, Date pubDate) {
		super();
		this.name = name;
		this.author = author;
		this.type = type;
		this.price = price;
		this.discount = discount;
		this.pubDate = pubDate;
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
	}

	@Override
	public String toString() {
		return "BookForSave [name=" + name + ", author=" + author + ", type=" + type + ", price=" + price
				+ ", discount=" + discount + ", pubDate=" + pubDate + "]";
	}
}
