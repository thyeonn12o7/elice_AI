import React from "react";

import { useState } from "react";
import FooterComponents from "../components/base/Footer";
import { BasicInformationChart } from "../components/chartPageChartComponents/BasicInformationChart";
import { TimeInfomationChart } from "../components/chartPageChartComponents/TimeInfomationChart";
import { CategoryInfomationChart } from "../components/chartPageChartComponents/CategoryInfomationChart";
import { WordCloud } from "../components/chartPageChartComponents/WordCloudChart";

import {
  categoryStep1,
  categoryStep2,
  categoryStep3,
  categoryStep4,
} from "../data/data2-3";

import {
  basicInfoData1,
  basicInfoData2,
  basicInfoData3,
  basicInfoData4,
} from "../data/data2-1";
import {
  wordCloudData1,
  wordCloudData2,
  wordCloudData3,
  wordCloudData4,
} from "../data/data2-4";

import { timeStep1, timeStep2, timeStep3, timeStep4 } from "../data/data2-2";

import { periodStep, subtitleStep } from "../data/periodStep";
import "../design/chartPage.css";
import "../design/wordcloud.css";

const DEFAULT_TAP = "column-btn1";
const DEFAULT_STEP = "row-btn1";

const basicDataByStep = [
  basicInfoData1,
  basicInfoData2,
  basicInfoData3,
  basicInfoData4,
];

const timeDataByStep = [timeStep1, timeStep2, timeStep3, timeStep4];

const categoryDataByStep = [
  categoryStep1,
  categoryStep2,
  categoryStep3,
  categoryStep4,
];

const wordcloudDataByStep = [
  wordCloudData1,
  wordCloudData2,
  wordCloudData3,
  wordCloudData4,
];

const activeStyle = {
  backgroundColor: "#e0d3d3",
  fontWeight: "bold",
  border: "solid 3px #ac8888",
  boxShadow:
    "rgba(204, 185, 185, 0.15) 0px 50px 100px -20px, rgba(204, 185, 185, 0.3) 0px 30px 60px -30px, rgba(204, 185, 185, 0.35) 0px -2px 6px 0px inset",
};

export function ChartPage() {
  const [tap, setTap] = useState(DEFAULT_TAP);
  const [step, setStep] = useState(DEFAULT_STEP);

  const selectTabType = btnId => {
    setTap(btnId);
  };

  const selectStep = btnId => {
    setStep(btnId);
  };

  const selectStepData = data => {
    let dataset =
      (step === "row-btn1" && data[0]) ||
      (step === "row-btn2" && data[1]) ||
      (step === "row-btn3" && data[2]) ||
      (step === "row-btn4" && data[3]);
    return dataset;
  };

  const rowBtnType = [
    { id: "row-btn", type: "1단계" },
    { id: "row-btn", type: "2단계" },
    { id: "row-btn", type: "3단계" },
    { id: "row-btn", type: "4단계" },
  ];

  const columnBtnType = [
    { id: "column-btn", type: "기본정보" },
    { id: "column-btn", type: "시간" },
    { id: "column-btn", type: "카테고리" },
    { id: "column-btn", type: "단어빈도" },
  ];

  return (
    <div className="second-chart">
      {/* 차트의 가로 버튼 */}
      {rowBtnType.map((x, index) => {
        return (
          <button
            className={x.id}
            id={`${x.id}${index + 1}`}
            style={step === `${x.id}${index + 1}` ? activeStyle : {}}
            onClick={e => {
              selectStep(e.target.id);
            }}
          >
            {x.type}
          </button>
        );
      })}
      {/* 차트의 세로 버튼 */}
      {columnBtnType.map((x, index) => {
        return (
          <button
            className={x.id}
            id={`${x.id}${index + 1}`}
            style={tap === `${x.id}${index + 1}` ? activeStyle : {}}
            onClick={e => {
              selectTabType(e.target.id);
            }}
          >
            {x.type}
          </button>
        );
      })}

      <div id="second-main-chart">
        {/* 기간별 타이틀 및 세부 날짜 */}
        <p id="second-subtitle-1">{selectStepData(subtitleStep)}</p>
        <p id="second-subtitle-2">{selectStepData(periodStep)}</p>

        {/* 클릭된 버튼의 id가 id와 같으면 해당 차트 표시 */}
        {tap === "column-btn1" && (
          <BasicInformationChart datas={selectStepData(basicDataByStep)} />
        )}
        {tap === "column-btn2" && (
          <TimeInfomationChart datas={selectStepData(timeDataByStep)} />
        )}
        {tap === "column-btn3" && (
          <CategoryInfomationChart datas={selectStepData(categoryDataByStep)} />
        )}

        {tap === "column-btn4" && (
          <WordCloud data={selectStepData(wordcloudDataByStep)} />
        )}
      </div>
      <FooterComponents />
    </div>
  );
}

export default ChartPage;
