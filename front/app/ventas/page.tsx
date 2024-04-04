'use client';
import { use, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Opcion{
    titulo: string,
    cantidad: number
}

interface Platillo{
    id: number,
    titulo: string,
    cantidad: number,
    opciones: Array<Opcion>
}

interface Pedido{
    id: number,
    nombre: string,
    productos: Array<Platillo>,
    total: number,
    estado: boolean
}

const listaPedidos = [{id: 1234, nombre: "Luisa", productos: [{id:1, titulo: "3 gorditas", cantidad: 1, opciones: [{titulo: "frijoles", cantidad: 2}, {titulo: "huitlacoche", cantidad: 1}]}, {id:4, titulo: "1 limonada", cantidad: 1, opciones: []}], total: 60, estado: false},
                      {id: 1235, nombre: "Sofia", productos: [{id:3, titulo: "1 sincronizada", cantidad: 2, opciones: []}, {id:4, titulo: "1 limonada", cantidad: 2, opciones: []}], total: 70, estado: false},
                      {id: 1236, nombre: "Jorge", productos: [{id:2, titulo: "3 tacos", cantidad: 1, opciones: [{titulo: "picadillo", cantidad:3}]}], total: 50, estado: false}]
                
const platillos = [{id:1, titulo:"3 gorditas"}, {id:2, titulo:"3 tacos"}, {id:3, titulo:"1 sincronizada"}, {id:4, titulo:"1 limonada"}]

export default function Pedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>(listaPedidos)
    const cambiarEstatusOrden = (orden: Pedido) => {
        orden.estado = !orden.estado
        setPedidos([...pedidos])
    }
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
                            <TableHead className="text-center w-[100px]">Estatus</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pedidos.map(pedido => 
                            <TableRow key={pedido.id}>
                                <TableCell>{pedido.id}</TableCell>
                                <TableCell className="flex-wrap">{pedido.nombre}</TableCell>
                                <TableCell>
                                    {pedido.productos.map(producto =>
                                        <div>
                                            <p>{producto.cantidad}&emsp;{producto.titulo}</p>
                                            {producto.opciones.map(opcion => 
                                                <p>&nbsp;&nbsp;&emsp;{opcion.cantidad}&nbsp;{opcion.titulo}</p>
                                            )}
                                            
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium text-center w-[100px]">${pedido.total}</TableCell>
                                {pedido.estado == false ? 
                                <TableCell onClick={()=>{cambiarEstatusOrden(pedido)}} className="text-center"><Button className="w-[100px]">Terminar</Button></TableCell>:
                                <TableCell onClick={()=>{cambiarEstatusOrden(pedido)}} className="text-center"><Button className="bg-green-500 hover:bg-green-600 w-[100px]">Completo</Button></TableCell>
                                }
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}