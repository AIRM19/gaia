import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Pedido } from "./pedido.model";
import { PedidoService } from "./pedido.service";

@Controller('pedido')
export class PedidoController{
    constructor(private readonly pedidoService: PedidoService){}
    
    @Get()
    async getPedidos(): Promise<any>{
        return this.pedidoService.getPedidos()
    }
    
    @Post()
    async postPedido(@Body() postData: Pedido): Promise<Pedido>{
        return this.pedidoService.createPedido(postData)
    }
    
    @Put(':id')
    async updatePedido(@Param('id') id:string): Promise<Pedido>{
        return this.pedidoService.updateEstado(id)
    }

    @Get('resumen/:fecha')
    async getResumen(@Param('fecha') fecha: string): Promise<any>{
        return this.pedidoService.getResumen(fecha)
    }
}