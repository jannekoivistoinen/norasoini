// Shared styles
export const linkStyles =
  "text-black text-md font-medium tracking-tight transition";
export const linkStylesActive = "text-brand-primary";
export const descriptionStyles = "text-sm text-gray-500";

// Desktop styles
export const desktopLinkStyles = `${linkStyles} py-6 px-4 hover:text-brand-primary`;
export const desktopPopoverTriggerStyles = "flex items-center gap-1";
export const desktopPopoverContentStyles =
  "w-full p-0 pb-2 bg-brand-bg border-brand-bg";
export const desktopPopoverContentWideStyles = "w-full p-0 bg-brand-bg";
export const desktopPopoverLinkStyles =
  "flex items-center gap-5 py-3 px-6 hover:bg-brand-card rounded-md transition-colors";
export const desktopPopoverLinkActiveStyles = "bg-brand-card";
export const desktopPopoverLinkTitleStyles =
  "text-[15px] font-medium text-black";
export const desktopPopoverLinkDescStyles = descriptionStyles;

// Mobile styles
export const mobileLinkStyles = `${linkStyles} block text-lg hover:opacity-60 py-2`;
export const mobileSubmenuLinkStyles =
  "block text-base text-gray-600 hover:bg-brand-card rounded-md transition-colors py-3 px-4";
export const mobileLinkStylesActive = "text-brand-primary";
export const mobileSubmenuLinkStylesActive = "bg-brand-card";
export const mobileDescriptionStyles = descriptionStyles;
