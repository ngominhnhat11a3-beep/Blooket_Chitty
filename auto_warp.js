
(() => {
    // Trạng thái bật/tắt mặc định khi mới chạy script
    window.swapCheatActive = true;

    const cheat = async () => {
        let stateNode;
        try {
            // Sử dụng chính hàm quét React gốc của bạn
            stateNode = Object.values((function react(r = document.querySelector("body>div")) { 
                return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
            })())[1].children[0]._owner.stateNode;
        } catch(e) {
            alert("Không tìm thấy dữ liệu trận đấu! Hãy chắc chắn bạn đã vào trong phòng chơi Gold Quest.");
            return;
        }

        if (!stateNode) return;

        // Tự động bù 100 vàng nếu vàng bằng 0
        if (stateNode.state.gold === 0) {
            stateNode.setState({ gold: 100, gold2: 100 });
        }

        // Hook hàm mở rương gốc
        stateNode._choosePrize ||= stateNode.choosePrize;
        stateNode.choosePrize = function (i) {
            // NẾU BẬT: Ép phần thưởng rương vừa chọn thành Swap!
            if (window.swapCheatActive) {
                stateNode.state.choices[i] = { type: "swap", val: 0, text: "Swap!", blook: "Unicorn" };
            }
            // Chạy tiếp hàm xử lý mở rương gốc của Blooket
            stateNode._choosePrize(i);
        };

        // ==========================================
        // TẠO NÚT BẤM BẬT/TẮT TRÊN MÀN HÌNH (ĐÃ FIX)
        // ==========================================
        if (!document.getElementById('swap-toggle-btn')) {
            let btn = document.createElement('button');
            btn.id = 'swap-toggle-btn';
            
            // CSS chuẩn giao diện Blooket (Font chữ Nunito, viền đen dày, đổ bóng cứng)
            btn.style = `
                position: fixed;
                bottom: 10px;
                right: 10px;
                padding: 5px 5px;
                font-family: "Nunito", sans-serif;
                font-size: 5px;
                font-weight: bold;
                color: #ffffff;
                background-color: #3b82f6;
                border: 4px solid #0f0f0f;
                border-radius: 12px;
                cursor: pointer;
                z-index: 999999;
                box-shadow: 4px 4px 0px #000000;
                user-select: none;
                -webkit-user-select: none;
                transition: transform 0.05s, background-color 0.2s;
            `;
            btn.innerText = "🟢 ON";

            // Hiệu ứng lún nút khi nhấn chuột
            btn.onmousedown = () => { btn.style.transform = "translate(2px, 2px)"; btn.style.boxShadow = "2px 2px 0px #000"; };
            btn.onmouseup = () => { btn.style.transform = "translate(0px, 0px)"; btn.style.boxShadow = "4px 4px 0px #000"; };

            // Logic xử lý đổi trạng thái khi click
            btn.onclick = () => {
                window.swapCheatActive = !window.swapCheatActive;
                if (window.swapCheatActive) {
                    btn.innerText = "🟢 ON";
                    btn.style.backgroundColor = "#3b82f6"; // Màu xanh lam chủ đạo
                } else {
                    btn.innerText = "🔴 OFF";
                    btn.style.backgroundColor = "#ef4444"; // Màu đỏ báo tắt
                }
            };

            document.body.appendChild(btn);
        }
    };

    cheat();
})();