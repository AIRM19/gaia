-- CreateTable
CREATE TABLE "OpcionPedido" (
    "opcionId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "pedidoId" TEXT NOT NULL,

    CONSTRAINT "OpcionPedido_pkey" PRIMARY KEY ("opcionId","pedidoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpcionPedido_opcionId_pedidoId_key" ON "OpcionPedido"("opcionId", "pedidoId");

-- AddForeignKey
ALTER TABLE "OpcionPedido" ADD CONSTRAINT "OpcionPedido_opcionId_fkey" FOREIGN KEY ("opcionId") REFERENCES "Opcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpcionPedido" ADD CONSTRAINT "OpcionPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
