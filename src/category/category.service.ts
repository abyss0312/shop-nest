import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericResponse, getGenericMessage, mapper } from 'src/shared';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import {  CategoryAddDto } from './dto/categoryadd.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository:Repository<Category>
    ){}

 
    async createCategory(request: CategoryAddDto) : Promise<GenericResponse<string>>{

        const date = new Date();

        try{
          const categoryMap = mapper.map(request,CategoryAddDto,Category);
          categoryMap.createdDate = date.toLocaleDateString();
            const categoryDb = this.categoryRepository.create(categoryMap);
            await this.categoryRepository.save(categoryDb);

            return getGenericMessage<string>(201,true,'',[]);
        }
        catch(ex){
            return getGenericMessage<string>(HttpStatus.BAD_GATEWAY,false,'',[ex.message]);
        }

        
    }

   async getCategories () :Promise<GenericResponse<Category[]>> {


    try{
        const categoryDb = await this.categoryRepository.find();
        return getGenericMessage<Category[]>(200,true,categoryDb,[]);
    }
    catch(ex){
        return getGenericMessage<Category[]>(HttpStatus.BAD_GATEWAY,false,[],[ex.message]);
    }

    
   }

   async DeleteCategories(id:number) :Promise<GenericResponse<number>> {

    try{
        await  this.categoryRepository.delete(id);
        return getGenericMessage<number>(200,true,id,[]);
    }
    catch(ex){
        return getGenericMessage<number>(HttpStatus.BAD_GATEWAY,false,0,[ex.message]);
    }

    
   }

}
