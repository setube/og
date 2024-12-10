const { createApp, h } = Vue;
const { ElMessageBox, ElNotification, ElLoading } = ElementPlus;

const color = {
    901: '#5e4240',
    902: '#4a78bc',
    903: '#268246',
    911: '#df9949',
    912: '#b14a08',
    913: '#223760',
    914: '#8c750b',
    915: '#5f6397',
    916: '#047e16'
};

const pathname = 'game.php';


const formatNumber = (number, type) => {
    const types = {
        1: parseInt(number),
        2: parseInt(String(number).replace(/\./g, '')),
        3: parseInt(String(number).replace(/\.\d+$/, ''))
    };
    let num = types[type];
    const units = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'];
    let isNegative = num < 0;
    let unitIndex = 0;
    num = Math.abs(num);
    while (num >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }
    if (isNegative) num = -num;
    return Math.abs(types[type]) >= 1000 ? num.toFixed(1) + units[unitIndex] : num;
};

const toNumber = (number) => {
    return parseInt(String(number).replace(/\.\d+$/, ''));
}


const isEmpty = (value) => {
    if (value === null || value === undefined || value === false) {
        return false;
    }
    if (typeof value === 'string' && value.trim() === '') {
        return false;
    }
    if (Array.isArray(value) && value.length === 0) {
        return false;
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
        return false;
    }
    return true;
}

// 侧边
const sidebar = createApp({
    data () {
        return {
            tools: false,
            drawer: false,
            barData,
            color,
            pathname,
            siDebarDatta: [
                {
                    category: '游戏信息',
                    links: [
                        { text: '概览', url: pathname, target: '_self' },
                        { text: '地图', url: `${pathname}?page=galaxy`, target: '_self' },
                        { text: '资源', url: `${pathname}?page=resources`, target: '_self' },
                        { text: '成就', url: `${pathname}?page=achievements`, target: '_self' },
                        { text: '加成', url: `${pathname}?page=infobonus`, target: '_self' },
                        { text: '技术', url: `${pathname}?page=techtree`, target: '_self' },
                        { text: '记录', url: `${pathname}?page=records`, target: '_self' },
                        { text: '行星', url: `${pathname}?page=planet`, target: '_self' },
                        { text: '排行', url: `${pathname}?page=statistics`, target: '_self' },
                        { text: '设置', url: `${pathname}?page=settings`, target: '_self' }
                    ]
                },
                {
                    category: '建设发展',
                    links: [
                        { text: '建设', url: `${pathname}?page=buildings`, target: '_self' },
                        { text: '科技', url: `${pathname}?page=research`, target: '_self' },
                        { text: '军官', url: `${pathname}?page=officier`, target: '_self' },
                        { text: '蓝图', url: `${pathname}?page=blueprints`, target: '_self' },
                        { text: '容器', url: `${pathname}?page=bon`, target: '_self' },
                        { text: '高级', url: `${pathname}?page=premium`, target: '_self' },
                        { text: '矿物', url: `${pathname}?page=minerals`, target: '_self' },
                        { text: '神器', url: `${pathname}?page=artifact`, target: '_self' },
                        { text: '种族', url: `${pathname}?page=race`, target: '_self' },
                        { text: '政府', url: `${pathname}?page=formgovernment`, target: '_self' },
                        { text: '阵营', url: `${pathname}?page=ethics`, target: '_self' },
                        { text: '党派', url: `${pathname}?page=party`, target: '_self' },
                        { text: '主义', url: `${pathname}?page=ideologies`, target: '_self' },
                        { text: '发展', url: `${pathname}?page=development`, target: '_self' },
                        { text: '信息', url: `${pathname}?page=details`, target: '_self' },
                        { text: '黑市', url: `${pathname}?page=fair`, target: '_self' },
                        { text: '商人', url: `${pathname}?page=trader`, target: '_self' },
                        { text: '商队', url: `${pathname}?page=fleetDealer`, target: '_self' },
                        { text: '控制', url: `${pathname}?page=control`, target: '_self' },
                        { text: '礼盒', url: `${pathname}?page=conteiner`, target: '_self' },
                        { text: '黑市', url: `${pathname}?page=fair`, target: '_self' }
                    ]
                },
                {
                    category: '战斗防御',
                    links: [
                        { text: '舰队', url: `${pathname}?page=shipyard&mode=fleet`, target: '_self' },
                        { text: '防御', url: `${pathname}?page=shipyard&mode=defense`, target: '_self' },
                        { text: '雇佣', url: `${pathname}?page=band`, target: '_self' },
                        { text: '模拟', url: `${pathname}?page=battleSimulator`, target: '_self' },
                        { text: '战役', url: `${pathname}?page=battleHall`, target: '_self' }
                    ]
                },
                {
                    category: '社交互动',
                    links: [
                        { text: '联盟', url: `${pathname}?page=alliance`, target: '_self' },
                        { text: '好友', url: `${pathname}?page=buddyList`, target: '_self' },
                        { text: '消息', url: `${pathname}?page=messages`, target: '_self' },
                        { text: '客服', url: `${pathname}?page=ticket`, target: '_self' },
                        { text: '群聊', url: 'https://qm.qq.com/q/7k0Xjnx7jO', target: '_blank' }
                    ]
                }
            ]
        };
    },
    mounted () {
        document.onclick = (e) => {
            this.tools = false;
        };
    },
    computed: {
        url () {
            return pathname + location.search;
        },
        findUrlIndex () {
            const categoryIndex = this.siDebarDatta.findIndex(item => item.links.some(link => link.url === this.url));
            if (categoryIndex !== -1) return [categoryIndex];
            return [0];
        }
    },
    methods: {
        showDropMenu () {
            this.tools = true;
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        },
        toNumber (number) {
            return toNumber(number);
        }
    }
});
sidebar.use(ElementPlus);
sidebar.config.warnHandler = () => { };
sidebar.mount('.sidebar');

