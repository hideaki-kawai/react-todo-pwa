import React from "react";
import { AuthProvider } from "./providers/AuthProvider";
import "./App.css";
import "./service/firebase";
import { Header } from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
      </div>
    </AuthProvider>
  );
}

export default App;
