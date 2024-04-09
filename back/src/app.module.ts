import { Module } from '@nestjs/common';
import { ProductoModule } from './producto/producto.module';
import { OpcionModule } from './opcion/opcion.module';
import { PedidoModule } from './pedido/pedido.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), ProductoModule, OpcionModule, PedidoModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
