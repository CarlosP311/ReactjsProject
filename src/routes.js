import { Navigate, Outlet } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import AddCurrency from "./pages/AddCurrency";
import Wallets from "./pages/Wallets";
import History from "./pages/History";
import SecureBackup from "./pages/SecureBackup";
import Settings from "./pages/Settings";
import RestoreWallet from "./pages/RestoreWallet";
import Currency from "./pages/Currency";
import LogIn from "./pages/Login";
import Page404 from "./pages/Page404";

import { routes } from "../src/constants";
import WelcomeModule from "./pages/Welcome";
import Signup from "./pages/Signup";

const getRoutes = (user_crypto_currency_data) => [
  {
    path: routes.welcomePage,
    element: !user_crypto_currency_data ? (
      <Outlet />
    ) : (
      <Navigate to={routes.dashboardPage} />
    ),
    children: [
      { path: routes.welcomePage, element: <WelcomeModule /> },
      { path: routes.loginPage, element: <LogIn /> },
      { path: routes.signupPage, element: <Signup /> },
    ],
  },
  {
    path: routes.welcomePage,
    element: user_crypto_currency_data ? (
      <Outlet />
    ) : (
      <Navigate to={routes.loginPage} />
    ),
    children: [
      { path: routes.dashboardPage, element: <DashboardPage /> },
      { path: routes.portfolioPage, element: <Portfolio /> },
      { path: routes.addCurrencyPage, element: <AddCurrency /> },
      { path: routes.walletsPage, element: <Wallets /> },
      { path: routes.historyPage, element: <History /> },
      { path: routes.secureBackupPage, element: <SecureBackup /> },
      { path: routes.settingsPage, element: <Settings /> },
      { path: routes.restoreWalletPage, element: <RestoreWallet /> },
      { path: routes.currencyPage, element: <Currency /> },
    ],
  },
  {
    path: "",
    element: !user_crypto_currency_data ? (
      <Navigate to={routes.welcomePage} />
    ) : (
      <Page404 />
    ),
    children: [
      { path: routes.loginPage, element: <LogIn /> },
      { path: "*", element: <LogIn /> },
    ],
  },
];

export default getRoutes;
