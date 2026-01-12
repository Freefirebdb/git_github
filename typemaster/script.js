let easywords = ["function", "variable", "constant", "callback", "promise", "async", "await", 
"react", "redux", "component", "context", "eventloop", "algorithm", "database", 
"frontend", "backend", "compiler", "debugger", "runtime", "network"]
let hardWords = [
  "quizzical","xenophobia","juxtaposition","ephemeral","onomatopoeia","magnanimous","serendipity","conflagration","idiosyncratic","indistinguishable","perspicacious","transcendental","flabbergasted","superfluous","circumlocution",
"disenfranchisement","incontrovertible","misappropriation","pulchritudinous","antidisestablishmentarianism",
"electroencephalograph","pneumonoultramicroscopicsilicovolcanoconiosis","philosophical","counterintuitive",
"metamorphosis","cryptocurrency","psychophysiology","bureaucratic","sesquipedalian"];
let mediumWords = [
  "cascade","venture","horizon","marvelous","tundra","resolve","vintage","whisper","orbit","harvest","intrigue",
"fragment","neutral","gesture","quarry","reflect","summon","tremble","velvet","wander",
"circuit","momentum","paradox","compass","dynamo","radiant","merchant","torrent","venture"
];

let currentLetter='';
let currentWord='';

let sec=11;
let timer=document.querySelector('.timer');
let body=document.querySelector('body');
let word=document.querySelector(".words");
let screen=document.querySelector(".screen");
let correct=0;

function getRandomWord(){
    let randomIndex=Math.floor(Math.random()*easywords.length);
    return easywords[(randomIndex)];
}

function genrateWord(){
    let word=getRandomWord();
    let breakWord=word.split("").map((letter)=>{
        return `<span>${letter}</span>`
    }).join("");
    return(breakWord);
}

function putSentence() {
  let spans = genrateWord();
  spans += `<span> </span>`;
  word.insertAdjacentHTML('beforeend', `<span class="word">${spans}</span>`);

  if (!currentWord) {
    currentWord = word.children[0];
    currentLetter = currentWord.firstElementChild;
  }
}

for(let i=0;i<30;i++){
    putSentence();
}

body.addEventListener('keydown',(e)=>{
    if(sec===11)start();

    if(e.key===currentLetter.innerText){
        currentLetter.style.color="white";
        currentLetter=currentLetter.nextElementSibling;
        correct++;
        if(currentLetter===null)anotherWord();
    }
    else if(e.key === "Backspace"){
      let prev = currentLetter.previousElementSibling;

      if(prev){
        currentLetter=prev;
        currentLetter.style.color = "black";
      } 
      else {
        let prevWord = currentWord.previousElementSibling;
        currentWord = prevWord;
        currentLetter = currentWord.lastElementChild;
        currentLetter.style.color = "black";
    }
}
    else{
        currentLetter.style.color="red";
        currentLetter=currentLetter.nextElementSibling;
        if(currentLetter===null)anotherWord();
    }
});

function anotherWord(){
    currentWord=currentWord.nextElementSibling;
    currentLetter=currentWord.firstElementChild;
}

function start(){
    sec--;
    let id= setInterval(()=>{
        timer.innerText=sec;
        if(sec===0){
            screen.style.display="flex"
            document.querySelector('h3').innerText=`Your speed is ${correct/20}`
            clearInterval(id);
        }
        sec--;
    },1000);
}



document.querySelector(".resetBtn").addEventListener("click", ()=>{

    sec=11;
    correct=0;
    currentWord="";
    currentLetter="";

    word.innerHTML="";
    screen.style.display="";
    timer.innerText=40;

    for(let i=0;i<30;i++){
        putSentence();
    }
});
