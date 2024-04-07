import { Body, Controller, Get, Post } from "@nestjs/common";
import { Opcion } from "./opcion.model";
import { OpcionService } from "./opcion.service";


@Controller('opcion')
export class OpcionController{
    constructor(private readonly opcionService: OpcionService){}
    
    @Get()
    async getOpciones(): Promise<Opcion[]>{
        return this.opcionService.getOpciones()
    }
    
    @Post()
    async postOpcion(@Body() postData: Opcion): Promise<Opcion>{
        return this.opcionService.createOpcion(postData)
    }
}