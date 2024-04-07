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
        const pedidos = await this.prisma.pedido.findMany({
            include: {productos: true, opcionesPedido: true},
        })
        let result = []
        
        const listaProductos = await this.prisma.producto.findMany({
            select: {
                id: true,
                titulo: true
            }
        })
        
        const listaOpciones = await this.prisma.opcion.findMany({
            select: {
                id: true,
                titulo: true
            }
        })
        
        let opciones = pedidos.map(pedido => {
            return pedido.productos.map(producto => {
                const filtered = pedido.opcionesPedido.filter(opcion => {if(producto.productoId == opcion.productoId){return true}})
                const mapped = filtered.map(opcion => {
                    return {
                    id: opcion.opcionId,
                    titulo: listaOpciones.find(objOpcion => objOpcion.id == opcion.opcionId).titulo,
                    cantidad: opcion.cantidad                            
                }})
                return mapped
            })
        })
        
        let productos = pedidos.map(pedido => {
             return pedido.productos.map(producto => {
                const filtered = pedido.opcionesPedido.filter(opcion => {if(producto.productoId == opcion.productoId){return true}})
                const mapped = filtered.map(opcion => {
                    return {
                    id: opcion.opcionId,
                    titulo: listaOpciones.find(objOpcion => objOpcion.id == opcion.opcionId).titulo,
                    cantidad: opcion.cantidad                            
                }})
                const a = {
                    id: producto.productoId,
                    titulo: listaProductos.find(objProducto => objProducto.id == producto.productoId).titulo,
                    cantidad: producto.cantidad,
                    opciones: mapped
                }
                return a
            })
        })
        
        log(productos)
        
        pedidos.map((pedido,index) => {
            result.push({
                id: pedido.id,
                nombre: pedido.nombre,
                total: pedido.total,
                estado: pedido.estado,
                productos: productos[index]
            })
        })
        
        return result
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