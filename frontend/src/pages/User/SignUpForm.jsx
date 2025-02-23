import styled from "styled-components";
import Button from "../../components/Button";
import Img from "../../components/Img";
import Input from "../../ui/Input";
import { useState } from "react";
import useLogin from "../../hook/useLogin";
import { useSignUp } from "../../hook/useSignUp";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid #c8e6c9;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  background: #f9fbe7;

  img {
    width: 20px;
    height: 20px;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
    color: #455a64;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #607d8b;

  input {
    width: 1rem;
    height: 1rem;
    accent-color: #2e7d32;
  }

  label {
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: black;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c !important;
  }
`;
function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signup, isLoading } = useSignUp();

  function handleLogin(e) {
    e.preventDefault();
    signup({ email, password, name, passwordConfirm });
  }
  return (
    <Form name="signUpForm" onSubmit={(e) => handleLogin(e)}>
      {/* Email Input */}
      <InputGroup>
        <Img src="/mail.svg" alt="Name Icon" />
        <Input
          type="text"
          id="name"
          placeholder="Name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <Img src="/mail.svg" alt="Email Icon" />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>

      {/* Password Input */}
      <InputGroup>
        <Img src="/Lock.svg" alt="Password Icon" />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <Img src="/Lock.svg" alt="Password Confirm" />
        <Input
          type="password"
          id="passwordConf"
          placeholder="Password confirm"
          autoComplete="current-password"
          value={passwordConfirm}
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </InputGroup>
      {/* Submit Button */}
      <StyledButton type="submit">Sign Up</StyledButton>
    </Form>
  );
}

export default SignUpForm;
