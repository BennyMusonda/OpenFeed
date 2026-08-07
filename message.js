// 1. MOCK DATA: Simulating a database of friends and existing chat histories
        const usersData = [
            {
                id: 1,
                name: "Alice Johnson",
                initials: "AJ",
                messages: [
                    { text: "Hey! Are we still meeting up today?", type: "received" },
                    { text: "Yes! See you at 5 PM.", type: "sent" }
                ]
            },
            {
                id: 2,
                name: "Bob Smith",
                initials: "BS",
                messages: [
                    { text: "Did you finish working on that social site design?", type: "received" }
                ]
            },
            {
                id: 3,
                name: "Charlie Brown",
                initials: "CB",
                messages: [] // Fresh clean chat history
            }
        ];

        // 2. Track which user is currently selected (starts as null/none)
        let activeUserId = null;

        // 3. DOM ELEMENTS: Grab the HTML parts we need to interact with
        const userListContainer = document.getElementById('userList');
        const chatPlaceholder = document.getElementById('chatPlaceholder');
        const chatActiveBox = document.getElementById('chatActiveBox');
        const activeAvatar = document.getElementById('activeAvatar');
        const activeName = document.getElementById('activeName');
        const chatMessagesContainer = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');

        // 4. FUNCTION: Render/Build the user list on the left sidebar
        function renderUserList() {
            // Clear out any old content inside the sidebar
            userListContainer.innerHTML = '';

            // Loop through each user inside our array
            usersData.forEach(user => {
                // Create a clickable div block for the user
                const userItem = document.createElement('div');
                userItem.className = 'user-item';
                
                // If this user is the active one, add the 'active' highlight CSS style
                if (user.id === activeUserId) {
                    userItem.classList.add('active');
                }

                // Construct the interior HTML layout for a single user row
                userItem.innerHTML = `
                    <div class="user-avatar">${user.initials}</div>
                    <div class="user-info">
                        <div class="user-name">${user.name}</div>
                    </div>
                `;
