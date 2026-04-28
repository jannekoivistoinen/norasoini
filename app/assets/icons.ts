import { faComments, faSeedling, faArrowRight, faClover, faPerson } from "@fortawesome/free-solid-svg-icons";

export const navigationIcons = {
  comments: faComments,
  seedling: faSeedling,
  flower: faClover,
  person: faPerson,
  arrowRight: faArrowRight,
} as const;

export type IconKey = keyof typeof navigationIcons;
