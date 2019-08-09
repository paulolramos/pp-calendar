import React, { useState } from "react";
import "./App.css";
import { getPattern } from "./BusinessLogic/functions";

import { Dashboard } from "./components/Dashboard/Dashboard";
import { Calendar } from "./components/Calendar/Calendar";

export const App = () => {
  const [appState, setAppState] = useState({
    today: new Date(),
    selectedDate: new Date(),
    currentPattern: getPattern(new Date().getFullYear()),
    currentMonth: new Date().toLocaleDateString("en-us", {
      month: "short",
    }),
    monthNumber: new Date().getMonth() + 1,
    yearNumber: new Date().getFullYear(),
  });
  // console.log("app state:", appState);

  return (
    <main className="App">
      <Dashboard {...appState} updateAppState={setAppState} />
      <Calendar {...appState} updateAppState={setAppState} />
    </main>
  );
};
