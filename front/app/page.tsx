'use client';
import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'

interface ObjetoProducto{
  id: number,
  titulo: string,
  cantidad: number
}

interface ObjetoOpcion{
  titulo: string,
  cantidad: number
}

interface Producto {
  id: number,
  titulo: string,
  descripcion: string,
  precio: number,
  cantidad: number,
  cantidadOpciones: number,
  opciones: Array<ObjetoOpcion> 
}

const listaProductos: Producto[] = [{id:1, titulo:"3 gorditas", descripcion:"firjol con queso, picadillo o huitlacoche", precio:50, cantidad:0, cantidadOpciones:0, opciones:[{titulo: "frijol con queso", cantidad: 0}, {titulo: "picadillo", cantidad: 0}, {titulo: "huitlacoche", cantidad: 0}]},
                                    {id:2, titulo:"3 tacos", descripcion:"firjol con queso, picadillo o huitlacoche", precio:50, cantidad:0, cantidadOpciones:0, opciones:[{titulo: "frijol con queso", cantidad: 0}, {titulo: "picadillo", cantidad: 0}, {titulo: "huitlacoche", cantidad: 0}]},
                                    {id:3, titulo:"1 sincronizada", descripcion:"queso y jamón", precio:25, cantidad:0, cantidadOpciones:0, opciones:[]},
                                    {id:4, titulo:"tortillas verdes", descripcion:"paquete 500 gramos", precio:50, cantidad:0, cantidadOpciones:0, opciones:[]},
                                    {id:5, titulo:"1 limonada", descripcion:"400mL", precio:15, cantidad:0, cantidadOpciones:0, opciones:[]}]

let pedido: ObjetoProducto[] = []
let descuentoActivo = 0                              

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>(listaProductos)
  const [total, setTotal] = useState(0)
  const [nombre, setNombre] = useState("")
  const [idOrden, setIdOrden] = useState("")
  const [estatus, setEstatus] = useState(0)
  
  /*useEffect(() => {
    const fetchProductos = async () => {
      const listaProductos = await fetch("api")
      setProductos(listaProductos);
    }
    fetchProductos().catch(console.error)
  }, [])*/
  
  const crearOrden = () => {
    const orden = {nombre: nombre, total: total, pedido: pedido}
    console.log(orden)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orden)
    };
    fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
        .then(response => response.json())
        .then(data => setIdOrden(data.id));
    setEstatus(1)
  }
  
  const quitar = (prod: Producto) => {
    prod.cantidad--
    let checkProducto = pedido.find(objProducto => objProducto.id == prod.id)
    if(checkProducto){
      if(checkProducto.cantidad > 1){
        checkProducto.cantidad--
      }
      else{
        pedido.splice(pedido.indexOf(checkProducto), 1)
      }
    }
    let incremento = 0
    if(prod.id != 5){
      if(descuentoActivo == 1){
        productos[4].precio = 15
        incremento = productos[4].cantidad * 5
      }
      descuentoActivo--
    }
    setTotal(total+incremento-prod.precio)
    setProductos([...productos])
  }
  
  const agregar = (prod: Producto) => {
    prod.cantidad++
    let checkProducto = pedido.find(objProducto => objProducto.id == prod.id)
    if(checkProducto){
      checkProducto.cantidad++
    }
    else{
      pedido.push({id: prod.id, titulo: prod.titulo, cantidad: 1})
    }
    let rebaja = 0
    if(prod.id != 5){
      if(descuentoActivo == 0){
        productos[4].precio = 10
        rebaja = productos[4].cantidad * 5
      }
      descuentoActivo++
    }
    setTotal(total-rebaja+prod.precio)
    setProductos([...productos])
  }
  
  const quitarOpcion = (prod: Producto, op: ObjetoOpcion) => {
    if(prod.cantidadOpciones > 0 && op.cantidad > 0){
      op.cantidad--
      prod.cantidadOpciones--
      setProductos([...productos])
    }
  }
  
  const agregarOpcion = (prod: Producto, op: ObjetoOpcion) => {
    if(prod.cantidadOpciones < prod.cantidad*3){
      op.cantidad++
      prod.cantidadOpciones++
      setProductos([...productos])
    }
  }
  
  return (
    <main>
      <div className="flex flex-row justify-center">
        <Image src="/logo.png" alt="logo" width={280} height={140} />
      </div>
      <div className="flex flex-row flex-nowrap justify-center overflow-hidden">
        <Carousel opts={{align: "center", loop: true}}>
          <CarouselContent>
            {productos.map(producto => (
              <CarouselItem key={producto.id} className="basis-2/5 md:basis-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle>{producto.titulo}</CardTitle>
                    <CardDescription>{producto.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex justify-center space-x-4 rounded-md border p-4">
                      <div className="flex-1 space-y-1 justify-center">
                        <div className="flex justify-center">
                          <Image src="/logo.png" alt="comida" width={120} height={60} />
                        </div>
                        <p className="text-sm font-medium leading-none text-center">${producto.precio}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-evenly">
                    {producto.cantidad < 1 ?
                    <div className="flex flex-row justify-evenly w-full">
                      <Button onClick={() => agregar(producto)} className="w-full">Agregar</Button>
                    </div> :
                    <div className="justify-evenly w-full">
                      <div className="flex flex-row justify-evenly w-full">
                        <Button onClick={() => quitar(producto)}>-</Button>
                        <p className="flex self-center">{producto.cantidad}</p>
                        <Button onClick={() => agregar(producto)}>+</Button>
                      </div>
                      {producto.opciones.length < 1 ? null : 
                      <div className="grid grid-rows-3 grid-flow-col gap-2 w-full pt-4">
                        {producto.opciones.map(opcion => (
                        <div className="flex flex-row justify-evenly w-full basis-full">
                          <p className="flex self-center basis-1/2">{opcion.titulo}</p>
                          <Button onClick={()=>{quitarOpcion(producto, opcion)}}>-</Button>
                          <p className="flex self-center justify-center basis-1/6">{opcion.cantidad}</p>
                          <Button onClick={()=>{agregarOpcion(producto, opcion)}}>+</Button>
                        </div>
                        ))}
                      </div>
                      }
                    </div>
                    }
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="text-center p-8">
        <p>Total: {total}</p>
      </div>
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[green]">Ordenar</Button>
          </DialogTrigger>
          {estatus == 0 ? 
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Completa tu orden</DialogTitle>
                <DialogDescription>Agrega tu nombre</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nombre" className="text-right">Nombre</Label>
                  <Input id="nombre" type="text" autoComplete="off" value={nombre} onChange={(e) => setNombre(e.target.value)} className="col-span-3" required />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Regresar</Button>
                </DialogClose>
                <Button type="submit" onClick={(e) => crearOrden()}>Pedir</Button>
              </DialogFooter>
            </DialogContent> : null
          }
          {estatus == 1 ?
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Orden creada con éxito</DialogTitle>
                <DialogDescription>Tu número de orden es:</DialogDescription>
              </DialogHeader>
              <div className="flex flex-column justify-center p-4">
                <p>0123</p>
              </div>
              <DialogFooter className="sm:justify-center">
                <Button type="button" variant="secondary" onClick={() => window.location.reload()}>Ok</Button>
              </DialogFooter>
            </DialogContent> : null
          }
        </Dialog>
      </div>
    </main>
  )
}