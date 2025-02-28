import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopNavigation } from "../../components/topNavigation";
import { Header } from "../../components/header";
import TextInput from "../../components/textInput";
import { useFormik } from "formik";
import './styles.css';
import { useLocation } from "react-router-dom";
import { Transaction } from "../../server/dispatchApi";

export const PayTransaction = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const props = location.state?.item;
  const tokenData = useSelector((state) => state.auth.token);
  const userProfile = useSelector((state) => state.auth.profile);
  const userBalance = useSelector((state) => state.auth.balance);


  const formik = useFormik({
    initialValues: { transactionBalance: "" },
    onSubmit: () => {
      handleTransaction()
    },
  });
  console.log(props)

  const handleTransaction = async () => {
    try {
      dispatch(Transaction({ token: tokenData, service: props?.service_code}))
    } catch (error) {
      console.error("Topup Failed:", error);
    }
  };

  return (
    <div>
      <TopNavigation />
      <div>
        <Header userBalance={userBalance} userProfile={userProfile} />
        <div className="p-3">
          <h5 className="mb-2">{'PemBayaran'}</h5>
          <div className="flex direction-row items-center mr-px gap-2">
            <img src={props?.service_icon} alt={props?.service_name} className="w-10 h-10 mb-1" />
            <h5 className="font-bold">{props?.service_name}</h5>
          </div>
        </div>

        {/* Transaction */}
        <form onSubmit={formik.handleSubmit} className="transaction-container p-2">
          <TextInput
            name="transactionBalance"
            value={formik.values.transactionBalance}
            onChange={formik.handleChange}
            placeholder="Masukkan nominal transaksi"
          />
          <button
            type="submit"
            disabled={!formik.values.transactionBalance}
            className={`submit-button ${!formik.values.transactionBalance ? 'disabled' : ''}`}
          >
            {"Bayar"}
          </button>
        </form>
      </div>
    </div>
  );
};
