import { Body, Controller, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { Producto } from "./producto.model";
import { ProductoService } from "./producto.service";
import { Request, Response } from "express";


@Controller('producto')
export class ProductoController{
    constructor(private readonly productoService: ProductoService){}
    
    @Get()
    async getProductos(@Req() request:Request, @Res() response:Response): Promise<any>{
        const result = await this.productoService.getProductos()
        return response.status(200).json({
            status: "Ok!",
            message: "Successfully fetch data!",
            result: result
        })
        
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