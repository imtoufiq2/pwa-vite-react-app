import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AuthGuard({ children }) {
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("loginData"))?.accessToken;
  useEffect(() => {
    if (!token) {
      navigate("/boardmeeting/sign-in", { replace: true });
    }

  }, [token, navigate]);

  if (!token) {
    return null;
  }


  return children;
}

export default AuthGuard;