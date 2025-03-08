import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class ProjectImage {
  @Prop({ required: true })
  url: string;

  @Prop()
  alt?: string;

  @Prop()
  isFeatured?: boolean;
}

export const ProjectImageSchema = SchemaFactory.createForClass(ProjectImage);

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  longDescription?: string;

  @Prop()
  featuredImage?: string;

  @Prop({ type: [ProjectImageSchema], default: [] })
  images: ProjectImage[];

  @Prop({ type: [String], default: [] })
  technologies: string[];

  @Prop()
  githubUrl?: string;

  @Prop()
  liveUrl?: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ type: Date })
  startDate?: Date;

  @Prop({ type: Date })
  endDate?: Date;

  @Prop({ default: 0 })
  order: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);