
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import { Layout } from "@/components/Layout";

function App() {
  return (
    <Router>
      <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            {/* Add other pages here */}
          </Route>
        </Routes>
    </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
// In this file, we have imported the ThemeProvider component and wrapped the entire application inside it. This will allow us to use the theme context in any component of the application.