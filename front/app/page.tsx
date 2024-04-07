'use client';
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { redirect } from 'next/navigation'

export default function Landing() {
    function re(){
        redirect('/ventas')
    }
    
    return (
        <main>
            <a href="http://localhost:3001/ordena-aqui">
                <div>
                    <Image src="/1home.jpg" alt="1" width={1366} height={768} priority={true} a/>
                </div>
            </a>
            <div>
                <Image src="/2pricing.jpg" alt="2" width={1366} height={768}/>
            </div>
            <div>
                <Image src="/3features.jpg" alt="3" width={1366} height={768}/>
            </div>
            <div>
                <Image src="/feedback.jpg" alt="4" width={1366} height={768}/>
            </div>
            <div>
                <Image src="/5ordernow.jpg" alt="5" width={1366} height={768}/>
            </div>
            <div>
                <Image src="/6contact.jpg" alt="6" width={1366} height={768}/>
            </div>
        </main>
    )
}