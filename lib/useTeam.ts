import useSWR from "swr";
import { useRouter } from "next/router";

import { TeamResponse } from "api/teams/[slug]";

import fetcher from "lib/fetcher";

export default function useTeam() {
  const router = useRouter();
  const { team: teamSlug } = router.query;
  const {
    data: team,
    mutate: mutateTeam,
    error,
  } = useSWR<TeamResponse>(teamSlug ? `/api/teams/${teamSlug}` : null, fetcher, {
    shouldRetryOnError: false,
  });

  return {
    team,
    mutateTeam,
    error,
  };
}
