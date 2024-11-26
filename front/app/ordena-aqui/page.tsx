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
import { config } from '../../constants';

interface ObjetoProducto{
  id: number,
  titulo?: string,
  cantidad: number
}

interface ObjetoOpcion{
  id: number,
  titulo?: string,
  cantidad: number
  idProducto?: number
}

interface Producto {
  id: number,
  titulo: string,
  descripcion: string,
  precio: number,
  opciones: Array<ObjetoOpcion>,
  cantidadOpciones: number,
  cantidad: number
}

let productosPedido: ObjetoProducto[] = []
let opcionesPedido: ObjetoOpcion[] = []
let descuentoActivo = 0                              

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [total, setTotal] = useState(0)
  const [nombre, setNombre] = useState("")
  const [idOrden, setIdOrden] = useState("")
  const [estatus, setEstatus] = useState(0) //dialog box nombre y #orden
  
  useEffect(() => {
    const fetchProductos = async () => {
      const request = await fetch(config.producto_url)
      const prods = await request.json()
      setProductos(prods)
    }
    fetchProductos().catch(console.error)
  }, [])
  
  const crearOrden = async () => {
    const orden = {nombre: nombre, productos: productosPedido, total: total, opcionesPedido: opcionesPedido}
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orden)
    }
    const petition = await fetch(config.pedido_url, requestOptions)
    const response = await petition.json()
    setIdOrden(response.id)
    setEstatus(1)
  }
  
  const quitar = (prod: Producto) => {
    prod.cantidad--
    let checkProducto = productosPedido.find(objProducto => objProducto.id == prod.id)
    if(checkProducto){// valida porque puede ser indefinido
      if(checkProducto.cantidad > 1){
        checkProducto.cantidad--
      }
      else{
        productosPedido.splice(productosPedido.indexOf(checkProducto), 1)
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
    let checkProducto = productosPedido.find(objProducto => objProducto.id == prod.id)
    if(checkProducto){
      checkProducto.cantidad++
    }
    else{
      productosPedido.push({id: prod.id, cantidad: 1})
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
      let checkOpcion = opcionesPedido.find(objOpcion => objOpcion.id == op.id && objOpcion.idProducto == prod.id)
      if(checkOpcion){// valida porque puede ser indefinido
        if(checkOpcion.cantidad > 1){
          checkOpcion.cantidad--
        }
        else{
          opcionesPedido.splice(opcionesPedido.indexOf(checkOpcion), 1)
        }
      }
      setProductos([...productos])
    }
  }
  
  const agregarOpcion = (prod: Producto, op: ObjetoOpcion) => {
    if(prod.cantidadOpciones < prod.cantidad*3){
      op.cantidad++
      prod.cantidadOpciones++
      let checkOpcion = opcionesPedido.find(objOpcion => objOpcion.id == op.id && objOpcion.idProducto == prod.id)
      if(checkOpcion){
        checkOpcion.cantidad++
      }
      else{
        opcionesPedido.push({id: op.id, idProducto: prod.id, cantidad: 1})
      }
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
                        {producto.opciones.map(opcion => 
                        <div key={opcion.id} className="flex flex-row justify-evenly w-full basis-full">
                          <p className="flex self-center basis-1/2">{opcion.titulo}</p>
                          <Button onClick={()=>{quitarOpcion(producto, opcion)}}>-</Button>
                          <p className="flex self-center justify-center basis-1/6">{opcion.cantidad}</p>
                          <Button onClick={()=>{agregarOpcion(producto, opcion)}}>+</Button>
                        </div>
                        )}
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
            {estatus == 0 ?
              <DialogTrigger asChild>
                <Button className="bg-green-600 mb-4">Ordenar</Button>
              </DialogTrigger>:
              <div className="mb-4">
                <DialogTrigger asChild>
                  <Button className="bg-green-600 mr-4">Ver orden</Button>
                </DialogTrigger>
                <Button className="bg-slate-700" onClick={() => window.location.reload()}>Nueva orden</Button>
              </div>
            }
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
              <DialogFooter className="flex flex-row justify-evenly sm:justify-center">
                <Button type="submit" className="flex basis-1/2" onClick={(e) => crearOrden()}>Pedir</Button>
              </DialogFooter>
            </DialogContent> : null
          }
          {estatus == 1 ?
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Orden creada con éxito</DialogTitle>
              </DialogHeader>
              <div className="flex flex-column justify-evenly pt-2.5 pb-0.5 text-center">
                <p>Tu número de orden es: <span className="font-medium">{idOrden}</span></p>
              </div>
              <div className="flex flex-column justify-evenly pb-2 text-center">
                <p>Paga en efectivo o transfiere a 058597000032996469</p>
              </div>
              <DialogFooter className="sm:justify-center">
                <DialogClose asChild>
                  <Button type="button">Ok</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent> : null
          }
        </Dialog>
      </div>
    </main>
  )
}