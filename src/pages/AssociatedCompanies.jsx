import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import BusinessIcon from "@mui/icons-material/Business";
import { MuiList } from "../components/MuiList";
import { useCallback, useEffect, useState } from "react";
import useScrollToTop from "../hooks/useScrollToTop";
import encryptData from "../helpers/encryption";
import decryptData from "../helpers/decryption";
// import Loader from "../components/loader/Loader";
import EmptyState from "../components/EmptyState";
import { groupDataByCompany } from "../helpers/groupDataByCompany";
import { slideInRight } from "../helpers/animations";
import { useNavigate } from "react-router-dom";
import DarkMode from "../components/DarkMode";
import Loader from "../components/loader/Loader";

const AssociatedCompanies = () => {
  const navigate = useNavigate();
  useScrollToTop();

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [associatedCompanies, setAssociatedCompanies] = useState([]);
  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem("loginData"))?.accessToken) {
      navigate("/boardmeeting/sign-in");
      return;
    }
  }, [navigate]);
  const filteredList = searchQuery
    ? associatedCompanies.filter((company) => {
        // Ensure the company object and its properties exist before accessing them
        if (!company) return false;

        const companyNameMatch = company.CompanyName?.toLowerCase().includes(
          searchQuery.toLowerCase()
        );
        const committeeIDMatch =
          company.CommitteeID?.toString().includes(searchQuery);
        const committeeNameMatch =
          company.CommitteeName?.toLowerCase().includes(
            searchQuery.toLowerCase()
          );
        const committeeShortNameMatch =
          company.CommitteeShortName?.toLowerCase().includes(
            searchQuery.toLowerCase()
          );

        return (
          companyNameMatch ||
          committeeIDMatch ||
          committeeNameMatch ||
          committeeShortNameMatch
        );
      })
    : associatedCompanies;

  useEffect(() => {
    // throw new Error("This is a simulated error in the FallbackComponent");
  }, []);

  const getDepartments = useCallback(async () => {
    const body = { committeid: "20" }; //TODO :this is static data, confirm it

    // return;
    try {
      setLoading(true);
      const encryptedData = encryptData(body);
      const response = await fetch(
        "/BoardMeetingApi/api/Meeting/Getcommittee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("loginData"))?.accessToken
            }`,
            clientCode:
              JSON.parse(decryptData(sessionStorage.getItem("a3YvZ1qP")))
                ?.clientCode ?? "",
            "Accept-Encoding": "br",
          },
          body: encryptedData,
        }
      );
      // Handle non-JSON responses
      const result = await response.text();

      const responseData = decryptData(result);
      if (responseData?.success) {
        // responseData?.data
        setAssociatedCompanies(groupDataByCompany(responseData?.data) ?? []);
        sessionStorage.setItem(
          "companiesData",
          encryptData(JSON.stringify(responseData?.data) ?? [])
        );

        setLoading(false);
      }
    } catch (error) {
      console.error("Error making POST request:", error);

      if (!navigator.onLine) {
        const storedData = sessionStorage.getItem("companiesData");
        if (storedData) {
          const decryptedData = groupDataByCompany(
            JSON.parse(decryptData(storedData))
          );
          setAssociatedCompanies(decryptedData ?? []);
        } else {
          console.warn("No data found in session storage.");
        }
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

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
            title="Associated Companies"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <Box
            className="poppins"
            sx={{
              maxWidth: "592px",
              margin: "auto",
              marginTop: {
                lg: "24px",
              },
            }}
          >
            {!loading && associatedCompanies?.length === 0 ? (
              <EmptyState
                title="No data available"
                subTitle="We couldn't retrieve any data from the server."
              />
            ) : (
              <MuiList
                listToShow={filteredList}
                nextRoute="department"
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                loading={loading}
              />
            )}
          </Box>
        </Box>
      )}
      <DarkMode />
    </>
  );
};

export default AssociatedCompanies;
