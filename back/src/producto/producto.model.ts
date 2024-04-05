import { Prisma } from "@prisma/client";

export class Producto implements Prisma.ProductoCreateInput{
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    opciones?: Prisma.OpcionCreateNestedManyWithoutProductosInput;
    pedidos?: Prisma.PedidoCreateNestedManyWithoutProductosInput;
}