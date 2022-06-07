import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryGroup,
  VictoryLabel,
} from "victory";

import { lineChartColorPalette } from "../../design/colorPalette";

export function CategoryInfomationChart({ datas }) {
  //차트에 사용할 새로운 데이터 양식
  const likes = [];
  const views = [];
  const comments = [];
  datas.map(m => {
    likes.push({ x: m.categoryId, y: m.likes });
    views.push({ x: m.categoryId, y: m.view_count });
    comments.push({ x: m.categoryId, y: m.comment_count });
  });
  const data = [views, likes, comments];

  //각 데이터별 최댓값 추출
  const maxima = data.map(dataset => Math.max(...dataset.map(d => d.y)));

  const divide = [1, 1.3, 1.6];
  const labels = [
    { y: 20, label: "조회수" },
    { y: 30, label: "좋아요" },
    { y: 40, label: "댓글" },
  ];

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        width={350}
        height={200}
        containerComponent={
          <VictoryVoronoiContainer labels={datum => datum.y} />
        }
        domainPadding={20}
        padding={{ left: 60, top: 20, right: 20, bottom: 60 }}
      >
        {/* 그래프 제목 라벨 */}
        {labels.map((x, index) => {
          return (
            <VictoryLabel
              x={20}
              y={x.y}
              text={x.label}
              backgroundStyle={[
                { fill: lineChartColorPalette[index], opacity: 0.8 },
              ]}
              textAnchor={"start"}
              backgroundPadding={{ left: 5, right: 15, top: 1, bottom: 1 }}
              style={[{ fill: "white", fontSize: 8 }]}
            />
          );
        })}
        <VictoryLabel
          text={"단위(개)\nM: 백만\nK: 천"}
          x={15}
          y={60}
          textAnchor={"start"}
          backgroundPadding={{ left: 5, right: 15, top: 3, bottom: 1 }}
          style={[{ fontSize: 8 }]}
        />
        {/* x축 라벨 */}
        <VictoryAxis
          tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
          tickFormat={[
            "영화&애니메이션",
            "자동차",
            "음악",
            "동물",
            "스포츠",
            "여행",
            "게임",
            "일상",
            "코미디",
            "엔터테인먼트",
            "뉴스",
            "노하우",
            "교육",
            "과학&기술",
            "사회&이슈",
          ]}
          style={{
            ticks: { stroke: "#0f0b0b" },
            axis: { stroke: "#0f0b0b" },
            tickLabels: {
              fontSize: 6,
              fontFamily: "paybooc-Medium",
              angle: 35,
              padding: 9,
            },
          }}
        />
        {/* 그래프 */}
        {data.map((x, index) => {
          return (
            <VictoryGroup
              animate={{
                duration: 1500,
                onLoad: { duration: 200 },
              }}
            >
              {/* 그래프의 y축을 (최댓값 + 임의의 일정 비율)로 나눠 모든 그래프가 잘 보이도록함 */}
              <VictoryLine
                data={x}
                style={{ data: { stroke: lineChartColorPalette[index] } }}
                x="foo"
                y={datum => datum.y / maxima[index] / divide[index]}
              />
              <VictoryScatter
                data={x}
                x="foo"
                y={datum => datum.y / maxima[index] / divide[index]}
                size={2.5}
                style={{ data: { fill: lineChartColorPalette[index] } }}
                labels={data[index].map(
                  m =>
                    `${
                      m.y > 1000000
                        ? (m.y / 1000000).toFixed(2)
                        : (m.y / 1000).toFixed(2)
                    }${m.y > 1000000 ? "M" : "K"}  `
                )}
                labelComponent={
                  <VictoryTooltip
                    renderInPortal={false}
                    constrainToVisibleArea
                    style={{
                      fill: lineChartColorPalette[index],
                      fontSize: 8,
                      fontWeight: "bold",
                      fontFamily: "Cafe24SsurroundAir",
                    }}
                    cornerRadius={5}
                    pointerLength={10}
                    flyoutWidth={60}
                    flyoutHeight={20}
                    flyoutStyle={{
                      stroke: lineChartColorPalette[index],
                      strokeWidth: 1.3,
                      fill: "#ffffff",
                    }}
                  />
                }
              />
            </VictoryGroup>
          );
        })}
      </VictoryChart>
    </div>
  );
}
