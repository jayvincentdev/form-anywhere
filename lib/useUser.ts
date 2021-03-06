import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

import fetcher from "lib/fetcher";
import { UserResponse } from "api/user";
import { LoginResponse } from "api/login";

export default function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
  const { data: user, mutate: mutateUser } = useSWR<UserResponse | LoginResponse>(
    "/api/user",
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      "isLoggedIn" in user &&
      // If redirectTo is set, redirect if the user was not found.
      ((redirectTo && !redirectIfFound && !user.isLoggedIn) ||
        // If redirectIfFound is also set, redirect if the user was found
        (redirectIfFound && user.isLoggedIn))
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return {
    user,
    mutateUser,
  };
}
