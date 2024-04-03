import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useEffect } from "react";

let pedidos = [{id: 1234, nombre: "Luis", productos: [{id:1, titulo: "3 gorditas", cantidad:1}, {id:4, titulo: "1 limonada", cantidad:1}], total: 60},
               {id: 1235, nombre: "Sofia", productos: [{id:3, titulo: "1 sincronizada", cantidad:2}, {id:4, titulo: "1 limonada", cantidad:2}], total: 70},
               {id: 1236, nombre: "Jorge", productos: [{id:2, titulo: "3 tacos", cantidad:1}], total: 50}]
                
const platillos = [{id:1, titulo:"3 gorditas"}, {id:2, titulo:"3 tacos"}, {id:3, titulo:"1 sincronizada"}, {id:4, titulo:"1 limonada"}]

export default function Pedidos() {    
    return (
        <main>
            <div className="flex justify-evenly">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead># Pedido</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Productos</TableHead>
                            <TableHead className="text-center w-[100px]">Total</TableHead>
                            <TableHead className="text-center">Estatus</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pedidos.map(pedido => 
                            <TableRow>
                                <TableCell>{pedido.id}</TableCell>
                                <TableCell>{pedido.nombre}</TableCell>
                                <TableCell>
                                    {pedido.productos.map(producto =>
                                        <p>{producto.cantidad}&emsp;{producto.titulo}</p>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium text-center">${pedido.total}</TableCell>
                                <TableCell className="text-center"><Button>Completado</Button></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}