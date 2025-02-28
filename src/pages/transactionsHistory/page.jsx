import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components/header";
import { TopNavigation } from "../../components/topNavigation";
import './styles.css';
import { TransactionHistory } from "../../server/dispatchApi";

export const TransactionsHistory = () => {
  const dispatch = useDispatch();
  const tokenData = useSelector((state) => state.auth.token);
  const userProfile = useSelector((state) => state.auth.profile);
  const userBalance = useSelector((state) => state.auth.balance);
  const transactionHistory = useSelector((state) => state.auth.transactionHistory);

  useEffect(() => {
    handleHitDashboardApi()
  }, [])

  const handleHitDashboardApi = async () => {
    dispatch(TransactionHistory({ token: tokenData, offset: 0, limit: 5 }))
  }

  return (
    <div>
      <TopNavigation />
      <div>
        <Header userBalance={userBalance} userProfile={userProfile} />

        {/* Transaction History */}
        <div className="transaction-history-container">
          <h4 className="font-bold	">{'Semua Transaksi'}</h4>
          <div>
            <ul className="transaction-list">
              {transactionHistory?.records &&
                transactionHistory?.records.map((item, index) => {
                  const date = new Date(item?.created_on);
                  const formattedDate = date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  });

                  const formattedTime = date.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });

                  const formattedAmount = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(item?.total_amount);

                  return (
                    <li key={index} className="transaction-item">
                      <div>
                        <h3 className={`${item?.transaction_type !== "TOPUP" ? "amount-negative" : "amount-positive"} font-bold	`}>
                          {`${item?.transaction_type !== "TOPUP" ? "-" : "+"} ${formattedAmount}`}
                        </h3>
                        <h5 className="transaction-date">{`${formattedDate} ${formattedTime} WIB`}</h5>
                      </div>
                      <h5 className="transaction-description">{item?.description}</h5>
                    </li>
                  );
                })}
            </ul>
          </div>
          <h5 className="show-more">Show more</h5>
        </div>
      </div>
    </div>
  );
};
