import "../../design/signIn.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//이메일 정규식 판단
export const isEmail = email => {
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return emailRegex.test(email);
};

export const borderStyle = { border: "0.3rem solid #e06666" };
export const errorStyle = { color: "red", fontSize: "1rem" };
export const returnBorderStyle = data => {
  return data !== "" ? borderStyle : {};
};
//GET요청 url
const url =
  "http://elice-kdt-3rd-team-16.koreacentral.cloudapp.azure.com/api/auth/register";

export function SignUpPage() {
  //input에 입력되는 유저 정보
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();
  const postUserData = async () => {
    // post에 필요한 formData형식 만들기
    const { email, name, password } = userInfo;
    const signupFormData = new FormData();
    signupFormData.append("email", email);
    signupFormData.append("name", name);
    signupFormData.append("password", password);

    //회원가입 요청
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: signupFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/sign-up/complete");
    } catch (e) {
      setLoginError(true);
    }
  };

  return (
    <>
      <div className="log-in-box">
        <p id="log-in-title">회원가입</p>

        <form>
          <div id="user-id-box">
            <div id="user-pw-box">
              <div id="log-in-subtitle">이름</div>
              <input
                type="text"
                name="user-pw"
                id="user-input"
                placeholder="이름을 입력해주세요."
                onChange={e => {
                  setUserInfo({
                    ...userInfo,
                    name: e.target.value,
                  });
                }}
                style={returnBorderStyle(userInfo.name)}
              />
            </div>
            <div id="log-in-subtitle">이메일</div>

            <input
              type="text"
              name="user-id"
              id="user-input"
              placeholder="이메일을 입력해주세요."
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
                setUserInfo({
                  ...userInfo,
                  password: e.target.value,
                });
              }}
              style={returnBorderStyle(userInfo.password)}
            />
          </div>
          {/* 회원가입 실패시 안내 문구 */}
          {loginError && <div style={errorStyle}>이미 가입된 회원입니다.</div>}
          <button
            type="submit"
            id="user-log-in-btn"
            onClick={e => {
              e.preventDefault();

              const isValidation = isEmail(userInfo.email);
              if (!isValidation) {
                setEmailError(true);
              } else {
                setEmailError(false);
                postUserData();
              }
            }}
          >
            확인
          </button>
        </form>
      </div>
    </>
  );
}
export default SignUpPage;
