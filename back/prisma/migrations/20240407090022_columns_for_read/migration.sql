-- AlterTable
ALTER TABLE "Opcion" ADD COLUMN     "cantidad" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "cantidad" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cantidadOpciones" INTEGER NOT NULL DEFAULT 0;
