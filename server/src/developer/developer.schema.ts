import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeveloperDocument = Developer & Document;

@Schema()
export class SocialLink {
  @Prop({ required: true })
  platform: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  icon?: string;
}

export const SocialLinkSchema = SchemaFactory.createForClass(SocialLink);

@Schema()
export class Skill {
  @Prop({ required: true })
  name: string;

  @Prop()
  icon?: string;

  @Prop()
  proficiency?: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

@Schema({ timestamps: true })
export class Developer {
  @Prop({ required: true })
  name: string;

  @Prop()
  title: string;

  @Prop()
  bio: string;

  @Prop()
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop()
  avatar?: string;

  @Prop({ type: [SocialLinkSchema] })
  socialLinks: SocialLink[];

  @Prop({ type: [SkillSchema] })
  skills: Skill[];

  @Prop()
  resume?: string;
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);