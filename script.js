document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".talk");
    const content = document.querySelector(".content");

    function speak(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.rate = 1.2;
        speech.volume = 1;
        speech.pitch = 1.5;
        speech.lang = "en-IN";
        window.speechSynthesis.speak(speech);
    }

    function wishMe() {
        let hour = new Date().getHours();
        if (hour < 12) speak("Good Morning Boss...");
        else if (hour < 17) speak("Good Afternoon Master...");
        else speak("Good Evening Boss...");
    }

    if (!window.speechSynthesis.speaking) {
        speak("Initializing JARVIS...");
        wishMe();
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
        let transcript = event.results[0][0].transcript.toLowerCase();
        content.textContent = transcript;
        processCommand(transcript);
    };

    recognition.onerror = () => {
        speak("Sorry, I didn't catch that. Please try again.");
    };

    btn.addEventListener("click", () => {
        content.textContent = "Listening...";
        recognition.start();
    });

    function processCommand(message) {
        if (message.includes("hello") || message.includes("hey")) {
            speak("Hello Sir, How may I assist you?");
        } else if (message.includes("tell me about yourself")) {
            speak("I am J.A.R.V.I.S., Just A Rather Very Intelligent System, created to assist you in various tasks. How may I help you today?");
        } else if (message.includes("arise")) { 
            speak("Initializing JARVIS visual sequence.");
            playariseEffect();
        } else if (message.includes("open google")) {
            window.open("https://google.com", "_blank");
            speak("Opening Google...");
        } else if (message.includes("open youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Opening YouTube...");
        } else if (message.includes("open facebook")) {
            window.open("https://facebook.com", "_blank");
            speak("Opening Facebook...");
        } else if (message.includes("search for")) {
            let query = message.replace("search for", "").trim().split(" ").join("+");
            window.open(`https://www.google.com/search?q=${query}`, "_blank");
            speak("Here’s what I found on Google.");
        } else if (message.includes("wikipedia")) {
            let topic = message.replace("wikipedia", "").trim().split(" ").join("_");
            window.open(`https://en.wikipedia.org/wiki/${topic}`, "_blank");
            speak(`Searching Wikipedia for ${topic}`);
        } else if (message.includes("time")) {
            let time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            speak(`The current time is ${time}`);
        } else if (message.includes("date")) {
            let date = new Date().toDateString();
            speak(`Today's date is ${date}`);
        } else if (message.includes("open calculator")) {
            window.open("https://www.calculator.net/scientific-calculator.html", "_blank");

            speak("Opening Calculator");
        } else if (message.includes("battery")) {
            navigator.getBattery().then(battery => {
                let level = battery.level * 100;
                speak(`Your battery level is ${level} percent.`);
            });
        } else if (message.includes("weather")) {
            speak("Fetching weather details...");
            window.open("https://www.google.com/search?q=weather+in+Karnataka+Ballari", "_blank");
        } else {
            let searchQuery = message.split(" ").join("+");
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
            speak("I found some results for you on Google.");
        }
    }
});

function playariseEffect() {
    let video = document.getElementById("arise");

    if (!video) {
        console.error("Video element not found!");
        return;
    }

    video.style.display = "block";
    video.muted = false;  
    video.volume = 1.0;  

    video.play().catch(error => {
        console.error("Error playing video:", error);
    });

    video.onended = () => {
        video.style.display = "none";
    };
}

document.querySelector(".toggle-btn").addEventListener("click", function () {
    let list = document.querySelector(".word-list");
    list.style.display = list.style.display === "none" || list.style.display === "" ? "block" : "none";
});