// 头部
const topbar = createApp({
    data () {
        return {
            barData,
            color,
            cascader: ''
        };
    },
    mounted () { },
    computed: {
        options () {
            return planetListing.map((item, index) => {
                return {
                    value: item.id,
                    label: `${item.name}`,
                    children: item.luna != '0' ? [{ value: item.id, label: '行星' }, { value: item.luna, label: '月球' }] : []
                };
            });
        }
    },
    methods: {
        cp () {
            location.href = this.modifyUrlParams(location.href, { cp: this.cascader[1] });
        },
        modifyUrlParams (url, newParams) {
            if (!newParams.cp) return url;
            const urlObj = new URL(url);
            const params = new URLSearchParams(urlObj.search);
            Object.entries(newParams).forEach(([key, value]) => {
                if (params.has(key)) params.set(key, value);
                else params.append(key, value);
            });
            urlObj.search = params.toString();
            return urlObj.toString();
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        },
        toNumber (number) {
            return toNumber(number);
        }
    }
});
topbar.use(ElementPlus);
topbar.config.warnHandler = () => { };
topbar.mount('.topbar');
// 底部
const global = createApp({
    data () {
        return {
            id: 0,
            show: false,
            user: [],
            visible: false,
            message: '',
            infoShow: false,
            friendName: '',
            tableData: [],
            infoListData: {},
            messagesShow: false
        };
    },
    computed: {
        formattedTableData () {
            if (this.infoListData.productionTable.production.length) {
                return this.infoListData.productionTable.production.map(item => {
                    const hours = item.hour.reduce((acc, h) => {
                        acc[h.name] = { count: h.count, difference: h.difference };
                        return acc;
                    }, {});
                    return { ...item, hour: hours };
                });
            }
            if (this.infoListData.productionTable.storage.length) {
                return this.infoListData.productionTable.storage.map(item => {
                    const hours = item.hour.reduce((acc, h) => {
                        acc[h.name] = { count: h.count, difference: h.difference };
                        return acc;
                    }, {});
                    return { ...item, hour: hours };
                });
            }
        },
        uniqueHours () {
            const names = new Set();
            if (this.infoListData.productionTable.production.length) {
                this.infoListData.productionTable.production.forEach(item => {
                    item.hour.forEach(h => names.add(h.name));
                });
            }
            if (this.infoListData.productionTable.storage.length) {
                this.infoListData.productionTable.storage.forEach(item => {
                    item.hour.forEach(h => names.add(h.name));
                });
            }
            return Array.from(names).map(name => ({
                id: name,
                name
            }));
        }
    },
    mounted () {
        const val = localStorage.getItem('theme') == 'true' ? true : false;
        document.querySelector('html').classList = val ? 'dark' : '';
        localStorage.setItem('theme', val);
    },
    methods: {
        getFriend (id) {
            this.id = id;
            this.visible = true;
        },
        getMessage (id) {
            this.id = id;
            this.messagesShow = true;
        },
        sendRequest (type) {
            const data = {
                id: this.id,
                text: this.message
            };
            if (type == 'friend') {
                data.page = 'buddyList';
                data.mode = 'send';
                data.ajax = 1;
            } else {
                data.page = 'messages';
                data.mode = 'write';
            }
            axios.post(url, Qs.stringify(data)).then(res => {
                ElNotification({
                    title: '提示',
                    message: res.data
                });
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '操作失败'
                });
            });
            this.visible = false;
            this.messagesShow = false;
            this.message = '';
            this.id = 0;
        },
        getUserInfo (id) {
            const data = { id, page: 'playerCard' };
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading...',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.show = !this.show;
                this.user = res.data;
                this.tableData = [
                    {
                        type: '建筑',
                        points: this.formatNumber(this.user.build_points, 2),
                        rank: this.user.build_rank
                    },
                    {
                        type: '研究',
                        points: this.formatNumber(this.user.tech_points, 2),
                        rank: this.user.tech_rank
                    },
                    {
                        type: '舰队',
                        points: this.formatNumber(this.user.fleet_points, 2),
                        rank: this.user.fleet_rank
                    },
                    {
                        type: '防御',
                        points: this.formatNumber(this.user.defs_points, 2),
                        rank: this.user.defs_rank
                    },
                    {
                        type: '总计',
                        points: this.formatNumber(this.user.total_points, 2),
                        rank: this.user.total_rank
                    }
                ];
                loading.close();
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '玩家资料打开失败'
                });
                loading.close();
            });
        },
        showInfoData (id) {
            const data = { id, page: 'information' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.infoShow = true;
                this.infoListData = res.data;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        },
        isEmpty (value) {
            return isEmpty(value);
        }
    }
});
global.use(ElementPlus);
global.config.warnHandler = () => { };
global.mount('.global');

