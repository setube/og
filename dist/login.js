const { createApp } = Vue;
const { ElNotification } = ElementPlus;

const app = createApp({
    data () {
        return {
            registerForm: {
                uni: '1',
                mode: 'send',
                username: '',
                password: '',
                passwordReplay: '',
                email: '',
                emailReplay: '',
                lang: 'zh',
                rules: '1',
            },
            loginForm: {
                universe: '1',
                username: '',
                password: ''
            },
            options,
            referral: null,
            langOptions: null,
        };
    },
    mounted () {
        if (/register/.test(document.location.search)) {
            this.registerForm.referralID = referralID;
            this.registerForm.externalAuth = externalAuth;
            this.referral = referral;
            this.langOptions = langOptions;
        }
    },
    methods: {
        handleLogin () {
            axios.post('index.php?page=login', Qs.stringify(this.loginForm)).then(res => {
                const url = res.request.responseURL;
                const url1 = document.location.origin + '/game.php';
                const url2 = document.location.origin + '/index.php?code=1';
                const url3 = document.location.origin + '/index.php?code=2';
                if (url == url1) {
                    ElNotification({
                        title: '提示',
                        message: '登录成功~'
                    });
                    location.href = url;
                }
                if (url == url2 || url == url3) {
                    ElNotification({
                        title: '提示',
                        message: '登录失败, 请检查账号密码'
                    });
                }
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '登录请求失败, 请检查网络',
                });
            });
        },
        handleRegister () {
            axios.post('index.php?page=register', Qs.stringify(this.registerForm)).then(res => {
                const url = res.request.responseURL;
                if (res.data.code == 403) {
                    ElNotification({
                        title: '提示',
                        message: res.data.msg,
                        dangerouslyUseHTMLString: true
                    });
                    return;
                }
                if (/vertify/.test(url)) {
                    ElNotification({
                        title: '提示',
                        message: '注册成功~'
                    });
                    location.href = url;
                }
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '登录请求失败, 请检查网络',
                });
            });
        }
    }
});
app.use(ElementPlus);
app.config.warnHandler = () => {
    return;
};
app.mount('.app');