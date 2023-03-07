import React from "react";
import styled from "styled-components";
import { naverColorCode } from "../constants/colorCode";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CiUser, CiLock } from "react-icons/ci";
import LoginSignupButtonStyle from "../styles/LoginSignupButtonStyle";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postLogin = (data) => {
    const userInfo = { memberId: data.memberId, memberPw: data.memberPw };
    console.log(userInfo);
    axios
      .post(`${process.env.REACT_APP_BASEURL}/api/members/login`, data)
      .then((res) => {
        window.localStorage.setItem("accessToken", res.headers.authorization);
        console.log("res.headers.authorization : ", res.headers.authorization);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <form onSubmit={handleSubmit((data) => postLogin(data))}>
        <LogoStyle>NAVER</LogoStyle>
        <IdInput>
          <CiUser />
          <InputStyle
            type="text"
            placeholder="아이디"
            {...register("memberId", { required: "아이디를 입력해주세요" })}
          />
        </IdInput>
        <div>
          <CiLock />
          <InputStyle
            type="password"
            placeholder="비밀번호"
            {...register("memberPw", {
              required: "비밀번호를 입력해주세요",
            })}
          />
        </div>
        <div>
          <LoginSignupButtonStyle>로그인</LoginSignupButtonStyle>
          <InputStyle type="submit" />
        </div>
      </form>
    </Container>
  );
};

export default Login;

const LogoStyle = styled.div`
  color: ${naverColorCode};
  font-size: 30px;
  font-weight: 900;
`;

const IdInput = styled.div`
  border: 1px solid gray;
  width: 70vw;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const InputStyle = styled.input`
  border: none;
  width: 95%;
  margin-left: 10px;

  :focus {
    outline: none;
  }
`;
