-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opcion" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,

    CONSTRAINT "Opcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PedidoToProducto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OpcionToProducto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PedidoToProducto_AB_unique" ON "_PedidoToProducto"("A", "B");

-- CreateIndex
CREATE INDEX "_PedidoToProducto_B_index" ON "_PedidoToProducto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OpcionToProducto_AB_unique" ON "_OpcionToProducto"("A", "B");

-- CreateIndex
CREATE INDEX "_OpcionToProducto_B_index" ON "_OpcionToProducto"("B");

-- AddForeignKey
ALTER TABLE "_PedidoToProducto" ADD CONSTRAINT "_PedidoToProducto_A_fkey" FOREIGN KEY ("A") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoToProducto" ADD CONSTRAINT "_PedidoToProducto_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OpcionToProducto" ADD CONSTRAINT "_OpcionToProducto_A_fkey" FOREIGN KEY ("A") REFERENCES "Opcion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OpcionToProducto" ADD CONSTRAINT "_OpcionToProducto_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
