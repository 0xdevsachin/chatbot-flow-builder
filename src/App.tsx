import React from "react";
import "./App.css";
import FlowBuilder from "./components/flow-builder";
import Header from "./components/header";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <FlowBuilder />
    </div>
  );
};

export default App;
