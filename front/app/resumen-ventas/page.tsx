'use client';
import { use, useEffect, useState } from "react";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { config } from '../../constants';

interface Producto{
    id: number,
    titulo: string,
    cantidad: number,
    total: number
}

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
    productos: Array<Platillo>,
}

export default function Reporte() {
    const [date, setDate] = useState<Date>()
    const [productos, setProductos] = useState<Producto[]>([])
    const [totalPedidos, setTotalPedidos] = useState(0)
    const [pedidos, setPedidos] = useState<Pedido[]>([])

    useEffect(() => {
        const queryDate = date?.toJSON().substring(0,10)

        const fetchProductosPedidos = async () => {
            const request = await fetch(config.pedido_url+"/resumen/"+queryDate)
            const prods = await request.json()
            if(prods.statusCode != 500){
                setProductos(prods[0])
                setTotalPedidos(prods[1])
            }
        }

        const fetchPedidos = async () => {
            const request = await fetch(config.pedido_url+"/"+queryDate)
            const ped = await request.json()
            setPedidos(ped)
          }
          
          if(queryDate != undefined){
              fetchProductosPedidos().catch(console.error)
              fetchPedidos().catch(console.error)
        }
      }, [date])
    
    return(
        <main>
            <div className="flex flex-row justify-center mt-5">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-between text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Selecciona fecha</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex justify-evenly mx-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead>Ordenes</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productos.map(producto => (
                            <TableRow key={producto.id}>
                            <TableCell>{producto.titulo}</TableCell>
                            <TableCell className="flex-wrap">{producto.cantidad}</TableCell>
                            <TableCell>{producto.total}</TableCell>
                            </TableRow>))
                        }
                        <TableRow key={totalPedidos}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{totalPedidos}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-evenly mx-2 my-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead># Pedido</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Productos</TableHead>
                            <TableHead className="text-center w-[100px]">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pedidos.map(pedido => 
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
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}
