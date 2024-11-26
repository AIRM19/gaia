INSERT INTO "Producto" (titulo, descripcion, precio, cantidad, "cantidadOpciones")
VALUES 
('3 gorditas', 'frijol con queso, picadillo o huitlacoche', 75, 0, 0), 
('3 tacos', 'frijol con queso, picadillo o huitlacoche', 65, 0, 0), 
('1 sincronizada', 'queso y jamón', 25, 0, 0), 
('tortillas verdes', 'paquete 500 gramos', 50, 0, 0), 
('1 agua fresca', '400mL', 15, 0, 0);
select * from "Producto";

INSERT INTO "Opcion" (titulo, cantidad)
VALUES 
('frijol con queso', 0), 
('picadillo', 0), 
('huitlacoche', 0);
select * from "Opcion";

INSERT INTO "_OpcionToProducto" ("A", "B")
VALUES 
(1, 1), 
(2, 1), 
(3, 1), 
(1, 2), 
(2, 2), 
(3, 2);
select * from "_OpcionToProducto";