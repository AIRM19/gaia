import { PrismaService } from "src/prisma.service";
import { Opcion } from "./opcion.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OpcionService{
    constructor(private prisma: PrismaService){}
    
    async getOpciones(): Promise<Opcion[]>{
        return this.prisma.opcion.findMany()
    }
    
    async createOpcion(data: Opcion): Promise<Opcion>{
        return this.prisma.opcion.create({data})
    }
}