import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';


import { FileDto } from './dto/file.dto';
import { AuthGuard } from 'src/libs/guards/auth.guard';

@ApiTags('File')
@ApiBearerAuth()
@Controller('file') // 1
export class FileController {
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: "This route returns filename" })
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, cb) => {
        const randomName = uuid();
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  
  createFileName(@UploadedFile() file: Express.Multer.File, @Body() fileDto: FileDto) {
    return { message: 'Success', fileName: file.filename };
  }
}
