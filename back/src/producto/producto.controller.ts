import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Producto } from "./producto.model";
import { ProductoService } from "./producto.service";


@Controller('producto')
export class ProductoController{
    constructor(private readonly productoService: ProductoService){}
    
    @Get()
    async getProductos(): Promise<any>{
        return this.productoService.getProductos()
    }
    
    @Post()
    async postProducto(@Body() postData: Producto): Promise<Producto>{
        return this.productoService.createProducto(postData)
    }
    
    @Put(':id')
    async updateProducto(@Param('id') id:number, @Body() opcion:number): Promise<Producto>{
        return this.productoService.updateOpciones(id, opcion)
    }
}