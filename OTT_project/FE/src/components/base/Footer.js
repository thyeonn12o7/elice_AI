import "../../design/footer.css";

export function FooterComponents() {
  const detectUserAgency = () => {
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edg") > -1;
    var isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
    } else if (
      isChromium !== null &&
      typeof isChromium !== "undefined" &&
      vendorName === "Google Inc." &&
      isOpera === false &&
      isIEedge === false
    ) {
    } else {
      window.alert("현재 페이지는 Chrome에 최적화 되어있습니다.");
    }
  };
  detectUserAgency();

  return (
    <div className="footer-div">
      <footer>
        <p id="footer-contact">©Elice AI Track 3기 16팀 식스틴</p>
        <p id="footer-contact">contact : hello_world_@kakao.com</p>
      </footer>
    </div>
  );
}

export default FooterComponents;
