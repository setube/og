const { createApp } = Vue;
const { ElNotification } = ElementPlus;

const app = createApp({
    data () {
        return {
            money: 1000,
            stardust: 1,
            userInfo: {
                username,
                points,
                antimatter,
                container,
                stardust
            },
            packages,
            exchange: [
                {
                    info: '1人民币 = 1点券 = 1星尘 = 1000反物质'
                }
            ],
            sponsorInfo: [
                {
                    info: '赞助请联系GM。QQ:1962257451'
                }
            ]
        };
    },
    methods: {
        stardustBuy () {
            const data = {
                type: 'stardust',
                money: this.stardust,
            };
            axios.post('do_pay.php', Qs.stringify(data)).then(response => {
                this.userInfo.points -= this.stardust;
                this.userInfo.stardust += this.stardust;
                ElNotification({ title: '提示', message: response.data });
            }).catch(error => ElNotification({ title: '提示', message: '购买失败' }));
        },
        buy (type, price) {
            const data = {
                type,
                money: type === 'pay' ? this.money : price,
            };
            const points = {
                6: 6000,
                30: 40000,
                69: 120000,
                138: 400000,
                249: 0,
                298: 8888888,
                328: 1000000,
                648: 2800000,
                1888: 10000000,
                1999: 0
            };
            const container = {
                6: 60,
                30: 300,
                69: 690,
                138: 1380,
                249: 3000,
                298: 2980,
                328: 3280,
                648: 6480,
                1888: 18880,
                1999: 25000
            };
            axios.post('do_pay.php', Qs.stringify(data)).then(response => {
                this.userInfo.points -= type === 'pay' ? this.money : price;
                this.userInfo.antimatter += type === 'pay' ? this.money : points[price];
                this.userInfo.container += type === 'pay' ? 0 : container[price];
                ElNotification({ title: '提示', message: response.data });
            }).catch(error => ElNotification({ title: '提示', message: '购买失败' }));
        }
    }
});
app.use(ElementPlus);
app.mount('.app');