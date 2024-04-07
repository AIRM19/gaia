import { Prisma } from "@prisma/client";

export class Opcion implements Prisma.OpcionCreateInput{
    id: number;
    titulo: string;
    productos?: Prisma.ProductoCreateNestedManyWithoutOpcionesInput;
    opcionesPedido?: Prisma.OpcionesEnPedidoCreateNestedManyWithoutOpcionInput;
}