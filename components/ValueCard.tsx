import MarkdownText from "./MarkdownText";

interface ValueCardProps {
  title: string;
  description?: string;
  className?: string;
}

export function ValueCard({
  title,
  description,
  className = "",
}: ValueCardProps) {
  return (
    <div
      className={`block overflow-hidden bg-brand-beige-lightest p-6 md:p-10 lg:p-12 h-full ${className}`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <MarkdownText className="text-2xl font-medium mb-12 md:mb-24 lg:mb-48">
            {title}
          </MarkdownText>
        </div>
        {description && (
          <MarkdownText className="text-base mt-auto p-base">
            {description}
          </MarkdownText>
        )}
      </div>
    </div>
  );
}
