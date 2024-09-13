export default function Layout({
  children,
  tabs,
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
}) {
  return (
    <div className="max-w-lg mx-auto border min-h-screen p-2 sm:p-6">
      {children}
      {tabs}
    </div>
  );
}
