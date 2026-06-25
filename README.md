// ==========================================
// 1. TẠO GIAO DIỆN FOOTER (CHẠY 1 LẦN)
// ==========================================
function footer() {
    if (document.getElementById('gliz-footer')) return; 

    let element = document.createElement('div');
    element.id = 'gliz-footer';
    document.body.appendChild(element);
    
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = ((e = window.event) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = (() => {
            document.onmouseup = null;
            document.onmousemove = null;
        });
        document.onmousemove = ((e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            let top = (element.offsetTop - pos2) > 0 ? (element.offsetTop - pos2) : 0;
            let left = (element.offsetLeft - pos1) > 0 ? (element.offsetLeft - pos1) : 0;
            element.style.top = top + "px";
            element.style.left = left + "px";
        });
    });
};

footer();

// ==========================================
// 2. TRÌNH QUẢN LÝ TÍNH NĂNG HACK (GOLD QUEST)
// ==========================================
(() => {
    let n = document.createElement('iframe');
    document.body.append(n);
    window.alert = n.contentWindow.alert.bind(window);
    window.prompt = n.contentWindow.prompt.bind(window);
    window.confirm = n.contentWindow.confirm.bind(window);
    n.remove();

    function reactHandler() {
        try {
            return Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner;
        } catch (e) {
            return null;
        }
    };

    if (window.location.pathname != '/play/gold') {
        alert('Not in Gold Quest!');
        return;
    }

    // Tắt Swap Cheat mặc định
    window.swapCheatActive = false;
    let stateNode;
    try {
        stateNode = Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
        })())[1].children[0]._owner.stateNode;
    } catch(e) {}

    if (stateNode) {
        if (stateNode.state.gold === 0) {
            stateNode.setState({ gold: 100, gold2: 100 });
        }
        stateNode._choosePrize ||= stateNode.choosePrize;
        stateNode.choosePrize = function (i) {
            if (window.swapCheatActive) {
                stateNode.state.choices[i] = { type: "swap", val: 0, text: "Swap!", blook: "Unicorn" };
            }
            stateNode._choosePrize(i);
        };

        if (!document.getElementById('swap-toggle-btn')) {
            let btn = document.createElement('button');
            btn.id = 'swap-toggle-btn';
            btn.style = `
                position: fixed; bottom: 20px; right: 20px; width: 18px; height: 18px;
                background-color: #ef4444; border: 2px solid #0f0f0f;
                border-radius: 50%; cursor: pointer; z-index: 999999;
                box-shadow: 2px 2px 0px #000000; user-select: none;
                transition: transform 0.05s, background-color 0.2s;
                color: #fff; font-size: 9px; font-weight: 900; font-family: 'Titan One', sans-serif, Arial; text-shadow: 1px 1px 0px #000;
                display: flex; align-items: center; justify-content: center; padding: 0;
            `;
            btn.innerText = "S";
            btn.title = "Toggle Swap Cheat";
            btn.onmousedown = () => { btn.style.transform = "translate(2px, 2px)"; btn.style.boxShadow = "0px 0px 0px #000"; };
            btn.onmouseup = () => { btn.style.transform = "translate(0px, 0px)"; btn.style.boxShadow = "2px 2px 0px #000"; };
            btn.onclick = () => {
                window.swapCheatActive = !window.swapCheatActive;
                btn.style.backgroundColor = window.swapCheatActive ? "#22c55e" : "#ef4444";
            };
            document.body.appendChild(btn);
        }
    }

    // Bật Highlight Cheat mặc định là Tắt
    window.highlightCheatActive = false;

    if (!document.getElementById('highlight-toggle-btn')) {
        let btn2 = document.createElement('button');
        btn2.id = 'highlight-toggle-btn';
        btn2.style = `
            position: fixed; bottom: 20px; right: 45px; width: 18px; height: 18px;
            background-color: #ef4444; border: 2px solid #0f0f0f;
            border-radius: 50%; cursor: pointer; z-index: 999999;
            box-shadow: 2px 2px 0px #000000; user-select: none;
            transition: transform 0.05s, background-color 0.2s;
            color: #fff; font-size: 9px; font-weight: 900; font-family: 'Titan One', sans-serif, Arial; text-shadow: 1px 1px 0px #000;
            display: flex; align-items: center; justify-content: center; padding: 0;
        `;
        btn2.innerText = "H";
        btn2.title = "Toggle Highlight Answer";
        btn2.onmousedown = () => { btn2.style.transform = "translate(2px, 2px)"; btn2.style.boxShadow = "0px 0px 0px #000"; };
        btn2.onmouseup = () => { btn2.style.transform = "translate(0px, 0px)"; btn2.style.boxShadow = "2px 2px 0px #000"; };
        btn2.onclick = () => {
            window.highlightCheatActive = !window.highlightCheatActive;
            btn2.style.backgroundColor = window.highlightCheatActive ? "#22c55e" : "#ef4444";
        };
        document.body.appendChild(btn2);
    }

    window.espCheatActive = false;

    if (!document.getElementById('esp-toggle-btn')) {
        let btn3 = document.createElement('button');
        btn3.id = 'esp-toggle-btn';
        btn3.style = `
            position: fixed; bottom: 20px; right: 70px; width: 18px; height: 18px;
            background-color: #ef4444; border: 2px solid #0f0f0f;
            border-radius: 50%; cursor: pointer; z-index: 999999;
            box-shadow: 2px 2px 0px #000000; user-select: none;
            transition: transform 0.05s, background-color 0.2s;
            color: #fff; font-size: 9px; font-weight: 900; font-family: 'Titan One', sans-serif, Arial; text-shadow: 1px 1px 0px #000;
            display: flex; align-items: center; justify-content: center; padding: 0;
        `;
        btn3.innerText = "E";
        btn3.title = "Toggle Chest ESP";
        btn3.onmousedown = () => { btn3.style.transform = "translate(2px, 2px)"; btn3.style.boxShadow = "0px 0px 0px #000"; };
        btn3.onmouseup = () => { btn3.style.transform = "translate(0px, 0px)"; btn3.style.boxShadow = "2px 2px 0px #000"; };
        btn3.onclick = () => {
            window.espCheatActive = !window.espCheatActive;
            btn3.style.backgroundColor = window.espCheatActive ? "#22c55e" : "#ef4444";
        };
        document.body.appendChild(btn3);
    }

    if (!document.getElementById('add-gold-btn')) {
        let btn4 = document.createElement('button');
        btn4.id = 'add-gold-btn';
        btn4.style = `
            position: fixed; bottom: 20px; right: 95px; width: 18px; height: 18px;
            background-color: #eab308; border: 2px solid #0f0f0f;
            border-radius: 50%; cursor: pointer; z-index: 999999;
            box-shadow: 2px 2px 0px #000000; user-select: none;
            transition: transform 0.05s;
            color: #fff; font-size: 9px; font-weight: 900; font-family: 'Titan One', sans-serif, Arial; text-shadow: 1px 1px 0px #000;
            display: flex; align-items: center; justify-content: center; padding: 0;
        `;
        btn4.innerText = "G";
        btn4.title = "Add GOLD";
        btn4.onmousedown = () => { btn4.style.transform = "translate(2px, 2px)"; btn4.style.boxShadow = "0px 0px 0px #000"; };
        btn4.onmouseup = () => { btn4.style.transform = "translate(0px, 0px)"; btn4.style.boxShadow = "2px 2px 0px #000"; };
        btn4.onclick = () => {
            let handler = reactHandler();
            if (!handler) return alert('Game data not found!');
            let gold = Number(parseFloat(prompt('Amount of gold:')));
            if (!isNaN(gold)) {
                handler.stateNode.setState({ gold2: gold, gold });
                alert('Done!');
            } else {
                alert('Invalid amount!');
            }
        };
        document.body.appendChild(btn4);
    }

    setInterval(() => {
        document.querySelectorAll('.gliz-answer-dot').forEach(el => el.remove());
        if (!window.highlightCheatActive) return;

        let stateNode;
        try {
            stateNode = Object.values((function react(r = document.querySelector("body>div")) { 
                return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
            })())[1].children[0]._owner.stateNode;
        } catch(e) {}
        
        if (stateNode && stateNode.state.question) {
            let correctAnswers = stateNode.state.question.correctAnswers;
            if (!correctAnswers) return;

            document.querySelectorAll('div').forEach(div => {
                if (correctAnswers.includes(div.innerText) && div.children.length === 0) {
                    div.style.position = 'relative';
                    let dot = document.createElement('div');
                    dot.className = 'gliz-answer-dot';
                    dot.style = "position: absolute; top: 4px; left: 4px; width: 10px; height: 10px; background-color: #2ecc71; border-radius: 50%; border: 1.5px solid #000; z-index: 99; pointer-events: none;";
                    div.appendChild(dot);
                }
            });
        }
    }, 200);

    let overlay = document.getElementById('gliz-esp-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'gliz-esp-overlay';
        overlay.style = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 99999; overflow: hidden;";
        document.body.appendChild(overlay);
    }

    setInterval(() => {
        if (window.location.pathname != '/play/gold') {
            if (overlay) overlay.remove();
            return;
        }

        let handler = reactHandler();
        if (!handler) return; 

        let data = handler.stateNode.state;

        if (window.espCheatActive && data?.stage == 'prize') {
            let boxes = data.choices;
            let chest1Img = document.querySelector("img[alt='Chest 1']");
            if (!chest1Img) return; 

            boxes.forEach((box, i) => {
                let imgEl = document.querySelector(`img[alt='Chest ${i + 1}']`);
                let chestEl = imgEl ? imgEl.parentElement : document.querySelector(`div[class*='_choice${i + 1}_']`);
                
                if (!chestEl) return;

                let rect = chestEl.getBoundingClientRect();
                let textId = `gliz-text-${i + 1}`;
                let textElement = document.getElementById(textId);
                
                if (!textElement) {
                    textElement = document.createElement('p');
                    textElement.id = textId;
                    textElement.className = "chest-esp";
                    textElement.style = `
                        position: absolute;
                        transform: translate(-50%, -50%);
                        pointer-events: none;
                        color: black;
                        background-color: rgba(255, 255, 255, 0.8);
                        padding: 2px 4px;
                        border-radius: 4px;
                        font-size: 14px;
                    `;
                    overlay.appendChild(textElement);
                }
                
                textElement.style.top = (rect.top + window.scrollY + rect.height / 2) + "px";
                textElement.style.left = (rect.left + window.scrollX + rect.width / 2) + "px";
                textElement.innerText = box.text;
                textElement.style.display = "block";
            });
        } else {
            for (let i = 1; i <= 3; i++) {
                let textElement = document.getElementById(`gliz-text-${i}`);
                if (textElement) textElement.style.display = "none";
            }
        }
    }, 100);
})();