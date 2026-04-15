import { Link, routing } from "@/i18n/routing";
import ReactMarkdown from "react-markdown";
import { ComponentPropsWithoutRef } from "react";

interface MarkdownTextProps {
  children: string;
  className?: string;
}

// Extract valid routes from the routing configuration
type ValidInternalRoute = keyof typeof routing.pathnames;

const isValidInternalRoute = (href: string): href is ValidInternalRoute => {
  return href in routing.pathnames;
};

function MarkdownLink({ href, children }: ComponentPropsWithoutRef<"a">) {
  if (!href) return null;

  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (isValidInternalRoute(href)) {
    return (
      <Link
        href={href as ValidInternalRoute}
        className="text-blue-600 hover:underline"
      >
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className="text-blue-600 hover:underline">
      {children}
    </a>
  );
}

export default function MarkdownText({
  children,
  className,
}: MarkdownTextProps) {
  return (
    <ReactMarkdown
      className={className}
      components={{
        a: MarkdownLink,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
