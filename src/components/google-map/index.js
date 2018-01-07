'use strict';

import { h, Component } from 'preact';
import style from './style';
import GoogleMapsLoader from './../../libs/google-loader';
import DATA from './../../data/clubs.json';
import {flatMap} from 'lodash/flatMap';

export default class GoogleMap extends Component {
  state = {
    map: null,
    zoom: this.props.zoom || 8,
    markers: [],
    query: ''
  }

  componentDidMount(){

    GoogleMapsLoader(this.props.apiKey).then(google => {
      const markers = this.createMarkers(DATA);
      const map = this.drawMap(
        document.querySelector('#map'),
        this.state.markers[0],
        this.state.zoom
      );
      this.drawMarkers(markers, map);
    });

  }

  drawMarkers(markers, map){
    markers.map((e,i) => {
      const marker = new google.maps.Marker({
        position: e,
        title: 'test',
        animation: google.maps.Animation.DROP,
        map: map
      });
    });

    // this.recenter(markers, map);
  }

  drawMap(element, center, zoom){
    const map = new google.maps.Map(element, {
      center: center,
      zoom: zoom
    });

    return map;
    // this.setState({...this.state, map: map });
  }

  createMarkers(data){
    const markers = data.reduce((a,b) => {
      const concat = a.days ? a.days.concat(b.days) : a.concat(b.days);
      return concat;
    }).map((e,i) => {
      return {
        day: e.day,
        lat: e.latitude,
        lng: e.longitude
      }
    });

    this.setState({...this.state, markers: markers});

    return markers;
  }

  updateQuery(evt){
    const str = evt.target.value;
    this.setState({...this.state, query: str});
  }

  recenter(markers, map){
    if (map && markers.length > 0) {
      const latLngBounds = new google.maps.LatLngBounds();
      markers.forEach(m => latLngBounds.extend(
        new google.maps.LatLng(m.latitude, m.longitude)));
      // For one marker, don't alter zoom, just center it.
      if (markers.length > 1) {
        map.fitBounds(latLngBounds);
      }
      map.setCenter(latLngBounds.getCenter());
    }
  }

	render() {
		return (
			<div>
        <input type="text" 
          value={this.state.query} 
          placeholder="Cerca" 
          class={style.search}
          onKeyUp={this.updateQuery.bind(this)} />
        <div id="map" class={style.map} />
      </div>
		);
	}
}
