/*
  Warnings:

  - The primary key for the `OpcionesEnPedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `productoId` to the `OpcionesEnPedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OpcionesEnPedido" DROP CONSTRAINT "OpcionesEnPedido_pkey",
ADD COLUMN     "productoId" INTEGER NOT NULL,
ADD CONSTRAINT "OpcionesEnPedido_pkey" PRIMARY KEY ("opcionId", "pedidoId", "productoId");

-- AddForeignKey
ALTER TABLE "OpcionesEnPedido" ADD CONSTRAINT "OpcionesEnPedido_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
