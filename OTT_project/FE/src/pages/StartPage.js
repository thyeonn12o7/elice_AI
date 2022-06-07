import React from "react";
import { ScrollContainer } from "react-scroll-motion";
import "./../design/startPage.css";
import * as page from "../components/startPageChartComponents/ScrollArticleComponents";

export function StartPage() {
  return (
    <div>
      <ScrollContainer>
        <page.Page1 />
        <page.Page2 />
        <page.Page3 />
        <page.Page4 />
        <page.Page5 />
        <page.Page7 />
      </ScrollContainer>
    </div>
  );
}

export default StartPage;
