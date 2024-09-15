const getDateDetails = (dateTimeString) => {
    // Check if the input is a string
    if (typeof dateTimeString !== 'string') {
      console.error('Invalid input: expected a string');
      return { day: 'Invalid input', month: '', year: '' };
    }

    const dateTime = new Date(dateTimeString);

    // Check if the date is invalid
    if (isNaN(dateTime.getTime())) {
      console.error('Invalid date format');
      return { day: 'Invalid date', month: '', year: '' };
    }

    // Array of month abbreviations
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const day = dateTime.getDate().toString().padStart(2, '0'); // Ensure two digits
    const month = monthNames[dateTime.getMonth()];
    const year = dateTime.getFullYear();

    return { day, month, year };
  };

export default getDateDetails