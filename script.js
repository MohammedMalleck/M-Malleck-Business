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

function dislplayDefaultTheme(){
  const mainEl = document.querySelector('main');
  const systemSettingTheme = window. matchMedia("(prefers-color-scheme: dark)");
  const userSavedTheme = JSON.parse(localStorage.getItem('theme'));
  //if the user has saved a dark theme or if the user has saved no theme 
  //and the system prefrence theme is dark then add dark styles through inline css
  if(userSavedTheme === 'dark' || systemSettingTheme.matches && !userSavedTheme){
    mainEl.style.transition = 'none';
    document.querySelector('.shape-icon').style = 'transform:rotate(90deg) scale(.55); transition:none; fill:#66FCF1;';
    document.querySelector('.cover-circle').style.transition = 'none';
    document.querySelectorAll('g > circle').forEach(cirlceEl => {
      cirlceEl.style.transform = 'scale(1)';
      cirlceEl.style.animation = 'none';
    });
    mainEl.classList.add('dark');
    displayParticles(3,'#66FCF1');
  }else{
    //display particles with light theme 
    displayParticles(3,'#172145');    
  }
}

function removeSystemStyles(){
  document.querySelector('main').style = '';
  document.querySelector('.shape-icon').style = '';
  document.querySelector('.cover-circle').style = '';
  document.querySelectorAll('g > circle').forEach((cirlceEl,index) =>  cirlceEl.style = `--circle-num:${index % 7};`);
}

dislplayDefaultTheme();

function handleTheme(){
  //remove the inline styles 
  //independent of weahter they exists or not
  removeSystemStyles();
  const mainEl = document.querySelector('main');
  const audioEl = document.querySelector('audio');
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
  localStorage.setItem('theme',JSON.stringify(mainEl.classList[0]));
  //play the sound effect 
  audioEl.pause();
  audioEl.currentTime = 0;
  audioEl.play();
  //refresh the particles
  pJS.fn.particlesRefresh();
}

document.querySelector('.theme-icon').addEventListener('click',handleTheme);
//acces the last li element of the sidebar
document.querySelector('.sidebar > ul > li:last-child').addEventListener('click',handleTheme);

document.querySelector('.bar-icon').addEventListener('click',()=>{
  document.querySelector('.bar-icon').classList.toggle('active');
  document.querySelector('.sidebar').classList.toggle('show');
});