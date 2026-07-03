export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

export async function getGitHubContributions(): Promise<ContributionData | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    console.warn("Missing GITHUB_TOKEN or GITHUB_USERNAME env vars");
    return null;
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!response.ok) {
      console.error("GitHub API error:", response.status, response.statusText);
      return null;
    }

    const json = await response.json();

    if (json.errors) {
      console.error("GitHub GraphQL errors:", json.errors);
      return null;
    }

    const calendar = json.data.user.contributionsCollection.contributionCalendar;

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return null;
  }
}
