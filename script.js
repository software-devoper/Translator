
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