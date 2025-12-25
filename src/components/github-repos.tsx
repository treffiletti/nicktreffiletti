'use client'

import { useEffect, useState } from 'react'
import type { GitHubRepo } from '@/lib/github'
import { getLanguageColor, formatRelativeTime } from '@/lib/github'
import { trackEvent } from '@/lib/analytics'

interface GitHubReposProps {
  repos: GitHubRepo[]
}

export function GitHubRepos({ repos: initialRepos }: GitHubReposProps) {
  const [repos] = useState<GitHubRepo[]>(initialRepos)
  const [error, setError] = useState<string | null>(null)

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-6">
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load GitHub repositories. Please try again later.
        </p>
      </div>
    )
  }

  if (repos.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-6">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          No repositories found.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent.githubRepoClick(repo.name)}
          className="group relative flex flex-col rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
        >
          {/* Repository name */}
          <div className="flex items-start justify-between gap-x-4">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {repo.name}
            </h3>
            <svg
              className="h-5 w-5 flex-shrink-0 text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Description */}
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 flex-1">
            {repo.description || 'No description provided'}
          </p>

          {/* Metadata */}
          <div className="mt-4 flex items-center gap-x-4 text-xs text-neutral-600 dark:text-neutral-400">
            {/* Language */}
            {repo.language && (
              <div className="flex items-center gap-x-1.5">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                <span>{repo.language}</span>
              </div>
            )}

            {/* Stars */}
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-x-1">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{repo.stargazers_count}</span>
              </div>
            )}

            {/* Updated */}
            <span className="ml-auto">{formatRelativeTime(repo.updated_at)}</span>
          </div>
        </a>
      ))}
    </div>
  )
}
