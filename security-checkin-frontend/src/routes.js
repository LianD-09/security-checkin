import Location from "views/Location.js";
import UserList from "views/UserList.js";
import CheckinHistory from "views/CheckinHistory.js";
import Account from "views/Account.js";
import Login from "layouts/Login.js"
import Setting from "./views/Setting";

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
  },
  {
    path: "/settings",
    name: "Cài đặt",
    icon: "nc-icon nc-settings-gear-64",
    component: Setting,
    layout: "/admin"
  }
];

export default dashboardRoutes;
