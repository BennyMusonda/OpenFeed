
document.addEventListener('DOMContentLoaded', () => {
  const notificationList = document.getElementById('notificationList');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const markAllReadBtn = document.getElementById('markAllRead');

  // Toggle Context Dropdown Menu
  notificationList.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-trigger')) {
      e.stopPropagation();
      const dropdown = e.target.nextElementSibling;
      
      // Close all other open dropdowns first
      document.querySelectorAll('.action-dropdown').forEach(d => {
        if (d !== dropdown) d.classList.add('hidden');
      });
      
      dropdown.classList.toggle('hidden');
    }
  });

  // Close dropdowns when clicking anywhere outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.action-dropdown').forEach(d => d.classList.add('hidden'));
  });

  // Individual item action handler (Read/Unread Toggle and Delete)
  notificationList.addEventListener('click', (e) => {
    const item = e.target.closest('.notification-item');
    if (!item) return;

    // Toggle Read Status from dropdown
    if (e.target.classList.contains('toggle-read-btn')) {
      e.stopPropagation();
      const isUnread = item.classList.contains('unread');
      if (isUnread) {
        item.classList.remove('unread');
        e.target.textContent = 'Mark as unread';
      } else {
        item.classList.add('unread');
        e.target.textContent = 'Mark as read';
      }
      e.target.parentElement.classList.add('hidden');
    }

    // Delete Notification item
    if (e.target.classList.contains('delete-btn')) {
      e.stopPropagation();
      item.remove();
    }
  });

  // Mark All As Read
  markAllReadBtn.addEventListener('click', () => {
    const unreadItems = notificationList.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
      item.classList.remove('unread');
      const toggleBtn = item.querySelector('.toggle-read-btn');
      if (toggleBtn) toggleBtn.textContent = 'Mark as unread';
    });
  });

  // Filter Tabs Logic (All vs Unread)
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      const items = notificationList.querySelectorAll('.notification-item');

      items.forEach(item => {
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
