document.addEventListener('DOMContentLoaded', () => {
    const notificationList = document.getElementById('notificationList');
    const markAllReadBtn = document.getElementById('markAllRead');
    const tabButtons = document.querySelectorAll('.tab-btn');

    // =========================================================================
    // 1. Dropdown Actions & Menu Toggle
    // =========================================================================
    
    // Delegate click events on notification list for options dropdown
    notificationList.addEventListener('click', (event) => {
        const target = event.target;

        // Toggle context menu dropdown
        if (target.classList.contains('menu-trigger')) {
            event.stopPropagation();
            closeAllDropdowns();
            const dropdown = target.nextElementSibling;
            if (dropdown) {
                dropdown.classList.toggle('hidden');
            }
            return;
        }

        // Toggle unread/read state for individual notification
        if (target.classList.contains('toggle-read-btn')) {
            const item = target.closest('.notification-item');
            const isUnread = item.classList.contains('unread');

            if (isUnread) {
                item.classList.remove('unread');
                target.textContent = 'Mark as unread';
            } else {
                item.classList.add('unread');
                target.textContent = 'Mark as read';
            }
            closeAllDropdowns();
            return;
        }

        // Remove single notification
        if (target.classList.contains('delete-btn')) {
            const item = target.closest('.notification-item');
            item.remove();
            return;
        }
    });

    // Close all open dropdowns when clicking outside
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });

    function closeAllDropdowns() {
        document.querySelectorAll('.action-dropdown').forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
    }

    // =========================================================================
    // 2. Mark All as Read Functionality
    // =========================================================================
    markAllReadBtn.addEventListener('click', () => {
        const unreadItems = document.querySelectorAll('.notification-item.unread');
        
        unreadItems.forEach(item => {
            item.classList.remove('unread');
            const toggleBtn = item.querySelector('.toggle-read-btn');
            if (toggleBtn) {
                toggleBtn.textContent = 'Mark as unread';
            }
        });
    });

    // =========================================================================
    // 3. Filter Tabs (All vs Unread)
    // =========================================================================
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active style from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            const notifications = document.querySelectorAll('.notification-item');

            notifications.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'flex';
                } else if (filter === 'unread') {
                    if (item.classList.contains('unread')) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
});
