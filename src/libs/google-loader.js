'use strict';

const GoogleInject = () => {
  const script = document.createElement('script');
  script.src = 'https://www.google.com/jsapi';
  script.async = true;
  document.body.append(script);
  return new Promise((resolve, reject) => {
    script.onload = () => {
      return resolve(window.google);
    }
  });
}

const GoogleMapsLoader = (apiKey) => {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey;
  script.async = true;
  document.body.append(script);
  return new Promise((resolve, reject) => {
    script.onload = () => {
      return resolve(window.google);
    }
  });
}

// export default GoogleInject;
export default GoogleMapsLoader;