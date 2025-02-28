import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopNavigation } from "../../components/topNavigation";
import { Header } from "../../components/header";
import TextInput from "../../components/textInput";
import { useFormik } from "formik";
import './styles.css';
import { Topup } from "../../server/dispatchApi";

export const TopupBalance = () => {
  const dispatch = useDispatch();
  const tokenData = useSelector((state) => state.auth.token);
  const userProfile = useSelector((state) => state.auth.profile);
  const userBalance = useSelector((state) => state.auth.balance);

  const topupOptions = [
    { title: 'Rp 10.000', value: 10000 },
    { title: 'Rp 20.000', value: 20000 },
    { title: 'Rp 50.000', value: 50000 },
    { title: 'Rp 100.000', value: 100000 },
    { title: 'Rp 250.000', value: 250000 },
    { title: 'Rp 500.000', value: 500000 }
  ];

  const formik = useFormik({
    initialValues: { topupBalance: 0 },
    onSubmit: (values) => {
      handleTopup(values.topupBalance)
    },
  });

  const handleTopup = async ( values) => {
    try {
      dispatch(Topup({ token: tokenData, amount: formik.values.topupBalance }))
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
          <h5>{'Silahkan masukkan'}</h5>
          <h3 className="font-bold">{'Nominal Top Up'}</h3>
        </div>
        
        {/* Topup */}
        <form onSubmit={formik.handleSubmit} className="topup-container p-2">
          <div className="input-container-topup">
            <TextInput
              name="topupBalance"
              value={formik.values.topupBalance}
              onChange={formik.handleChange}
              placeholder="Masukkan nominal top up"
            />
            <button
              type="submit"
              disabled={!formik.values.topupBalance}
              className={`submit-button ${!formik.values.topupBalance ? 'disabled' : ''}`}
            >
              {"Top up"}
            </button>
          </div>
          <div className="fixed-width-topup-balance">
            <div className="button-group-topup-balance">
              {topupOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-button-topup-balance ${formik.values.topupBalance === option.value ? "selected" : ""}`}
                  onClick={() => formik.setFieldValue("topupBalance", option.value)}
                >
                  {option.title}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
