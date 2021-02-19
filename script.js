'use strict';

class Workout{
  date = new Date();
  id=(Date.now() + '').slice(-10);
  click = 0;

  constructor(coords,distance,duration){
      this.coords = coords;
      this.distance = distance;
      this.duration = duration;  
    }


_setDesciption(){
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  this.desciption = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
    month[this.date.getDate()]
  } ${this.date.getDate()}`;
}

  click(){
    this.clicks++;
 }
}

class Running extends Workout{
  type = 'running';

  constructor(coords,distance,duration,cadence){
    super(coords,distance,duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDesciption();
  }

  calcPace(){
    this.pace = this.duration/this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords,distance,duration,elevationGain) {
    super(coords,distance,duration);
    this.elevationGain = elevationGain;

    this.calSpees();
    this._setDesciption();

  }

  calcSpeed(){
    this.speed = this.distance / (this.duration/60);
    return this.speed;
  }
}


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App{
#map;
#mapZoomLevel = 13;
#mapEvent;
#workouts = [];

  constructor(){}
 
    _getPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                this._loadMap,
                function(){
                    alert('Could not get your position!!!');
                    console.log('Could not get your position!!!')
                }
            );
        }
    }

    _loadMap(){
        function(position){
            const { latitude } = position.coords;
            const { longitude} = position.coords; 
            console.log(latitude,longitude);
             
            const coords=[latitude,longitude];

            map = L.map('map').setView(coords, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.on('click',function(mapE){
                mapEvent=mapE;
                form.classList.remove('hidden');
                inputDistance.focus();  
            });
         }
    }

    _showForm(){}

    _toggleElevationField(){}

    _newworkout(){}


}

const app =new App();
app._getPosition();

form.addEventListener('submit',function(e){
    e.preventDefault();

    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    const { lat,lng } = mapEvent.latlng

    L.marker([lat,lng]).addTo(map)
    .bindPopup(L.popup({
        maxWidth:250,
        minWidth:100,
        autoclose:false,
        closeOnClick:false,
        className:'running-popup'   
        })
    )
    .setPopupContent('Workout')
  .openPopup();
});

inputType.addEventListener('change',function () {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
})
