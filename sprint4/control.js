var situation;
var sound_dir = "src/sound/";
var video_filename;
var context = "hello";
var skip_delay = false;
var delay_data = {
  "hello": 995,
  "thankyou": 3275,
  "cleaning": 2475,
  "start": 2995,
  "joy": 2475,
  "nav": 875,
  "yield": 2675,
  "noti": 1875,
  "noti_repeat": 1875,
  "open": 2475,
  "open_staff": 875,
  "close": 1875,
  "close_staff": 1875,
  "success": 2475,
  "error": 2475
};

var delay_sound = delay_data['hello'];
var seek_video = 0;

$(document).ready(function(){

});

function handleCheckbox(e) {
  var _value = $.parseJSON(e.value);
  if(_value) {
    _value = false;
  }
  else {
    _value = true;
  }
  skip_delay = _value;
  e.value = _value;
  checkSkip();
}

function handleOnChange(e){
  //situation = e.value;
  $.each($('.btnpanel'), function(index, value){
    if(value.id == "panel_" + e.value) {
      $(value).css('visibility', 'visible');
    }
    else {
      $(value).css('visibility', 'hidden');
    }
  });
  context = e.value;
  video_filename = "src/video/" + e.value +".mp4";
  checkSkip();
  $('#main_player').attr('src', video_filename);
  $('#main_player').trigger('load');
  $('#main_player').attr('currentTime', seek_video);
}

function handleOnClick(e) {
  var sound_filename = sound_dir + e.value + ".wav";
  var sound = new Audio(sound_filename);
  //var _video_name = /^.*_\d/.exec(e.value)[0].replace(/_\d/, '');
  //$('#main_player').trigger('load').attr('currentTime', seek_video).trigger('play');
  //$('#main_player').trigger('load');
  var _video = document.querySelector('#main_player');
  _video.currentTime = seek_video;
  _video.play();
  setTimeout(function(){
    sound.play();
  }, delay_sound);
}

function checkSkip() {
  if(skip_delay) {
    seek_video = delay_data[context]/1000;
    delay_sound = 0;
  }
  else {
    seek_video = 0;
    delay_sound = delay_data[context];
  }
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
