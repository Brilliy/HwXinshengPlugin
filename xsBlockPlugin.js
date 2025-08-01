// ==UserScript==
// @name         华为心声社区内容屏蔽（含作者屏蔽）
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽华为心声社区中包含指定关键字或特定作者的内容
// @match        https://xinsheng.huawei.com/next/*
// ==/UserScript==

(function() {
    'use strict';

    // -------------------------- 配置区 --------------------------
    // 需要屏蔽的关键字列表
    const blockKeywords = ['华为人'];
    // 需要屏蔽的作者名称列表
    const blockAuthors = ['菊厂学生']; // 恶臭id
    // ------------------------------------------------------------

    function blockElements() {
        const elements = document.querySelectorAll('.fourm-list-item');

        elements.forEach(element => {
            const textContent = element.textContent.toLowerCase();
            const hasBlockKeyword = blockKeywords.some(keyword =>
                textContent.includes(keyword.toLowerCase())
            );

            const authorElement = element.querySelector('.maskName');
            const authorName = authorElement ? authorElement.textContent.trim() : '';
            const isBlockAuthor = blockAuthors.includes(authorName);

            if (hasBlockKeyword || isBlockAuthor) {
                element.style.display = 'none';
                if (hasBlockKeyword) {
                    console.log(`已屏蔽含关键字的内容：${textContent.substring(0, 30)}...`);
                }
                if (isBlockAuthor) {
                    console.log(`已屏蔽作者「${authorName}」的内容`);
                }
            }
        });
    }

    blockElements();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                blockElements();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('屏蔽脚本已启动：');
    console.log('屏蔽关键字：', blockKeywords);
    console.log('屏蔽作者：', blockAuthors);
})();
