import { NextBtn } from "../../components/etc/buttonComponents";

export function SignUpCompletePage() {
  return (
    <>
      <div className="sign-up-complete">
        <p>회원가입이 완료되었습니다.</p>
        <NextBtn title="여기를 눌러 홈화면으로 가기" path="/" />
        <NextBtn title="여기를 눌러 로그인하러 가기" path="/sign-in" />
      </div>
    </>
  );
}

export default SignUpCompletePage;
