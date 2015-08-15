CREATE TABLE bb_book (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  author varchar(255) DEFAULT NULL,
  TYPE varchar(15) DEFAULT NULL,
  price int(11) DEFAULT NULL,
  discount double DEFAULT NULL,
  PUBLISH_DATE date DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;