import { Prisma } from "@prisma/client";

export class Pedido implements Prisma.PedidoCreateInput{
    id: string;
    nombre: string;
    productos?: Prisma.ProductosEnPedidoCreateNestedManyWithoutPedidoInput;
    total: number;
    estado?: boolean;
    opcionesPedido?: Prisma.OpcionesEnPedidoCreateNestedManyWithoutPedidoInput;
}