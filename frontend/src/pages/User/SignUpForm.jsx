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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passwordConfirm: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { signup, isLoading } = useSignUp();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleLogin(e) {
    e.preventDefault();
    let newErrors = {};
    const requiredFields = ["name", "email", "passwordConfirm", "password"];

    // Kiểm tra các field bắt buộc
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });
    // Kiểm tra email hợp lệ
    if (formData.email && !formData.email.includes("@")) {
      newErrors.email = "Invalid email format.";
    }

    // Kiểm tra mật khẩu hợp lệ
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
      newErrors.password =
        "Password must have at least one letter, one number, and be 8+ characters.";
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      signup(formData);
    }
  }
  return (
    <Form name="signUpForm" onSubmit={(e) => handleLogin(e)}>
      {/* Email Input */}
      <InputGroup>
        <Img src="/mail.svg" alt="Name Icon" />
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </InputGroup>
      <InputGroup>
        <Img src="/mail.svg" alt="Email Icon" />
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          required
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </InputGroup>

      {/* Password Input */}
      <InputGroup>
        <Img src="/Lock.svg" alt="Password Icon" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </InputGroup>
      <InputGroup>
        <Img src="/Lock.svg" alt="Password Confirm" />
        <Input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          placeholder="Password confirm"
          autoComplete="current-password"
          required
          value={formData.passwordConfirm}
          onChange={handleChange}
        />
        {errors.passwordConfirm && (
          <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm}</p>
        )}
      </InputGroup>
      {/* Submit Button */}
      <StyledButton type="submit">Sign Up</StyledButton>
    </Form>
  );
}

export default SignUpForm;
