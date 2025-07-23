// Функция отправки сообщения
const sendMessage = () => {
    const userInput = document.getElementById('userInput');
    if (!userInput.value.trim()) return;

    // Добавляем сообщение пользователя в чат
    addMessage(userInput.value, 'message-user');

    // Отправляем POST-запрос на правильный URL сервера
    fetch('https://api.telegrambotmany.ru/api/sommelier', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({question: userInput.value})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Добавляем ответ от сомелье, если есть
        addMessage(data.answer || 'Ответ пуст', 'message-sommelier');
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
    // Приветственное сообщение при загрузке страницы
    addMessage("Привет! Я виртуальный сомелье. Спрашивайте обо всём, что касается вина.", 'message-sommelier');
};
