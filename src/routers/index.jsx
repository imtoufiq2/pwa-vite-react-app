import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import SignIn from "../pages/auth/SignIn";
import EnterMobile from "../pages/auth/EnterMobile";
import ResetPassword from "../pages/auth/ResetPassword";
import AuthGuard from "../utils/AuthGuard";
import AssociatedCompanies from "../pages/AssociatedCompanies";
import Department from "../pages/Department";
import Meetings from "../pages/Meetings";
import Reports from "../pages/Reports";
import ViewDocument from "../pages/ViewDocument";
import VerifyMobile from "../pages/auth/VerifyMobile";
import FloatingFooterAction from "../components/FloatingFooterAction";
// import SomethingWentWrong from "../components/SomethingWentWrong";
// import FloatingFooterAction from "../components/floatingFooterAction";

const Routers = () => {
  // const [isOnline, setIsOnline] = useState(navigator.onLine);
  // useEffect(() => {
  //   const handleOnline = () => setIsOnline(true);
  //   const handleOffline = () => setIsOnline(false);

  //   window.addEventListener("online", handleOnline);
  //   window.addEventListener("offline", handleOffline);

  //   return () => {
  //     window.removeEventListener("online", handleOnline);
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // }, []);
  function FallbackComponent() {
    return <>something went wrong</>;
  }
  const LayoutWithFooter = () => {
    return (
      <>
        <Outlet />
        <FloatingFooterAction />
      </>
    );
  };
  const appLayout = createBrowserRouter([
    {
      path: "boardmeeting",
      element: <LayoutWithFooter />,
      children: [
        {
          path: "",
          element: JSON.parse(sessionStorage.getItem("loginData"))
            ?.accessToken ? (
            <Navigate to="companies" />
          ) : (
            <Navigate to="sign-in" />
          ),
        },
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "verify-otp",
          element: <VerifyMobile />,
        },
        {
          path: "enter-mobile",
          element: <EnterMobile />,
        },
        {
          path: "forgot-password",
          element: <ResetPassword />,
        },
        {
          path: "companies",
          element: (
            <AuthGuard>
              <AssociatedCompanies />
            </AuthGuard>
          ),
        },
        {
          path: "department/:id",
          element: (
            <AuthGuard>
              <Department />
            </AuthGuard>
          ),
        },
        {
          path: "meetings/:id",
          element: (
            <AuthGuard>
              <Meetings />
            </AuthGuard>
          ),
        },
        {
          path: "reports/:id",
          element: (
            <AuthGuard>
              <Reports />
            </AuthGuard>
          ),
        },
        {
          path: "file/view/:id",
          element: (
            <AuthGuard>
              <ViewDocument />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <>No page found</>,
    },
  ]);

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <RouterProvider router={appLayout} />
    </ErrorBoundary>
  );
};

export default Routers;
