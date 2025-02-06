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

// 修改添加按钮的主函数
function addButtonToCards() {
    const cards = document.querySelectorAll('.some-card');
    if (!cards.length) return;
    // console.log('查找卡片')
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

        // console.log('地址:', tokenCa);
        // 获取目标容器
        const targetButton = card.querySelector(':scope > div:nth-child(3) > div:first-child > div:last-child > button');
        
        if (!targetButton) {
            console.log('未找到目标按钮');
            return;
        }
        // console.log('插入按钮')
        const button = document.createElement('button');
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

// 处理按钮点击事件
function handleButtonClick(cardData) {
    chrome.storage.local.get(['currentBotUrl', 'lastUpdated'], function(result) {
        const botUrl = result.currentBotUrl || 'helenus_trojanbot&start=r-redruncar-';
        console.log('botUrl:', botUrl, 'lastUpdated:', result.lastUpdated);
        if(botUrl.includes('PinkPunkTradingBot')){
            const tgUrl = `tg://resolve?domain=${botUrl}${cardData.ca}-6287092183-501`;
            window.location.href = tgUrl;
        }else{
            const tgUrl = `tg://resolve?domain=${botUrl}${cardData.ca}`;
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
                if (node.classList && 
                    (node.classList.contains('some-card') || 
                     node.classList.contains('ant-card-body'))) {
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

// 页面加载完成后初始执行
document.addEventListener('DOMContentLoaded', addButtonToCards);

// 为了处理可能的异步加载情况，也在window load时执行一次
window.addEventListener('load', addButtonToCards);

// 修改addButtonToTerminal函数
function addButtonToTerminal() {
    // 检查是否是terminal页面
    if (!window.location.pathname.includes('/terminal')) return;

    // 获取URL中的address参数
    const urlParams = new URLSearchParams(window.location.search);
    const tokenCa = urlParams.get('address');
    if (!tokenCa) return;

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

// 修改初始化代码，同时支持两种页面
function initialize() {
    // 处理列表页面的按钮
    addButtonToCards();
    // 处理terminal页面的按钮
    addButtonToTerminal();
}

// 更新事件监听
document.addEventListener('DOMContentLoaded', initialize);
window.addEventListener('load', initialize);

// 添加路由变化监听
let lastUrl = location.href; 
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        initialize();
    }
}).observe(document, {subtree: true, childList: true}); 