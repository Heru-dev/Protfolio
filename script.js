 
  // ── CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor(){
    cursor.style.left = mx+'px'; cursor.style.top = my+'px';
    rx += (mx-rx)*.12; ry += (my-ry)*.12;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('a,button,.service-card,.why-item,.skill-tag').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cursor.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave',()=>{ cursor.classList.remove('hover'); ring.classList.remove('hover'); });
  });
  // Hide on mobile
  if(/Mobi|Android/i.test(navigator.userAgent)){ cursor.style.display='none'; ring.style.display='none'; }

  // ── SCROLL PROGRESS + NAV
  const progress = document.getElementById('scrollProgress');
  const navbar = document.querySelector('.navbar');
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight))*100;
    progress.style.width = pct+'%';
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backTop.classList.toggle('visible', window.scrollY > 400);

    // Active nav
    document.querySelectorAll('section[id]').forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if(top < 100 && top > -sec.offsetHeight+100){
        document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
        const lnk = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        if(lnk) lnk.classList.add('active');
      }
    });
  });

  // ── REVEAL
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold:.12 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>observer.observe(el));

  // ── TYPED TEXT
  const roles = ['Frontend Developer','React JS Developer','WordPress Expert','UI/UX Designer','Digital Marketer'];
  let ri=0, ci=0, del=false;
  const typed = document.getElementById('typedText');
  function type(){
    const word = roles[ri];
    if(!del){ typed.textContent = word.slice(0,++ci); if(ci===word.length){ del=true; setTimeout(type,1500); return; } }
    else { typed.textContent = word.slice(0,--ci); if(ci===0){ del=false; ri=(ri+1)%roles.length; } }
    setTimeout(type, del ? 60 : 90);
  }
  type();

  // ── COUNTER
  function countUp(el){
    const target = +el.dataset.target;
    let count=0;
    const step = Math.ceil(target/40);
    const timer = setInterval(()=>{
      count = Math.min(count+step, target);
      el.textContent = count + (target>=10?'+':'');
      if(count>=target) clearInterval(timer);
    },40);
  }
  const statObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.stat-num').forEach(countUp); statObs.disconnect(); } });
  }, {threshold:.5});
  document.querySelector('.hero-stats') && statObs.observe(document.querySelector('.hero-stats'));

  // ── FORM
  function handleForm(){
    const n=document.getElementById('fname').value.trim();
    const e=document.getElementById('femail').value.trim();
    const m=document.getElementById('fmessage').value.trim();
    if(!n||!e||!m){ alert('Please fill in Name, Email, and Message.'); return; }
    document.getElementById('formSuccess').style.display='block';
    ['fname','femail','fsubject','fmessage'].forEach(id=>document.getElementById(id).value='');
    setTimeout(()=>document.getElementById('formSuccess').style.display='none', 5000);
  }

  // ── SMOOTH SCROLL for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
  });
 