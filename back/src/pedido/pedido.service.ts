import { PrismaService } from "../prisma.service";
import { Pedido } from "./pedido.model";
import { Injectable } from "@nestjs/common";
import { log } from "console";
import { Prisma } from "@prisma/client";

@Injectable()
export class PedidoService{
    constructor(private prisma: PrismaService){}
    
    async queryPedidos(fechaQuery: string){
        return await this.prisma.pedido.findMany({
            where: {
                fecha:{
                    lte: new Date(fechaQuery+"T23:59:59"), 
                    gte: new Date(fechaQuery+"T00:00:00")
                }
            },
            select: {
                id: true,
                total:true
            }
        })
    }

    async getResumen(fecha: string): Promise<any>{
        const listaProductos = await this.prisma.producto.findMany({
            select: {
                id: true,
                titulo: true,
                precio: true
            }
        })

        const listaPedidos = await this.queryPedidos(fecha)
        
        let idPedidos=[]
        let totalPedidos=0
        for(let i=0; i<listaPedidos.length; i++){
            idPedidos.push(listaPedidos[i].id)
            totalPedidos+=listaPedidos[i].total
        }
        
        const productosEnPedidos = await this.prisma.productosEnPedido.groupBy({
            by: ['productoId'],
            where: {
                pedidoId: { in: idPedidos}
            },
            _sum: {
                cantidad: true,
            },
            orderBy: {
                productoId: 'asc'
            }
        })
        
        let resumen = []
        for(let i=0; i<productosEnPedidos.length; i++){
            resumen.push({id:i, titulo: listaProductos[i].titulo, cantidad: productosEnPedidos[i]._sum.cantidad, total: productosEnPedidos[i]._sum.cantidad*listaProductos[i].precio})
        }

        return resumen
    }

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