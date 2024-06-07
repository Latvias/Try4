let messageCount = 0;
const responses = ["Сообщение А", "Сообщение Б", "Сообщение В", "Сообщение Д", "Сообщение Е", "Сообщение Ж", "Сообщение З"];

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('mic-btn').addEventListener('mousedown', function() {
    startRecording();
});

document.getElementById('mic-btn').addEventListener('mouseup', function() {
    stopRecording();
});

document.getElementById('attach-btn').addEventListener('click', function() {
    attachFile();
});

function sendMessage() {
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    if (text !== '') {
        addMessage('user', text);
        input.value = '';

        if (text === 'ошибка1') {
            setTimeout(() => {
                addMessage('bot', 'Td.ЛРCJыбSLМ/Vд:p]cВ');
            }, 1000);
        } else if (text === 'ошибка2') {
            showError();
        } else {
            setTimeout(() => {
                addMessage('bot', responses[messageCount % responses.length]);
                messageCount++;
            }, 1000);
        }
    }
}

function addMessage(sender, text) {
    const messages = document.getElementById('messages');
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

function startRecording() {
    this.recordingStart = Date.now();
}

function stopRecording() {
    const duration = (Date.now() - this.recordingStart) / 1000;
    let response;
    if (duration < 20) {
        response = { img: 'images/png1.png', text: 'Ответ на аудио 1' };
    } else if (duration < 40) {
        response = { img: 'images/png2.png', text: 'Ответ на аудио 2' };
    } else if (duration < 60) {
        response = { img: 'images/png3.png', text: 'Ответ на аудио 3' };
    } else {
        response = { img: 'images/png4.png', text: 'Ответ на аудио 4' };
    }
    setTimeout(() => {
        addMessage('bot', response.text);
        const img = document.createElement('img');
        img.src = response.img;
        img.classList.add('message', 'bot');
        document.getElementById('messages').appendChild(img);
        img.onload = () => document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
    }, 1000);
}

function attachFile() {
    addMessage('user', '');
    const img = document.createElement('img');
    img.src = 'images/doc.png';
    img.classList.add('message', 'user');
    document.getElementById('messages').appendChild(img);
    img.onload = () => document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
    setTimeout(() => {
        addMessage('bot', 'Вот ваш документ');
        const returnImg = document.createElement('img');
        returnImg.src = 'images/returndoc.png';
        returnImg.classList.add('message', 'bot');
        document.getElementById('messages').appendChild(returnImg);
        returnImg.onload = () => document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
    }, 10000);
}

function showError() {
    const errorModal = document.createElement('div');
    errorModal.style.position = 'fixed';
    errorModal.style.top = '50%';
    errorModal.style.left = '50%';
    errorModal.style.transform = 'translate(-50%, -50%)';
    errorModal.style.padding = '20px';
    errorModal.style.backgroundColor = '#23272a';
    errorModal.style.borderRadius = '10px';
    errorModal.style.textAlign = 'center';
    errorModal.style.color = '#fff';
    errorModal.innerHTML = `<p>шо#qv|~VYpcф^,фмDЯд}</p><img src="images/load.gif" alt="Loading...">`;
    document.body.appendChild(errorModal);
    setTimeout(() => {
        document.body.removeChild(errorModal);
    }, 3000);
}
