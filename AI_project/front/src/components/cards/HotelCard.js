import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { randomValueFromArray } from "../../action/HotelSearch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination } from "swiper";

import "swiper/css";
import HeartButton from "../../action/HeartButton";
import ProgressBar from "../../action/ProgressBar";

const HotelCard = ({ h }) => {
    const history = useHistory();

    return (
        <>
            <div className="mb-3">
                <div className="bg-white grid rounded-2xl hover:scale-105 duration-150 text-[#210203] p-2 md:py-2 md:px-1 grid-cols-4 mx-4 md:flex-col md:flex ">
                    <div className="text-blue items-center  ">
                        <img
                            src={h.hotel_img_url} //"https://via.placeholder.com/900x500.png?text=Hotel+hoya"
                            alt="sample"
                            className=" mr-3 rounded-lg w-96 h-60 mb-3 cursor-pointer hover:scale-95 duration-200 object-cover "
                            onClick={() =>
                                history.push({
                                    pathname: `/hotel/${h.hotel_id}`,
                                    state: {
                                        hotel_id: h.hotel_id,
                                        is_wish: h.is_wish,
                                    },
                                })
                            }
                        />
                    </div>
                    <div className="col-start-2  col-end-4 ml-2 ">
                        <div className="">
                            <Link
                                // to={`/hotel/${h.hotel_id}`}

                                to={{
                                    pathname: `/hotel/${h.hotel_id}`,
                                    state: {
                                        hotel_id: h.hotel_id,
                                        is_wish: h.is_wish,
                                    },
                                }}
                                className="text-3xl md:text-xl font-semibold
                                hover:text-gray-400 hover:underline
                                hover:font-bold"
                            >
                                {h.hotel_name}
                            </Link>
                            <span className="badge text-xs mt-2 bg-[#3A6EA5] outline-none border-0">
                                {h.region}
                            </span>

                            <ProgressBar value={h.similarity} />
                            <div className="h-40 w-full mt-1 ">
                                <Swiper
                                    direction={"vertical"}
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper w-full h-40 "
                                >
                                    {h.reviews.map((review) => (
                                        <SwiperSlide
                                            key={review.review_id}
                                            className=" pr-6 h-52 flex items-center justify-center"
                                        >
                                            <div>
                                                <p className="text-center text-lg md:text-base font-reviewsFont p-3">
                                                    " {review.contents} "{" "}
                                                </p>{" "}
                                                {/* <p className="text-xl inline-block float-right pr-2">
                                                    ”
                                                </p> */}
                                                <p className="text-sm text-center text-gray-300 px-3">
                                                    <span>
                                                        @
                                                        {randomValueFromArray()}
                                                        △△님,{" "}
                                                    </span>
                                                    {review.review_date.slice(
                                                        0,
                                                        7
                                                    )}
                                                </p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-center items-center md:mt-4">
                        <HeartButton
                            hotel_id={h.hotel_id}
                            is_wish={h.is_wish}
                        />
                        <button
                            className="btn py-2 px-4 font-semibold items-center outline-none border-0  shadow-md text-white bg-point hover:bg-[#F6bD60] w-2/5 md:w-40"
                            onClick={() => window.open(h.hotel_url, "_blank")}
                        >
                            예약
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

HotelCard.prototype = {
    h: PropTypes.array,
};

export default HotelCard;
