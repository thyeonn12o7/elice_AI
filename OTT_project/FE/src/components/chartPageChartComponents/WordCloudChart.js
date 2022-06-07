import React from "react";
import TagCloud from "react-tag-cloud";
import randomColor from "randomcolor";
import { useState, useEffect } from "react";

{
  /* <div className="tag-item-wrapper">
              <div>Hover Me Please!</div>
              <div className="tag-item-tooltip">HOVERED!</div>
            </div> */
}

export function WordCloud({ data }) {
  //워드클라우드 요소 생성
  //가중치로 폰트 사이즈 조절
  const datas = data.map(item => {
    return (
      <div
        className="tag-item-wrapper"
        style={{
          fontSize: item.value > 200 ? item.value / 5 : item.value / 2.5,
        }}
      >
        {item.word}
        <div className="tag-item-tooltip">
          '{item.word}': {item.value}
        </div>
      </div>
    );
  });

  //애니메이션 실행 함수(컴포넌트 강제 마운트/언마운트)
  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
  }
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    // setInterval -> 일정한 시간 간격으로 작업을 수행하기 위해 사용하는 함수
    // clearInterval을 이용해서 멈춤(지정된 작업은 모두 실행되고 멈춤)
    const interval = setInterval(() => {
      forceUpdate();
    }, 2000);
    //useEffect에서 return은 컴포넌트가 언마운트 될 때 실행되는 명령
    return () => clearInterval(interval);
  }, []);

  return (
    <TagCloud
      className="tag-cloud"
      style={{
        fontFamily: "sans-serif",

        fontWeight: "bold",
        fontStyle: "italic",
        color: () => randomColor({ hue: "red" }),
        padding: 5,
        width: "100%",
        height: "100%",
        padding: 5,
      }}
    >
      {datas}
    </TagCloud>
  );
}
