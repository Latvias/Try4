let messageCount = 0;
const responses = ["Сообщение А", "Сообщение Б", "Сообщение В", "Сообщение Д", "Сообщение Е", "Сообщение Ж", "Сообщение З"];
const audioResponses = [
    { img: 'images/png1.png', text: 'Ответ на аудио 1' },
    { img: 'images/png2.png', text: 'Ответ на аудио 2' },
    { img: 'images/png3.png', text: 'Ответ на аудио 3' },
    { img: 'images/png4.png', text: 'Ответ на аудио 4' }
];

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('mic-btn').addEventListener('mousedown', function() {
    this.recordingStart = Date.now();
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
                typeMessage('bot', responses[messageCount % responses.length]);
                messageCount++;
            }, 1000);
        }
    }
}

function addMessage(sender, text, isImage = false, imageSrc = '') {
    const messages = document.getElementById('messages');
    const message = document.createElement('div');
    message.classList.add('message', sender);
    if (isImage) {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.maxWidth = '100px';
        message.appendChild(img);
    } else {
        message.textContent = text;
    }
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

function stopRecording() {
    const duration = (Date.now() - this.recordingStart) / 1000;
    let response;
    if (duration < 10) {
        response = audioResponses[0];
    } else if (duration < 20) {
        response = audioResponses[1];
    } else if (duration < 30) {
        response = audioResponses[2];
    } else {
        response = audioResponses[3];
    }

    addMessage('user', '', true, response.img);
    setTimeout(() => {
        typeMessage('bot', response.text);
    }, 1000);
}

function attachFile() {
    addMessage('user', '', true, 'images/doc.png');
    setTimeout(() => {
        typeMessage('bot', 'Вот ваш документ');
        addMessage('bot', '', true, 'images/returndoc.png');
    }, 10000);
}

function showError() {
    const errorModal = document.createElement('div');
    errorModal.classList.add('error-modal');
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

function typeMessage(sender, text) {
    const messages = document.getElementById('messages');
    const message = document.createElement('div');
    message.classList.add('message', sender);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;

    let i = 0;
    function type() {
        if (i < text.length) {
            message.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    type();
}

.error-modal img {
    width: 50px;
    height: 50px;
}

