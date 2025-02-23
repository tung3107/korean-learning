import styled from "styled-components";
import Banner from "../../ui/Banner";
import Logo from "../../ui/Logo";
import LoginForm from "./LoginForm";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { useAuth } from "../../hook/useAuth";
import Spinner from "../../components/Spinner";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #e8f5e9, #c8e6c9);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (min-width: 768px) {
    margin: auto;
    max-width: 400px;
    padding: 3rem 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2e7d32;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #607d8b;
  margin-bottom: 2rem;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 0.85rem;
  color: #90a4ae;
  margin-top: 1rem;
  text-align: center;

  a {
    color: #2e7d32;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function Login() {
  const { isAuthenticated, isLoading, isUser } = useAuth();
  return !isAuthenticated && !isLoading ? (
    <LoginContainer>
      {/* Banner Section */}
      <Banner />

      {/* Form Section */}
      <FormWrapper>
        <Logo width={60} />
        <Title>Welcome Back</Title>
        <Subtitle>Please log in to your account</Subtitle>

        <LoginForm />

        <FooterText>
          Don&apos;t have an account? <a href="/register">Sign up</a>
        </FooterText>
      </FormWrapper>
    </LoginContainer>
  ) : isAuthenticated && !isLoading && isUser ? (
    <Navigate to="/app/home" replace />
  ) : isLoading ? (
    <Spinner />
  ) : (
    <Navigate to="/admin" replace />
  );
}

export default Login;
