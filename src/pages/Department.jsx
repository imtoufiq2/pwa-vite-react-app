import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import BusinessIcon from "@mui/icons-material/Business";
import { useEffect, useState } from "react";
import { MuiList } from "../components/MuiList";
import useScrollToTop from "../hooks/useScrollToTop";
import { useNavigate, useParams } from "react-router-dom";
import decryptData from "../helpers/decryption";
import { groupDataByCompany } from "../helpers/groupDataByCompany";
import Loader from "../components/loader/Loader";
import { slideInRight } from "../helpers/animations";
import DarkMode from "../components/DarkMode";
import { baseStr } from "../routers";

const Department = () => {
  const navigate = useNavigate();
  useScrollToTop();
  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem("loginData"))?.accessToken) {
      navigate(`${baseStr}/sign-in`);
      return;
    }
  }, [navigate]);

  const handleSearch = (value) => {
    setSearchQuery(value.trim().toLowerCase());
  };

  const filteredList = searchQuery
    ? departmentData.filter(
        (department) =>
          department.CommitteeName.toLowerCase().includes(
            searchQuery.toLowerCase()
          ) || department.CommitteeID.toString().includes(searchQuery)
      )
    : departmentData;

  useEffect(() => {
    if (!id) return;

    setLoading(true); // Start loading

    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("companiesData")) {
        setDepartmentData([]);
        return;
      }
      const companiesData = JSON.parse(
        decryptData(sessionStorage.getItem("companiesData"))
      );
      const groupedData = groupDataByCompany(companiesData);

      const companyCommittees = groupedData.find(
        (data) => data.CompanyID === +id
      )?.Committees;

      setDepartmentData(companyCommittees);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <>
      {loading && !searchQuery ? (
        <Loader />
      ) : (
        <Box
          sx={{
            animation: `${slideInRight} 0.3s ease-out`,
          }}
        >
          <ResponsiveAppBar
            icon={BusinessIcon}
            title="Department "
            handleSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Box
            className="poppins"
            sx={{
              // minHeight: "100vh",
              // overflow: "hidden",
              maxWidth: "592px",
              margin: "auto",
              marginTop: {
                // xs: "24px",
                lg: "24px",
              },
            }}
          >
            <MuiList
              listToShow={filteredList}
              nextRoute="meetings"
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
          </Box>
        </Box>
      )}
      <DarkMode />
    </>
  );
};

export default Department;
