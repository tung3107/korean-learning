import Banner from "../../ui/Banner";
import styled from "styled-components";
import Logo from "../../ui/Logo";
import AuthNav from "../../components/AuthNav";
import Input from "../../ui/Input";
import Img from "../../components/Img";
import Button from "../../components/Button";

const LoginLayOut = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;

  width: 50%;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

function Login() {
  return (
    <LoginLayOut>
      <Banner />
      <div className="right w-full flex flex-row justify-center">
        <FormContent>
          <Logo width={45} />
          <AuthNav />
          <form name="loginForm" className="w-full my-3 flex flex-col gap-y-4">
            <div className="flex flex-row w-full items-center border-b-Grey-blue border-b-2">
              <Img src="../../src/assets/mail.svg" />
              <Input
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="username"
                className="py-2 px-6 w-full"
              />
            </div>
            <div className="flex flex-row w-full items-center mb-2 border-b-Grey-blue border-b-2">
              <Img src="../../src/assets/Lock.svg" />
              <Input
                type="password"
                id="password"
                autoComplete="current-password"
                className="py-2 px-6 w-full"
              />
            </div>
            <div>
              <Input
                type="checkbox"
                name="checkbox"
                id="checkboxId"
                className="text-tint6 w-4 h-4"
              />
              <span>Keep me signed in</span>
            </div>
            <Button styled="text-white w-full bg-tint6 rounded-md px-6 py-3 cursor-pointer">
              <span className="font-medium">Sign in</span>
            </Button>
          </form>
        </FormContent>
      </div>
    </LoginLayOut>
  );
}

export default Login;
