// 定义一个防抖函数来优化性能
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

async function findCardsWithDelay() {
    for (let i = 0; i < 3; i++) {
        const cards = document.querySelectorAll('.g-table-row');
        if (cards.length) {
            // console.log('0.找到卡片数量:', cards.length);
            if(i>0){
                addButtonToCards();
            }
            break;
        }
        // console.log('未找到卡片，等待500ms后重试');
        await new Promise(resolve => setTimeout(resolve, 500)); // 等待500ms
    }
}

// 修改添加按钮的主函数
function addButtonToCards() {
    if (window.location.pathname.includes('/meme')||window.location.search.includes('chain=sol')) {
        // console.log('查找 GMGN meme 卡片...')
        // 修改选择器以更准确地匹配 GMGN 的卡片
        findCardsWithDelay();
        const cards = document.querySelectorAll('.g-table-row');
        if(!cards) return;
        cards.forEach(card => {
            // 检查是否已经添加过按钮
            if (card.querySelector('.custom-button')) return;
            // 获取卡片合约地址
            const tokenCaElement = card.querySelector(':scope > div > a');
            if (!tokenCaElement) {
                console.log('未找到合约地址元素');
                return;
            }
            // 从 href 中提取合约地址
            const href = tokenCaElement.getAttribute('href');
            const tokenCa = href.split('/').pop();
            // 获取目标容器 - 修改选择器以匹配 GMGN 的按钮容器
            const targetContainer = card.querySelector('.css-ko0mam');
            
            if (!targetContainer) {
                console.log('未找到目标容器');
                return;
            }
            // console.log('找到目标容器')

            const button = document.createElement('button');
            button.style.width = '48px';
            button.style.height = '24px';
            button.style.fontSize = '12px';
            button.style.color = '#0077aa'; // 更深的蓝色
            button.style.border = '1px solid #0077aa'; // 更深的蓝色
            button.className = 'custom-button';
            button.innerHTML = `TG购买`;
            
            // 添加点击事件
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const cardData = {
                    ca: tokenCa
                };
                
                handleButtonClick(cardData);
            });
            
            // 将按钮插入到目标容器之前，而不是作为子元素
            targetContainer.insertAdjacentElement('beforebegin', button);
        });
    }
    else if(window.location.pathname.includes('/pump-vision')){
        // console.log('查找 pump-vision 卡片...')
        const cards = document.querySelectorAll('.some-card');
        if (!cards.length) return;
        cards.forEach(card => {
            // 检查是否已经添加过按钮
            if (card.querySelector('.custom-button')) return;

            // 获取卡片合约地址
            const tokenCaElement = card.querySelector(':scope > a');
            // 获取 href 属性
            const href = tokenCaElement.getAttribute('href');

            // 使用 URL 对象解析 href
            const url = new URL(href, window.location.origin);

            // 获取地址参数
            const tokenCa = url.searchParams.get('address');

            // 获取目标容器
            const targetButton = card.querySelector(':scope > div:nth-child(3) > div:first-child > div:last-child > button');
            
            if (!targetButton) {
                // console.log('未找到目标按钮');
                return;
            }
            const button = document.createElement('button');
            button.style.height = '36px';
            button.style.border = '1px solid #0088cc';
            button.style.color = '#0088cc';
            button.style.fontSize = '13px';
            button.className = 'custom-button ant-btn ant-btn-text z-20';
            button.innerHTML = `
                TG购买
            `;
            
            // 添加点击事件
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const cardData = {
                    id: card.dataset.id,
                    title: card.querySelector('.title')?.textContent,
                    ca:tokenCa,
                };
                
                handleButtonClick(cardData);
            });
            
            // 将按钮插入到目标button之前
            targetButton.insertAdjacentElement('beforebegin', button);
        });
    }
}

// 处理按钮点击事件
function handleButtonClick(cardData) {
    chrome.storage.local.get(['currentBotUrl', 'lastUpdated'], function(result) {
        const botUrl = result.currentBotUrl || 'helenus_trojanbot&start=r-redruncar-';
        // console.log('botUrl:', botUrl, 'lastUpdated:', result.lastUpdated);
        if(botUrl.includes('PinkPunkTradingBot')){
            const tgUrl = `tg://resolve?domain=${botUrl}${cardData.ca}-6287092183-501`;
            window.location.href = tgUrl;
        }
        else if(botUrl.includes('AveSniperBot_02_bot')){
            const tgUrl = `tg://resolve?domain=${botUrl}${cardData.ca}-redruncar`;
            window.location.href = tgUrl;
        }
        else{
            const tgUrl = `tg://resolve?domain=${botUrl}${cardData.ca}`;
            // console.log('tgUrl:', tgUrl)
            window.location.href = tgUrl;
        }
    });
}

// 创建一个防抖版本的添加按钮函数
const debouncedAddButtons = debounce(addButtonToCards, 200);

// 使用 MutationObserver 监听DOM变化
const observer = new MutationObserver((mutations) => {
    let shouldAddButtons = false;
    
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(node => {
                if (node.classList && (node.classList.contains('some-card') || node.classList.contains('g-table-row'))) {
                    shouldAddButtons = true;
                }
            });
        }
    });
    
    if (shouldAddButtons) {
        initialize();
    }
});

