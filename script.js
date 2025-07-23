const sendMessage = () => {
    const userInput = document.getElementById('userInput');
    if (!userInput.value.trim()) return;

    addMessage(userInput.value, 'message-user');

    fetch('https://api.telegrambotmany.ru/api/sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userInput.value })
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.answer, 'message-sommelier');
    })
    .catch(err => {
        addMessage('Ошибка при подключении к серверу.', 'message-sommelier');
        console.error(err);
    });

    userInput.value = '';
};

const addMessage = (text, className) => {
    const messagesList = document.getElementById('messages');
    const newMessage = document.createElement('li');
    newMessage.className = className;
    newMessage.textContent = text;
    messagesList.appendChild(newMessage);
    scrollToBottom();
};

const scrollToBottom = () => {
    const messagesList = document.getElementById('messages');
    messagesList.scrollTop = messagesList.scrollHeight;
};

window.onload = function() {
    addMessage("Привет! Я виртуальный сомелье. Спрашивайте обо всём, что касается вина.", 'message-sommelier');
}
