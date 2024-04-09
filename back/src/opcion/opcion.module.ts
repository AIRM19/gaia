import { Module } from "@nestjs/common";
import { OpcionController } from "./opcion.controller";
import { OpcionService } from "./opcion.service";
import { PrismaService } from "../prisma.service";

@Module({
    controllers: [OpcionController],
    providers: [OpcionService, PrismaService]
})
export class OpcionModule {}