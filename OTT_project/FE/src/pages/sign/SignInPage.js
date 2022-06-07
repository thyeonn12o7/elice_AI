import "../../design/signIn.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isEmail, errorStyle, returnBorderStyle } from "./SignUpPage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const url =
  "http://elice-kdt-3rd-team-16.koreacentral.cloudapp.azure.com/api/auth/login";
export function SignInPage() {
  const [userInfo, setUserInfo] = useState({ email: "", pw: "" });
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const postUserData = async () => {
    const { email, pw } = userInfo;
    const signinFormData = new FormData();
    signinFormData.append("email", email);
    signinFormData.append("password", pw);

    //로그인 요청
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: signinFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      // 리턴으로 받은 토큰 값 세션에 저장
      sessionStorage.setItem("userToken", response.data.token);

      navigate("/");
      window.location.reload();
    } catch (e) {
      console.log(e);
      setLoginError(true);
    }
  };

  return (
    <>
      <div className="log-in-box">
        <p id="log-in-title">로그인</p>

        <form>
          <div id="user-id-box">
            <div id="log-in-subtitle">이메일</div>

            <input
              type="text"
              name="user-id"
              id="user-input"
              placeholder="가입한 이메일을 입력해주세요."
              onChange={e => {
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                });
              }}
              style={returnBorderStyle(userInfo.email)}
            />
            {emailError && (
              <div style={errorStyle}>올바른 이메일을 입력해주세요.</div>
            )}
          </div>
          <div id="user-pw-box">
            <div id="log-in-subtitle">비밀번호</div>
            <input
              type="password"
              name="user-pw"
              id="user-input"
              placeholder="비밀번호를 입력해주세요."
              onChange={e => {
                setUserInfo({ ...userInfo, pw: e.target.value });
              }}
              style={returnBorderStyle(userInfo.pw)}
            />
          </div>
          {/* 로그인 실패시 안내 문구 */}
          {loginError && (
            <div style={errorStyle}>회원정보를 찾을 수 없습니다.</div>
          )}
          <button
            type="submit"
            id="user-log-in-btn"
            onClick={e => {
              e.preventDefault();
              const isValidation = isEmail(userInfo.email);
              if (!isValidation) {
                setEmailError(true);
                console.log("error", emailError);
              } else {
                setEmailError(false);
                postUserData();
              }
            }}
          >
            확인
          </button>
        </form>
        <Link to="/sign-up">
          <button id="user-log-in-btn">회원가입 하러 가기</button>
        </Link>
      </div>
    </>
  );
}

export default SignInPage;
