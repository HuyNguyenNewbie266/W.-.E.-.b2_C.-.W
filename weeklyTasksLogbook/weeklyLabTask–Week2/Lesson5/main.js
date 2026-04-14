const app = Vue.createApp({
    data() {
        return {
            product: 'Socks',
            image: './assets/images/socks_blue.jpg',
            inStock: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2235, color: 'blue'},
                { id: 2234, color: 'green'},
            ],
            sizes: [ 'XS', 'S', 'L', 'XL' ],
            student: {id: 'GCS230465', name:'Nguyen Tan Huy'}
        }
    }
})
