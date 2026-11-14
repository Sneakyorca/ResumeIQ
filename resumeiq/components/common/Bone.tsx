export function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-md bg-border motion-reduce:animate-none ${className}`}
    />
  );
}
