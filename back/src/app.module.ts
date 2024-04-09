import { Module } from '@nestjs/common';
import { ProductoModule } from './producto/producto.module';
import { OpcionModule } from './opcion/opcion.module';
import { PedidoModule } from './pedido/pedido.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ProductoModule, OpcionModule, PedidoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
