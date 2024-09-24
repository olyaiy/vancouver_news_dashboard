export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          {/* Header content can be added here if needed */}
        </div>
      </header>
      <main className="flex-1">
        {/* Main content can be added here */}
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          {/* Footer content can be added here if needed */}
        </div>
      </footer>
    </div>
  );
}