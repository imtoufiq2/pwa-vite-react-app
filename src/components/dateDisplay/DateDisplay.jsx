import { useGlobalHook } from "../../context/Contexts";
import "./DateDisplay.css"; // Import the CSS file
import PropTypes from "prop-types";

const DateDisplay = ({ dateTorender, monthTorender, yearToRender }) => {
  const { darkMode } = useGlobalHook();

  return (
    <figure className="date-display-figure">
      <header className="date-display-header">{monthTorender}</header>
      <section
        className="date-display-day"
        style={{ color: darkMode && "#fff" }}
      >
        {dateTorender}
      </section>

      <section
        style={{
          fontSize: "10px",
          position: "absolute",
          bottom: "1px",
          height: "fit-content",
          margin: "0px",
          width: "100%",
          marginRight: "50%",
          color: darkMode ? "#fff" : "gray",
          // color: darkMode && "#fff"
        }}
      >
        {yearToRender}
      </section>
    </figure>
  );
};
DateDisplay.propTypes = {
  dateTorender: PropTypes.string.isRequired,
  monthTorender: PropTypes.string.isRequired,
  yearToRender: PropTypes.string.isRequired,
};

export default DateDisplay;
