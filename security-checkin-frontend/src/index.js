
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./global.css";

import AdminLayout from "layouts/Admin.js";
import Login from "layouts/Login";
import {store} from "./store"
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
<<<<<<< HEAD
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" component={Login} /> */}
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>
=======
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>
>>>>>>> 66c4207402193d71a09217ec476eb3f495b9fb03
);
