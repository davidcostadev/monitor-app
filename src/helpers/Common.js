
function addZero(i) {
  if (i < 10) {
    i = `0${i}`;
  }

  return i;
}

export function getHora(hora) {
  let d = new Date();

  if (typeof hora !== 'undefined') {
    d = new Date(hora);
  }

  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let s = addZero(d.getSeconds());
  // var day   = addZero(d.getDate());
  // var month = addZero(d.getMonth() + 1);
  // var year  = d.getFullYear();

  return `${h}:${m}:${s}`;
}

export function asd() {

}
