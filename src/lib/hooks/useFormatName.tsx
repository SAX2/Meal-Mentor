const useFormatName = ({ email, firstName, lastName }: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  
  const usernameDisplay =
    !firstName || firstName == null
      ? `${email.split("@")[0]} MealMentor`
      : `${firstName} ${lastName}'s MealMentor`;

  return { usernameDisplay };
};

export default useFormatName