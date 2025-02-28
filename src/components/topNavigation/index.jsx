import React from "react";

export const TopNavigation = () => {

  const isActive = (path) => window.location.pathname === path ? "text-red-500 font-bold" : "text-gray-700";

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <a className="flex items-center" href="/Dashboard">
        <img src="/assets/Logo.png" alt="Logo" className="h-8 mr-2" />
        <h3 className="font-bold">{'SIMS PPOB'}</h3>
      </a>

      <div className="flex items-center space-x-4">
        <a href="/TopupBalance" className={`hover:text-red-500 ${isActive("/TopupBalance")}`}>
          Top Up
        </a>
        <a href="/Transactions" className={`hover:text-red-500 ${isActive("/Transactions")}`}>
          Transactions
        </a>
        <a href="/Account" className={`hover:text-red-500 ${isActive("/Account")}`}>
          Akun
        </a>
      </div>
    </nav>
  );
};
