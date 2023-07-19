

// intialize variables
let songIndex = 0;
let audioelement = new Audio('./songs/1.mp3');
let MasterPlay = document.getElementById('masterplay');

let gif = document.getElementById('gif');
let ProgressBar = document.getElementById('sound-bar');
let currenttime = document.getElementById('Completion')
let duration = document.getElementById('Duration');
let MasterSongName = document.getElementById('mastersongName');
let songItems = Array.from(document.getElementsByClassName('SongItem'));

let songs =[
    { songName: "Lo Aayi Barsaat", FileName : "./songs/1.mp3",CoverPath: "./cover/1.jpg"},
    { songName: "Ram Siya Ram", FileName : "./songs/2.mp3",CoverPath: "./cover/2.jpg"},
    { songName: "Maan Meri Jaan", FileName : "./songs/3.mp3",CoverPath: "./cover/3.jpg"},
    { songName: "Dil Galti Kar Baitha Hai ", FileName : "./songs/4.mp3",CoverPath: "./cover/4.jpg"},
    { songName: "Oonchi Oonchi Waadi", FileName : "./songs/5.mp3",CoverPath: "./cover/5.jpg"},
    { songName: "Teri Ada", FileName : "./songs/6.mp3",CoverPath: "./cover/6.jpg"},
    { songName: "O Re Piya ", FileName : "./songs/7.mp3",CoverPath: "./cover/7.jpg"},
    { songName: "Oops", FileName : "./songs/8.mp3",CoverPath: "./cover/8.jpg"},
]

songItems.forEach(function(element ,i) {
   
    element.getElementsByTagName('img')[0].src= songs[i].CoverPath;
    element.getElementsByClassName('SongName')[0].innerHTML= songs[i].songName;

})


// updating song items icon to pause
function UpdateIcon(){
    MakeRestPlay();
document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
}

// listening to the masterplay to play and  pause
function playAndPause(){
 
        if(audioelement.paused || audioelement.currentTime<=0)
        { audioelement.play();
            MasterPlay.classList.remove('fa-circle-play');
            MasterPlay.classList.add('fa-circle-pause');
            gif.style.opacity ='1';
            MasterSongName.innerHTML = songs[songIndex].songName;
    
            if(audioelement.currentTime === audioelement.duration){
                Next();
            }
        
            UpdateIcon();
           
        }
        else{
            audioelement.pause();
            MasterPlay.classList.remove('fa-circle-pause');
            MasterPlay.classList.add('fa-circle-play');
            MakeRestPlay();
            gif.style.opacity ='0';
     
           
        }
    
    
    }


   
MasterPlay.addEventListener('click' ,playAndPause )


// time update event listening to audioelement
audioelement.addEventListener('timeupdate', function(){


    // updating the seekbar
    progress= parseInt((audioelement.currentTime/audioelement.duration)*100);
    ProgressBar.value = progress;
    if(audioelement.currentTime === audioelement.duration){
        Next();
    }
    // updaating the time 
    //calculate the minuute and second of real time 
    var currents = parseInt(audioelement.currentTime % 60);
    var currentm = parseInt((audioelement.currentTime/ 60) % 60);
    // update the current time
    if(currents<10){
        currenttime.innerText = '0'+currentm + ':0' + currents  ;}
    else{
    currenttime.innerText = '0'+currentm + ':' + currents ;}
// updateint the duration
    var ds = parseInt(audioelement.duration % 60);
    var dm = parseInt((audioelement.duration/ 60) % 60);
    if(ds<10){
        duration.innerText = '0'+dm+ ':0' + ds;  }
    else{
        duration.innerText = '0'+dm+ ':' + ds; }

       
    

    
})

// music should change update when seek bar is changed
function seekbarUpdate(){
    audioelement.currentTime = (ProgressBar.value /100 )*audioelement.duration;
    if(audioelement.paused || audioelement.currentTime<=0)
    { audioelement.play();
        MasterSongName.innerHTML = songs[songIndex].songName;
        MasterPlay.classList.remove('fa-circle-play');
        MasterPlay.classList.add('fa-circle-pause');
        gif.style.opacity ='1';

        if(audioelement.currentTime === audioelement.duration){
            Next();
        }
    
       
    }
  
   

}
ProgressBar.addEventListener('change',seekbarUpdate )



// targeting the song list item play icon to work accordingly
function MakeRestPlay(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(function(e){
        e.classList.remove('fa-circle-pause');
        e.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach(function(element){

element.addEventListener('click' ,function(e){
    MakeRestPlay();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    MasterSongName.innerHTML = songs[songIndex].songName;
    audioelement.src = `./songs/${songIndex+1}.mp3`
    audioelement.currentTime =0;
    audioelement.play();
    gif.style.opacity ='1';
    MasterPlay.classList.remove('fa-circle-play');
    MasterPlay.classList.add('fa-circle-pause');
})
})
 // next function 
function Next(){
    if(songIndex>=7)
   {
    songIndex=0;
   }
   else{
    songIndex+=1;
   }
   MasterSongName.innerHTML = songs[songIndex].songName;
   audioelement.src = `./songs/${songIndex+1}.mp3`
   audioelement.currentTime =0;
   audioelement.play();
   gif.style.opacity ='1';
   MasterPlay.classList.remove('fa-circle-play');
   MasterPlay.classList.add('fa-circle-pause');

   
   UpdateIcon();
}
document.getElementById('next').addEventListener('click',Next )

// previous button working code 

document.getElementById('previous').addEventListener('click', function(){
   if(songIndex<=0)
   {
    songIndex=0;
   
   }
   else{
    songIndex-=1;
   }

     MasterSongName.innerHTML = songs[songIndex].songName;
   audioelement.src = `./songs/${songIndex+1}.mp3`
   audioelement.currentTime =0;
   audioelement.play();
   gif.style.opacity ='1';
   MasterPlay.classList.remove('fa-circle-play');
   MasterPlay.classList.add('fa-circle-pause');
   
   
   UpdateIcon();
   
  
})

// keyboard handler 

document.addEventListener('keydown',function(event){
    // if space is pressed then play and pause the music
if(event.code === 'Space'){
    playAndPause();
}
})
document.addEventListener('keydown',function(event){
    // if space is pressed then play and pause the music
if(event.code === 'ArrowRight'){
   ProgressBar.value+=5;
}
})
document.addEventListener('keydown',function(event){
    // if space is pressed then play and pause the music
if(event.code === 'ArrowLeft'){
    ProgressBar.value-=5;
}
})
