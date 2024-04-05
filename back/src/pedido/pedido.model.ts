import { Prisma } from "@prisma/client";

export class Pedido implements Prisma.PedidoCreateInput{
    id: string;
    nombre: string;
    productos?: Prisma.ProductoCreateNestedManyWithoutPedidosInput;
    total: number;
    estado: boolean;
}