// 概览
const overview = createApp({
    data () {
        return {
            allData: {},
            shareLink: '',
            inviterId: '',
            online_users: 0,
            refLinks: [],
            loading: true
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        getPageData () {
            const data = { page: 'overview' };
            axios.post(pathname, Qs.stringify(data)).then(response => {
                const res = response.data;
                this.allData = res;
                this.online_users = res.online_users;
                this.shareLink = `${res.path}index.php?ref=${res.userid}`;
                const RefLinks = Object.values(res.RefLinks);
                this.refLinks = RefLinks.map((item, index) => {
                    item.bonus = res.ref_bonus;
                    return item;
                });
                this.loading = false;
            }).catch(error => ElNotification({
                title: '提示',
                message: error.data
            }));
        },
        getUserInfo (id) {
            global._instance.proxy.getUserInfo(id);
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        },
        isEmpty (value) {
            return isEmpty(value);
        },
        changeInviter () {
            const ref_id = this.inviterId;
            if (!ref_id) {
                ElNotification({
                    title: '提示',
                    message: '推荐人ID不可为空哦~'
                });
                return;
            }
            ElMessageBox.confirm('确定将您的推荐人ID设置为' + ref_id + '吗？设置成功后不能更改哦~', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                const data = { ref_id };
                axios.post('fleetMission.php', Qs.stringify(data)).then(response => {
                    ElNotification({
                        title: '提示',
                        message: response.data
                    });
                }).catch(error => ElNotification({
                    title: '提示',
                    message: error.data
                }));
            }).catch(() => { });
        }
    }
});
overview.use(ElementPlus);
overview.config.warnHandler = () => { };
overview.mount('.overview');

