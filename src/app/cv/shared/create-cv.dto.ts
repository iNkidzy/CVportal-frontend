export interface CreateCvDto {
  name: string;
  description:string;
  education: string;
  experience: string;
  skills: string;
  contact: string;
  image?: string;
  video?: string;
}