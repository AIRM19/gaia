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

export default function Reporte() {
    const [date, setDate] = useState<Date>()
    const [productos, setProductos] = useState<Producto[]>([])

    useEffect(() => {
        const queryDate = date?.toJSON().substring(0,10)
        const fetchProductosPedidos = async () => {
            const request = await fetch(config.pedido_url+"/resumen/"+queryDate)
            const prods = await request.json()
            if(prods.statusCode != 500){
                setProductos(prods)
            }
        }
        if(queryDate != undefined){
            fetchProductosPedidos().catch(console.error)
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
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
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
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}
