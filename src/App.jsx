
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import { Layout } from "@/components/Layout";
import AccountDetails from '@/components/AccountDetails';
import AddTransaction from "./components/AddTransaction";

function App() {
  return (
    <Router>
      <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="account/:title" element={<AccountDetails />} />
            <Route path="add-transaction" element={<AddTransaction />} />
            {/* Yha Sare page enter karna he */}
          </Route>
        </Routes>
    </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
