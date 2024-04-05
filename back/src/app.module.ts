import { Module } from '@nestjs/common';
import { ProductoModule } from './producto/producto.module';
import { OpcionModule } from './opcion/opcion.module';

@Module({
  imports: [ProductoModule, OpcionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
