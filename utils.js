import {notify} from 'react-notify-toast';

/*
* callback a ejecutar si la respuesta del servicio en su status es OK
* en caso contrario, noticia al usuario con advertencia o error
*/
export function evalResponse(response, callback, msg){
  switch(response.meta.status){
    case 'OK':
      if (callback){
        callback();
      }
      if (msg !== null && msg !== '' && msg !== undefined){
        notify.show(msg, 'success', 5000);
      }
      break;
    case 'WARNING':
      notify.show(response.meta.message, 'warning', 6000);
      break;
    case 'ERROR':
      notify.show(response.meta.message, 'error', 8000);
      break;
    case 'INVALID_SESSION':
      notify.show('Token inválido, inicie sesión por favor.','warning', 6000);
      let ruta = window.location.href.split('#');
      window.location.href = ruta[0] + '#/login';
      break;
  }
}

/*
* devuelve el valor en utc de la fecha local en long de su representacion en cadena
* ejemplo: de "12/12/2017" con GMT -7, regresa su valor en utc equivalente
*/
export function toUtcDate(dateString){
  if (dateString == '') {
    return null;
  }
  let date = new Date(dateString);
  return date.getTime() + (date.getTimezoneOffset() * 60000);
}

/*
* develve true si value solo contiene letras, falso en caso contrario
*
*/
export function onlyLetter(value){
  let numeros = "1234567890";
  let caracteres = "#$%&/()=¿''|";
  let valid = true;
  for (var i = 0; i < value.length; i++) {
    if (numeros.includes(value.charAt(i))) {
      return false;
    }
    if (caracteres.includes(value.charAt(i))) {
      return false;
    }

  }
  return true;
}

/*
* convierte un objeto date en fecha legible en zona horaria local
*/
export function toLocalDate(date){
  var dateString = date.toLocaleDateString();
  var parts = dateString.split('/');
  return parts[1] + '/' + parts[0] + '/' + parts[2];
}

/*
* convierte un objecto date en fecha y hora legible en zona horaria local
*/
export function toLocalDateTime(date){
  var dateString = date.toLocaleDateString();
  var timeString = date.toLocaleTimeString();
  var parts = dateString.split('/');
  return parts[1] + '/' + parts[0] + '/' + parts[2] + ' ' + timeString;
}
