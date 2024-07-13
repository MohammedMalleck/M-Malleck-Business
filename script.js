const observer = new IntersectionObserver(handleObserver,{root : null, rootMargin : '0px' , threshold : 0.2});

function displayParticles(speed,color){
  particlesJS("particles-js",
    {
       "particles": {
         "number": {
           "value": 100,
           "density": {
             "enable": true,
             "value_area": 1100
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
function handleTheme(){
  //remove the inline styles 
  //independent of weahter they exists or not
  document.querySelector('.shape-icon').style = '';
  document.querySelectorAll('g > circle').forEach((cirlceEl,index) =>  cirlceEl.style = `--circle-num:${index % 7};`);

  const mainEl = document.querySelector('main');
  const audioEl = document.querySelector('audio');
  //get the particles objecta
  const pJS = window.pJSDom[0].pJS;
  //if there is a class then remove it
  mainEl.className === 'dark' ? mainEl.className = 'light' : mainEl.className = 'dark';
  //get the new theme color and modify the particles object
  const particlesColor = mainEl.className === 'dark'  ? '#66FCF1' : '#1f2c5c';
  pJS.particles.color.value = particlesColor;
  pJS.particles.line_linked.color = particlesColor;
  localStorage.setItem('theme',JSON.stringify(mainEl.className));
  //play the sound effect 
  audioEl.pause();
  audioEl.currentTime = 0;
  audioEl.play();
  //refresh the particles
  pJS.fn.particlesRefresh();
};
function animateSkillsText(skillIndexValue){
  const skills = ['Web Developer','UI/UX Designer'];
  const skillTextEl = document.querySelector('.skill-text');
  const skillsIndex = skillIndexValue && skillIndexValue < 2 ? skillIndexValue : 0;
  let intervalID;
  let textIndex = 0;

  intervalID = setInterval(()=>{
    const skillText = skills[skillsIndex];

    if(textIndex < skillText.length){
      skillTextEl.innerHTML += (skillText.charAt(textIndex) === ' ') ? '&nbsp' : skillText.charAt(textIndex);
      textIndex++;
    }else{
      clearInterval(intervalID);
      skillTextEl.classList.add('blink');
      setTimeout(()=>{
        skillTextEl.classList.remove('blink');
        skillTextEl.innerHTML = '';
        animateSkillsText(skillsIndex + 1);
      },2000);
    };
  },350);
};
function nameAnimation(){
  const nameEl =  document.querySelector('.animation-name');
  const wordsArray = nameEl.innerText.split(' ');
  nameEl.innerHTML = wordsArray.map((word,index) =>
  `<div>${word.replace( /[a-zA-Z,]/g,match => `<span>${match}</span>`)}${index !== wordsArray.length -1 ? '&nbsp' : ''}</div>`).join('\n');
  setTimeout(()=>{
    document.querySelectorAll('.animation-name > div > span').forEach((spanEl,index)=>spanEl.style = `--i:${index};   animation:moveUp .6s ease forwards;    animation-delay: calc(var(--i) * 0.1s);`);
  },500);
};

function handleObserver(entries,observer){
  entries.forEach( entry =>{
    if(entry.isIntersecting){
      entry.target.querySelector('.service').classList.add('show');
      observer.unobserve(entry.target);
    }
  });
};


animateSkillsText();

displayParticles(3,document.querySelector('main').className === 'dark' ? '#66FCF1' : '#1f2c5c');

nameAnimation();

document.querySelectorAll('.service-container').forEach(serviceContainerEl => {
  observer.observe(serviceContainerEl);
  window.navigator.maxTouchPoints > 0 ?  serviceContainerEl.querySelector('.service').classList.add('touch-device') : '';
});


window.addEventListener('resize',()=>{
  const mainEl = document.querySelector('main');
  const particlesColor = mainEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';
  const pJS = window.pJSDom[0].pJS;
  pJS.particles.color.value = particlesColor;
  pJS.particles.line_linked.color = particlesColor;
  pJS.fn.particlesRefresh();

  document.querySelector('.shape-icon').style = `animation:none; ${mainEl.className === 'dark' ? 'transform:scale(.55);' :''}`;
  document.querySelectorAll('g > circle').forEach(circleEl => {
    circleEl.style = `animation:none; ${mainEl.className === 'dark' ? 'transform:scale(1);' :''}`;
  });
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change' , event => {
  const mainEl = document.querySelector('main');
  mainEl.className = event.matches ? 'dark' : 'light';
  const particlesColor = mainEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';
  const pJS = window.pJSDom[0].pJS;
  pJS.particles.color.value = particlesColor;
  pJS.particles.line_linked.color = particlesColor;
  pJS.fn.particlesRefresh();
});

document.querySelector('.theme-icon').addEventListener('click',handleTheme);
//acces the last li element of the sidebar
document.querySelector('.sidebar > ul > li:last-child').addEventListener('click',handleTheme);

document.querySelector('.bar-icon').addEventListener('click',()=>{
  document.querySelector('.bar-icon').classList.toggle('active');
  document.querySelector('.sidebar').classList.toggle('show');
});