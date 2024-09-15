const getTimeFromDateTime = (dateTimeString) => {
    // Check if the input is a string
    if (typeof dateTimeString !== 'string') {
      console.error('Invalid input: expected a string');
      return 'Invalid input';
    }

    const dateTime = new Date(dateTimeString);

    // Check if the date is invalid
    if (isNaN(dateTime.getTime())) {
      console.error('Invalid date format');
      return 'Invalid date';
    }

    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  export default getTimeFromDateTime;
