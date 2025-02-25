
let output = document.querySelector('#means');
let tra = document.querySelector('.meaning');
let textArea1 = document.querySelector('.textArea1');
let cut = document.querySelectorAll('#cut');
let copy = document.querySelector('#copy');
let copy1 = document.querySelector('#copy1');
let input = document.querySelector('#text');
let mic=document.querySelector('#mic');
let paste=document.querySelector('.paste');
let speek=document.querySelector('#speek');
let share=document.querySelector('#share');
let menubar=document.querySelector('.menuBar');
let menu=document.querySelector('.icon');
let whatsApp=document.querySelector('#wh');
let Speak=document.querySelector('#speak');
let sms=document.querySelector('#sms');
let like=document.querySelector('#like');
like.addEventListener('click',()=>{
    confirm("Do you like this website?");
})
sms.addEventListener('click',()=>{
    window.open("sms:+918972594871", "_blank");
})
whatsApp.addEventListener('click',()=>{
    window.open("https://wa.me/918972594871", "_blank");
})
let translateText = async () => {
     let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=bn&dt=t&q=${encodeURIComponent(input.value)}`;
     let response = await fetch(url);
     let result = await response.json();
     console.log(result);
     output.innerText = result[0][0][0];
}
tra.addEventListener('click', () => {
     translateText();
})
cut.forEach((val) => {
     val.addEventListener('click', () => {
          console.log(val);
         input.value='';
         textArea1.innerText='';
     })
});
copy.addEventListener('click',()=>{
     input.select();
     document.execCommand('copy');
     alert('Text Copied');
});
copy1.addEventListener('click',()=>{
     textArea1.select();
     document.execCommand('copy');
     alert('Text Copied');
});
mic.addEventListener('click',()=>{ 
     
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
 Speak.addEventListener('click',()=>{
        if (textArea1.value.trim() === "") {
            alert("Please enter text first!");
            return;
        }
        let speech = new SpeechSynthesisUtterance(textArea1.value);
        speech.lang = "bn-BD"; 
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch=1;
        window.speechSynthesis.speak(speech);
 })
     paste.addEventListener('click', async()=>{
          try {
               const text = await navigator.clipboard.readText();
               input.value=text;
           } catch (err) {
               alert("Failed to paste! Allow clipboard access.");
               console.error(err);
           }
     });

     speek.addEventListener('click',()=>{
          let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
          recognition.lang = "en-US";
          recognition.start();

          recognition.onresult = function(event) {
              let text = event.results[0][0].transcript;
                 input.value = text;
          };

          recognition.onerror = function(event) {
              console.error("Speech recognition error:", event.error);
              alert("Speech recognition failed. Try again.");
          };
     });

     share.addEventListener('click', async()=>{
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
     menu.addEventListener('click',()=>{
        menubar.style.display='block';
     });
     menubar.addEventListener('click',()=>{
        menubar.style.display='none';
     })
