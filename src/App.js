import React, { useState } from "react";
import "./App.css";
import { Dashboard } from "./components/dashboard/dashboard";

export const App = () => {
  const [appState] = useState({
    today: new Date(),
    selectedDate: new Date(),
    yearInput: null,
    // currentPattern: getPattern(new Date().getFullYear()),
    currentMonth: new Date().toLocaleDateString("en-us", { month: "short" }),
    monthNumber: new Date().getMonth() + 1,
    yearNumber: new Date().getFullYear()
  });

  console.log("app state:", appState);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
};
