import moment from 'moment'

moment.locale('de', {
  relativeTime: {
    future: 'in %s',
    past: 'vor %s',
    s: 'vor ein paar Sekunden',
    ss: '%d Sekunden',
    m: 'eine Minute',
    mm: '%d Minuten',
    h: 'eine Stunde',
    hh: '%d Stunden',
    d: 'ein Tag',
    dd: '%d Tagen',
    M: 'ein Monat',
    MM: '%d Monaten',
    y: 'ein Jahr',
    yy: '%d Jahren',
  },
})

export default moment
