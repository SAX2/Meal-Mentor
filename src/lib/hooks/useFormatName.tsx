const useFormatName = ({ email, firstName, lastName }: {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}) => {

  if (email === null || lastName === null || firstName === null) return { usernameDisplay: null };
  
  const usernameDisplay =
    !firstName || firstName == null
      ? `${email.split("@")[0]} MealMentor`
      : `${firstName} ${lastName}'s MealMentor`;

  return { usernameDisplay };
};

export default useFormatName