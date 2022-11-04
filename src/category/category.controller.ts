import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/shared/storage-image';
import { CategoryService } from './category.service';
import { CategoryAddDto } from './dto';

@Controller('category')
export class CategoryController {

    constructor(
        private categoryService: CategoryService
    ){}



    @Post('add')
    @UseInterceptors(FileInterceptor('file', storage))
    async Create(@Res() response, @UploadedFile() file , @Req() req) {
        

        console.log(file)
        const dto = {name:req.body.name,image:file.filename}
        console.log(req.body.name);
        const result = await this.categoryService.createCategory(dto);

        switch(result.code){
            case 201:{
                return response.status(HttpStatus.CREATED).send(result);
            }
            default:{
                return response.status(HttpStatus.BAD_GATEWAY).send(result);
            }
        }
    }


    @Get('')
    async Get(@Res() response){
        const result = await this.categoryService.getCategories();

        switch(result.code){
            case 200:{
                return response.status(HttpStatus.OK).send(result);
            }
            default:{
                return response.status(HttpStatus.BAD_GATEWAY).send(result);
            }
        }
    }


    @Delete(':id')
    async Delete(@Res() response, @Param('id') id:number){
        const result = await this.categoryService.DeleteCategories(id);

        switch(result.code){
            case 200:{
                return response.status(HttpStatus.OK).send(result);
            }
            default:{
                return response.status(HttpStatus.BAD_GATEWAY).send(result);
            }
        }
    }
}
