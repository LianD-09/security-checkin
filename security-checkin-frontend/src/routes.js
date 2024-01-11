/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Location from "views/Location.js";
import UserList from "views/UserList.js";
import CheckinHistory from "views/CheckinHistory.js";
import Account from "views/Account.js";
import Login from "layouts/Login.js"

const dashboardRoutes = [
  {
    path: "/location",
    name: "Địa điểm",
    icon: "nc-icon nc-chart-pie-35",
    component: Location,
    layout: "/admin"
  },
  {
    path: "/userlist",
    name: "Quản lý người dùng",
    icon: "nc-icon nc-paper-2",
    component: UserList,
    layout: "/admin"
  },
  {
    path: "/history",
    name: "Lịch sử check-in",
    icon: "nc-icon nc-notes",
    component: CheckinHistory,
    layout: "/admin"
  },
  {
    path: "/account",
    name: "Tài khoản",
    icon: "nc-icon nc-circle-09",
    component: Account,
    layout: "/admin"
  }
];

export default dashboardRoutes;
