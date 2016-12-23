(function(){
  'use strict';

  class FengHuangClubs extends HTMLElement {
    beforeRegister() {
      this.is = 'feng-huang-clubs';

      this.properties = {
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
        query: {
          type: String,
          value: null
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
        }
      };
    }

    _computeText(data){
      return `Cerca tra i ${data.length} club della scuola Feng Huang (per nome o paese)`;
    }

    _updateQuery(evt){
      this.query = evt.currentTarget.value;
    }

    _flatten(data){
      return data.map((e,i) => {
        e.days ? e.days.map((elem) => {
          elem.name = e.name
          return elem;
        }) : null;
        return {
          "days": e.days,
          "name": e.name
        };
      }).filter((e,i) => {
        return e.days;
      }).reduce((a,b) => {
        console.log(a,b);
        return a.days.concat(b.days);
      });
    }

    select(evt){
      const name = evt.target.dataset.name;
      this.query = name;
    }

    attached(){
      fetch('./../clubs.json')
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json);
          this.data = json.slice(0);
          this.markers = this._flatten(json);
          console.log(this._flatten(json));
        });
    }
  }

  Polymer(FengHuangClubs);
})();
