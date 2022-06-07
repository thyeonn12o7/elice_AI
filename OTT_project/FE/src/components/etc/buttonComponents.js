import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import styled from "styled-components";

export function NextBtn({ title, path }) {
  return (
    <div>
      <Link to={path} className="next">
        <button
          id="next-btn"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          {title}
        </button>
      </Link>
    </div>
  );
}

export function ScrollGuideBtn({ target, offset }) {
  return (
    <ScrollLink
      activeClass="active"
      to={target}
      smooth={true}
      offset={offset}
      isDynamic={false}
      spy={true}
      hashSpy={true}
      duration={3000}
      spyThrottle={500}
    >
      <NextGuide>스크롤 내려서 더보기 ⤵︎⤵︎</NextGuide>
    </ScrollLink>
  );
}

const NextGuide = styled.p`
  @keyframes blink-effect {
    50% {
      color: #a27979;
    }
  }

  font-size: 0.75rem;
  text-align: center;
  margin-top: 2rem;
  color: #e8e0e0;

  animation: blink-effect 1.5s step-end infinite;
`;
export default NextBtn;
