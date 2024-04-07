import { PrismaService } from "src/prisma.service";
import { Producto } from "./producto.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductoService{
    constructor(private prisma: PrismaService){}
    
    async getProductos(): Promise<any>{
        return this.prisma.producto.findMany({include: {opciones: true}})
    }
    
    async createProducto(data: Producto): Promise<Producto>{
        return this.prisma.producto.create({data})
    }
    
    async updateOpciones(id: number, opcion: number): Promise<Producto>{
        return this.prisma.producto.update({
            where: {id:Number(id)},
            data: {opciones: {connect:{id:opcion[0]}}}
        })
    }
}