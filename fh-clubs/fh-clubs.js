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
      };
    }

    _computeSelectedDay(selected){
      const classes = ['button', 'button-small', 'button-outline'];
      return selected
        ? classes.filter(elem => {return elem !== 'button-outline'}).join(' ')
        : classes.join(' ');
    }

    _computeText(data){
      return `Cerca tra i ${data.length} club della scuola Feng Huang (per nome o paese)`;
    }

    _filter(){
      this.filtered = this._search(this.data);
      // console.log(this.filtered);
      // console.log(this._getMarkers(this.filtered));
      this.markers = this._getMarkers(this.filtered);
      console.log(this.markers);
    }

    _updateQuery(evt){
      this.query = evt.currentTarget.value;
      this._filter();
    }

    _search(data){
      if(this.query.length){
        const query = this.query.toLowerCase();
        return data.filter((e,i) => {
          const byName = e.name.toLowerCase().search(query) > -1;
          const byCity = e.city.toLowerCase().search(query) > -1;
          return byName || byCity;
        });
      } else {
        return data;
      }
    }

    _getMarkers(data){
      console.log('# data', data);
      const filtered = data.map((e,i) => {
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
      });
      if(data.length > 1){
        return filtered.reduce((a,b) => {
          const concat = a.days ? a.days.concat(b.days) : a.concat(b.days);
          return concat;
        });
      } else {
        return filtered[0].days;
      }
    }

    _selectDays(evt){
      const index = parseInt(evt.currentTarget.dataset.index);
      const selected = !this.daysOpts[index].selected;
      this.daysOpts = [
        ...this.daysOpts.slice(0,index),
        Object.assign({}, this.daysOpts[index], {selected: selected}),
        ...this.daysOpts.slice(index + 1)
      ];
      console.log(index,selected, this.daysOpts);
    }

    _selectMarker(evt){
      const name = evt.target.dataset.name;
      this.query = name;
      this._filter();
    }

    attached(){
      fetch('./clubs.json')
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.data = json.slice(0);
          this._filter();
        });
    }
  }

  Polymer(FengHuangClubs);
})();
