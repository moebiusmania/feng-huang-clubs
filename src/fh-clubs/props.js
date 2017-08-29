'use strict';

export default {
  key: {
    type: String,
    value: "AIzaSyD6Ltm32QJIxRFDSdWyQ6--2Y_j0YxEwlg"
  },
  map: {
    type: Object,
    value: {
      lat: 45.4737012,
      long: 9.1908025
    }
  },
  daysOpts: {
    type: Array,
    value: [
      {label: 'Lunedì'},
      {label: 'Martedì'},
      {label: 'Mercoledì'},
      {label: 'Giovedì'},
      {label: 'Venerdì'}
    ]
  },
  query: {
    type: String,
    value: ''
  },
  data: {
    type: Array,
    value: []
  },
  filtered: {
    type: Array,
    value: []
  },
  markers: {
    type: Array,
    value: []
  },
  days: {
    type: Array,
    value: []
  }
}