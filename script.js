// Функция отправки сообщения
const sendMessage = () => {
    const userInput = document.getElementById('userInput');
    if (!userInput.value.trim()) return;

    // Добавляем сообщение пользователя
    addMessage(userInput.value, 'message-user');

    // Отправляем запрос на сервер и получаем ответ от виртуального сомелье
    fetch('https://api.telegrambotmany.ru/ask', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({question: userInput.value})
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

// Функция добавления нового сообщения в список
const addMessage = (text, className) => {
    const messagesList = document.getElementById('messages');
    const newMessage = document.createElement('li');
    newMessage.className = className;
    newMessage.textContent = text;
    messagesList.appendChild(newMessage);
    scrollToBottom();
};

// Прокрутка окна чата в конец списка сообщений
const scrollToBottom = () => {
    const messagesList = document.getElementById('messages');
    messagesList.scrollTop = messagesList.scrollHeight;
};

window.onload = function() {
    // Программно добавляем первое приветственное сообщение
    addMessage("Привет! Я виртуальный сомелье. Спрашивайте обо всём, что касается вина.", 'message-sommelier');
};
