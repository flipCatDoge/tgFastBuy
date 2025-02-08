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

async function findTokenDivWithDelay() {
    for (let i = 0; i < 3; i++) {
        const div = document.querySelector('.c-dropdown.js-dropdown.js-wdd.c-wdd.u-mb-s.js-dca__wallets.is-item-loading');
        if (div) {
            if(i>0){
                addButtonToTerminal();
            }
            // console.log('0.找到token div:', div);
            break;
        }
        // console.log('未找到按钮，等待500ms后重试');
        await new Promise(resolve => setTimeout(resolve, 500)); // 等待500ms
    }
}

// 修改添加按钮的主函数
function addButtonToCards() {
    if (window.location.search.includes('chain=sol')) {
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
    else if(window.location.hostname === 'neo.bullx.io'){
        // console.log('查找 neo 卡片...')
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
            // const targetButton = card.querySelector(':scope > div:last-child > div:first-child > div:last-child > div:last-child > button');
            const targetButton = card.querySelector(':scope > div:last-child > div:first-child > div:last-child > div:last-child > button');
            if (!targetButton) {
                // console.log('未找到目标按钮');
                return;
            }
            const button = document.createElement('button');
            button.style.height = '30px';
            button.style.width = '72px';
            button.style.border = '1px solid #0088cc';
            button.style.color = '#0088cc';
            button.style.fontSize = '12px';
            button.className = 'custom-button ant-btn-text neo-bullx-button z-20';
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
    else if(window.location.pathname.includes('/memescope')){
        // console.log('查找 memescope 卡片...')
        const cards = document.querySelectorAll('.sBVBv2HePq7qYTpGDmRM');
        if (!cards.length) return;
        cards.forEach(card => {
            // 检查是否已经添加过按钮
            if (card.querySelector('.custom-button')) return;

            // 获取卡片合约地址
            const tokenCaElement = card.querySelector('.fsYi35goS5HvMls5HBGU');

            // 获取 data-address 属性值
            const tokenCa = tokenCaElement ? tokenCaElement.getAttribute('data-address') : null;
            // console.log('tokenCa:', tokenCa)
            // 获取目标容器
            const targetButton = card.querySelector('.CZ9XtNP_BJSquWvM6_r8 > button');
            
            if (!targetButton) {
                console.log('未找到目标按钮');
                return;
            }
            const button = document.createElement('button');
            button.style.width = '70px';
            button.style.height = '30px';
            button.style.border = '1px solid #0088cc';
            button.style.color = '#0088cc';
            button.style.fontSize = '12px';
            button.style.zIndex = '2';
            button.className = 'custom-button';
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
    chrome.storage.local.get(['currentBotUrl', 'currentRefCode','lastUpdated'], function(result) {
        const botUrl = result.currentBotUrl || 'helenus_trojanbot&start=r-redruncar-';
        const refCode = result.currentRefCode || '';
        // console.log('botUrl:', botUrl, 'lastUpdated:', result.lastUpdated);
        const tgUrlHeader = 'tg://resolve?domain=';
        if(botUrl.includes('PinkPunkTradingBot')){
            const tgUrl = `${tgUrlHeader}${botUrl}${cardData.ca}${refCode}`;
            window.location.href = tgUrl;
        }
        else if(botUrl.includes('AveSniperBot')){
            const tgUrl = `${tgUrlHeader}${botUrl}${cardData.ca}${refCode}`;
            window.location.href = tgUrl;
        }
        else{
            const tgUrl = `${tgUrlHeader}${botUrl}${refCode}${cardData.ca}`;
            window.location.href = tgUrl;
        }
    });
}

// 创建一个防抖版本的添加按钮函数
const debouncedAddButtons = debounce(addButtonToCards, 200);

let lastWebUrl = '';
// 使用 MutationObserver 监听DOM变化
const observer = new MutationObserver((mutations) => {
    let shouldAddButtons = false;
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(node => {
                if (node.classList && (node.classList.contains('some-card') || node.classList.contains('g-table-row') || node.classList.contains('sBVBv2HePq7qYTpGDmRM'))) {
                    shouldAddButtons = true;
                }
                // 监听路由变化
                if (mutation.type === 'childList') {
                    const urlNow = window.location.href;
                    if (urlNow !== lastWebUrl) {
                        console.log('路由变化，重新初始化');
                        lastWebUrl = urlNow;
                        shouldAddButtons = true;
                    }
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
let tokenCaLast = "";
// 修改addButtonToTerminal函数
function addButtonToTerminal() {
    // 检查是否是terminal页面
    if (window.location.pathname.includes('/terminal')){
        // console.log('terminal页面')
        // 获取URL中的address参数
        const urlParams = new URLSearchParams(window.location.search);
        const tokenCa = urlParams.get('address');
        if (!tokenCa) return;
        // 更新事件监听器
        const kLineButtonClickListener = (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleButtonClick({ ca: tokenCa });
        };
        // console.log('tokenCa:', tokenCa)
        const allContainers = document.querySelectorAll('.custom-tab');
        const targetContainer = allContainers.length > 0 ? allContainers[0] : null;

        if (targetContainer ) {
            const existingButton = targetContainer.querySelector('.kline-custom-button')
            if(!existingButton){
                // 创建包装容器来实现居中
                const buttonWrapper = document.createElement('div');
                buttonWrapper.style.cssText = 'width: 100%; display: flex; justify-content: center; margin: 10px 0;';
                
                // 创建按钮
                const button = document.createElement('button');
                button.className = 'kline-custom-button custom-button ant-btn ant-btn-text z-20';
                button.style.margin = '0';
                button.style.width = '268px';
                button.style.height = '36px';
                button.style.border = '1px solid #0088cc';
                button.style.color = '#0088cc';
                button.style.fontSize = '13px';
                button.innerHTML = `TG购买`;

                button.addEventListener('click', kLineButtonClickListener);
                // 为了防止重复绑定，记录已经绑定的事件监听器
                button.clickListener = kLineButtonClickListener;
                
                buttonWrapper.appendChild(button);
                targetContainer.insertAdjacentElement('beforeend', buttonWrapper);
            }
            else{
                // 如果按钮存在且 tokenCa 不相等
                if (tokenCa !== tokenCaLast) {
                    tokenCaLast = tokenCa
                    
                    // 移除旧的事件监听器（如果需要，确保防止重复监听）
                    existingButton.removeEventListener('click', existingButton.clickListener);
        
                    // 更新事件监听器
                    existingButton.addEventListener('click', kLineButtonClickListener);
                    // 为了防止重复绑定，记录已经绑定的事件监听器
                    existingButton.clickListener = kLineButtonClickListener;
                }
            }
        }
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
        // 更新事件监听器
        const kLineButtonClickListener = (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleButtonClick({ ca: tokenCa });
        };
        const allContainers = document.querySelectorAll('.css-1hdbc19');
        // console.log('allContainers:', allContainers)
        const targetContainer = allContainers.length > 0 ? allContainers[0] : null;

        if (targetContainer) {
            const existingButton = targetContainer.querySelector('.kline-custom-button');
            if(!existingButton){
                // 创建包装容器来实现居中
                const buttonWrapper = document.createElement('div');
                buttonWrapper.style.cssText = 'width: 100%; display: flex; justify-content: center; margin: 10px 0;';
                // 创建按钮
                const button = document.createElement('button');
                button.className = 'kline-custom-button custom-button z-20';
                button.style.margin = '0';
                button.style.width = '268px';
                button.style.height = '36px';
                button.innerHTML = `TG购买`;
                
                button.addEventListener('click', kLineButtonClickListener);
                // 为了防止重复绑定，记录已经绑定的事件监听器
                button.clickListener = kLineButtonClickListener;
                
                buttonWrapper.appendChild(button);
                targetContainer.insertAdjacentElement('beforeend', buttonWrapper);
            }
            else {
                // 如果按钮存在且 tokenCa 不相等
                if (tokenCa !== tokenCaLast) {
                    tokenCaLast = tokenCa
                    console.log('tokenCaLast:', tokenCaLast)
                    
                    // 移除旧的事件监听器（如果需要，确保防止重复监听）
                    existingButton.removeEventListener('click', existingButton.clickListener);
        
                    // 更新事件监听器
                    existingButton.addEventListener('click', kLineButtonClickListener);
                    // 为了防止重复绑定，记录已经绑定的事件监听器
                    existingButton.clickListener = kLineButtonClickListener;
                }
            }
        }
    }
    else if (window.location.pathname.includes('/lp/')) {
        // 获取合约地址从 URL
        console.log('查找 phantom 交易页面...');
        findTokenDivWithDelay();
        const tokenCaElement = document.querySelector('.c-dropdown.js-dropdown.js-wdd.c-wdd.u-mb-s.js-dca__wallets.is-item-loading');
        // 获取 data-address 属性值
        const tokenCa = tokenCaElement ? tokenCaElement.getAttribute('data-token-address') : null;
        console.log('tokenCa:', tokenCa)
        if (!tokenCa) {
            console.log('未找到合约地址');
            return;
        }

        // 更新事件监听器
        const kLineButtonClickListener = (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleButtonClick({ ca: tokenCa });
        };
        const allContainers = document.querySelectorAll('.c-w-form__tab-content.js-show_presets__tab.js-tabs__content.is-selected');
        
        const targetContainer = allContainers.length > 0 ? allContainers[0] : null;
        console.log('targetContainer:', targetContainer)
        if (targetContainer) {
            const existingButton = targetContainer.querySelector('.kline-custom-button');
            if(!existingButton){
                // 创建包装容器来实现居中
                const buttonWrapper = document.createElement('div');
                buttonWrapper.style.cssText = 'width: 100%; display: flex; justify-content: center; margin: 10px 0;';
                // 创建按钮
                const button = document.createElement('button');
                button.className = 'kline-custom-button custom-button z-20';
                button.style.margin = '0';
                button.style.width = '268px';
                button.style.height = '36px';
                button.innerHTML = `TG购买`;
                
                button.addEventListener('click', kLineButtonClickListener);
                // 为了防止重复绑定，记录已经绑定的事件监听器
                button.clickListener = kLineButtonClickListener;
                
                buttonWrapper.appendChild(button);
                targetContainer.insertAdjacentElement('beforebegin', buttonWrapper);
            }
            else {
                // 如果按钮存在且 tokenCa 不相等
                if (tokenCa !== tokenCaLast) {
                    tokenCaLast = tokenCa
                    console.log('tokenCaLast:', tokenCaLast)
                    
                    // 移除旧的事件监听器（如果需要，确保防止重复监听）
                    existingButton.removeEventListener('click', existingButton.clickListener);
        
                    // 更新事件监听器
                    existingButton.addEventListener('click', kLineButtonClickListener);
                    // 为了防止重复绑定，记录已经绑定的事件监听器
                    existingButton.clickListener = kLineButtonClickListener;
                }
            }
        }
    }
    // else{
    //     console.log('非终端页面')
    // }
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
            // console.log('找到g-table-row,初始化')
            initialize();
        } 
        else if(document.querySelector('.some-card')){
            // console.log('找到some-card,初始化')
            initialize();
        }
        else if(document.querySelector('.custom-tab')){
            // console.log('找到custom-tab,初始化')
            initialize();
        }
        else if(document.querySelector('.css-1hdbc19')){
            // console.log('找到css-1i27l4i,初始化')
            initialize();
        }
        else {
            // console.log('未找到任何元素,继续尝试')
            // 如果未找到，继续尝试
            delayedInitialize();
        }
    }, 500); // 每隔500ms检查一次
}

// 更新事件监听
document.addEventListener('DOMContentLoaded', delayedInitialize);
window.addEventListener('load', delayedInitialize);
