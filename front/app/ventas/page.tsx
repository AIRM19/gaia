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
import { config } from '../../constants';

interface Opcion{
    id: number,
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
    id: string,
    nombre: string,
    total: number,
    estado: boolean
    productos: Array<Platillo>,
}
                      
export default function Pedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>([])
    
    useEffect(() => {
        const fetchProductos = async () => {
          const request = await fetch(config.pedido_url)
          const ped = await request.json()
          console.log(ped)
          setPedidos(ped)
        }
        fetchProductos().catch(console.error)
      }, [])
    
    const cambiarEstatusOrden = async (orden: Pedido) => {
        orden.estado = !orden.estado
        setPedidos([...pedidos])
        const url = config.pedido_url + orden.id
        await fetch(url, {method:'PUT'})
    }
    
    return (
        <main>
            <div className="flex justify-evenly mx-2">
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
                        {pedidos.map(pedido => pedido.estado == false ?
                            <TableRow key={pedido.id}>
                            <TableCell>{pedido.id}</TableCell>
                            <TableCell className="flex-wrap">{pedido.nombre}</TableCell>
                            <TableCell>
                                {pedido.productos.map(producto =>
                                    <div key={producto.id} className="mb-2">
                                        <p className="font-medium">{producto.cantidad}&emsp;{producto.titulo}</p>
                                        {producto.opciones.map(opcion => 
                                            <p key={opcion.id}>&nbsp;&nbsp;&emsp;{opcion.cantidad}&nbsp;{opcion.titulo}</p>
                                        )}
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="font-medium text-center w-[100px]">${pedido.total}</TableCell>
                            {pedido.estado == false ? 
                            <TableCell onClick={()=>{cambiarEstatusOrden(pedido)}} className="text-center"><Button className="w-[100px]">Terminar</Button></TableCell>:
                            <TableCell onClick={()=>{cambiarEstatusOrden(pedido)}} className="text-center"><Button className="bg-green-500 hover:bg-green-600 w-[100px]">Terminado</Button></TableCell>
                            }
                            </TableRow>
                        : null)}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-evenly my-2">
                <button onClick={()=>{location.reload()}} className="bg-green-500 hover:bg-green-600 rounded p-2">Refresh</button>
            </div>
        </main>
    )
}
