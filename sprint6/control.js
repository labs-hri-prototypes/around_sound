const sound_dir = "src/sound/";
const re_name = /.*(?=.wav)/;
const re_code = /^S_[a-z]*(_high)?/;
// file_list is in "src/sound_list.js"
const name_list = processByRe(file_list, re_name);
const code_list = processByRe(file_list, re_code);
const src_list = file_list.map(item => sound_dir+item);

let context = code_list[0];

$(document).ready(function(){
  makeSelects();
  makeButtons(code_list[0]);
});

function handleOnChange(e){
  context = e.value;
  makeButtons(context);
}

function handleOnClick(e) {
  /*
  var sound_filename = sound_dir + e.value + ".wav";
  var sound = new Audio(sound_filename);
  sound.play();
  */
  let _audios_all = document.querySelectorAll('audio');
  _audios_all.forEach(item => {
    item.pause();
  });
  let _audio = document.querySelector(`#${e.value}`);
  _audio.currentTime = 0;
  _audio.play();
}

function makeButtons(code) {
  // stop audio
  const _audios_prev = document.querySelectorAll('audio');
  console.log(_audios_prev);
  if(_audios_prev !== null) {
    _audios_prev.forEach(item => {
      item.pause();
    });
  }
  // remove everything
  let _main = document.querySelector('#main');
  _main.innerHTML = '';
  const _re_findname = new RegExp(`^${code}(?!_high).*`);
  const _names = name_list.filter(item => _re_findname.test(item));
  const _files = file_list.filter(item => _re_findname.test(item))
    .map(x => sound_dir+x);
  // put buttons
  const _buttons = _names.map(n => {
    let _class = '';
    if(/old$/.test(n)) _class = 'old';
    if(RegExp(`${code}$`).test(n)) _class = 'original';
    return `<button
      class="${_class}"
      value="${n}"
      onclick="handleOnClick(this)"
      >${n}</button>`;
  });
  _buttons.forEach(item => _main.innerHTML += item);
  // put audios
  const _audios = _files.map((f, i) =>
    `<audio id="${_names[i]}" src="${f}"></audio>`
  );
  _audios.forEach(item => _main.innerHTML += item);
}

function makeSelects() {
  code_list.map(item => {
    document.querySelector('#dropdown-code').innerHTML +=
    `<option value="${item}">${item}</option>`;
  });
}

function processByRe(list_src, re) {
  const _re_code_list = [];
  list_src.forEach(item => {
    const _re_coded = item.match(re)[0];
    _re_code_list.push(_re_coded);
  });
  return _re_code_list.filter(onlyUnique);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
