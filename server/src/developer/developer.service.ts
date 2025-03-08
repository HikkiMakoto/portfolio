import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Developer, DeveloperDocument } from './developer.schema';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectModel(Developer.name) private developerModel: Model<DeveloperDocument>,
  ) {}

  async create(createDeveloperDto: CreateDeveloperDto): Promise<Developer> {
    const createdDeveloper = new this.developerModel(createDeveloperDto);
    return createdDeveloper.save();
  }

  async findAll(): Promise<Developer[]> {
    return this.developerModel.find().exec();
  }

  async findOne(id: string): Promise<Developer> {
    const developer = await this.developerModel.findById(id).exec();
    if (!developer) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }
    return developer;
  }

  async update(id: string, updateDeveloperDto: UpdateDeveloperDto): Promise<Developer> {
    const updatedDeveloper = await this.developerModel
      .findByIdAndUpdate(id, updateDeveloperDto, { new: true })
      .exec();
    
    if (!updatedDeveloper) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }
    
    return updatedDeveloper;
  }

  async remove(id: string): Promise<Developer> {
    const deletedDeveloper = await this.developerModel.findByIdAndDelete(id).exec();
    
    if (!deletedDeveloper) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }
    
    return deletedDeveloper;
  }
}