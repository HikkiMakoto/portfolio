import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { Developer, DeveloperSchema } from './developer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema }
    ])
  ],
  controllers: [DeveloperController],
  providers: [DeveloperService],
  exports: [DeveloperService]
})
export class DeveloperModule {}