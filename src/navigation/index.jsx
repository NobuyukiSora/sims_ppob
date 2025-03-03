import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "../pages/register/page";
import { Login } from "../pages/login/page";
import { Dashboard } from "../pages/dashboard/page";
import { TopupBalance } from "../pages/topup/page";
import { PayTransaction } from "../pages/transaction/page";
import { TransactionsHistory } from "../pages/transactionsHistory/page";

export const AppNavigations = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/TopupBalance" element={<TopupBalance />} />
        <Route path="/Transaction" element={<PayTransaction />} />
        <Route path="/TransactionsHistory" element={<TransactionsHistory />} />
      </Routes>
    </Router>
  );
};

