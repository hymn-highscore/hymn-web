export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`
        antialiased
        min-h-screen
        bg-[var(--background)]
        text-[var(--foreground)]
      `}
    >
      {children}
    </div>
  );
}
