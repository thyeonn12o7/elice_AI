import { MediaTrendChart } from "./MediaTrendChart";
import {
  Animator,
  ScrollPage,
  batch,
  Fade,
  MoveOut,
  Sticky,
  FadeIn,
} from "react-scroll-motion";
import { ScrollGuideBtn, NextBtn } from "../etc/buttonComponents";
import FooterComponents from "../base/Footer";

//Page1~7순서대로 /home에서 스크롤됨
export function Page1() {
  return (
    <>
      <ScrollPage page={0}>
        <Animator animation={batch(FadeIn(), Sticky(), MoveOut(0, -200))}>
          <span style={{ fontSize: "30px" }}>
            <p className="home-main-title">
              유튜브 인기 동영상에는 어떤 영상들이 올라가는지 궁금하시지
              않으신가요?
            </p>
            <ScrollGuideBtn target="page2" offset={450} />
          </span>
        </Animator>
      </ScrollPage>
    </>
  );
}
export function Page2() {
  return (
    <>
      <ScrollPage page={1}>
        <Animator animation={batch(Fade(0, 1), Sticky(), MoveOut(0, -200))}>
          <span style={{ fontSize: "30px" }} id="page2">
            <p className="home-main-title">
              혹은 코로나 19 이후 유튜브 트렌드 변화에 대해 고민하지 않으셨나요?
            </p>
            <ScrollGuideBtn target="page3" offset={-300} />
          </span>
        </Animator>
      </ScrollPage>
    </>
  );
}
export function Page3() {
  return (
    <ScrollPage page={2}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",

          height: "100%",
        }}
        id="page3"
      >
        <span style={{ fontSize: "40px" }}>
          <Animator animation={MoveOut(-1000, 0)}>
            <p>그렇다면 잘 오셨어요 👋🏻</p>
          </Animator>
          <Animator animation={MoveOut(1000, 500)}>
            <p>유튜브와 코로나19가 🦠</p>
          </Animator>

          <Animator animation={MoveOut(-1000, 1000)}>
            <p>어떤 관련이 있을까요 ? ❓</p>
          </Animator>
          <ScrollGuideBtn target="page4" offset={400} />
        </span>
      </div>
    </ScrollPage>
  );
}
export function Page4() {
  return (
    <ScrollPage page={3}>
      <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
        <span id="page4">
          <p>
            실제로 우리는 코로나19 이후 많은 변화를 경험하고 있는데요. 그
            중에서도 가장 눈에 띄는 것은 언택트, 즉 비대면 사회로의 전환입니다.
            우리는 이 속에서 얼마나 많은 일상의 변화를 경험하게 될까요?
            코로나19가 바꿔놓은 우리의 일상을 통해 한 번 알아보도록 하겠습니다.
          </p>
          <ScrollGuideBtn target="page5" offset={800} />
        </span>
      </Animator>
    </ScrollPage>
  );
}
export function Page5() {
  return (
    <ScrollPage page={4}>
      <Animator animation={batch(Fade(), Sticky(50, 52), MoveOut(0, -200))}>
        <span id="page5" className="chart1">
          <h2 id="chart-title">
            유튜브 인기동영상 조회수 · TV 시청률 · 영화 관람객 수 <br />
            추이 비교 및 분석
          </h2>

          <div id="chart">
            <MediaTrendChart />
          </div>
          <p id="chart-description">
            다양화된 미디어와 더불어 영상 트렌드의 변화에 따른 시청률은 지속해서
            감소하고 있습니다. 또한 코로나 19의 확산으로 인해 영화 관람에 제한이
            생기면서 영화 관람객 수도 예년에 비해 크게 줄어들었습니다. 반면,
            유튜브 조회 수의 경우 점차 증가하는 그래프를 띄며, 이는 앞선 두
            가지의 원인도 크게 작용한 것으로 보입니다. 애코튜브는 코로나19 이후
            <i>2020년도 8월 13일 부터 2021년 12월 20일</i> 까지의{" "}
            <b>
              <u>
                <a href="https://support.google.com/youtube/answer/7239739?hl=ko">
                  유튜브 인기 동영상
                </a>
              </u>
            </b>
            을 사회적 거리두기 단계별로 나눠 분석하였습니다.
          </p>
          <ScrollGuideBtn target="last-description" offset={400} />
        </span>
      </Animator>
    </ScrollPage>
  );
}

export function Page7() {
  return (
    <>
      <ScrollPage page={5}>
        <Animator animation={batch(Sticky(), FadeIn())}>
          <div>
            <p id="last-description">
              코로나19 이후 유튜브 트렌드가 궁금하다면?
            </p>
            <div id="last-btn">
              <NextBtn
                title={"코로나 이후 기간별 데이터 보러가기 "}
                path={"/chart"}
              />
              <NextBtn
                title={"해시태그별 인기 동영상 검색하기 "}
                path={"/search"}
              />
            </div>
          </div>
        </Animator>
        <FooterComponents />
      </ScrollPage>
    </>
  );
}

export default Page1;
