LOAD DATA INFILE './hotel_info.csv' INTO TABLE hotel FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 LINES(
  region,
  hotel_id,
  hotel_name,
  address,
  hotel_url,
  hotel_img_url,
  positive_keywords,
  negative_keywords
);
LOAD DATA INFILE './hotel_review.csv' INTO TABLE review FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 LINES (
  review_id,
  @review_date,
  contents,
  hotel_id,
  is_positive
)
SET
  review_date = STR_TO_DATE(@review_date, '%Y-%m-%d');