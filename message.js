
function switchChat(name, lastMessage) {
  document.getElementById('active-chat-name').innerText = name;
  const box = document.getElementById('chat-messages-box');
  box.innerHTML = `<div class="message received">${lastMessage}</div>`;
}

function sendMessage() {
  const input = document.getElementById('message-input');
  const text = input.value.trim();
  if (text === '') return;

  const box = document.getElementById('chat-messages-box');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', 'sent');
  msgDiv.innerText = text;
  box.appendChild(msgDiv);

  input.value = '';
  box.scrollTop = box.scrollHeight;
}

function checkSend(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}
