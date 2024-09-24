// Helper function to encode a string to Base64
function base64Encode(str) {
    try {
      return btoa(str);  // Encode the string to Base64
    } catch (e) {
      console.error('Failed to encode string to base64', e);
      return '';
    }
  }

  // Helper function to decode a Base64 string
  function base64Decode(base64Str) {
    try {
      return atob(base64Str);  // Decode the Base64 string
    } catch (e) {
      console.error('Failed to decode base64 string', e);
      return '';
    }
  }


  export {base64Decode , base64Encode}
  // Test the functions
//   const password = 'mosl@1234';  // Original password

  // Encode the password
//   const encodedPassword = base64Encode(password);
//   console.log('Encoded Password:', encodedPassword);

//   // Decode the password to verify
//   const decodedPassword = base64Decode(encodedPassword);
//   console.log('Decoded Password:', decodedPassword);
