import React from 'react';

export const TopNavigation = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center">
        <img
          src="/assets/Logo.png"
          alt="Logo"
          className="h-8 mr-2"
        />
        <h3 className='font-bold'>{'SIMS PPOB'}</h3>
      </div>

      <div className="flex items-center space-x-4">
        <a href="/topup" className="hover:text-red-500">
          Top Up
        </a>
        <a href="/transactions" className="hover:text-red-500">
          Transactions
        </a>
        <a href="/account" className="hover:text-red-500">
          Akun
        </a>
      </div>
    </nav>
  );
}