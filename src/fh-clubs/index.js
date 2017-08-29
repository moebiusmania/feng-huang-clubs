'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';


class FengHuangClubs extends PolymerElement {
  
  static get template() { return template; }
  
  static get properties() { return props }

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
    this.markers = this._getMarkers(this.filtered);
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
      return filtered[0] ? filtered[0].days : filtered;
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

  connectedCallback(){
    super.connectedCallback();

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

customElements.define('fh-clubs', FengHuangClubs);