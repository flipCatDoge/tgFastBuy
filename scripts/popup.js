// 添加全局变量存储当前选中的bot和botUrl
let selectedBot = null;
let currentBotUrl = null;
let currentRefCode = null;

// 修改线路配置，为每个 bot 配置不同的链接
const routeConfigs = {
    "route1": {
        name: "线路1",
        botUrls: {
            "Trojan Bot": "helenus_trojanbot&start=",
            "Pepe Bot": "pepeboost_sol08_bot&start=",
            "GMGN Bot": "GMGN_sol03_bot&start=",
            "Bloom Bot": "BloomSolana_bot&start=",
            "Dogee Bot": "dogeebot_bot&start=",
            "PinkPunk Bot": "PinkPunkTradingBot&start=",
            "Ave Bot": "AveSniperBot_02_bot&start="
        }
    },
    "route2": {
        name: "线路2",
        botUrls: {
            "Trojan Bot": "diomedes_trojanbot&start=",
            "Pepe Bot": "pepeboost_sol09_bot&start=",
            "GMGN Bot": "GMGN_sol04_bot&start=",
            "Bloom Bot": "BloomSolanaEU2_bot&start=",
            "Dogee Bot": "Cola_Dogeebot&start=",
            "PinkPunk Bot": "PinkPunkTradingBot&start=",
            "Ave Bot": "AveSniperBot_01_bot&start="
        }
    },
    "route3": {
        name: "线路3",
        botUrls: {
            "Trojan Bot": "menelaus_trojanbot&start=",
            "Pepe Bot": "pepeboost_sol10_bot&start=",
            "GMGN Bot": "GMGN_sol05_bot&start=",
            "Bloom Bot": "BloomSolanaUS1_bot&start=",
            "Dogee Bot": "Tars_Dogeebot&start=",
            "PinkPunk Bot": "PinkPunkTradingBot&start=",
            "Ave Bot": "AveSniperBot&start="
        }
    }
};

// 修改 botList，移除固定的 botUrl
const botList = [
    {
        name: "Trojan Bot",
        description: "跳转到Trojan Bot",
        icon: "assets/icons/trojan.png",
        baseUrl: "helenus_trojanbot&start=",
        refCode: "r-redruncar-"
    },
    {
        name: "Pepe Bot",
        description: "跳转到Pepe Bot",
        icon: "assets/icons/pepeBot.jpg",
        refCode: "ref_03trgw_ca_"
    },
    {
        name: "GMGN Bot",
        description: "跳转到GMGN Bot",
        icon: "assets/icons/gmgnBot.jpg",
        refCode: "i_038a9Wdz_c_"
    },
    {
        name: "Bloom Bot",
        description: "跳转到Bloom Bot",
        icon: "assets/icons/bloomBot.jpg",
        refCode: "ref_F8URF9G6UV_ca_"
    },
    {
        name: "Dogee Bot",
        description: "跳转到Dogee Bot",
        icon: "assets/icons/dogeeBot.jpg",
        refCode: "rt_17339252744795_"
    },
    {
        name: "PinkPunk Bot",
        description: "跳转到PinkPunk Bot",
        icon: "assets/icons/pinkPunkBot.jpg",
        refCode: "-6287092183-501"
    },
    {
        name: "Ave Bot",
        description: "跳转到Ave Bot",
        icon: "assets/icons/aveBot.jpg",
        refCode: "-redruncar"
    }
    // 可以添加更多bot
];

// 添加当前线路变量
let currentRoute = 'route1';

