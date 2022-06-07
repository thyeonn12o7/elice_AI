import {
  VictoryChart,
  VictoryScatter,
  VictoryTooltip,
  VictoryAxis,
  VictoryLine,
  VictoryLabel,
} from "victory";
import {
  monthlyAudience,
  monthlyRating,
  monthlyYoutube,
} from "../../data/data1";
import { divisionNumbers } from "../etc/divisionLargeNumbers";

export function MediaTrendChart() {
  return (
    <>
      <VictoryChart height={250} domainPadding={30}>
        {/* x축 */}
        <VictoryAxis
          tickFormat={monthlyAudience.map(m => `${m.month}월`)}
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
          style={{
            ticks: { stroke: "#0f0b0b" },
            axis: { stroke: "#0f0b0b" },
            tickLabels: {
              fontSize: 8,
              fontFamily: "paybooc-Medium",
              angle: 35,
              padding: 9,
            },
          }}
        />
        {/* 그래프 제목 라벨 */}
        <VictoryLabel
          x={25}
          y={55}
          style={{ fontSize: 8, fontStyle: "italic" }}
          text={"그래프에 커서를 올리면\n 각각의 가중치를 확인할 수 있습니다."}
        />
        <VictoryLabel
          x={350}
          y={60}
          text={"영화 관람객 수"}
          backgroundStyle={[{ fill: "red", opacity: 0.2 }]}
          textAnchor="start"
          backgroundPadding={[{ left: 5, right: 25, top: 3 }]}
          style={{ fontSize: 10 }}
        />
        <VictoryLabel
          x={350}
          y={73}
          text={"TV 시청률"}
          backgroundStyle={[{ fill: "blue", opacity: 0.2 }]}
          textAnchor="start"
          backgroundPadding={[{ left: 5, right: 15, top: 3 }]}
          style={{ fontSize: 10 }}
        />
        <VictoryLabel
          x={350}
          y={86}
          text={"Youtube 조회수"}
          backgroundStyle={[{ fill: "green", opacity: 0.2 }]}
          textAnchor="start"
          backgroundPadding={[{ left: 5, right: 15, top: 3 }]}
          style={{ fontSize: 10 }}
        />

        {/* 영화 관람객 수 차트 */}
        <VictoryLine
          data={monthlyAudience}
          x={monthlyAudience.map(index => index.month)}
          y={"audience"}
          style={{
            data: {
              stroke: "#f68888",
              strokeWidth: 3,
            },
          }}
        />
        <VictoryScatter
          data={monthlyAudience}
          y={"audience"}
          size={2.5}
          style={{ data: { fill: "#8e0b0b" } }}
          labels={monthlyAudience.map(x => `${divisionNumbers(x.audience)}명`)}
          labelComponent={
            <VictoryTooltip
              renderInPortal={false}
              constrainToVisibleArea
              style={{
                fill: "#5C0909",
                fontSize: 8,
                fontWeight: "bold",
                fontFamily: "Cafe24SsurroundAir",
              }}
              cornerRadius={5}
              pointerLength={10}
              flyoutWidth={60}
              flyoutHeight={20}
              flyoutStyle={{
                stroke: "#834343",
                strokeWidth: 1.3,
                fill: "#ffffff",
              }}
            />
          }
        />
        {/* 시청률 차트 */}
        <VictoryLine
          data={monthlyRating}
          x={monthlyRating.map(index => index.month)}
          y={"rating"}
          style={{
            data: {
              stroke: "#a2a4f6",
              strokeWidth: 3,
            },
          }}
        />

        <VictoryScatter
          data={monthlyRating}
          y={"rating"}
          size={2.5}
          style={{ data: { fill: "#090b5d" } }}
          labels={monthlyRating.map(
            x => (x.rating * 0.000001).toFixed(2) + "%"
          )}
          labelComponent={
            <VictoryTooltip
              renderInPortal={false}
              constrainToVisibleArea
              style={{
                fill: "#090b5d",
                fontSize: 8,
                fontWeight: "bold",
                fontFamily: "Cafe24SsurroundAir",
              }}
              cornerRadius={5}
              pointerLength={10}
              flyoutWidth={60}
              flyoutHeight={20}
              flyoutStyle={{
                stroke: "#090b5d",
                strokeWidth: 1.3,
                fill: "#ffffff",
              }}
            />
          }
        />
        {/* 유튜브 조회수 차트 */}
        <VictoryLine
          data={monthlyYoutube}
          x={monthlyYoutube.map(index => index.Avg_view_count)}
          y={"Avg_view_count"}
          style={{
            data: {
              stroke: "#a1c99c",
              strokeWidth: 3,
            },
          }}
        />
        <VictoryScatter
          data={monthlyYoutube}
          y={"Avg_view_count"}
          size={2.5}
          style={{ data: { fill: "#3b6336" } }}
          labels={monthlyYoutube.map(
            x => `${divisionNumbers(x.Avg_view_count)}회`
          )}
          labelComponent={
            <VictoryTooltip
              renderInPortal={false}
              constrainToVisibleArea
              style={{
                fill: "#4D5B4B",
                fontSize: 8,
                fontWeight: "bold",
                fontFamily: "Cafe24SsurroundAir",
              }}
              cornerRadius={5}
              pointerLength={10}
              flyoutWidth={60}
              flyoutHeight={20}
              flyoutStyle={{
                stroke: "#96BB91",
                strokeWidth: 1.3,
                fill: "#ffffff",
              }}
            />
          }
        />
      </VictoryChart>
    </>
  );
}
