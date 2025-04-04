import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="font-bold geist-mono">404</h1>
      <p className="text-xs">oops! the page you’re looking for doesn’t exist.</p>
      <Link className="text-xs text-blue-400" href="/">
        ←home
      </Link>
    </div>
  );
}
