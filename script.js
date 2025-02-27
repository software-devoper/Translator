let output = document.querySelector('#means');
let tra = document.querySelector('.meaning');
let textArea1 = document.querySelector('.textArea1');
let cut = document.querySelectorAll('#cut');
let copy = document.querySelector('#copy');
let copy1 = document.querySelector('#copy1');
let input = document.querySelector('#text');
let mic = document.querySelector('#mic');
let paste = document.querySelector('.paste');
let speek = document.querySelector('#speek');
let share = document.querySelector('#share');
let menubar = document.querySelector('.menuBar');
let menu = document.querySelector('.icon');
let whatsApp = document.querySelector('#wh');
let Speak = document.querySelector('#speak');
let sms = document.querySelector('#sms');
let like = document.querySelector('#like');
let loading = document.querySelector('#loading');
let change = document.querySelector('#change');
let one = document.querySelector('#one')
let two = document.querySelector('#two');
let reply=document.querySelector('#reply');
let meaning1=document.querySelector('#meaning1');
function beep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
}

like.addEventListener('click', () => {
    beep();
    confirm("Do you like this website?");
})
sms.addEventListener('click', () => {
    beep();
    window.open("sms:+918972594871", "_blank");
})
whatsApp.addEventListener('click', () => {
    beep();
    window.open("https://wa.me/918972594871", "_blank");
})

change.addEventListener('click', () => {
    reply.style.display='none';
    beep();
    if (one.innerText == 'English' && two.innerText == 'Bengali') {
        meaning1.style.display='none';
        tra.style.display='block';
        one.innerText = 'Bengali';
        two.innerText = 'English';
        input.placeholder = 'Enter Text in Bengali';
        output.placeholder = 'Translated text in English';
        console.log(1);
        let translateText1 = async () => {
            output.innerText = 'loading...';
            console.log(input.value);
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=bn&tl=en&dt=t&q=${encodeURIComponent(input.value)}`;
            try {
                const response = await fetch(url);
                const result = await response.json();
                output.innerText = result[0].map(item => item[0]).join("");
            } catch (error) {
                console.error("Error translating text:", error);
                alert("Translation failed. Please try again.");
            }
        }
        tra.addEventListener('click', () => {
            beep();
            translateText1();
        })
    }
    else {
        tra.style.display='none';
        meaning1.style.display='block';
        reply.display='none';
        one.innerText = 'English';
        two.innerText = 'Bengali';
        input.placeholder = 'Enter Text in English';
        output.placeholder = 'Translated text in Bengali';
        let translateText2 = async () => {
            output.innerText = 'loading...';
            let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=bn&dt=t&q=${encodeURIComponent(input.value)}`;
            try {
                let response = await fetch(url);
                let result = await response.json();
                output.innerText = result[0][0][0];
            } catch (error) {
                console.error("Translation failed:", error);
                alert("Translation failed. Please try again.");
            }
        }
        meaning1.addEventListener('click', () => {
            beep();
            translateText2();
        })
        console.log(2);
    }
})
let translateText= async () => {
    output.innerText = 'loading...';
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=bn&dt=t&q=${encodeURIComponent(input.value)}`;
    try {
        let response = await fetch(url);
        let result = await response.json();
        console.log(result);
        output.innerText = result[0][0][0];
    } catch (error) {
        console.error("Translation failed:", error);
        alert("Translation failed. Please try again.");
    }
}
reply.addEventListener('click', () => {
    translateText();
    beep();
})
cut.forEach((val) => {
    val.addEventListener('click', () => {
        beep();
        console.log(val);
        input.value = '';
        textArea1.innerText = '';
    })
});
copy.addEventListener('click', () => {
    beep();
    input.select();
    document.execCommand('copy');
    alert('Text Copied');
});
copy1.addEventListener('click', () => {
    beep();
    textArea1.select();
    document.execCommand('copy');
    alert('Text Copied');
});
mic.addEventListener('click', () => {
    beep();
    if (input.value.trim() === "") {
        alert("Please enter text first!");
        return;
    }
    let speech = new SpeechSynthesisUtterance(input.value);
    speech.lang = "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
})
Speak.addEventListener('click', () => {
    beep();
    if (textArea1.value.trim() === "") {
        alert("Please enter text first!");
        return;
    }
    let speech = new SpeechSynthesisUtterance(textArea1.value);
    speech.lang = "bn-BD";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
})
paste.addEventListener('click', async () => {
    beep();
    try {
        const text = await navigator.clipboard.readText();
        input.value = text;
    } catch (err) {
        alert("Failed to paste! Allow clipboard access.");
        console.error(err);
    }
});

speek.addEventListener('click', () => {
    beep();
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function (event) {
        let text = event.results[0][0].transcript;
        input.value = text;
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
        alert("Speech recognition failed. Try again.");
    };
});

share.addEventListener('click', async () => {
    beep();
    let text = textArea1.value;
    if (!text) {
        alert("Nothing to share!");
        return;
    }
    if (navigator.share) {
        try {
            await navigator.share({
                text: text
            });
            console.log("Shared successfully!");
        } catch (error) {
            console.error("Sharing failed:", error);
        }
    } else {
        alert("Sharing not supported on this device.");
    }
});
menu.addEventListener('click', () => {
    beep();
    menubar.style.display = 'block';
});
menubar.addEventListener('click', () => {
    beep();
    menubar.style.display = 'none';
})
