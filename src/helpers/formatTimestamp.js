export function formatTimestamp(timestamp) {
    // Attempt to create a Date object from the input timestamp
    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date"; // Handle unexpected/invalid dates
    }

    // Array of abbreviated month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const year = date.getFullYear();
    const month = months[date.getMonth()] || "Unknown"; // Default to "Unknown" if month is not valid
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

//   console.log(formatTimestamp("2024-09-18T10:23:31.397")); // Expected output: "18-Sep-2024 10:23:31"
//   console.log(formatTimestamp("invalid-timestamp")); // Expected output: "Invalid date"
//   console.log(formatTimestamp(null)); // Expected output: "Invalid date"
//   console.log(formatTimestamp("2024-15-18T10:23:31.397")); // Expected output: "Invalid date"
