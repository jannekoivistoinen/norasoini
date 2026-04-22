// FontAwesome Free Icons
import { faComments, faSeedling, faArrowRight, faClover } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

import service1 from "./terapia-hyvinvointi-espoo.jpg";
import service2 from "./kraniosakraaliterapia-espoo.jpg";
import service3 from "./yhdistelmahoito-mieli-keho.jpg";
import service4 from "./lyhytterapia-espoo.jpg";

import noraSoiniPortrait from "./nora-soini-terapeutti-espoo.png";
export { noraSoiniPortrait };

import visitFlow1 from "./terapia-saapuminen-vastaanotolle.webp";
import visitFlow2 from "./terapia-rauhallinen-keskustelu.webp";
import visitFlow3 from "./kraniosakraaliterapia-hoito.webp";

export const serviceImages = [service1, service2, service3, service4] as const;
export const visitFlowImages = [visitFlow1, visitFlow2, visitFlow3] as const;

export const images = {} as const;

export const navigationIcons = {
  comments: faComments,
  seedling: faSeedling,
  flower: faClover,
  person: faPerson,
  arrowRight: faArrowRight,
} as const;

export type ImageKey = keyof typeof images;
export type IconKey = keyof typeof navigationIcons;
