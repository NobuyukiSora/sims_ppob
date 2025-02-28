import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner, Services, UserBalance, UserProfile } from "../../server/dispatchApi";
import { TopNavigation } from "../../components/topNavigation";
import { Header } from "../../components/header";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const tokenData = useSelector((state) => state.auth.token);
  const userProfile = useSelector((state) => state.auth.profile);
  const userBalance = useSelector((state) => state.auth.balance);
  const banner = useSelector((state) => state.auth.banner);
  const services = useSelector((state) => state.auth.services);

  useEffect(() => {
    handleHitDashboardApi()
  }, [])

  const handleHitDashboardApi = async () => {
    dispatch(UserProfile(tokenData))
    dispatch(UserBalance(tokenData))
    dispatch(Banner(tokenData))
    dispatch(Services(tokenData))
  }

  return (
    <div>
      <TopNavigation />
      <div>
        <Header userBalance={userBalance} userProfile={userProfile}/>
        {/* Services */}
        <ul className="flex flex-wrap justify-around list-none p-0">
          {services &&
            services.map((item, index) => (
              <li key={index} className="flex flex-col items-center p-3" style={{ width: 100 }}>
                <img src={item?.service_icon} alt={item?.service_name} className="w-12 h-12 mb-1" />
                <h5 className="text-center text-wrap">{item?.service_name}</h5>
              </li>
            ))}
        </ul>
        <h5 className="pl-5 font-bold">{'Temukan promo menarik'}</h5>
        {/* Banner */}
        <div className="overflow-x-auto whitespace-nowrap">
          <ul className="flex space-x-4 p-3">
            {banner &&
              banner.map((item, index) => (
                <li key={index} className="flex flex-col items-center" style={{ width: 300 }}>
                  <img src={item?.banner_image} alt={item?.banner_name} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
