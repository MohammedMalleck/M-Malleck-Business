const mainEl = document.querySelector('main');

function displayParticles(speed,color){
  particlesJS("particles-js",
    {
       "particles": {
         "number": {
           "value": 100,
           "density": {
             "enable": true,
             "value_area": 800
           }
         },
         "color": {
           "value": color
         },
         "shape": {
           "type": "circle",
           "stroke": {
             "width": 0,
             "color": "#000000"
           },
           "polygon": {
             "nb_sides": 5
           },
           "image": {
             "src": "img/github.svg",
             "width": 100,
             "height": 100
           }
         },
         "opacity": {
           "value": 0.5,
           "random": false,
           "anim": {
             "enable": false,
             "speed": 1,
             "opacity_min": 0.1,
             "sync": false
           }
         },
         "size": {
           "value": 3,
           "random": true,
           "anim": {
             "enable": false,
             "speed": 40,
             "size_min": 0.1,
             "sync": false
           }
         },
         "line_linked": {
           "enable": true,
           "distance": 150,
           "color": color,
           "opacity": 0.4,
           "width": 1
         },
         "move": {
           "enable": true,
           "speed":speed,
           "direction": "none",
           "random": false,
           "straight": false,
           "out_mode": "out",
           "bounce": false,
           "attract": {
             "enable": false,
             "rotateX": 600,
             "rotateY": 1200
           }
         }
       },
       "interactivity": {
         "detect_on": "canvas",
         "events": {
           "onhover": {
             "enable": false,
             "mode": "repulse"
           },
           "onclick": {
             "enable": true,
             "mode": "push"
           },
           "resize": true
         },
         "modes": {
           "grab": {
             "distance": 400,
             "line_linked": {
               "opacity": 1
             }
           },
           "bubble": {
             "distance": 400,
             "size": 40,
             "duration": 2,
             "opacity": 8,
             "speed": 3
           },
           "repulse": {
             "distance": 200,
             "duration": 0.4
           },
           "push": {
             "particles_nb": 4
           },
           "remove": {
             "particles_nb": 2
           }
         }
       },
       "retina_detect": true
  });
};

displayParticles(3,"#172145");

function handleTheme(){
    //get the particles objecta
    const pJS = window.pJSDom[0].pJS;
    const mainElClass = mainEl.classList[0];
    //if there is a class then remove it
    if(mainElClass){
       mainEl.classList.remove(mainElClass);
       //add the opposite class
       mainElClass === 'dark' ?  mainEl.classList.add('light') :  mainEl.classList.add('dark');  
       //get the new theme color and modify the particles object
       const particlesColor = getComputedStyle(document.documentElement).getPropertyValue(`--${mainEl.classList[0]}-color`);
       pJS.particles.color.value = particlesColor;
       pJS.particles.line_linked.color = particlesColor;
    }else{
      //if there isnt a class then simply add dark class
      //modify the particles object to dark color 
      pJS.particles.color.value = '#66FCF1';
      pJS.particles.line_linked.color = '#66FCF1';
      mainEl.classList.add('dark');   
    }
    //refresh the particles
    pJS.fn.particlesRefresh();
}

document.querySelector('.theme-icon').addEventListener('click',handleTheme);
document.querySelector('.theme-icon-side').addEventListener('click',handleTheme);

document.querySelector('.bar-icon').addEventListener('click',()=>{
  document.querySelector('.bar-icon').classList.toggle('active');
  document.querySelector('.sidebar').classList.toggle('show');
});