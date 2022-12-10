'use strict'
window.addEventListener("load", function (event) {
    let rule = [],
        srcText = document.getElementById('src-text'),
        transText = document.getElementById('trans-text'),
        translateBtn = document.getElementById('translate-btn'),
        clearBtn = document.getElementById('clear-btn'),
        copyBtn = document.getElementById('copy-btn');
    init();

    async function getData() {
        const response = await fetch('rule.json');
        if (response && response.status === 200) {
            const result = await response.json();
            if (result && !result.error) {
                rule = result;
                return;
            }
        } else {
            console.log('Не удалось получить данные!')
        }
    }

    function init() {
        getData();
        translateBtn.onclick = (e) => {
            let arr = Array.from(srcText.value).map(letter => {
                let change = rule.find(item => {
                    return item.letter === letter;
                })
                if (change && change.hasOwnProperty('value')) {
                    return letter = change.value;

                } else {
                    return letter;
                }
            })
            transText.value = arr.join('');
        };
        clearBtn.onclick = (e) => {
            srcText.value = "";
            transText.value = "";
        }
        copyBtn.onclick = (e) => {
            transText.select();
            document.execCommand("copy");

        }
    }

})