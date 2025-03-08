export class ProjectImageDto {
  url: string;
  alt?: string;
  isFeatured?: boolean;
}

export class CreateProjectDto {
  title: string;
  description: string;
  longDescription?: string;
  featuredImage?: string;
  images?: ProjectImageDto[];
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  startDate?: Date;
  endDate?: Date;
  order?: number;
}