'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minsToHrs = minsToHrs;
exports.toTitleCase = toTitleCase;
exports.timeSince = timeSince;

function printMinutes(data) {
  if (data < 10) {
    return '0' + data;
  }
  return data;
}

function minsToHrs(data) {
  if (data) {
    var hours = Math.floor(data / 60);
    var minutes = data % 60;
    return hours + ':' + printMinutes(minutes);
  }
  return data;
}

function toTitleCase(data) {
  var response = data.replace(/_/g, ' ');
  return response.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function timeSince(data) {
  var seconds = Math.floor((new Date() - new Date(data)) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + ' a\xF1o' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + ' mes' + (interval > 1 ? 'es' : '');
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + ' d\xEDa' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + ' hora' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutos';
  }
  return '1 minuto';
}