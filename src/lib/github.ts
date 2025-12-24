export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
  topics: string[]
}

/**
 * Fetch public GitHub repositories for a user
 * @param username - GitHub username
 * @param options - Optional configuration
 * @returns Array of repository objects
 */
export async function getGitHubRepos(
  username: string,
  options: { sort?: 'updated' | 'created' | 'pushed'; perPage?: number } = {}
): Promise<GitHubRepo[]> {
  const { sort = 'updated', perPage = 6 } = options

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=${sort}&per_page=${perPage}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        // Cache for 1 hour
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos: GitHubRepo[] = await response.json()
    return repos
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

/**
 * Get language color for syntax highlighting
 * Based on GitHub's language colors
 */
export function getLanguageColor(language: string | null): string {
  if (!language) return '#6b7280' // gray-500

  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    Ruby: '#701516',
    PHP: '#4F5D95',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#41b883',
    MDX: '#fcb32c',
  }

  return colors[language] || '#6b7280'
}

/**
 * Format date to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`
    }
  }

  return 'just now'
}
