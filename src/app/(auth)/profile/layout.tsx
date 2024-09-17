export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-lg mx-auto border min-h-screen p-4 sm:p-6">
      {children}
    </div>
  );
}
