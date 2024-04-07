import Image from 'next/image'

export default function Landing() {
    return (
        <main>
            <a href="https://gaiaalimentos.com/ordena-aqui">
                <div>
                    <Image src="/1home.jpg" alt="1" width={1366} height={768} priority={true}/>
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