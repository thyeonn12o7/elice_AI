import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../design/header.css";
import axios from "axios";

// 헤더의 메뉴버튼
export function MenuBtn() {
  const [visible, setVisible] = useState(false);
  const menuList = [
    {
      label: "Home",
      path: "home",
    },
    {
      label: "Chart",
      path: "chart",
    },
    {
      label: "Search",
      path: "search",
    },
    {
      label: "LogIn",
      path: "sign-in",
    },
    {
      label: "LogOut",
      path: "home",
    },
  ];

  // 메뉴버튼 on/off
  const turnMenu = () => {
    setVisible(!visible);
  };

  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const url =
    "http://elice-kdt-3rd-team-16.koreacentral.cloudapp.azure.com/api/auth/get";

  //세션에 저장된 토큰으로 유저 데이터 불러오기
  const getUserData = async () => {
    const token = sessionStorage.getItem("userToken");
    console.log(token);

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      setIsLogin(true);
      setUserName(response.data.name);
      console.log("isLogin", isLogin, "userName", userName);
    } catch (e) {
      console.log(e);
      setIsLogin(false);
    }
  };

  //로그아웃
  const LogOut = () => {
    sessionStorage.removeItem("userToken");
    setIsLogin(false);
    setUserName("");
    console.log("logout");
  };

  //FIXME 로그인 했을 때 바로 로그인이 안됨. 새로고침해야지 로그인이됨.
  //로그인 상태가 변경되면 유저 데이터를 불러옴
  useEffect(() => {
    getUserData();
  }, [isLogin]);

  //헤더 컴포넌트가 실행될 때 유저 데이터를 불러옴
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <div className="navigator">
        {isLogin === true ? (
          <span className="user-login-info">{userName}님</span>
        ) : (
          <div></div>
        )}
        <button
          id="menu-btn"
          onClick={() => {
            turnMenu();
          }}
        >
          <AiOutlineMenu size={25} />
        </button>
        {/* 로그인이 되어있으면 로그아웃 버튼이보이고, 안되어있으면 로그인 버튼이 보임 */}
        {visible && (
          <div className="menu">
            {(isLogin === true
              ? menuList.filter(x => x.label !== "LogIn")
              : menuList.filter(x => x.label !== "LogOut")
            ).map(x => {
              return (
                <div key={x.id} id="drop-menu">
                  <Link
                    to={`/${x.path}`}
                    onClick={
                      x.label === "LogOut"
                        ? () => {
                            LogOut();
                          }
                        : () => {
                            window.scrollTo(0, 0);
                          }
                    }
                  >
                    {x.label}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

// 헤더
export function HeaderComponents() {
  return (
    <header>
      <div id="headers" fixed="top">
        <Link to="/home" id="service-name">
          애코튜브
        </Link>

        <MenuBtn />
      </div>
    </header>
  );
}

export default HeaderComponents;
