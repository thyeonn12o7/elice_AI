## Data_analysis

#### Dataset
- Main data
    - add_specific_publishedAt.csv
    - add_video_address.csv
    - monthly_viewcnt_Data.csv 
    - youtube_trending_data.csv

- FirstPage
    - csv_firstpage
    - Excel

- SecondPage
    - by_duration
    - by_time
    - for_categorize
    - for_wordcloud

- ThirdPage
    - tags

>
> [첫 번째 페이지]
> ⇒ 메인화면 : 서비스 개요 및 인사이트 설명
>
> 서비스 이름 및 설명
>
> * [x] description
> 
> 월 별 영상 평균 조회 수 + 영화 데이터 + 티비 데이터 (첫 번째 차트)
>
> * 월 별 데이터 구성
>
> * [x] 영상 평균 조회 수
>
> * [x] 영화 관객 수
>
> * [x] 티비 시청률
>
> 해당 차트에 대한 설명
>
> * [x] description

> 월 별 확진자 수 + 영상 평균 조회수 데이터 (두 번째 차트)
>
> * [x] 영상 평균 조회 수
>
> * [x] 확진자 수
>
> 해당 차트에 대한 설명
>
> * [x] description


> [두 번째 페이지]
> ⇒ 기간 별 인기동영상 데이터 분석 결과 인사이트 설명
>
> 기간 별 youtube trending data 나누어 csv file로 각각 만들기
>
> 1) 기본 정보 (bar chart) ⇒ 거리두기 기간 별 전체 정보
>
> * [x] 총 영상 수
>
> * [x] 영상 총 조회 수
>
> * [x] 총 좋아요 수
>
> * [x] 총 댓글 수
>
> 2) 시간 별 (업로드 시간에 따른 분석 ⇒ 한 시간 단위) (line chart) 평균 수치
>
> * [x] 영상 평균 조회 수
>
> * [x] 영상 평균 좋아요 수
>
> * [x] 영상 평균 댓글 수
>
> 3) 카테고리 별 (line chart)
>
> * [x] 영상 총 조회 수
>
> * [x] 영상 총 좋아요 수
>
> * [x] 영상 총 댓글 수
>
> 4) 단어 빈도 (word cloud)
>
> * [x] 워드클라우드로 구성


> [세 번째 페이지]
> ⇒ 카테고리와 태그에 따른 컨텐츠 검색 서비스
>
> 태그 분석
>
> * [x] 카테고리 별 태그 분석 => 랭킹 상위 20개 추출하여 사용 (중복 값 및 null 값 제거)


#### Codeset
- add_specific_date.py
- add_video_address.py
- count_viewcnt_monthly.py
- extract_info.py
- info_per_time.py
- separate_by_duration.py
- separate_by_time.py
- 세번째_페이지.ipynb
- 워드클라우드_단어_분석.ipynb
- 중복_태그_제거.ipynb
- 카테고리별_분석.ipynb








