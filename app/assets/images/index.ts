import testimonialAvatar from "./testimonialAvatar.jpg";
import placeholderImage from "./image.png";

// FontAwesome Free Icons
import { faComments, faSeedling, faArrowRight, faClover } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

export const images = {
  testimonialAvatar,
  placeholderImage,
} as const;

export const navigationIcons = {
  comments: faComments,
  seedling: faSeedling,
  flower: faClover,
  person: faPerson,
  arrowRight: faArrowRight,
} as const;

export type ImageKey = keyof typeof images;
export type IconKey = keyof typeof navigationIcons;
