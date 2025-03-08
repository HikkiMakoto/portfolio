export class SocialLinkDto {
  platform: string;
  url: string;
  icon?: string;
}

export class SkillDto {
  name: string;
  icon?: string;
  proficiency?: number;
}

export class CreateDeveloperDto {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  socialLinks: SocialLinkDto[];
  skills: SkillDto[];
  resume?: string;
}