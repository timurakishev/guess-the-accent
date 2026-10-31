'use strict';
const accents = [
 ['Arabic'],['Kazakh'],['German'],['French'],['Hindi'],['Japanese'],['Korean'],['Mandarin','Mandarin Chinese','Chinese'],['Yoruba (Nigeria)','Yoruba'],['Polish'],['Russian'],['Spanish (Venezuela)','Spanish','Venezuelan Spanish'],['Vietnamese'],['Turkish'],['Brazilian Portuguese','Portuguese','Portuguese (Brazil)']
].map((names,i)=>({file:`audio/accent${i+1}.mp3`,answer:names[0],aliases:names}));
const pool=[...accents.map(a=>a.answer),'Italian','Swedish','Greek','Thai','Dutch'];
function shuffled(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function normalize(s){return s.trim().toLocaleLowerCase().replace(/\s+/g,' ');}
function matches(item,s){return item.aliases.some(a=>normalize(a)===normalize(s));}
const $=id=>document.getElementById(id);
let order=[],current=0,score=0,answered=false,heard=false,history=[];
const audio=$('audio');
function start(){audio.pause();order=shuffled(accents);current=0;score=0;history=[];$('round').hidden=false;$('results').hidden=true;render();}
function render(){audio.pause();answered=false;heard=false;$('answers').replaceChildren();$('feedback').textContent='';$('audio-error').textContent='';$('next').disabled=true;$('progress').textContent=`Voice ${current+1} of ${order.length}`;$('score').textContent=`Score: ${score}`;$('meter').value=current;$('next').textContent=current===order.length-1?'See results →':'Next voice →';audio.src=order[current].file;audio.load();}
function reveal(){if(heard||answered)return;heard=true;const item=order[current];const wrong=shuffled(pool.filter(a=>a!==item.answer)).slice(0,3);for(const label of shuffled([...wrong,item.answer])){const b=document.createElement('button');b.className='option';b.textContent=label;b.addEventListener('click',()=>answer(label));$('answers').append(b);}}
function answer(choice){if(answered||!heard)return;answered=true;const item=order[current],correct=matches(item,choice);if(correct)score++;history.push({answer:item.answer,choice,correct});$('feedback').textContent=correct?`Correct! ${item.answer}.`:`The answer is ${item.answer}.`;$('score').textContent=`Score: ${score}`;$('meter').value=current+1;for(const b of $('answers').querySelectorAll('button.option')){b.disabled=true;if(b.textContent===item.answer)b.classList.add('correct');else if(b.textContent===choice)b.classList.add('wrong');}$('next').disabled=false;}
audio.addEventListener('playing',reveal);
audio.addEventListener('error',()=>{$('audio-error').textContent='The recording could not load. Check your connection and reload the page.';});
$('next').addEventListener('click',()=>{if(!answered)return;audio.pause();current++;if(current<order.length){render();return;}$('round').hidden=true;$('results').hidden=false;$('progress').textContent='All 15 voices explored';$('final-score').textContent=`${score} / ${order.length}`;$('review').replaceChildren();history.forEach((item,i)=>{const p=document.createElement('p');p.textContent=`${item.correct?'✓':'×'} ${i+1}. ${item.answer}${item.correct?'':` — you answered: ${item.choice}`}`;$('review').append(p);});$('again').focus();});
$('restart').addEventListener('click',()=>{if(history.length===0||confirm('Start a new round? Your current score will be reset.'))start();});$('again').addEventListener('click',start);start();
