import { BlogPosts } from 'app/components/posts'
import { SubscribeForm } from 'app/components/subscribe-form'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
      
      {/* Newsletter CTA Section */}
      <section id="newsletter" className="my-12 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          Platform Architecture Newsletter
        </h2>
        <div className="mb-4 space-y-2">
          <p className="text-neutral-700 dark:text-neutral-300">
            Get weekly insights delivered to your inbox:
          </p>
          <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
            <li>• <strong>Patterns that actually ship</strong> — Real-world architecture decisions</li>
            <li>• <strong>Failure retros that teach</strong> — Learn from production incidents</li>
            <li>• <strong>Once a week</strong> — No spam, just value</li>
          </ul>
        </div>
        <SubscribeForm 
          placeholder="your.email@company.com"
          buttonText="Get the Scorecard"
        />
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
          Join 100+ platform leaders. No spam. Unsubscribe anytime.
        </p>
      </section>
    </section>
  )
}