// 地图
const galaxy = createApp({
    data () {
        return {
            galNazv1: '',
            galNazv2: '',
            tableData: [],
            loading: true
        };
    },
    mounted () {
        this.galNazv1 = planetGalaxy;
        this.galNazv2 = planetSystem;
        this.go('show');
    },
    methods: {
        friend (id) {
            global._instance.proxy.getFriend(id);
        },
        info (id) {
            global._instance.proxy.getUserInfo(id);
        },
        message (id) {
            global._instance.proxy.getMessage(id);
        },
        doit (type, id) {
            axios.get(`game.php?page=fleetAjax&ajax=1&mission=${type}&planetID=${id}`).then(response => {
                ElNotification({
                    title: '提示',
                    message: response.data.mess
                });
            }).catch(error => ElNotification({
                title: '提示',
                message: '间谍发送失败'
            }));
        },
        go (type) {
            const data = { page: 'galaxy' };
            if (type != 'show') data.type = type;
            const galaxyUpdate = {
                'show': () => {
                    data.galaxy = this.galNazv1;
                    data.system = this.galNazv2;
                },
                'galaxyLeft': () => {
                    data.galaxy = this.galNazv1 > 1 ? this.galNazv1 - 1 : 1;
                    data.system = this.galNazv2;
                },
                'galaxyRight': () => {
                    data.galaxy = this.galNazv1 >= 1 && this.galNazv1 < 10 ? this.galNazv1 + 1 : this.galNazv1;
                    data.system = this.galNazv2;
                },
                'systemLeft': () => {
                    data.galaxy = this.galNazv1;
                    data.system = this.galNazv2 > 1 ? this.galNazv2 - 1 : 1;
                },
                'systemRight': () => {
                    data.galaxy = this.galNazv1;
                    data.system = this.galNazv2 >= 1 && this.galNazv2 < 400 ? this.galNazv2 + 1 : this.galNazv2;
                }
            };
            if (galaxyUpdate[type]) galaxyUpdate[type]();
            this.tableData = [];
            axios.post(pathname, Qs.stringify(data)).then(response => {
                const res = response.data;
                this.galNazv1 = res.galaxy;
                this.galNazv2 = res.system;
                const generateParams = (planet, type = 1) => new URLSearchParams({
                    page: 'fleetTable',
                    galaxy: res.galaxy,
                    system: res.system,
                    planet: planet,
                    planettype: type,
                    username: ''
                }).toString();
                for (let i = 1; i <= res.max_planets; i++) {
                    const user = res.GalaxyRows[i];
                    if (typeof user === 'undefined') {
                        this.tableData.push({
                            planet: i,
                            name: '暂无',
                            temp: res.planetData[i]['temp'],
                            fields: res.planetData[i]['fields'] * res.planet_factor,
                            type_mission_0: generateParams(i)
                        });
                    } else if (user === false) {
                        this.tableData.push({
                            planet: i,
                            name: '行星已摧毁',
                            username: ''
                        });
                    } else {
                        this.tableData.push({
                            planet: i,
                            id: user.planet.id,
                            name: user.planet.name,
                            moon: user.moon,
                            debris: user.debris,
                            isdebris: user.debris ? '有' : '无',
                            ismoon: user.moon ? '有' : '无',
                            user: user.user,
                            planetdata: user.planet,
                            username: user.user.username,
                            isalliance: user.alliance ? user.alliance.name : '无',
                            missions: user.missions,
                            action: user.action,
                            alliance: user.alliance,
                            ownPlanet: user.ownPlanet,
                            type_mission_1: generateParams(i, 0)
                        });
                    }
                }
                this.loading = false;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: error.data
                });
            });
        }
    }
});
galaxy.use(ElementPlus);
galaxy.config.warnHandler = () => { };
galaxy.mount('.galaxy');

