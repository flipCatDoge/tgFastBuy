// 添加全局变量存储当前选中的bot和botUrl
let selectedBot = null;
let currentBotUrl = null;
let currentRefCode = null;

const botList = [
    {
        name: "Trojan Bot",
        description: "跳转到Trojan Bot",
        icon: "assets/icons/trojan.png",
        botUrl: "helenus_trojanbot&start=",
        refCode: "r-redruncar-"
    },
    {
        name: "Pepe Bot",
        description: "跳转到Pepe Bot",
        icon: "assets/icons/pepeBot.jpg",
        botUrl: "pepeboost_sol09_bot&start=",
        refCode: "ref_03trgw_ca_"
    },
    {
        name: "GMGN Bot",
        description: "跳转到GMGN Bot",
        icon: "assets/icons/gmgnBot.jpg",
        botUrl: "GMGN_sol04_bot&start=",
        refCode: "i_038a9Wdz_c_"
    },
    {
        name: "Dogee Bot",
        description: "跳转到Dogee Bot",
        icon: "assets/icons/dogeeBot.jpg",
        botUrl: "dogeebot_bot&start=",
        refCode: "rt_17339252744795_"
    },
    {
        name: "PinkPunk Bot",
        description: "跳转到PinkPunk Bot",
        icon: "assets/icons/pinkPunkBot.jpg",
        botUrl: "PinkPunkTradingBot&start=",
        refCode: "-6287092183-501"
    },
    {
        name: "Ave Bot",
        description: "跳转到Ave Bot",
        icon: "assets/icons/aveBot.jpg",
        botUrl: "AveSniperBot_02_bot&start=",
        refCode: "-redruncar"
    }
    // 可以添加更多bot
];

function createBotCards() {
    const botListContainer = document.querySelector('.bot-list');
    
    // 从chrome.storage获取保存的选择
    chrome.storage.local.get(['currentBotUrl','currentRefCode'], function(result) {
        const savedBotUrl = result.currentBotUrl;
        const savedRefCode = result.currentRefCode;
        
        botList.forEach(bot => {
            const card = document.createElement('div');
            card.className = 'bot-card';
            
            // 如果有保存的选择，使用保存的选择；否则选择第一个
            if ((savedBotUrl && savedBotUrl === bot.botUrl) || 
                (!savedBotUrl && bot === botList[0])) {  // 默认选中第一个
                selectedBot = bot;
                currentBotUrl = bot.botUrl;
                currentRefCode = bot.refCode;
                card.classList.add('selected');
                // 确保选择被保存
                if (!savedBotUrl) {
                    chrome.storage.local.set({ 
                        currentBotUrl: bot.botUrl,
                        currentRefCode: bot.refCode,
                        lastUpdated: Date.now()
                    });
                }
            }
            
            card.innerHTML = `
                <img src="${bot.icon}" alt="${bot.name}" class="bot-icon">
                <div class="bot-info">
                    <div class="bot-name">${bot.name}</div>
                    <div class="bot-description">${bot.description}</div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                // 移除其他卡片的选中状态
                document.querySelectorAll('.bot-card').forEach(c => c.classList.remove('selected'));
                // 添加当前卡片的选中状态
                card.classList.add('selected');
                // 更新选中的bot和botUrl
                selectedBot = bot;
                currentBotUrl = bot.botUrl;
                currentRefCode = bot.refCode;
                // 保存选择
                chrome.storage.local.set({ 
                    currentBotUrl: bot.botUrl,
                    currentRefCode: bot.refCode,
                    lastUpdated: Date.now()
                }, () => {
                    console.log('已选择:', bot.name, '当前botUrl:', bot.botUrl);
                });
            });
            
            botListContainer.appendChild(card);
        });
    });
}

document.addEventListener('DOMContentLoaded', createBotCards); 