import { PrismaService } from "src/prisma.service";
import { Pedido } from "./pedido.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PedidoService{
    constructor(private prisma: PrismaService){}
    
    async getPedidos(): Promise<any>{
        return this.prisma.pedido.findMany({
            include: {productos: true, opcionesPedido: true},
        })
    }
    
    async createPedido(data: Pedido): Promise<Pedido>{
        return this.prisma.pedido.create({data})
    }
    
    async updateEstado(id: string): Promise<Pedido>{
        const currentEstado = (await this.prisma.pedido.findUnique({where: {id: id}})).estado
        return this.prisma.pedido.update({
            where: {id:String(id)},
            data: {estado: !currentEstado}
        })
    }
}