// 资源
const resources = createApp({
    data () {
        return {
            prod: {},
            loading: true,
            allData: {},
            newHeaders: {},
            newListData: []
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        isEmpty (value) {
            return isEmpty(value);
        },
        showInfoData (id) {
            global._instance.proxy.showInfoData(id);
        },
        sendData () {
            const prod = this.prod;
            const data = {
                page: 'resources',
                mode: 'send',
                prod
            };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.getPageData();
                ElNotification({
                    title: '提示',
                    message: '成本估算成功'
                });
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '成本估算失败'
                });
            });
        },
        getPageData () {
            const data = { page: 'resources' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.allData = res.data;
                this.newHeaders = res.data.productionList[0].production.map((prod) => ({
                    id: prod.id,
                    name: prod.name
                }));
                this.prod = Object.assign({}, ...res.data.productionList.filter(row => row.id > 0 && row.id < 9990).map((row) => {
                    return {
                        [row.id]: row.prodLevel
                    };
                })
                );
                this.newListData = res.data.productionList.map((row) => {
                    const productionData = row.production.reduce((acc, prod) => {
                        acc[`production_${prod.id}`] = prod.count;
                        return acc;
                    }, {});
                    return { ...row, ...productionData };
                });
                this.loading = false;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        },
        allPlanets (action) {
            const data = {
                mode: 'AllPlanets',
                page: 'resources',
                action
            };
            axios.post(pathname, Qs.stringify(data)).then(response => {
                ElNotification({
                    title: '提示',
                    message: response.data
                });
            }).catch(error => ElNotification({
                title: '提示',
                message: error.data
            }));
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        }
    }
});
resources.use(ElementPlus);
resources.config.warnHandler = () => { };
resources.mount('.resources');


