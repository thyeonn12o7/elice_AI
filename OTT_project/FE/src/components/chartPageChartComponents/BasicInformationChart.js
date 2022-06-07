import React from "react";

import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";

export function BasicInformationChart({ datas }) {
  // 차트에 넣어줄 새로운 차트용 데이터 제작
  const videos = [];
  const likes = [];
  const views = [];
  const comments = [];

  datas.map(m => {
    videos.push({ x: "numb_videos", y: m.numb_videos, fill: "#623030" });
    views.push({ x: "veiw_cnt", y: m.view_cnt / 100000, fill: "#9c4c4c" });
    likes.push({ x: "likes_cnt", y: m.likes_cnt / 10000, fill: "#c46060" });
    comments.push({
      x: "comment_cnt",
      y: m.comment_cnt / 10000,
      fill: "#cf7f7f",
    });
  });
  // 그래프 수치를 표시하기 위해 리스트로 만듦
  const labelData = [];
  datas.map(x => {
    labelData.push(x.numb_videos);
    labelData.push(x.view_cnt);
    labelData.push(x.likes_cnt);
    labelData.push(x.comment_cnt);
  });

  // 만든 데이터를 하나의 배열로 합침
  const data = [...videos, ...views, ...likes, ...comments];

  return (
    <VictoryChart
      domainPadding={80}
      width={350}
      height={400}
      padding={{ top: 10, bottom: 110 }}
      animate={{ duration: 500, onLoad: { duration: 100 } }}
    >
      {/* x축 라벨 */}
      {/* TODO 영상 바 옆에 y축 구분 실선 넣기 */}
      <VictoryAxis
        tickValues={[1, 2, 3, 4]}
        tickFormat={["영상", " 조회", "좋아요", "댓글"]}
      />
      <VictoryLabel
        text={"단위(개)\nM: 백만,K: 천"}
        x={-50}
        y={70}
        textAnchor={"start"}
        backgroundPadding={{ left: 5, right: 15, top: 3, bottom: 1 }}
        style={[{ fontSize: 15 }]}
      />
      {/* 막대 그래프  */}
      <VictoryBar
        data={data}
        x={datum => datum.x}
        y={datum => datum.y}
        labels={labelData.map(x =>
          x > 1000000
            ? `${Math.floor(x / 1000000).toLocaleString("en-US")}M`
            : `${(x / 1000).toFixed(2)}K`
        )}
        style={{ data: { fill: ({ datum }) => datum.fill } }}
      />
    </VictoryChart>
  );
}
