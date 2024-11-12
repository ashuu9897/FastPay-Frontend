import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading title={"Sign Up"} />
          <SubHeading label={"Enter your details to create an account"} />
          <InputBox
            placeholder={"John"}
            label={"First Name"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            placeholder={"Doe"}
            label={"Last Name"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InputBox
            placeholder={"abc123@example.com"}
            label={"Email"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            placeholder={"Some Strong Password"}
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={"password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "https://paytm-basic-backend-i8ru.onrender.com/api/v1/user/",
                    {
                      username,
                      firstName,
                      lastName,
                      password,
                    }
                  );
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
              label={"Sign Up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
