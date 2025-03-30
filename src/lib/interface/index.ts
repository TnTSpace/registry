import type { Role } from "$lib/constants"



type ModalType = "chat"

export type MessageRoleType = "user" | "assistant"

export type TCollection = "services" | "slides" | "affiliates" | "blog" | "schools"

export type TService = "affiliate program" | "tuition payment" | "accommodation" | "dhub career" | "guardianship" | "immigration & recruitment"

export type TPlayMedia = "play-video" | "play-audio" | "play-image" | "play-newsletter"

export type FileType = 'audio' | 'video' | 'file' | 'image'


export interface iXata {
  xata_createdat: Date;
  xata_updatedat: Date;
  xata_version: number;
  xata_id: string;
}

export interface iUser extends iXata {
  email: string;
  image: string;
  name: string;
  nameTag: string;
  userId: string;
  firstName: string;
  lastName: string;
  role: Role
}

export interface iRoute {
  name: string;
  href: string;
  icon?: any;
  isAuthorized?: boolean
}

export interface iSoMeRoute extends iRoute {
  name: "facebook" | "instagram" | "youtube" | "twitter" | "telegram" | "whatsapp" | "tiktok"
}

export interface iContactRoute extends iRoute {
  name: "mail" | "call" | "locate"
}

export interface iLegalRoute extends iRoute {
  name: "terms of use" | "cookie policy" | "privacy policy"
}

export interface iModal {
  type: ModalType,
  open: boolean;
  data?: any
}

export interface iMeta {
  title: string;
  keywords: string[];
  description: string;
  ogimage: string;
  link: string;
}

export interface iImage extends iXata {
  url: string;
  fileId: string;
}

export interface iFaq extends iXata {
  category: string;
  question: string;
  answer: string;
}

export interface iAccordion {
  question: string;
  answer: string;
}

export interface iUpload {
  url: string;
  fileType: FileType;
  fileId: string;
}

export interface iSection {
  id: string;
  title: string;
  content: string;
}