import {
  AgeRestrictionTypes,
  CulturalCategoryTypes,
  CulturalSpaceAcessibilityType,
  CulturalSpaceEntranceType,
  CulturalSpaceEntryTypes,
  CulturalSpaceSphereTypes,
  EventFrequencyTypes,
  GenderTypes,
  RaceTypes,
  TaquaraNeighborhoods,
} from "./literals";

type BooleanKeys<T> = {
  [k in keyof T]: T[k] extends boolean ? k : never;
}[keyof T];

export interface IPartnerCollection {
  partneName: string;
  partnerLogo: {
    imageURL: string;
    imageDescription: string;
  };
}

export interface ICulturalSpacePersonalInfo {
  privateEmail: string;
  publicEmail: string;
  culturalSpaceName: string;
  culturalSpaceHead: string;
  cpf_or_cpnj: string;
  culturalSpaceEntry: CulturalSpaceEntranceType;
  culturalSpaceSphere: CulturalSpaceSphereTypes;
  culturalSpaceCapacity: string;
  workingHours: string;
  entryTypes: CulturalSpaceEntryTypes;
  description: string;
  entryFee?: string;
}

export interface ICulturalSpaceAddressInfo {
  cep: string;
  street: string;
  neighborhood: TaquaraNeighborhoods;
  streetNumber: string;
  complement?: string;
}

export interface ICulturalSpaceCategories {
  category: CulturalCategoryTypes[];
  accessible: string;
  accessibilityType: CulturalSpaceAcessibilityType[];
}

export interface ICulturalSpaceSocials {
  website?: string;
  facebook?: string;
  instagram?: string;
  privatePhone: string;
  publicPhone?: string;
  publicPhoneAlt?: string;
}

export type ICulturalSpaceModel = ICulturalSpacePersonalInfo &
  ICulturalSpaceAddressInfo &
  ICulturalSpaceCategories &
  ICulturalSpaceSocials;

export interface IAgentPersonalInfo {
  agentType: string;
  registrationEmail: string;
  publicEmail: string;
  fullName: string;
  publicName: string;
  birthday_or_founding: string;
  cpf_or_cnpj: string;
  gender: GenderTypes;
  race: RaceTypes;
  professionalRecord: string;
  description: string;
}

export interface IAgentAddressInfo {
  cep: string;
  street: string;
  neighborhood: TaquaraNeighborhoods;
  streetNumber: string;
  complement?: string;
}

export interface IAgentSocialInfo {
  website?: string;
  facebook?: string;
  instagram?: string;
  phoneNumber: string;
  publicPhoneNumber?: string;
  portfolio?: string;
}

export interface IAgentCategories {
  categories: CulturalCategoryTypes[];
}

export type IAgentModel = IAgentPersonalInfo &
  IAgentAddressInfo &
  IAgentSocialInfo &
  IAgentCategories;

export interface IEventPersonalInfo {
  privateEmail: string;
  publicEmail?: string;
  eventName: string;
  eventHead: string;
  workingHours: string;
  startingDate: string;
  endingDate: string;
  eventAgeRestriction: AgeRestrictionTypes;
  eventFrequency: EventFrequencyTypes;
  description: string;
  eventEntryType: CulturalSpaceEntryTypes;
  eventFee?: string;
}

export interface IEventCategories {
  categories: CulturalCategoryTypes[];
}

export interface IEventAddressInfo {
  eventType: "Físico" | "Online" | "Híbrido";
  cep?: string;
  street?: string;
  neighborhood?: TaquaraNeighborhoods;
  streetNumber?: string;
  complement?: string;
}

export interface IEventSocialsInfo {
  website?: string;
  eventURL?: string;
  privatePhone: string;
  publicPhone?: string;
}

export type IEventModel = IEventPersonalInfo &
  IEventCategories &
  IEventAddressInfo &
  IEventSocialsInfo;

export type RegistrationStatus = "ANÁLISE" | "APROVADO" | "NEGADO";

interface FormInternal {
  lat: number;
  lng: number;
  status: RegistrationStatus;
}

export interface IAgentModelAPIData extends IAgentModel, FormInternal {}

export interface IEventModelAPIData extends IEventModel, FormInternal {}

export interface ICulturalSpaceAPIData
  extends ICulturalSpaceModel,
    FormInternal {}
