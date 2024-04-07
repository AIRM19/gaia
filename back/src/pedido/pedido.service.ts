import { PrismaService } from "src/prisma.service";
import { Pedido } from "./pedido.model";
import { Injectable } from "@nestjs/common";
import { log } from "console";
import { Prisma } from "@prisma/client";
import { connect } from "http2";

@Injectable()
export class PedidoService{
    constructor(private prisma: PrismaService){}
    
    async getPedidos(): Promise<any>{
        return this.prisma.pedido.findMany({
            include: {productos: true, opcionesPedido: true},
        })
    }
    
    async createPedido(data: any): Promise<any>{
        const productosPedido = data.productos.map(producto => {
            return {
                producto: {connect: {id: producto.id}},
                cantidad: producto.cantidad,
            }
        })
        
        const opcionesPedido = data.opcionesPedido.map(opcion => {
            return {
                opcion: {connect: {id: opcion.id}},
                producto: {connect: {id: opcion.idProducto}},
                cantidad: opcion.cantidad
            }
        })
        
        let dataPedido: Prisma.PedidoCreateInput
        dataPedido = {
            nombre: data.nombre,
            productos: { create: productosPedido },
            total: data.total,
            opcionesPedido: { create: opcionesPedido }
        }
        
        return this.prisma.pedido.create({data: dataPedido})
    }
    
    async updateEstado(id: string): Promise<Pedido>{
        const currentEstado = (await this.prisma.pedido.findUnique({where: {id: id}})).estado
        return this.prisma.pedido.update({
            where: {id:String(id)},
            data: {estado: !currentEstado}
        })
    }
}