// 排行
const statistics = createApp({
    data () {
        return {
            Select: '1',
            loading: true,
            RangeList: [],
            Selectors: [],
            currentUserRank: 0
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        getPageData () {
            const data = {
                type: this.Select,
                who: 1,
                page: 'statistics'
            };
            this.loading = true;
            axios.post(pathname, Qs.stringify(data)).then(res => {
                const { RangeList, Selectors, rankData, stat_date } = res.data;
                this.loading = false;
                this.RangeList = RangeList;
                this.Selectors = Selectors;
                this.currentUserRank = rankData;
                ElNotification({
                    title: '数据最后更新时间',
                    message: stat_date
                });
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        },
        info (id) {
            global._instance.proxy.getUserInfo(id);
        },
        message (id) {
            global._instance.proxy.getMessage(id);
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        }
    }
});
statistics.use(ElementPlus);
statistics.config.warnHandler = () => { };
statistics.mount('.statistics');

// 成就
const achievements = createApp({
    data () {
        return {
            loading: true,
            achievementsList: []
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        showAchievement (id) {
            global._instance.proxy.showInfoData(id);
        },
        getPageData () {
            const data = { page: 'achievements' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.loading = false;
                this.achievementsList = res.data.achievementsList;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        }
    }
});
achievements.use(ElementPlus);
achievements.config.warnHandler = () => { };
achievements.mount('.achievements');

// 加成
const infobonus = createApp({
    data () {
        return {
            loading: true,
            infobonusList: []
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        getPageData () {
            const data = { page: 'infobonus' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.loading = false;
                this.infobonusList = res.data;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        }
    }
});
infobonus.use(ElementPlus);
infobonus.config.warnHandler = () => { };
infobonus.mount('.infobonus');

// 技术
const techtree = createApp({
    data () {
        return {
            active: '0',
            loading: true,
            allListData: [],
            newListData: []
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        showInfoData (id) {
            global._instance.proxy.showInfoData(id);
        },
        clickList () {
            const allList = {
                0: this.allListData[0],
                1: this.allListData[0].filter(itemA => this.allListData[1].some(itemB => itemB == itemA.id)),
                2: this.allListData[0].filter(itemA => this.allListData[2].some(itemB => itemB == itemA.id)),
                3: this.allListData[0].filter(itemA => this.allListData[3].some(itemB => itemB == itemA.id)),
                4: this.allListData[0].filter(itemA => this.allListData[4].some(itemB => itemB == itemA.id)),
                5: this.allListData[0].filter(itemA => this.allListData[5].some(itemB => itemB == itemA.id))
            }
            this.newListData = allList[this.active];
        },
        getPageData () {
            const data = { page: 'techtree' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.loading = false;
                this.newListData = res.data.TechTreeList;
                this.allListData = [
                    this.newListData,
                    res.data.elementID1,
                    res.data.elementID2,
                    res.data.elementID3,
                    res.data.elementID4,
                    res.data.elementID5,
                ];
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        }
    }
});
techtree.use(ElementPlus);
techtree.config.warnHandler = () => { };
techtree.mount('.techtree');

// 记录
const records = createApp({
    data () {
        return {
            active: '0',
            loading: true,
            newListData: [],
            allListData: []
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        clickList () {
            this.newListData = this.allListData[this.active];
        },
        getUserInfo (id) {
            global._instance.proxy.getUserInfo(id);
        },
        showInfoData (id) {
            global._instance.proxy.showInfoData(id);
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        },
        getPageData () {
            const data = { page: 'records' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                const { buildList, researchList, fleetList, defenseList, update } = res.data;
                this.loading = false;
                this.allListData = [
                    [...buildList, ...researchList, ...fleetList, ...defenseList],
                    buildList,
                    researchList,
                    fleetList,
                    defenseList,
                ];
                this.newListData = this.allListData[0];
                ElNotification({
                    title: '数据最后更新时间',
                    message: update
                });
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        }
    }
});
records.use(ElementPlus);
records.config.warnHandler = () => { };
records.mount('.records');

// 行星
const planet = createApp({
    data () {
        return {
            active: '1',
            filds: 0,
            allData: {},
            loading: true,
            fildsCost: 0,
            diameters: 0,
            system: 1,
            galaxy: 1,
            planet: 1,
            tPorts: 0,
            newName: '',
            password: '',
            diametersCost: 0,
        };
    },
    computed: {
        isSystem () {
            const { tGalaxy, tSystem, tPlanet } = this.allData;
            return tGalaxy == this.galaxy && tSystem == this.system && tPlanet == this.planet;
        }
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        fild () {
            let cost, totalCost = 0;
            const { type_fields, power_fields, purchased_fields } = this.allData;
            for (let i = 0; i < this.filds; i++) {
                cost = Math.round(type_fields * Math.pow(power_fields, Number(purchased_fields) + i));
                totalCost += cost;
            }
            this.fildsCost = totalCost;
        },
        diameter () {
            let cost, totalCost = 0;
            const { type_diameters, power_diameters, purchased_diameters } = this.allData;
            for (let i = 0; i < this.diameters; i++) {
                cost = Math.round(type_diameters * Math.pow(power_diameters, Number(purchased_diameters) + i));
                totalCost += cost;
            }
            this.diametersCost = totalCost;
        },
        tPort () {
            const { tGalaxy, tSystem, tPlanet } = this.allData;
            this.tPorts = 1000 * Math.abs(tSystem - this.system) + 15000 * Math.abs(tGalaxy - this.galaxy) + 2500 * Math.abs(tPlanet - this.planet);
            if (tGalaxy == this.galaxy && tSystem == this.system && tPlanet == this.planet) {
                this.tPorts = 0;
            }
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        },
        postPageData (mode) {
            const type = {
                field: {
                    mode,
                    page: 'planet',
                    filds: this.filds
                },
                diameter: {
                    mode,
                    page: 'planet',
                    diameters: this.diameters
                },
                coord: {
                    mode,
                    page: 'planet',
                    galaxyt: this.galaxy,
                    systemt: this.system,
                    planetst: this.planet
                },
                rename: {
                    mode,
                    page: 'overview',
                    name: this.newName
                },
                delete: {
                    mode,
                    page: 'overview',
                    password: this.password
                }
            };
            axios.post(pathname, Qs.stringify(type[mode])).then(res => {
                ElNotification({
                    title: '提示',
                    message: res.data.message
                });
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据提交失败'
                });
            });
        },
        getPageData () {
            const data = { page: 'planet' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                const { tGalaxy, tSystem, tPlanet } = res.data;
                this.loading = false;
                this.allData = res.data;
                this.galaxy = tGalaxy;
                this.system = tSystem;
                this.planet = tPlanet;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        }
    }
});
planet.use(ElementPlus);
planet.config.warnHandler = () => { };
planet.mount('.planet');

// 设置
const settings = createApp({
    data () {
        return {
            form: {
                email: '',
                username: '',
                password: '',
                newPassword: '',
                newPassword2: '',
                timezone: '',
                planetSort: 0,
                planetOrder: 0,
                queueMessages: true,
                spyMessagesMode: false,
                blockPM: false,
                spycount: 1,
                fleetActions: 3,
                galaxySpy: true,
                galaxyMessage: true,
                galaxyBuddyList: true,
                galaxyMissle: true,
            },
            night: false,
            fileList: [],
            selectors: {
                Sort: {},
                SortUpDown: {},
                timezones: {}
            }
        };
    },
    mounted () {
        this.getPageData();
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) this.night = savedTheme == 'true' ? true : false;
    },
    watch: {
        night (val) {
            document.querySelector('html').classList = val ? 'dark' : '';
            localStorage.setItem('theme', val);

        }
    },
    methods: {
        onSuccess () {
            ElNotification({
                title: '提示',
                message: '头像上传成功'
            });
        },
        onError () {
            ElNotification({
                title: '提示',
                message: '头像上传失败'
            });
        },
        saveSettings () {
            const form = {
                page: 'settings',
                mode: 'send',
                foto: this.form.foto,
                email: this.form.email,
                username: this.form.username,
                password: this.form.password,
                newPassword: this.form.newPassword,
                newPassword2: this.form.newPassword2,
                timezone: this.form.timezone,
                planetSort: this.form.planetSort,
                planetOrder: this.form.planetOrder,
                queueMessages: this.form.queueMessages ? '1' : '0',
                spyMessagesMode: this.form.spyMessagesMode ? '1' : '0',
                blockPM: this.form.blockPM ? '1' : '0',
                spycount: this.form.spycount,
                fleetActions: this.form.fleetActions,
                galaxySpy: this.form.galaxySpy ? '1' : '0',
                galaxyMessage: this.form.galaxyMessage ? '1' : '0',
                galaxyBuddyList: this.form.galaxyBuddyList ? '1' : '0',
                galaxyMissle: this.form.galaxyMissle ? '1' : '0'
            };
            axios.post(pathname, Qs.stringify(form)).then(res => {
                ElNotification({
                    title: '提示',
                    message: res.data
                });
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        },
        getPageData () {
            const data = { page: 'settings' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.form.email = res.data.email;
                this.fileList = [
                    {
                        name: '头像',
                        url: res.data.foto
                    }
                ];
                this.form.foto = res.data.foto;
                this.form.username = res.data.username;
                this.form.timezone = res.data.timezone;
                this.form.planetSort = res.data.planetSort;
                this.form.planetOrder = res.data.planetOrder;
                this.form.queueMessages = res.data.queueMessages;
                this.form.spyMessagesMode = res.data.spyMessagesMode;
                this.form.blockPM = res.data.blockPM;
                this.form.spycount = res.data.spycount;
                this.form.fleetActions = res.data.fleetActions;
                this.form.galaxySpy = res.data.galaxySpy;
                this.form.galaxyMessage = res.data.galaxyMessage;
                this.form.galaxyBuddyList = res.data.galaxyBuddyList;
                this.form.galaxyMissle = res.data.galaxyMissle;
                this.selectors = res.data.Selectors;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        }
    }
});
settings.use(ElementPlus);
settings.config.warnHandler = () => { };
settings.mount('.settings');

// 建筑
const buildings = createApp({
    data () {
        return {
            field_used: 0,
            field_max: 0,
            field_left: 0,
            loading: true,
            allList: [],
            isUpgrade: true,
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        getPageData () {
            const data = { page: 'buildings' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.allList = res.data.BuildInfoList;
                this.isUpgrade = res.data.isUpgrade;
                this.field_used = res.data.field_used;
                this.field_max = res.data.field_max;
                this.field_left = res.data.field_left;
                this.loading = false;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        },
        remove (id) {
            const data = {
                cmd: 'destroy',
                building: id,
                page: 'buildings'
            };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                ElNotification({
                    title: '提示',
                    message: '拆除成功'
                });
                const index = this.allList.findIndex(item => item.id === id);
                this.allList[index].level -= 1;
                this.allList[index].nextLevel = this.allList[index].level + 1;
                this.allList[index].levelToBuild -= 1;
                this.field_used -= 1;
                this.field_left += 1;
                this.$refs.buildings.doLayout();
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '拆除失败'
                });
            });
        },
        upgrade (id, lvlup, lvlup1, levelToBuildInFo) {
            if (!this.field_left) {
                ElNotification({
                    title: '提示',
                    message: '可用区域不足, 升级失败'
                });
                return;
            }
            const data = {
                cmd: 'insert',
                building: id,
                page: 'buildings',
                lvlup,
                lvlup1,
                levelToBuildInFo
            };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                ElNotification({
                    title: '提示',
                    message: '升级成功'
                });
                const index = this.allList.findIndex(item => item.id === id);
                this.allList[index].level += 1;
                this.allList[index].nextLevel = this.allList[index].level + 1;
                this.allList[index].levelToBuild += 1;
                this.field_used += 1;
                this.field_left -= 1;
                this.$refs.buildings.doLayout();
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '升级失败'
                });
            });
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        },
        showInfoData (id) {
            global._instance.proxy.showInfoData(id);
        },
    }
});
buildings.use(ElementPlus);
buildings.config.warnHandler = () => { };
buildings.mount('.buildings');

// 科技
const research = createApp({
    data () {
        return {
            loading: true,
            allList: [],
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        getPageData () {
            const data = { page: 'research' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.allList = res.data.ResearchList;
                this.loading = false;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        },
        upgrade (id, lvlup, lvlup1, levelToBuildInFo) {
            const data = {
                cmd: 'insert',
                tech: id,
                page: 'research',
                lvlup,
                lvlup1,
                levelToBuildInFo
            };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                const index = this.allList.findIndex(item => item.id === id);
                this.allList[index].level += 1;
                this.allList[index].nextLevel = this.allList[index].level + 1;
                this.$refs.research.doLayout();
                ElNotification({
                    title: '提示',
                    message: '升级成功'
                });
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '升级失败'
                });
            });
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        },
        showInfoData (id) {
            global._instance.proxy.showInfoData(id);
        },
    }
});
research.use(ElementPlus);
research.config.warnHandler = () => { };
research.mount('.research');

// 军官
const officier = createApp({
    data () {
        return {
            loading: true,
            allList: [],
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        getPageData () {
            const data = { page: 'officier' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.allList = res.data;
                this.loading = false;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        },
        upgrade (id, amount) {
            const data = {
                id,
                page: 'officier',
                amount
            };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                const index = this.allList.findIndex(item => item.id === id);
                this.allList[index].level += 1;
                this.allList[index].nextLevel = this.allList[index].level + 1;
                this.$refs.officier.doLayout();
                ElNotification({
                    title: '提示',
                    message: '升级成功'
                });
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '升级失败'
                });
            });
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        },
        showInfoData (id) {
            global._instance.proxy.showInfoData(id);
        },
    }
});
officier.use(ElementPlus);
officier.config.warnHandler = () => { };
officier.mount('.officier');

// 蓝图
const blueprints = createApp({
    data () {
        return {
            loading: true,
            allList: [],
        };
    },
    mounted () {
        this.getPageData();
    },
    methods: {
        getPageData () {
            const data = { page: 'blueprints' };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                this.allList = res.data;
                this.loading = false;
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '数据加载失败'
                });
            });
        },
        upgrade (id, amount) {
            const data = {
                id,
                page: 'blueprints',
                amount
            };
            axios.post(pathname, Qs.stringify(data)).then(res => {
                const index = this.allList.findIndex(item => item.id === id);
                this.allList[index].timeLeft += this.allList[index].time;
                this.$refs.blueprints.doLayout();
                ElNotification({
                    title: '提示',
                    message: '升级成功'
                });
            }).catch(error => {
                ElNotification({
                    title: '提示',
                    message: '升级失败'
                });
            });
        },
        formatNumber (number, type) {
            return formatNumber(number, type);
        },
        showInfoData (id) {
            global._instance.proxy.showInfoData(id);
        },
    }
});
blueprints.use(ElementPlus);
blueprints.config.warnHandler = () => { };
blueprints.mount('.blueprints');