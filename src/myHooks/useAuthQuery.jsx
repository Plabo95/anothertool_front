import { useQuery } from "@tanstack/react-query";
import { useSignOut } from 'react-auth-kit'


const useAuthQuery = (...options) => {
  const query = useQuery(...options)
  const signOut = useSignOut()

  if (query?.error?.response?.status === 401) {
    // Insert custom access-token refresh logic here. For now, we are 
    // just refreshing the page here, so as to redirect them to the 
    // login page since their token is now expired.
    signOut()
  }
  return query;
}

export default useAuthQuery;