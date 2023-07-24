const getDropdownLinks = (currentUser) => {
    if (currentUser == null || currentUser === "guest") {
      return [
        { label: 'Sign Up' },
        { label: 'Log In' }
      ];
    } else {
      return [
        { label: 'Edit Profile' },
        { label: 'View Profile' },
        { label: 'Change Password' },
        { label: 'Sign Out' }
      ];
    }
  };
  
  // Export the function to make it accessible from other files
  export { getDropdownLinks };