var situation;
var sound_dir = "src/protosound/s_";
var video_filename;

$(document).ready(function(){

});

function handleOnChange(e){
  situation = e.value;
  if (situation == "original"){
    sound_dir = "src/protosound/s_";
  }
  else {
    sound_dir = "src/protosound/" + situation + "_";
  }
}

function handleOnClick(e) {
  var sound_filename = sound_dir + e.value + ".wav";
  var sound = new Audio(sound_filename);
  video_filename = "src/video/video_" + e.value +".mp4";
  $('#main_player').attr('src', video_filename);
  $('#main_player').trigger('load');
  $('#main_player').trigger('currentTime(0)');
  $('#main_player').trigger('play');
  sound.play();
}

function loadSound() {
  bufferLoader = new BufferLoader(context, xmlSrc, finishedLoading);
  bufferLoader.load();
}

function finishedLoading(bufferList) {
  for(i = 0; i < soundContainer.length; i++){
    soundContainer[i] = context.createBufferSource();
    soundContainer[i].buffer = bufferList[i];
    soundContainer[i].connect(context.destination);
  }
  //soundContainer[0].start(0);    
}

function playSound(soundNum){
  soundContainer[soundNum].start(0);
  loadSound();
}