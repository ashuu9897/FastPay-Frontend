import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    try {
      const fetchData = async () => {
        const res = await axios.get(
          "https://paytm-basic-backend-i8ru.onrender.com/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        //console.log(res?.data?.balance);
        setBalance(res?.data?.balance);
      };

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div>
      <AppBar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
