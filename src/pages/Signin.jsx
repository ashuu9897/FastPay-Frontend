import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading title={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder={"abc123@example.com"}
            label={"Email"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"Your Strong Password"}
            label={"Password"}
            type={"password"}
          />
          <div className="pt-4">
            <Button
              label={"Sign In"}
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "https://paytm-basic-backend-i8ru.onrender.com/api/v1/user/signin",
                    {
                      username,
                      password,
                    }
                  );
                  //console.log(response);
                  if (response.data.success) {
                    message.success(response.data.message);
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                  } else {
                    message.error(response.data.message);
                  }
                } catch (error) {
                  message.error(error.message);
                }
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
