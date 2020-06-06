import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import logo from "./logo.svg";
import "./index.css";
import RegistrationForm from "./pages/register";
import LoginForm from "./pages/login";
import UserDetailsUpdateForm from "./pages/settings";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" component={RegistrationForm} exact />
          <Route path="/login" component={LoginForm} />
          <Route path="/settings" component={UserDetailsUpdateForm} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
