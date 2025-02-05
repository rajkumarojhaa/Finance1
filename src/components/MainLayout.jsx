import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import Header from '@/components/Header';
// import Sidebar from '@/components/Slider';

const MainLayout = () => {

  return (
    <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-900">


        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-gray-900">
          <div className="mx-auto w-full px-2 sm:px-6 lg:px-5 py-6">
            <Outlet /> {/* This will render the specific page component */}
          </div>
        </main>
    </div>
  );
};

export default MainLayout;
