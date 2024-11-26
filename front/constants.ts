const production = {
    producto_url:   "https://gaia-back.vercel.app/producto",
    pedido_url:     "https://gaia-back.vercel.app/pedido"
};

const development = {
    producto_url:   "http://localhost:3000/producto",
    pedido_url:     "http://localhost:3000/pedido"
};

export const config = process.env.NODE_ENV === 'development' ? development : production;