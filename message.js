 // Mock Database of users and message histories
        const chatData = {
            1: {
                username: "alex_travels",
                color: "#ff85a2",
                messages: [
                    { text: "Hey! Did you check out those photos?", type: "incoming" },
                    { text: "Yeah, they look absolutely incredible!", type: "outgoing" },
                    { text: "Thanks! I'll post them later tonight.", type: "incoming" }
                ]
            },
            2: {
                username: "design_studio",
                color: "#a063e4",
                messages: [
                    { text: "Is the design concept ready?", type: "incoming" },
                    { text: "Almost, just finishing the UI revisions.", type: "outgoing" }
                ]
            },
            3: {
                username: "chef_marcel",
                color: "#3ddc84",
                messages: [
                    { text: "Don't forget the dinner reservations at 8.", type: "incoming" }
                ]
            }
        };

        const chatListContainer = document.getElementById("chatList");
        const chatWindowContainer = document.getElementById("chatWindow");
        let activeChatId = null;

        // Initialize user sidebar list
        function renderSidebar() {
            chatListContainer.innerHTML = "";
            Object.keys(chatData).forEach(id => {
                const chat = chatData[id];
                const lastMsg = chat.messages[chat.messages.length - 1]?.text || "No messages yet";
                
                const userItem = document.createElement("div");
                userItem.className = `chat-user-item ${activeChatId == id ? 'active' : ''}`;
                userItem.onclick = () => selectChat(id);

                userItem.innerHTML = `
                    <div class="avatar" style="background-color: ${chat.color}">
                        ${chat.username.charAt(0)}
                    </div>
                    <div class="user-info">
                        <div class="username">${chat.username}</div>
                        <div class="last-message">${lastMsg}</div>
                    </div>
                `;
                chatListContainer.appendChild(userItem);
            });
        }

        // Open specific user chat window 
        function selectChat(id) {
            activeChatId = id;
            renderSidebar(); // refresh selection styling
            
            const chat = chatData[id];
            
            chatWindowContainer.innerHTML = `
                <div class="chat-header">
                    <div class="avatar" style="background-color: ${chat.color}">${chat.username.charAt(0)}</div>
                    <div class="username">${chat.username}</div>
                </div>
                <div class="messages-area" id="messagesArea"></div>
                <div class="input-area">
                    <div class="input-box-wrapper">
                        <input type="text" id="messageInput" placeholder="Message..." onkeydown="handleKeyPress(event)">
                        <button class="send-btn" onclick="sendMessage()">Send</button>
                    </div>
                </div>
            `;
            
            renderMessages();
        }

        // Populate active message bubbles
        function renderMessages() {
            const messagesArea = document.getElementById("messagesArea");
            if (!messagesArea || !activeChatId) return;

            messagesArea.innerHTML = "";
            chatData[activeChatId].messages.forEach(msg => {
                const msgBubble = document.createElement("div");
                msgBubble.className = `message ${msg.type}`;
                msgBubble.innerText = msg.text;
                messagesArea.appendChild(msgBubble);
            });
