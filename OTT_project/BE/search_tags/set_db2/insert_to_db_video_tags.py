import pymysql.cursors


connection = pymysql.connect(host='localhost',
                             user='root',
                             password='0000',
                             db='mydb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

try:
    cursor = connection.cursor()
    sql = "select id, tags from videos"
    cursor.execute(sql)
    tags_list = cursor.fetchall()

    for row in tags_list:
        row_tags = row['tags']
        row_index = row['id']
        row_tags_list = row_tags.split('|')

        for tag in row_tags_list:
            sql = "select id from tag where name = %s"
            result = cursor.execute(sql, tag)
            data = cursor.fetchall()

            # tag 테이블에 없는 태그이면 tag 테이블에 추가해주고 그 tag_id를 post_tag에도 추가해준다.
            if result == 0:
                sql = "insert into tag(`name`) values(%s)"
                cursor.execute(sql, tag)
                connection.commit()

                sql = "insert into video_tags(`video_id`, `tag_id`) values(%s, %s)"
                cursor.execute(sql, (row_index, cursor.lastrowid))
                connection.commit()
            # 이미 tag가 tag 테이블에 있다면 tag_id를 post_tag 테이블만 추가한다.
            else:
                sql = "insert into video_tags(`video_id`, `tag_id`) values(%s, %s)"
                cursor.execute(sql, (row_index, data[0]['id']))
                connection.commit()

finally:
    cursor.close()
    connection.close()
