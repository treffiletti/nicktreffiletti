import { track } from '@vercel/analytics'

/**
 * Analytics tracking utilities for privacy-respecting event tracking.
 * No PII (Personally Identifiable Information) should be sent in events.
 */
export const trackEvent = {
  /**
   * Track newsletter subscription
   */
  newsletterSubscribe: () => {
    track('newsletter_subscribe')
  },

  /**
   * Track course start
   * @param lessonId - The ID of the lesson being started
   */
  courseStart: (lessonId: string) => {
    track('course_start', { lessonId })
  },

  /**
   * Track lesson completion
   * @param lessonId - The ID of the completed lesson
   */
  lessonComplete: (lessonId: string) => {
    track('lesson_complete', { lessonId })
  },

  /**
   * Track blog post view
   * @param slug - The slug of the blog post
   */
  blogView: (slug: string) => {
    track('blog_view', { slug })
  },

  /**
   * Track project link click
   * @param projectName - The name of the project
   */
  projectClick: (projectName: string) => {
    track('project_click', { projectName })
  },

  /**
   * Track contact/CTA click
   * @param source - Where the contact click originated from
   */
  contactClick: (source: string) => {
    track('contact_click', { source })
  },

  /**
   * Track GitHub repo click
   * @param repoName - The name of the repository
   */
  githubRepoClick: (repoName: string) => {
    track('github_repo_click', { repoName })
  },

  /**
   * Track social link click
   * @param platform - The social platform (github, linkedin, twitter)
   */
  socialClick: (platform: string) => {
    track('social_click', { platform })
  },

  /**
   * Track resource click
   * @param resourceTitle - The title of the resource
   * @param category - The category of the resource
   */
  resourceClick: (resourceTitle: string, category: string) => {
    track('resource_click', { resourceTitle, category })
  },
}
