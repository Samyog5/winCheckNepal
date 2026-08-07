"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Global Fatal Error:", error);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Fatal Application Error</h1>
          <p className="text-sm text-slate-400">The application encountered a root error.</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-sky-500 text-slate-950 rounded-lg font-bold text-sm"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
