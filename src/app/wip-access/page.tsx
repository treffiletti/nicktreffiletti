import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Required - Nick Treffiletti",
  robots: { index: false, follow: false },
};

export default function WipAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-medium tracking-tight text-gray-950 dark:text-white">
            Early access
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This section is currently in early access. Enter the access code to continue.
          </p>
        </div>
        <WipAccessForm />
      </div>
    </div>
  );
}

function WipAccessForm() {
  return (
    <form action="/api/wip-access" method="POST" className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Access code
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-950 dark:text-white placeholder-gray-400 focus:border-gray-950 focus:outline-none dark:focus:border-white"
          placeholder="Enter access code"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-gray-950 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-gray-950 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
      >
        Continue
      </button>
    </form>
  );
}
