document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");

    sendButton.addEventListener("click", sendMessage);

    function sendMessage() {
        const userMessage = userInput.value.toLowerCase().trim();
        if (userMessage === "") {
            console.log("No se ingresó ningún mensaje.");
            return;
        }

        addMessageToChatLog(userMessage, "user-message");

        const botResponse = getClosestResponse(userMessage);
        if (botResponse) {
            setTimeout(() => {
                addMessageToChatLog(botResponse, "bot-message");
            }, 500);
        } else {
            setTimeout(() => {
                addMessageToChatLog(
                    "Lo siento, no entendí tu pregunta. Por favor, ingresa una pregunta válida. Ejemplo: '¿Qué son las empanadas de pino y cómo se preparan?'",
                    "bot-message"
                );
            }, 500);
        }

        userInput.value = "";
    }

    function getClosestResponse(message) {
        let bestMatch = "";
        let bestScore = 0.5; // Umbral de similitud, ajustable

        for (const key in responses) {
            const score = similarity(message, key);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = key;
            }
        }

        return bestMatch ? responses[bestMatch] : null;
    }

    function addMessageToChatLog(message, className) {
        const chatLog = document.getElementById("chat-log");
        const messageElement = document.createElement("div");
        messageElement.className = `message ${className}`;
        messageElement.textContent = message;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    // Aquí va la función de similitud y el diccionario de respuestas (sin cambios)
    // Función de similitud y diccionario responses ya proporcionados anteriormente
});