function createRouteSelector() {
    const header = document.querySelector('header');
    const routeSelector = document.createElement('div');
    routeSelector.className = 'route-selector';
    
    // 先获取保存的路由状态
    chrome.storage.local.get(['currentRoute', 'currentBotUrl'], function(result) {
        const savedRoute = result.currentRoute || 'route1';
        currentRoute = savedRoute;
        
        Object.keys(routeConfigs).forEach(routeKey => {
            const route = routeConfigs[routeKey];
            const button = document.createElement('button');
            button.className = 'route-button';
            button.textContent = route.name;
            
            // 根据保存的路由设置激活状态
            if (routeKey === savedRoute) {
                button.classList.add('active');
            }
            
            button.addEventListener('click', () => {
                document.querySelectorAll('.route-button').forEach(btn => 
                    btn.classList.remove('active'));
                button.classList.add('active');
                currentRoute = routeKey;
                
                // 获取当前选中的 bot
                const selectedCard = document.querySelector('.bot-card.selected');
                if (selectedCard) {
                    const botIndex = Array.from(selectedCard.parentNode.children).indexOf(selectedCard);
                    const bot = botList[botIndex];
                    // 更新为当前线路对应的 URL
                    const newBotUrl = routeConfigs[routeKey].botUrls[bot.name];
                    chrome.storage.local.set({ 
                        currentRoute: routeKey,
                        currentBotUrl: newBotUrl,
                        lastUpdated: Date.now()
                    }, () => {
                        console.log('已切换到线路:', route.name, '当前botUrl:', newBotUrl);
                    });
                }
            });
            
            routeSelector.appendChild(button);
        });
        
        // 将线路选择器插入到标题后面
        header.appendChild(routeSelector);
    });
}

function updateBotUrls() {
    document.querySelectorAll('.bot-card').forEach(card => {
        const botIndex = Array.from(card.parentNode.children).indexOf(card);
        const bot = botList[botIndex];
        if (card.classList.contains('selected')) {
            // 根据当前选中的 bot 和线路获取对应的 URL
            const currentBotUrl = routeConfigs[currentRoute].botUrls[bot.name];
            chrome.storage.local.set({ 
                currentBotUrl: currentBotUrl,
                currentRefCode: bot.refCode,
                lastUpdated: Date.now()
            });
        }
    });
}

// 修改 createBotCards 函数
function createBotCards() {
    const botListContainer = document.querySelector('.bot-list');
    
    chrome.storage.local.get(['currentBotUrl', 'currentRefCode', 'currentRoute'], function(result) {
        const savedBotUrl = result.currentBotUrl;
        currentRoute = result.currentRoute || 'route1';
        
        botList.forEach(bot => {
            const card = document.createElement('div');
            card.className = 'bot-card';
            
            // 检查当前线路下的 bot URL 是否匹配
            const currentRouteUrl = routeConfigs[currentRoute].botUrls[bot.name];
            
            // 如果保存的 URL 匹配当前线路下的 bot URL，则选中该卡片
            if (savedBotUrl === currentRouteUrl) {
                console.log('恢复选中状态:', bot.name, '当前botUrl:', currentRouteUrl);
                selectedBot = bot;
                currentBotUrl = currentRouteUrl;
                currentRefCode = bot.refCode;
                card.classList.add('selected');
            }
            
            card.innerHTML = `
                <img src="${bot.icon}" alt="${bot.name}" class="bot-icon">
                <div class="bot-info">
                    <div class="bot-name">${bot.name}</div>
                    <div class="bot-description">${bot.description}</div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                document.querySelectorAll('.bot-card').forEach(c => 
                    c.classList.remove('selected'));
                card.classList.add('selected');
                selectedBot = bot;
                // 根据当前选中的 bot 和线路获取对应的 URL
                currentBotUrl = routeConfigs[currentRoute].botUrls[bot.name];
                currentRefCode = bot.refCode;
                
                chrome.storage.local.set({ 
                    currentBotUrl: currentBotUrl,
                    currentRefCode: bot.refCode,
                    lastUpdated: Date.now()
                }, () => {
                    console.log('已选择:', bot.name, '当前botUrl:', currentBotUrl);
                });
            });
            
            botListContainer.appendChild(card);
        });
    });
}

// 修改初始化代码
document.addEventListener('DOMContentLoaded', () => {
    createRouteSelector();
    createBotCards();
}); 