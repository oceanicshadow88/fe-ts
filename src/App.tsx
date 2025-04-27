import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './staticPages/HomePage/HomePage';
import LoginPageV2 from './pages/LoginV2/LoginPageV2';
import Setting from './pages/Setting/Setting';
import PrivacyStatementPage from './pages/PrivacyStatementPage/PrivacyStatementPage';
import UserPage from './pages/UserPage/UserPage';
import UserMePage from './pages/SettingPage/UserMePage/UserMePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AccessPage from './pages/AccessPage/AccessPage';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import CreateProject from './pages/CreateProject/CreateProject';
import AccountSettingsPage from './pages/AccountSettingPage/AccountSettingPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import ChangePasswordPage from './staticPages/ChangePasswordPage/ChangePasswordPage';
import BoardPage from './pages/BoardPage/BoardPage';
import AboutPage from './staticPages/AboutPage/AboutPage';
import KanbanBoardPage from './pages/KanbanBoardPage/KanbanBoardPage';
import './App.css';
import { UserProvider } from './context/UserInfoProvider';
import ProjectMembersPage from './pages/ProjectMembersPage/ProjectMembersPage';
import RolePage from './pages/RolePage/RolePage';
import UnauthorizePage from './pages/UnauthorizePage/UnauthorizePage';
import FAQPage from './staticPages/FAQPage/FAQPage';
import AuthenticationRoute from './customRoutes/AuthenticationRoute';
import SecurityPage from './staticPages/SecurityPage/SecurityPage';
import AboutPageT2 from './staticPages/AboutPageT2/AboutPageT2';
import AboutPageT3 from './staticPages/AboutPageT3/AboutPageT3';
import { getDomainExists, getDomains } from './api/domain/domain';
import BacklogPage from './pages/BacklogPage/BacklogPage';
import ShortcutPage from './pages/ShortcutPage/ShortcutPage';
import DashboardLayout from './lib/Layout/DashboardLayout/DashboardLayout';
import PricePage from './pages/PricePage/PricePage';
import MyWorkPage from './staticPages/MyWorkPage/MyWorkPage';
import ReportPage from './pages/ReportPage/ReportPage';
import RegisterPageV2 from './pages/RegisterV2/RegisterPageV2';
import VerifyPageV2 from './pages/VerifyPageV2/VerifyPageV2';
import DashBoardPage from './pages/DashboardPage/DashBoardPage';
import DomainFailPage from './pages/DomainFailPage/DomainFailPage';
import config from './config/config';
import CareerPage from './staticPages/CareerPage/CareerPage';
import ContactPage from './staticPages/ContactPage/ContactPage';
import CookiePolicyPage from './staticPages/CookiePolicyPage/CookiePolicyPage';
import RefundPolicyPage from './staticPages/RefundPolicyPage/RefundPolicyPage';
import SupportCenterPage from './staticPages/SupportCenterPage/SupportCenterPage';
import TermsOfServicePage from './staticPages/TermsOfServicePage/TermsOfServicesPage';
import GdprPage from './staticPages/GDPRPage/GDPRPage';
import PrivacyPolicy from './staticPages/PrivacyPolicyPage/PrivacyPolicyPage';
import ModalProvider from './context/ModalProvider';
import RetroPage from './pages/RetroPage/RetroPage';
import { ProjectDetailsProvider } from './context/ProjectDetailsProvider';
import CreateStripeCheckoutSession from './pages/CreateStripeCheckoutSession/CreateStripeCheckoutSession';
import SubscriptionSuccessPage from './pages/SubscriptionSuccessPage/SubscriptionSuccessPage';
import EpicPage from './pages/EpicPage/EpicPage';

function App() {
  const [isRootDomain, setIsRootDomain] = useState<any>(null);
  const [isValidDomain, setValidDomain] = useState(null);

  useEffect(() => {
    if (config.isCI) {
      setIsRootDomain(true);
      return;
    }
    const getD = async () => {
      const res = await getDomains();
      setIsRootDomain(res.data);
    };
    const getDomainValid = async () => {
      const res = await getDomainExists();
      setValidDomain(res.data);
    };
    getD();
    getDomainValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRootPage = () => {
    if (!isRootDomain) {
      return <LoginPageV2 />;
    }
    return <HomePage />;
  };
  if (!config.isCI) {
    if (isValidDomain === null || isRootDomain === null) {
      return <>Loading..</>;
    }

    if (!isValidDomain) {
      return (
        <Routes>
          <Route path="*" element={<DomainFailPage />} />;
        </Routes>
      );
    }
  }
  return (
    <>
      <ToastContainer style={{ width: '400px' }} />
      <UserProvider>
        <Routes>
          <Route
            path=""
            element={
              <ProjectDetailsProvider>
                <ModalProvider>
                  <Outlet />
                </ModalProvider>
              </ProjectDetailsProvider>
            }
          >
            {isRootDomain && <Route path="register" element={<RegisterPageV2 />} />}
            <Route path="/faq" element={<FAQPage />} />
            {/* active new user TODO: fix */}
            <Route path="/verify" element={<VerifyPageV2 />} />
            {/* confirm existing user */}
            {/*  <Route path="/user-confirm" element={<VerifyPageV2 />} />  */}
            <Route path="login" element={<LoginPageV2 isRootDomain={isRootDomain || false} />} />
            <Route path="/" element={getRootPage()} />
            <Route path="/login/reset-password" element={<ResetPasswordPage />} />
            <Route path="/features/report" element={<ReportPage />} />
            <Route path="/login/change-password" element={<ChangePasswordPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/gdpr" element={<GdprPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/privacy-statement" element={<PrivacyStatementPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about-t2" element={<AboutPageT2 />} />
            <Route path="/about-t3" element={<AboutPageT3 />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareerPage />} />
            <Route path="/security-page" element={<SecurityPage />} />
            <Route path="/errorPage" element={<ErrorPage />} />
            <Route path="/features/my-work" element={<MyWorkPage />} />
            <Route path="/unauthorize" element={<UnauthorizePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/price" element={<PricePage />} />
            <Route path="/checkout" element={<CreateStripeCheckoutSession />} />
            <Route path="/features/kanban-board" element={<KanbanBoardPage />} />
            <Route path="/support-center" element={<SupportCenterPage />} />
            <Route path="" element={<AuthenticationRoute />}>
              <Route path="/projects/:projectId/" element={<DashboardLayout />}>
                <Route path="board" element={<BoardPage />} />
                <Route path="backlog" element={<BacklogPage />} />
                <Route path="shortcuts" element={<ShortcutPage />} />
                <Route path="dashboard" element={<DashBoardPage />} />
                <Route path="members" element={<ProjectMembersPage />} />
                <Route path="retro" element={<RetroPage />} />
                <Route path="epic" element={<EpicPage />} />
              </Route>
              <Route path="/payment/success" element={<SubscriptionSuccessPage />} />
              <Route path="/settings/:projectId" element={<Setting />} />
              <Route path="/me" element={<UserMePage />} />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/access" element={<AccessPage />} />
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/create-projects" element={<CreateProject />} />
              <Route path="/account-settings" element={<AccountSettingsPage />} />
              <Route path="/account-settings/change-password" element={<AccountSettingsPage />} />
              <Route path="/account-settings/delete-account" element={<AccountSettingsPage />} />
              <Route path="/projects/:projectId/roles" element={<RolePage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}
export default App;
