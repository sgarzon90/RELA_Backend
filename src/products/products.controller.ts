import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { UpdateProductDto } from "src/products/dto/update-product.dto";
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @UseInterceptors(FileInterceptor("foto"))
  create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateProductDto) {
    return this.productsService.create(dto, file);
  }
  @Get() findAll() {
    return this.productsService.findAll();
  }
  @Get(":id") findOne(@Param("id") id: string) {
    return this.productsService.findOne(+id);
  }
  @Patch(":id")
  @UseInterceptors(FileInterceptor("foto"))
  update(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, dto, file);
  }
  @Delete(":id") remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
