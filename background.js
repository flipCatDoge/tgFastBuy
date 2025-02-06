chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_BOT_URL') {
        chrome.storage.local.get(['currentBotUrl'], function(result) {
            sendResponse({botUrl: result.currentBotUrl || 'helenus_trojanbot&start=r-redruncar'});
        });
        return true; // 保持消息通道打开
    }
}); 