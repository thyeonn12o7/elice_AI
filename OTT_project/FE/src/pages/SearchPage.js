import React from "react";
import { useState, useEffect } from "react";
import "../design/searchPage.css";
import { GrLike, GrView } from "react-icons/gr";
import axios from "axios";
import { GrNext, GrPrevious, GrRefresh } from "react-icons/gr";
import { categoryType } from "../data/categoryType";
import { LoadingCircle } from "../components/etc/loadingCircle";
import { activeSearchBtnStyle } from "../design/innerStyle";
import { divisionNumbers } from "../components/etc/divisionLargeNumbers";
// 전체

const DEFAULT_CATEGORY = 0;
const url = `http://elice-kdt-3rd-team-16.koreacentral.cloudapp.azure.com/api`;

export function SearchPage() {
  const [selectTags, setSelectTags] = useState([]);
  const [selectCategory, setSelectCategory] = useState(DEFAULT_CATEGORY);
  const [maxPage, setMaxPage] = useState(0);
  const [pageArray, setPageArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const [searchTags, setSearchTags] = useState([]);

  const handleCategory = categoryId => {
    setSelectCategory(categoryId);
  };
  const fetchTags = async categoryId => {
    const params = `/search/?category=${categoryId}`;
    const response = await axios.get(url + params);
    setSearchTags(response.data);
  };
  const handleTags = tagName => {
    const tagIndex = selectTags.indexOf(tagName);
    tagIndex === -1
      ? setSelectTags([...selectTags, tagName])
      : setSelectTags(selectTags.filter(item => item !== tagName));
  };
  const handlePageByCategory = async () => {
    const params = `/search/category?data= {'categoryId':${selectCategory},'page':${currentPage}}`;
    const response = await axios.get(url + params);
    setVideos(response.data.videos);
    setMaxPage(response.data.max_page);
  };
  //태그가 선택되면 호출
  const handlePageByTags = async () => {
    const params = `http://elice-kdt-3rd-team-16.koreacentral.cloudapp.azure.com/api/search/tags?data={'tags':'${selectTags.join(
      ","
    )}','categoryId':${selectCategory},'page':${currentPage}}`;

    try {
      if (selectTags.length !== 0) {
        const response = await axios.get(params);
        setVideos(response.data.videos);
        setMaxPage(response.data.max_page);
      } else {
        handlePageByCategory();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePagination = () => {
    const temp =
      maxPage < 10
        ? Array.from({ length: maxPage }, (v, i) => i + 1)
        : Array.from({ length: 10 }, (v, i) => i + 1);
    setPageArray(temp);
  };

  useEffect(() => {
    handlePageByCategory();
    fetchTags(selectCategory);
  }, []);

  useEffect(() => {
    handlePageByTags();
  }, [selectTags]);

  useEffect(() => {
    setSelectTags([]);
    fetchTags(selectCategory);
    handlePageByCategory();
    setCurrentPage(1);
  }, [selectCategory]);

  useEffect(() => {
    fetchTags(selectCategory);
    handlePageByCategory();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    handlePagination();
  }, [maxPage]);

  return (
    <div>
      <div>
        <h2 id="hashtag-title">#해시태그로 인기 동영상 보기</h2>
        <p
          id="hashtag-subtitle"
          style={{ fontSize: "0.6rem", textAlign: "center" }}
        >
          아래 영상의 조회수와 좋아요수는 인기동영상에 선정된 날짜를 기준으로
          하고있습니다.
        </p>
      </div>

      <div className="thirdpage-main">
        <div className="category-box">
          {categoryType.map(x => {
            return (
              <button
                className="category-box-button"
                id={`category-box-button${x.category_id}`}
                onClick={e => {
                  e.preventDefault();
                  handleCategory(x.category_id);
                  fetchTags(x.category_id);
                }}
                style={
                  `category-box-button${selectCategory}` ===
                  `category-box-button${x.category_id}`
                    ? activeSearchBtnStyle
                    : {}
                }
              >
                {x.category_name}
              </button>
            );
          })}
        </div>
        <div className="hashtag-box">
          {searchTags.length === 0 ? (
            <LoadingCircle />
          ) : (
            searchTags.map(x => {
              return (
                <button
                  id="hashtag-btn"
                  style={
                    selectTags.indexOf(x) !== -1 ? activeSearchBtnStyle : {}
                  }
                  onClick={e => {
                    e.preventDefault();
                    handleTags(x);
                  }}
                >
                  {x}
                </button>
              );
            })
          )}
          <span id="hastag-refresh-btn">
            <GrRefresh
              onClick={e => {
                e.preventDefault();
                setSelectTags([]);
              }}
            />
          </span>
        </div>
      </div>

      <div className="video-div">
        {videos === null ? (
          <LoadingCircle />
        ) : (
          videos.map(v => {
            return (
              <a
                href={`https://www.youtube.com/watch?v=${v.videoAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-wrapped-btn"
              >
                <div id="video-div-div">
                  <div id="video-thumbnail">
                    <img src={v.thumbnail} alt={v.videoAddress} />
                  </div>
                  <div id="video-title">
                    <p>{v.title}</p>
                  </div>

                  <div id="video-channel">
                    <p>{v.channel}</p>
                  </div>

                  <div id="video-category">
                    <p>
                      {
                        categoryType[
                          Object.keys(categoryType).findIndex(
                            key =>
                              categoryType[key].category_id === v.categoryId
                          )
                        ].category_name
                      }
                    </p>
                  </div>

                  <div className="video-views-likes">
                    <div className="video-likes-div">
                      <p id="video-views-p">
                        <GrLike />
                        {divisionNumbers(v.likes, 1)}
                      </p>
                    </div>
                    <div className="video-views-div">
                      <GrView />
                      <p id="video-likes-p">{divisionNumbers(v.views, 1)}</p>
                    </div>
                  </div>
                </div>
              </a>
            );
          })
        )}
      </div>
      <div className="bootstrap-pagination-bar">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li class="page-item">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                onClick={e => {
                  e.preventDefault();

                  const temp =
                    pageArray[0] === 1
                      ? pageArray.map(v => v)
                      : pageArray.map(v => v - 10);
                  setPageArray(temp);
                }}
              >
                <span aria-hidden="true">
                  <GrPrevious />
                </span>
              </a>
            </li>
            {pageArray.map(x => {
              return (
                <li
                  class={`${
                    currentPage === x ? "page-item active" : "page-item"
                  }`}
                >
                  <a
                    class="page-link"
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setCurrentPage(x);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {x}
                  </a>
                </li>
              );
            })}

            <li class="page-item">
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                onClick={e => {
                  e.preventDefault();

                  const temp =
                    pageArray[pageArray.length - 1] === maxPage
                      ? pageArray.map(v => v)
                      : pageArray.map(v => v + 10);
                  setPageArray(temp);
                }}
              >
                <span aria-hidden="true">
                  <GrNext />
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SearchPage;
