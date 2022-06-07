import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryGroup,
  VictoryScatter,
  VictoryTooltip,
  VictoryLabel,
} from "victory";
import { lineChartColorPalette } from "../../design/colorPalette";

export function TimeInfomationChart({ datas }) {
  const times = [];

  const viewAvg = [];
  const likeAvg = [];
  const commentAvg = [];

  datas.map(m => {
    viewAvg.push({ x: m.published_time, y: m.avg_view_cnt });
    likeAvg.push({ x: m.published_time, y: m.avg_likes_cnt });
    commentAvg.push({ x: m.published_time, y: m.avg_comment_cnt });
    times.push(m.published_time);
  });

  const data = [viewAvg, likeAvg, commentAvg];

  const maxima = data.map(dataset => Math.max(...dataset.map(d => d.y)));

  const divide = [0.4, 1, 2];
  const labels = [
    { y: 10, label: "평균 조회수" },
    { y: 23, label: "평균 좋아요 수" },
    { y: 36, label: "평균 댓글 수" },
  ];

  return (
    <>
      <VictoryChart width={400} padding={{ top: 40, bottom: 90 }}>
        {labels.map((x, index) => {
          return (
            // y축 라벨
            <VictoryLabel
              x={-10}
              y={x.y}
              text={x.label}
              backgroundStyle={[
                { fill: lineChartColorPalette[index], opacity: 0.8 },
              ]}
              textAnchor={"start"}
              backgroundPadding={{ left: 5, right: 25, top: 1, bottom: 1 }}
              style={[{ fill: "white", fontSize: 11 }]}
            />
          );
        })}
        <VictoryLabel
          text={"단위(개)\nM: 백만\nK: 천"}
          x={-10}
          y={65}
          textAnchor={"start"}
          backgroundPadding={{ left: 5, right: 15, top: 3, bottom: 1 }}
          style={[{ fontSize: 10 }]}
        />

        {/* x축 라벨 */}
        <VictoryAxis
          tickValues={times}
          tickFormat={times}
          style={{
            ticks: { stroke: "#0f0b0b" },
            axis: { stroke: "#0f0b0b" },
            tickLabels: {
              fontSize: 9,
              fontFamily: "paybooc-Medium",
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
                x={datum => datum.x}
                y={datum => datum.y / maxima[index] / divide[index]}
              />
              <VictoryScatter
                data={x}
                x={datum => datum.x}
                y={datum => datum.y / maxima[index] / divide[index]}
                size={2.5}
                style={{ data: { fill: lineChartColorPalette[index] } }}
                labels={data[index].map(
                  m =>
                    `${
                      m.y > 1000000
                        ? (m.y / 1000000).toFixed(2)
                        : (m.y / 1000).toFixed(2)
                    }${m.y > 1000000 ? "M" : "K"}`
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
    </>
  );
}
