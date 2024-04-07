/*
  Warnings:

  - You are about to drop the `OpcionPedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PedidoToProducto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OpcionPedido" DROP CONSTRAINT "OpcionPedido_opcionId_fkey";

-- DropForeignKey
ALTER TABLE "OpcionPedido" DROP CONSTRAINT "OpcionPedido_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "_PedidoToProducto" DROP CONSTRAINT "_PedidoToProducto_A_fkey";

-- DropForeignKey
ALTER TABLE "_PedidoToProducto" DROP CONSTRAINT "_PedidoToProducto_B_fkey";

-- DropTable
DROP TABLE "OpcionPedido";

-- DropTable
DROP TABLE "_PedidoToProducto";

-- CreateTable
CREATE TABLE "ProductosEnPedido" (
    "pedidoId" TEXT NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "ProductosEnPedido_pkey" PRIMARY KEY ("pedidoId","productoId")
);

-- CreateTable
CREATE TABLE "OpcionesEnPedido" (
    "opcionId" INTEGER NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "OpcionesEnPedido_pkey" PRIMARY KEY ("opcionId","pedidoId")
);

-- AddForeignKey
ALTER TABLE "ProductosEnPedido" ADD CONSTRAINT "ProductosEnPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductosEnPedido" ADD CONSTRAINT "ProductosEnPedido_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpcionesEnPedido" ADD CONSTRAINT "OpcionesEnPedido_opcionId_fkey" FOREIGN KEY ("opcionId") REFERENCES "Opcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpcionesEnPedido" ADD CONSTRAINT "OpcionesEnPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