// 配置观察器选项
const observerConfig = {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
};

// 开始观察
observer.observe(document.body, observerConfig);

// 修改addButtonToTerminal函数
function addButtonToTerminal() {
    // 检查是否是terminal页面
    if (window.location.pathname.includes('/terminal')){
        // console.log('terminal页面')
        // 获取URL中的address参数
        const urlParams = new URLSearchParams(window.location.search);
        const tokenCa = urlParams.get('address');
        if (!tokenCa) return;
        // console.log('tokenCa:', tokenCa)
        // 创建一个专门用于terminal页面的观察器
        const terminalObserver = new MutationObserver((mutations, observer) => {
            const allContainers = document.querySelectorAll('.custom-tab');
            const targetContainer = allContainers.length > 0 ? allContainers[0] : null;

            if (targetContainer && !targetContainer.querySelector('.custom-button')) {
                // 创建包装容器来实现居中
                const buttonWrapper = document.createElement('div');
                buttonWrapper.style.cssText = 'width: 100%; display: flex; justify-content: center; margin: 10px 0;';
                
                // 创建按钮
                const button = document.createElement('button');
                button.className = 'custom-button ant-btn ant-btn-text z-20';
                button.style.margin = '0';
                button.style.width = '268px';
                button.style.height = '36px';
                button.style.border = '1px solid #0088cc';
                button.style.color = '#0088cc';
                button.style.fontSize = '13px';
                button.innerHTML = `TG购买`;

                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleButtonClick({ ca: tokenCa });
                });

                buttonWrapper.appendChild(button);
                targetContainer.insertAdjacentElement('beforeend', buttonWrapper);
                
                // 按钮添加成功后停止观察
                observer.disconnect();
            }
        });

        // 开始观察整个文档
        terminalObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 30秒后停止观察，避免无限运行
        setTimeout(() => terminalObserver.disconnect(), 30000);
    }
    else if (window.location.pathname.includes('/sol/token/')) {

        // console.log('查找 GMGN token 详情页...')

        // 获取合约地址从 URL
        const tokenLink = window.location.pathname.split('/').pop();
        if (!tokenLink) {
            // console.log('未找到合约地址');
            return;
        }
        let inputString = tokenLink;
        if (inputString.includes('_')) {
            // 如果包含下划线，分割并提取第二部分
            inputString = tokenLink.split('_')[1];
        } else {
            // 如果不包含下划线，直接返回整个字符串
            inputString = tokenLink;
        }
        const tokenCa = inputString;
        // 创建一个专门用于solToken页面的观察器
        const solTokenObserver = new MutationObserver((mutations, observer) => {
            const allContainers = document.querySelectorAll('.css-1hdbc19');
            // console.log('allContainers:', allContainers)
            const targetContainer = allContainers.length > 0 ? allContainers[0] : null;

            if (targetContainer && !targetContainer.querySelector('.custom-button')) {
                // 创建包装容器来实现居中
                const buttonWrapper = document.createElement('div');
                buttonWrapper.style.cssText = 'width: 100%; display: flex; justify-content: center; margin: 10px 0;';
                
                // 创建按钮
                const button = document.createElement('button');
                button.className = 'custom-button z-20';
                button.style.margin = '0';
                button.style.width = '268px';
                button.style.height = '36px';
                button.innerHTML = `TG购买`;

                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleButtonClick({ ca: tokenCa });
                });

                buttonWrapper.appendChild(button);
                targetContainer.insertAdjacentElement('beforeend', buttonWrapper);
                
                // 按钮添加成功后停止观察
                observer.disconnect();
            }
        });

        // 开始观察整个文档
        solTokenObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 30秒后停止观察，避免无限运行
        setTimeout(() => solTokenObserver.disconnect(), 30000);
    }
}

// 修改初始化代码，同时支持两种页面
function initialize() {
    // 处理列表页面的按钮
    debouncedAddButtons();
    // 处理terminal页面的按钮
    addButtonToTerminal();
}

// 延迟初始化以确保内容加载
function delayedInitialize() {
    setTimeout(() => {
        if (document.querySelector('.g-table-row')) {
            console.log('找到g-table-row,初始化')
            initialize();
        } 
        else if(document.querySelector('.some-card')){
            console.log('找到some-card,初始化')
            initialize();
        }
        else if(document.querySelector('.custom-tab')){
            console.log('找到custom-tab,初始化')
            initialize();
        }
        else if(document.querySelector('.css-1hdbc19')){
            console.log('找到css-1i27l4i,初始化')
            initialize();
        }
        else {
            console.log('未找到任何元素,继续尝试')
            // 如果未找到，继续尝试
            delayedInitialize();
        }
    }, 500); // 每隔500ms检查一次
}

// 更新事件监听
document.addEventListener('DOMContentLoaded', delayedInitialize);
window.addEventListener('load', delayedInitialize);

// 添加路由变化监听
let lastUrl = location.href; 
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        initialize();
    }
}).observe(document, {subtree: true, childList: true}); 