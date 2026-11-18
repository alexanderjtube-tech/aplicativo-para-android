const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const roles={presbitero:{es:'Presbítero',en:'Presbyter',titleEs:'Administrador del circuito',titleEn:'Circuit administrator'},tesorero:{es:'Tesorero',en:'Treasurer',titleEs:'Finanzas',titleEn:'Finance'},secretario:{es:'Secretario',en:'Secretary',titleEs:'Secretaría',titleEn:'Secretariat'},pastor:{es:'Pastor',en:'Pastor',titleEs:'Pastor · Iglesia Central',titleEn:'Pastor · Central Church'},maestro:{es:'Maestro ITAIC',en:'ITAIC Teacher',titleEs:'Maestro · Ana Lucía Ríos',titleEn:'Teacher · Ana Lucía Ríos'},itaic:{es:'Administrador ITAIC',en:'ITAIC Administrator',titleEs:'Administración del instituto',titleEn:'Institute administrator'}};
let lang='es',role='presbitero',page='dashboard',filter='',selectedYear='2026',finance=[],members=[
 {name:'María Fernanda Gómez',id:'1.067.245.891',age:34,sex:'Femenino',civil:'Casado',baptized:true,church:'Iglesia Central'},
 {name:'Carlos Andrés Pérez',id:'1.102.834.567',age:42,sex:'Masculino',civil:'Casado',baptized:true,church:'Iglesia Central'},
 {name:'Daniela Ríos Martínez',id:'1.004.528.311',age:16,sex:'Femenino',civil:'No aplica',baptized:false,church:'Iglesia Central'},
 {name:'José Miguel Torres',id:'1.098.324.550',age:28,sex:'Masculino',civil:'Soltero',baptized:true,church:'Iglesia Central'},
 {name:'Lucía Esther Díaz',id:'1.056.743.220',age:61,sex:'Femenino',civil:'Unión libre',baptized:false,church:'Iglesia Central'}
];
const churches=[['Iglesia Central','Calle 15 # 8-42 · Montería','Pr. José Martínez','128'],['Iglesia Betania','Barrio La Granja · Montería','Pr. David López','86'],['Iglesia El Redentor','Carrera 7 · Cereté','Pr. Samuel Ríos','74'],['Iglesia Nueva Vida','Vía a Planeta Rica · Montería','Pr. Andrés Pérez','52']];
const verseList=[['Todo lo que hagan, háganlo de corazón, como para el Señor.','Colosenses 3:23'],['El Señor es mi pastor, nada me faltará.','Salmos 23:1'],['Esfuércense y cobren ánimo; no teman ni tengan miedo.','Deuteronomio 31:6'],['Porque donde están dos o tres reunidos en mi nombre, allí estoy yo.','Mateo 18:20']];
const I={es:{welcome:'CIRCUITO CÓRDOBA',signIn:'Bienvenido',signHint:'Ingresa tus credenciales para continuar.',userLabel:'Usuario',passwordLabel:'Contraseña',enter:'Ingresar',previewRole:'Vista de demostración por rol',workspace:'ESPACIO DE TRABAJO',helpTitle:'¿Necesitas ayuda?',helpText:'Consulta con el administrador del circuito.',logout:'Cerrar sesión',dashboard:'Panel general',churches:'Iglesias',finance:'Finanzas',secretary:'Secretaría',itaic:'ITAIC',pastors:'Pastores',teachers:'Maestros',overview:'Resumen',reports:'Informes',members:'Miembros',hello:'Buenos días',circuit:'Circuito Córdoba',newChurch:'Añadir iglesia',generate:'Generar informe',download:'Exportar',addMember:'Añadir miembro',addMovement:'Registrar movimiento',viewAll:'Ver todos',totalChurches:'Iglesias del circuito',totalMembers:'Miembros',baptized:'Bautizados',monthlyIncome:'Ingresos del mes',recentActivity:'Actividad reciente',churchOverview:'Iglesias del circuito',quickStats:'Resumen del circuito',active:'Activa',membersLabel:'miembros',churchLabel:'Iglesia',pastorLabel:'Pastor asignado',address:'Dirección',status:'Estado',actions:'Acciones',search:'Buscar…',allChurches:'Todas las iglesias',member:'Miembro',document:'Documento',age:'Edad',sex:'Sexo',civil:'Estado civil',baptism:'Bautismo',yes:'Bautizado',no:'No bautizado',balance:'Saldo actual',initial:'Saldo inicial',income:'Ingresos',expenses:'Egresos',final:'Saldo final',description:'Descripción',date:'Fecha',closePeriod:'Cerrar periodo',periodClosed:'Periodo cerrado',students:'Estudiantes',year1:'Primer año',year2:'Segundo año',year3:'Tercer año',campuses:'Sedes',teachersTitle:'Asignación de maestros',pastoral:'Administración pastoral',newPastor:'Añadir pastor',academic:'Preparación académica',enroll:'Inscribir estudiante',grades:'Calificaciones',all:'Todos',children:'Niños',men:'Caballeros',women:'Damas',churchDetail:'Detalle de iglesia',reportReady:'Informe generado y listo para exportar.',empty:'No hay registros para mostrar.',save:'Guardar',cancel:'Cancelar',name:'Nombres y apellidos',roleLabel:'Rol',select:'Seleccionar',monthlyReport:'Informe mensual',memberAdded:'Miembro guardado correctamente.',movementAdded:'Movimiento registrado correctamente.',churchAdded:'Iglesia añadida correctamente.',registered:'Registros',thisMonth:'Este mes',pending:'Pendiente',closed:'Cerrado',dateRange:'Periodo: enero – diciembre 2026',financeSubtitle:'Consulta y genera informes financieros del circuito.',secretarySubtitle:'Información y estadísticas de membresía del circuito.',churchesSubtitle:'Iglesias que conforman el Circuito Córdoba.',itaicSubtitle:'Instituto Teológico de la AIC.',pastorsSubtitle:'Equipo pastoral del circuito.',membersSubtitle:'Personas registradas en tu iglesia.',financeSubtitlePastor:'Movimientos y saldo del periodo actual.',noAccess:'Este módulo no está disponible para tu rol.'},en:{welcome:'CÓRDOBA CIRCUIT',signIn:'Welcome',signHint:'Sign in with your credentials to continue.',userLabel:'Username',passwordLabel:'Password',enter:'Sign in',previewRole:'Demo view by role',workspace:'WORKSPACE',helpTitle:'Need help?',helpText:'Contact the circuit administrator.',logout:'Sign out',dashboard:'Overview',churches:'Churches',finance:'Finance',secretary:'Secretariat',itaic:'ITAIC',pastors:'Pastors',teachers:'Teachers',overview:'Overview',reports:'Reports',members:'Members',hello:'Good morning',circuit:'Córdoba Circuit',newChurch:'Add church',generate:'Generate report',download:'Export',addMember:'Add member',addMovement:'Add transaction',viewAll:'View all',totalChurches:'Circuit churches',totalMembers:'Members',baptized:'Baptized',monthlyIncome:'Monthly income',recentActivity:'Recent activity',churchOverview:'Circuit churches',quickStats:'Circuit overview',active:'Active',membersLabel:'members',churchLabel:'Church',pastorLabel:'Assigned pastor',address:'Address',status:'Status',actions:'Actions',search:'Search…',allChurches:'All churches',member:'Member',document:'ID number',age:'Age',sex:'Gender',civil:'Marital status',baptism:'Baptism',yes:'Baptized',no:'Not baptized',balance:'Current balance',initial:'Opening balance',income:'Income',expenses:'Expenses',final:'Closing balance',description:'Description',date:'Date',closePeriod:'Close period',periodClosed:'Period closed',students:'Students',year1:'First year',year2:'Second year',year3:'Third year',campuses:'Campuses',teachersTitle:'Teacher assignments',pastoral:'Pastoral administration',newPastor:'Add pastor',academic:'Academic background',enroll:'Enroll student',grades:'Grades',all:'All',children:'Children',men:'Men',women:'Women',churchDetail:'Church details',reportReady:'Report generated and ready to export.',empty:'No records to display.',save:'Save',cancel:'Cancel',name:'Full name',roleLabel:'Role',select:'Select',monthlyReport:'Monthly report',memberAdded:'Member saved successfully.',movementAdded:'Transaction recorded successfully.',churchAdded:'Church added successfully.',registered:'Records',thisMonth:'This month',pending:'Pending',closed:'Closed',dateRange:'Period: January – December 2026',financeSubtitle:'Review and generate circuit financial reports.',secretarySubtitle:'Membership information and statistics for the circuit.',churchesSubtitle:'Churches that make up the Córdoba Circuit.',itaicSubtitle:'AIC Theological Institute.',pastorsSubtitle:'Pastoral team of the circuit.',membersSubtitle:'People registered in your church.',financeSubtitlePastor:'Transactions and balance for the current period.',noAccess:'This module is not available for your role.'}};
const t=k=>I[lang][k]||({amount:lang==='es'?'Valor':'Amount'}[k])||k;
function pickVerse(){let v=verseList[Math.floor(Math.random()*verseList.length)];$('#verse').innerHTML=`<span>“</span><p>${v[0]}</p><cite>${v[1]}</cite>`}
pickVerse(); $('#loginLang').onclick=()=>{lang=lang==='es'?'en':'es';updateLogin()};function updateLogin(){$$('.login-screen [data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));$('#loginLang').textContent=lang==='es'?'EN':'ES';document.documentElement.lang=lang;}
$('#togglePass').onclick=()=>{let i=$('#passInput');i.type=i.type==='password'?'text':'password'};
$$('.role-pills button').forEach(b=>b.onclick=()=>{role=b.dataset.role;$('#userInput').value=b.textContent;$('#passInput').value='demo';login()});$('#loginForm').onsubmit=e=>{e.preventDefault();login()};
function login(){if(!$('#userInput').value||!$('#passInput').value)return;$('#login').classList.add('hidden');$('#sidebar').classList.remove('open');$('#app').classList.remove('hidden');$('#userName').textContent=roles[role][lang];$('#userRole').textContent=roles[role][lang==='es'?'titleEs':'titleEn'];$('#avatar').textContent=roles[role][lang][0];page='dashboard';renderNav();renderPage()}
$('#logout').onclick=()=>{$('#app').classList.add('hidden');$('#login').classList.remove('hidden')};$('#langToggle').onclick=()=>{lang=lang==='es'?'en':'es';updateLogin();$('#langToggle').textContent=lang.toUpperCase();$('#userName').textContent=roles[role][lang];$('#userRole').textContent=roles[role][lang==='es'?'titleEs':'titleEn'];renderNav();renderPage()};$('#mobileMenu').onclick=()=>$('#sidebar').classList.toggle('open');
const navByRole={presbitero:['dashboard','churches','finance','secretary','itaic','pastors'],tesorero:['dashboard','finance'],secretario:['dashboard','secretary'],pastor:['dashboard','members','finance','itaic','teachers']};const navInfo={dashboard:['⌂','dashboard'],churches:['⌂','churches'],finance:['◈','finance'],secretary:['▤','secretary'],itaic:['✧','itaic'],pastors:['♙','pastors'],members:['♙','members'],teachers:['▧','teachers']};
function renderNav(){const list=navByRole[role];$('#navigation').innerHTML=list.map((key,i)=>`${i===1?'<div class="nav-sep"></div>':''}<button class="nav-item ${page===key?'active':''}" data-page="${key}"><span class="nav-icon">${navInfo[key][0]}</span>${t(navInfo[key][1])}</button>`).join('');$$('.nav-item').forEach(b=>b.onclick=()=>{page=b.dataset.page;$('#sidebar').classList.remove('open');renderNav();renderPage()})}
function pageHead(title,sub,action=''){return `<div class="page-head"><div><div class="eyebrow-line">${t('circuit').toUpperCase()}</div><h1>${title}</h1><p>${sub}</p></div><div class="head-actions">${action}</div></div>`}
function stats(items){return `<div class="stats-grid">${items.map(([ico,label,val,note])=>`<article class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon">${ico}</span></div><div class="stat-value">${val}</div><div class="stat-note">${note}</div></article>`).join('')}</div>`}
function churchRows(){let list=role==='pastor'?[churches[0]]:churches;return `<div class="church-list">${list.map((c,i)=>`<div class="church-row"><div class="church-emblem">⌂</div><div><b>${c[0]}</b><small>${c[1]}</small></div><div class="row-end"><b>${c[3]}</b><small>${t('membersLabel')}</small></div><button class="text-link" data-church="${i}">→</button></div>`).join('')}</div>`}
function activityRows(){return `<div class="activity"><div class="activity-row"><div class="activity-dot">＋</div><div><b>${lang==='es'?'Nuevo miembro registrado':'New member registered'}</b><small>Iglesia Central · María Fernanda Gómez</small></div><time>09:42</time></div><div class="activity-row"><div class="activity-dot">◈</div><div><b>${lang==='es'?'Informe mensual enviado':'Monthly report submitted'}</b><small>Iglesia Betania · ${lang==='es'?'Finanzas':'Finance'}</small></div><time>Ayer</time></div><div class="activity-row"><div class="activity-dot">✧</div><div><b>${lang==='es'?'Matrículas ITAIC actualizadas':'ITAIC enrollment updated'}</b><small>${lang==='es'?'Instituto teológico':'Theological institute'} · 3 ${lang==='es'?'estudiantes':'students'}</small></div><time>12 jun</time></div></div>`}
function dashboard(){let pastor=role==='pastor',secret=role==='secretario';let s=stats([[ '⌂',t('totalChurches'),pastor?'1':'12',lang==='es'?'en el circuito':'in circuit'],['♙',t('totalMembers'),pastor?'128':'1,246',`<span class="positive">↑ 4.8%</span> ${lang==='es'?'este año':'this year'}`],['✧',t('baptized'),pastor?'96':'918',lang==='es'?'73.6% del total':'73.6% of total'],['◈',t('monthlyIncome'),pastor?'$2.450.000':'$18.640.000',t('thisMonth')]]);if(secret)s=stats([['♙',t('totalMembers'),'1,246',t('registered')],['✧',t('baptized'),'918','73.6%'],['♀',t('women'),'698',lang==='es'?'56% del total':'56% of total'],['♧',t('children'),'184',lang==='es'?'menores de 13 años':'under 13 years']]);return `${pageHead(`${t('hello')}, ${roles[role][lang]} 👋`,lang==='es'?'Aquí tienes el resumen de actividad del circuito.':'Here is the circuit activity overview.')} ${s}<div class="grid-2"><section class="panel"><div class="panel-head"><div><h2>${t('churchOverview')}</h2><p>${t('dateRange')}</p></div>${role==='presbitero'?`<button class="text-link" data-go="churches">${t('viewAll')} →</button>`:''}</div>${churchRows()}</section><section class="panel"><div class="panel-head"><div><h2>${t('recentActivity')}</h2><p>${lang==='es'?'Últimos movimientos del circuito':'Latest circuit activity'}</p></div></div>${activityRows()}</section></div>`}
function churchPage(){return `${pageHead(t('churches'),t('churchesSubtitle'),`<button class="primary" data-modal="church">＋ ${t('newChurch')}</button>`)}<section class="panel"><div class="panel-head"><div><h2>${t('churchOverview')}</h2><p>${churches.length} ${t('churches').toLowerCase()} · ${t('dateRange')}</p></div><button class="secondary" data-export="churches">${t('generate')} →</button></div>${churchRows()}</section>`}
function financePage(){let totalIn=2450000+612000+455000,totalOut=1130000+302000+221000;return `${pageHead(t('finance'),role==='pastor'?t('financeSubtitlePastor'):t('financeSubtitle'),`<button class="primary" data-do="report">${t('generate')} →</button>`)}<div class="summary-band"><div><small>${t('initial')}</small><b>$8.420.000</b></div><div><small>${t('income')}</small><b>$${totalIn.toLocaleString('es-CO')}</b></div><div><small>${t('expenses')}</small><b>$${totalOut.toLocaleString('es-CO')}</b></div></div><section class="panel"><div class="panel-head"><div><h2>${t('monthlyReport')} · ${selectedYear}</h2><p>${role==='pastor'?HOME_CHURCH:t('allChurches')}</p></div><span class="status ${role==='pastor'?'pending':''}">${role==='pastor'?t('pending'):t('closed')}</span></div><div class="table-card"><table class="data-table"><thead><tr><th>${t('churchLabel')}</th><th>${t('initial')}</th><th>${t('income')}</th><th>${t('expenses')}</th><th>${t('final')}</th><th>${t('status')}</th></tr></thead><tbody>${(role==='pastor'?[churches[0]]:churches).map((c,i)=>`<tr><td><strong>${c[0]}</strong></td><td>$${(1800000+i*380000).toLocaleString('es-CO')}</td><td class="amount">$${(2450000-i*260000).toLocaleString('es-CO')}</td><td>$${(1130000-i*110000).toLocaleString('es-CO')}</td><td><strong>$${(3120000+i*230000).toLocaleString('es-CO')}</strong></td><td><span class="status ${i===3&&role!=='pastor'?'pending':''}">${i===3&&role!=='pastor'?t('pending'):t('closed')}</span></td></tr>`).join('')}</tbody></table></div>${role==='pastor'?`<div class="head-actions" style="justify-content:flex-end;margin-top:15px"><button class="secondary" data-modal="movement">＋ ${t('addMovement')}</button><button class="primary" data-do="close">${t('closePeriod')} →</button></div>`:''}</section><section class="panel"><div class="panel-head"><div><h2>${t('recentActivity')}</h2><p>${HOME_CHURCH}</p></div></div><div class="table-card"><table class="data-table"><thead><tr><th>${t('date')}</th><th>${t('description')}</th><th>${t('income')} / ${t('expenses')}</th><th>${t('amount')}</th></tr></thead><tbody>${(finance.length?finance:[{date:'2026-06-01',description:lang==='es'?'Diezmos del domingo':'Sunday tithes',type:t('income'),amount:2450000},{date:'2026-06-04',description:lang==='es'?'Servicios públicos':'Utilities',type:t('expenses'),amount:320000}]).map(m=>`<tr><td>${m.date}</td><td>${m.description}</td><td>${m.type||t('income')}</td><td class="amount">$${Number(m.amount).toLocaleString('es-CO')}</td></tr>`).join('')}</tbody></table></div></section>`}
function memberRows(){let data=members.filter(m=>`${m.name} ${m.id}`.toLowerCase().includes(filter.toLowerCase()));return data.map(m=>`<tr><td><div class="person-cell"><span class="mini-avatar">${m.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><strong>${m.name}</strong></div></td><td>${m.id}</td><td>${m.age}</td><td>${m.sex}</td><td>${m.civil}</td><td><span class="status ${m.baptized?'':'pending'}">${m.baptized?t('yes'):t('no')}</span></td><td><button class="inline-actions" data-edit-member="${m.id}">⋯</button></td></tr>`).join('')||`<tr><td colspan="7" class="empty">${t('empty')}</td></tr>`}
function secretaryPage(){let baptized=members.filter(m=>m.baptized).length,women=members.filter(m=>m.sex==='Femenino').length,children=members.filter(m=>m.age<13).length;return `${pageHead(t('secretary'),t('secretarySubtitle'),`<button class="primary" data-do="report">${t('generate')} →</button>`)}${stats([['♙',t('totalMembers'),role==='pastor'?members.length:'1,246',t('registered')],['✧',t('baptized'),role==='pastor'?baptized:'918',`${role==='pastor'?Math.round(baptized/Math.max(1,members.length)*100):74}%`],['♀',t('women'),role==='pastor'?women:'698',t('women')],['♧',t('children'),role==='pastor'?children:'184',lang==='es'?'menores de 13 años':'under 13 years']])}${assocBar()}<section class="table-card"><div class="table-tools"><div class="search"><input id="memberSearch" placeholder="${t('search')}" value="${filter}"></div><select class="filter"><option>${t('allChurches')}</option>${churches.map(c=>`<option>${c[0]}</option>`).join('')}</select>${role==='pastor'?`<button class="primary" data-modal="member">＋ ${t('addMember')}</button>`:''}</div><table class="data-table"><thead><tr><th>${t('member')}</th><th>${t('document')}</th><th>${t('age')}</th><th>${t('sex')}</th><th>${t('civil')}</th><th>${L('Asociación','Association')}</th><th>${t('baptism')}</th><th></th></tr></thead><tbody id="memberRows">${memberRows()}</tbody></table><div class="table-foot">${members.length} ${t('registered').toLowerCase()}</div></section>`}
function simplePage(which){let title=t(which),sub=t(which+'Subtitle')||t('itaicSubtitle'),students=which==='itaic';return `${pageHead(title,sub,students?`<button class="secondary" data-export="students">${t('generate')} →</button>`:`<button class="primary" data-modal="pastor">＋ ${t('newPastor')}</button>`)}${students?`<div class="stats-grid">${[['▣',t('students'),'48',lang==='es'?'matriculados actualmente':'currently enrolled'],['⌂',t('campuses'),'4',lang==='es'?'sedes activas':'active campuses'],['♙',t('teachersTitle'),'12',lang==='es'?'maestros asignados':'assigned teachers'],['✧',t('churches'),'9',lang==='es'?'iglesias participantes':'participating churches']].map(a=>`<article class="stat-card"><div class="stat-top"><span>${a[1]}</span><span class="stat-icon">${a[0]}</span></div><div class="stat-value">${a[2]}</div><div class="stat-note">${a[3]}</div></article>`).join('')}</div><div class="toolbar" style="margin-bottom:16px"><button class="secondary">${t('all')} · 48</button><button class="secondary">${t('year1')} · 19</button><button class="secondary">${t('year2')} · 16</button><button class="secondary">${t('year3')} · 13</button><button class="secondary">⌄ ${t('churchLabel')}</button><button class="secondary">⌄ ${t('campuses')}</button></div><div class="grid-2">${[['Primer año','19','Sede Central'],['Segundo año','16','Sede Betania'],['Tercer año','13','Sede Central']].map(a=>`<section class="panel"><div class="panel-head"><div><h2>${lang==='en'?({ 'Primer año':'First year','Segundo año':'Second year','Tercer año':'Third year'}[a[0]]):a[0]}</h2><p>${a[1]} ${t('students').toLowerCase()} · ${a[2]}</p></div><button class="text-link">${t('viewAll')} →</button></div><div class="church-row"><div class="church-emblem">♙</div><div><b>${a[0]==='Primer año'?'María Gómez':a[0]==='Segundo año'?'José Torres':'Lucía Díaz'}</b><small>Iglesia Central</small></div><div class="row-end"><b>4.6</b><small>${t('grades')}</small></div></div><div class="church-row"><div class="church-emblem">♙</div><div><b>${a[0]==='Primer año'?'David López':'Ana Martínez'}</b><small>Iglesia Betania</small></div><div class="row-end"><b>4.2</b><small>${t('grades')}</small></div></div></section>`).join('')}</div><section class="panel"><div class="panel-head"><div><h2>${t('teachersTitle')}</h2><p>${lang==='es'?'Maestros asignados por sede y año':'Teachers assigned by campus and year'}</p></div><button class="secondary" data-modal="teacher">＋ ${t('teachers')}</button></div><div class="church-row"><div class="church-emblem">♙</div><div><b>Pr. José Martínez</b><small>Sede Central · ${t('year1')} y ${t('year2')}</small></div></div><div class="church-row"><div class="church-emblem">♙</div><div><b>Ana Lucía Ríos</b><small>Sede Betania · ${t('year3')}</small></div></div></section>`:`<section class="panel"><div class="panel-head"><div><h2>${t('pastors')}</h2><p>4 ${t('pastors').toLowerCase()} · Circuito Córdoba</p></div></div>${churches.map(c=>`<div class="church-row"><div class="church-emblem">♙</div><div><b>${c[2]}</b><small>${c[0]} · ${lang==='es'?'Preparación: Instituto bíblico':'Education: Bible institute'}</small></div>${role==='presbitero'?`<button class="inline-actions" data-it3="editPastor|${churches.indexOf(c)}" title="${L('Editar','Edit')}">✎</button>`:''}</div>`).join('')}</section>`}`}
function renderPage(){let title=navInfo[page]?t(navInfo[page][1]):t('dashboard');$('#breadcrumb').textContent=title;$('#content').innerHTML=page==='dashboard'?dashboard():page==='churches'?churchPage():page==='finance'?financePage():page==='secretary'||page==='members'?secretaryPage():page==='itaic'||page==='pastors'?simplePage(page):page==='teachers'?simplePage('itaic'):`<div class="empty">${t('noAccess')}</div>`;bindPage()}
function baseBindPage(){document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page));$$('[data-go]').forEach(b=>b.onclick=()=>{page=b.dataset.go;renderNav();renderPage()});$$('[data-modal]').forEach(b=>b.onclick=()=>openModal(b.dataset.modal));$$('[data-export]').forEach(b=>b.onclick=()=>exportData(b.dataset.export));$$('[data-do="report"]').forEach(b=>b.onclick=()=>{notify(t('reportReady'));print()});$$('[data-do="close"]').forEach(b=>b.onclick=()=>{notify(t('periodClosed'));b.textContent='✓ '+t('periodClosed');b.disabled=true});$$('[data-church]').forEach(b=>b.onclick=()=>{let c=churches[Number(b.dataset.church)];page='churches';$('#content').innerHTML=`${pageHead(c[0],t('churchDetail'))}${stats(churchDetailStats(c))}<section class="panel"><div class="panel-head"><h2>${c[0]}</h2><span class="status">${t('active')}</span></div><p>${t('address')}: ${c[1]}</p><p>${t('pastorLabel')}: ${c[2]}</p><button class="secondary" data-go="secretary">${t('members')} →</button></section>`;bindPage()});let search=$('#memberSearch');if(search)search.oninput=()=>{filter=search.value;$('#memberRows').innerHTML=memberRows()}}
function baseOpenModal(type){let content='';if(type==='member')content=`<h2>${t('addMember')}</h2><p>${t('membersSubtitle')}</p><div class="modal-grid"><div class="field"><label>${t('name')}</label><input name="name" required></div><div class="field"><label>${t('document')}</label><input name="id" required></div><div class="field"><label>${t('age')}</label><input name="age" type="number" min="0" required></div><div class="field"><label>${t('sex')}</label><select name="sex"><option>Femenino</option><option>Masculino</option></select></div><div class="field"><label>${t('civil')}</label><select name="civil"><option>Soltero</option><option>Casado</option><option>Unión libre</option><option>No aplica</option></select></div><div class="field"><label>${t('baptism')}</label><select name="baptized"><option value="true">${t('yes')}</option><option value="false">${t('no')}</option></select></div></div>`;else if(type==='movement')content=`<h2>${t('addMovement')}</h2><p>${t('financeSubtitlePastor')}</p><div class="field"><label>${t('description')}</label><input name="description" required></div><div class="modal-grid"><div class="field"><label>${t('income')} / ${t('expenses')}</label><select name="type"><option>${t('income')}</option><option>${t('expenses')}</option></select></div><div class="field"><label>${t('amount')}</label><input name="amount" type="number" min="1" required></div><div class="field"><label>${t('date')}</label><input name="date" type="date" value="2026-06-15"></div></div>`;else if(type==='church')content=`<h2>${t('newChurch')}</h2><p>${t('churchesSubtitle')}</p><div class="field"><label>${t('churchLabel')}</label><input name="name" required></div><div class="field"><label>${t('address')}</label><input name="address" required></div><div class="field"><label>${t('pastorLabel')}</label><input name="pastor"></div>`;else content=`<h2>${type==='teacher'?t('teachersTitle'):t('newPastor')}</h2><p>${t('pastorsSubtitle')}</p><div class="field"><label>${t('name')}</label><input name="name" required></div><div class="field"><label>${t('document')}</label><input name="id"></div><div class="field"><label>${type==='teacher'?t('campuses'):t('academic')}</label><input name="extra"></div>`;$('#modalRoot').innerHTML=`<div class="modal-backdrop"><form class="modal" id="modalForm">${content}<div class="modal-actions"><button type="button" class="secondary" id="cancelModal">${t('cancel')}</button><button class="primary">${t('save')}</button></div></form></div>`;$('#cancelModal').onclick=()=>$('#modalRoot').innerHTML='';$('#modalForm').onsubmit=e=>{e.preventDefault();let d=Object.fromEntries(new FormData(e.target));if(type==='member'){members.unshift({...d,age:Number(d.age),baptized:d.baptized==='true',church:HOME_CHURCH});filter='';notify(t('memberAdded'));if(page==='members'||page==='secretary')renderPage()}else if(type==='movement'){finance.unshift({...d,amount:Number(d.amount)});notify(t('movementAdded'));page='finance';renderPage()}else if(type==='church'){churches.push([d.name,d.address,d.pastor||'Por asignar','0']);notify(t('churchAdded'));page='churches';renderPage()}else{notify(t('save')+' ✓')}$('#modalRoot').innerHTML=''}}
function notify(msg){let n=$('#toast');n.textContent=msg;n.classList.add('show');setTimeout(()=>n.classList.remove('show'),2800)}
function exportData(type){let rows,filename;if(type==='members'){rows=[['Nombre',t('document'),t('age'),t('sex'),t('civil'),L('Asociación','Association'),t('baptism')],...members.map(m=>[m.name,m.id,m.age,m.sex,m.civil,assocName(m),m.baptized?t('yes'):t('no')])];filename='miembros-circuito.csv'}else if(type==='churches'){rows=[['Iglesia',t('address'),t('pastorLabel'),t('totalMembers')],...churches];filename='iglesias-circuito.csv'}else if(type==='finance'){rows=[['Iglesia',t('initial'),t('income'),t('expenses'),t('final')],...churches.map(c=>{let x=ledgerTotals(ensureLedger(c[0]));return [c[0],x.opening,x.income,x.expenses,x.closing]})];filename='informe-financiero.csv'}else{rows=studentCsvRows();filename='itaic-estudiantes.csv'}let csv='\uFEFF'+rows.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(';')).join('\r\n');let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download=filename;a.click();URL.revokeObjectURL(a.href);notify(t('download')+' ✓')}

// Acceso ITAIC y evaluación ponderada por curso asignado.
const itaicCourses=[
 {id:'first-central',year:'year1',campus:'Sede Central',teacher:'Pr. José Martínez',students:['1.067.245.891','1.102.834.567']},
 {id:'second-central',year:'year2',campus:'Sede Central',teacher:'Pr. José Martínez',students:['1.098.324.550']},
 {id:'third-betania',year:'year3',campus:'Sede Betania',teacher:'Ana Lucía Ríos',students:['1.004.528.311','1.056.743.220']}
];
let teacherAssignments=[{teacher:'Pr. José Martínez',course:'first-central'},{teacher:'Pr. José Martínez',course:'second-central'},{teacher:'Ana Lucía Ríos',course:'third-betania'}];
let courseAssessments={'first-central':[{name:'Taller bíblico',weight:20,grades:{'1.067.245.891':4.5,'1.102.834.567':4.2}},{name:'Examen parcial',weight:30,grades:{'1.067.245.891':4.0}}],'second-central':[{name:'Lectura',weight:25,grades:{'1.102.834.567':4.7}}],'third-betania':[{name:'Evaluación 1',weight:30,grades:{'1.004.528.311':4.4}}]};
let selectedCourseId=null;
const teacherName=()=>role==='maestro'?'Ana Lucía Ríos':churches[0][2];
const teacherCourseList=()=>sections().filter(x=>x.teacher===teacherName());
const isItaicTeacher=()=>['pastor','maestro'].includes(role)&&teacherCourseList().length>0;
const originalBindPage=baseBindPage;
function renderNav(){let list=role==='presbitero'?['dashboard','churches','finance','secretary','itaic','itaicGrades','itaicFinance','pastors']:role==='tesorero'?['dashboard','finance']:role==='secretario'?['dashboard','secretary','pastors']:role==='pastor'?['dashboard','members','finance',...(isItaicTeacher()?['itaic','itaicGrades','itaicFinance']:[])]:role==='maestro'?['dashboard','itaic','itaicGrades','itaicFinance']:['dashboard'];$('#navigation').innerHTML=list.map((key,i)=>`${i===1?'<div class="nav-sep"></div>':''}<button class="nav-item ${page===key?'active':''}" data-page="${key}"><span class="nav-icon">${navInfo[key][0]}</span>${key==='itaic'&&isItaicTeacher()?t('myCourses'):t(navInfo[key][1])}</button>`).join('');$$('.nav-item').forEach(b=>b.onclick=()=>{page=b.dataset.page;selectedCourseId=null;$('#sidebar').classList.remove('open');renderNav();renderPage()})}
function teacherSummary(course){let as=courseAssessments[course.id]||[],weight=as.reduce((n,a)=>n+a.weight,0),students=course.students.map(id=>members.find(m=>m.id===id)).filter(Boolean);return `<section class="panel teacher-course"><div class="panel-head"><div><div class="eyebrow-line">${(course.subjectName||'').toUpperCase()} · ${t(course.year).toUpperCase()} · ${course.campus}</div><h2>${t('students')} · ${students.length}</h2><p>${t('assignedOnly')}: ${course.teacher}</p></div><button class="primary" data-open-course="${course.id}">${t('openCourse')} →</button></div><div class="grade-progress"><span>${t('weightGraded')}</span><b>${weight}%</b><div class="progress-track"><i style="width:${Math.min(100,weight)}%"></i></div><small>${t('remainingWeight')}: ${100-weight}%</small></div></section>`}
function teacherHome(){let courses=teacherCourseList();if(!courses.length)return `${pageHead(t('itaic'),t('noAssignedCourses'))}<section class="panel empty">${t('noAssignedCourses')}</section>`;return `${pageHead(t('myCourses'),t('teacherWelcome'))}${courses.map(teacherSummary).join('')}`}
function weightedTotal(course,studentId){let assessments=courseAssessments[course.id]||[];return assessments.reduce((sum,a)=>sum+(Number(a.grades[studentId]||0)*a.weight/100),0)}
function coursePage(){let course=teacherCourseList().find(c=>c.id===selectedCourseId);if(!course){selectedCourseId=null;return teacherHome()}let assessments=courseAssessments[course.id]||[],weight=assessments.reduce((n,a)=>n+a.weight,0),students=course.students.map(id=>members.find(m=>m.id===id)).filter(Boolean);return `${pageHead(`${course.subjectName||''} · ${t(course.year)} · ${course.campus}`,`${t('teacherWelcome')} · ${course.teacher}`,`<button class="secondary" data-back-courses>← ${t('myCourses')}</button><button class="primary" data-modal="assessment" ${weight>=100?'disabled':''}>＋ ${t('addAssessment')}</button>`)}<div class="summary-band"><div><small>${t('students')}</small><b>${students.length}</b></div><div><small>${t('weightGraded')}</small><b>${weight}%</b></div><div><small>${t('remainingWeight')}</small><b>${100-weight}%</b></div></div><section class="panel"><div class="panel-head"><div><h2>${t('gradebook')}</h2><p>${t('weightedNote')}</p></div><button class="secondary" data-save-grades>${t('saveGrades')}</button></div><div class="table-card"><table class="data-table grade-table"><thead><tr><th>${t('student')}</th>${assessments.map(a=>`<th>${a.name}<small class="weight-label">${a.weight}%</small></th>`).join('')}<th>${t('weightedTotal')}</th><th>${t('completedWeight')}</th></tr></thead><tbody>${students.map(m=>{let got=assessments.reduce((n,a)=>n+(a.grades[m.id]!==undefined?a.weight:0),0),total=weightedTotal(course,m.id);return `<tr data-student-row="${m.id}"><td><strong>${m.name}</strong><small class="student-meta">${m.id}</small></td>${assessments.map((a,i)=>`<td><input aria-label="${a.name} · ${m.name}" class="grade-input" data-grade-course="${course.id}" data-grade-assessment="${i}" data-grade-student="${m.id}" type="number" min="0" max="5" step="0.1" value="${a.grades[m.id]??''}" placeholder="—"></td>`).join('')}<td><strong class="weighted-result">${total.toFixed(2)} / 5.00</strong></td><td><span class="status ${got<100?'pending':''}">${got}%</span></td></tr>`}).join('')}</tbody></table></div>${!assessments.length?`<div class="empty">${t('addFirstAssessment')}</div>`:''}</section>`}
function itaicAdminPage(){let actions=`<button class="secondary" data-export="students">${t('generate')} →</button><button class="primary" data-modal="teacher">＋ ${t('assignTeacher')}</button>`;let courses=itaicCourses;return `${pageHead(t('itaic'),t('itaicSubtitle'),actions)}<div class="stats-grid">${[['▣',t('students'),'48',lang==='es'?'matriculados actualmente':'currently enrolled'],['⌂',t('campuses'),'4',lang==='es'?'sedes activas':'active campuses'],['♙',t('teachersTitle'),teacherAssignments.length,lang==='es'?'asignaciones activas':'active assignments'],['✧',t('churches'),'9',lang==='es'?'iglesias participantes':'participating churches']].map(a=>`<article class="stat-card"><div class="stat-top"><span>${a[1]}</span><span class="stat-icon">${a[0]}</span></div><div class="stat-value">${a[2]}</div><div class="stat-note">${a[3]}</div></article>`).join('')}</div><section class="panel"><div class="panel-head"><div><h2>${t('courseGroups')}</h2><p>${t('courseGroupsHint')}</p></div></div>${courses.map(c=>`<div class="church-row"><div class="church-emblem">✧</div><div><b>${t(c.year)} · ${c.campus}</b><small>${t('teacherLabel')}: ${c.teacher}</small></div><div class="row-end"><b>${c.students.length}</b><small>${t('students').toLowerCase()}</small></div></div>`).join('')}</section><section class="panel"><div class="panel-head"><div><h2>${t('assignments')}</h2><p>${t('onlyPresbyterAssign')}</p></div><button class="secondary" data-modal="teacher">＋ ${t('assignTeacher')}</button></div>${teacherAssignments.map(a=>{let c=itaicCourses.find(x=>x.id===a.course);return `<div class="church-row"><div class="church-emblem">♙</div><div><b>${a.teacher}</b><small>${t(c.year)} · ${c.campus}</small></div><button class="inline-actions" data-remove-assignment="${a.course}">×</button></div>`}).join('')}</section>`}
function renderPage(){let authorized=['presbitero','pastor','maestro'].includes(role);if(page==='itaic'&&role==='presbitero'){$('#breadcrumb').textContent=t('itaic');$('#content').innerHTML=itaicAdminPage();bindPage();return}if(page==='itaic'&&authorized&&isItaicTeacher()){page='teacherHome';}if((page==='teacherHome'||page==='teacherCourse')&&authorized&&isItaicTeacher()){$('#breadcrumb').textContent=t('myCourses');$('#content').innerHTML=page==='teacherCourse'?coursePage():teacherHome();bindPage();return}if(page==='teacherHome'||page==='teacherCourse'||(page==='itaic'&&role!=='presbitero')){page='dashboard'}let title=navInfo[page]?t(navInfo[page][1]):t('dashboard');$('#breadcrumb').textContent=title;$('#content').innerHTML=page==='dashboard'?dashboard():page==='churches'?churchPage():page==='finance'?financePage():page==='secretary'||page==='members'?secretaryPage():page==='itaic'||page==='pastors'?simplePage(page):`<div class="empty">${t('noAccess')}</div>`;bindPage()}
function teacherBindPage(){originalBindPage();$$('[data-open-course]').forEach(b=>b.onclick=()=>{selectedCourseId=b.dataset.openCourse;page='teacherCourse';renderPage()});$$('[data-back-courses]').forEach(b=>b.onclick=()=>{page='teacherHome';renderPage()});$$('[data-grade-course]').forEach(input=>input.oninput=()=>{let course=input.dataset.gradeCourse,a=courseAssessments[course][Number(input.dataset.gradeAssessment)],id=input.dataset.gradeStudent;if(input.value==='')delete a.grades[id];else a.grades[id]=Math.max(0,Math.min(5,Number(input.value)));let row=input.closest('tr'),c={id:course},got=courseAssessments[course].reduce((n,x)=>n+(x.grades[id]!==undefined?x.weight:0),0);row.querySelector('.weighted-result').textContent=`${weightedTotal(c,id).toFixed(2)} / 5.00`;row.querySelector('.status').textContent=`${got}%`;row.querySelector('.status').classList.toggle('pending',got<100)});$$('[data-save-grades]').forEach(b=>b.onclick=()=>notify(t('gradesSaved')));$$('[data-modal="assessment"]').forEach(b=>b.onclick=()=>openModal('assessment'));$$('[data-modal="teacher"]').forEach(b=>{if(role!=='presbitero'&&role!=='itaic'){b.remove();return}b.onclick=()=>openModal('teacher')});$$('[data-remove-assignment]').forEach(b=>b.onclick=()=>{teacherAssignments=teacherAssignments.filter(a=>a.course!==b.dataset.removeAssignment);let c=itaicCourses.find(x=>x.id===b.dataset.removeAssignment);if(c){let replacements=teacherAssignments.filter(a=>a.teacher===c.teacher);if(!replacements.length&&c.teacher==='Pr. José Martínez')c.teacher='';}renderPage();notify(t('assignmentRemoved'))})}
const originalOpenModal=baseOpenModal;
function teacherOpenModal(type){if(type!=='teacher'&&type!=='assessment'){originalOpenModal(type);return}let content=type==='assessment'?`<h2>${t('addAssessment')}</h2><p>${t('weightRule')} ${100-(courseAssessments[selectedCourseId]||[]).reduce((n,a)=>n+a.weight,0)}%.</p><div class="field"><label>${t('assessmentName')}</label><input name="name" required></div><div class="field"><label>${t('weightPercent')}</label><input name="weight" type="number" min="1" max="${100-(courseAssessments[selectedCourseId]||[]).reduce((n,a)=>n+a.weight,0)}" required></div>`:`<h2>${t('assignTeacher')}</h2><p>${t('onlyPresbyterAssign')}</p><div class="field"><label>${t('teacherLabel')}</label><select name="teacher"><option>Pr. José Martínez</option><option>Pr. David López</option><option>Pr. Samuel Ríos</option><option>Pr. Andrés Pérez</option>${members.map(m=>`<option>${m.name}</option>`).join('')}</select></div><div class="field"><label>${t('courseYear')}</label><select name="year"><option value="year1">${t('year1')}</option><option value="year2">${t('year2')}</option><option value="year3">${t('year3')}</option></select></div><div class="field"><label>${t('campuses')}</label><select name="campus"><option>Sede Central</option><option>Sede Betania</option></select></div>`;$('#modalRoot').innerHTML=`<div class="modal-backdrop"><form class="modal" id="modalForm">${content}<div class="modal-actions"><button type="button" class="secondary" id="cancelModal">${t('cancel')}</button><button class="primary">${t('save')}</button></div></form></div>`;$('#cancelModal').onclick=()=>$('#modalRoot').innerHTML='';$('#modalForm').onsubmit=e=>{e.preventDefault();let d=Object.fromEntries(new FormData(e.target));if(type==='assessment'){let total=(courseAssessments[selectedCourseId]||[]).reduce((n,a)=>n+a.weight,0),weight=Number(d.weight);if(total+weight>100){notify(t('weightExceeded'));return}courseAssessments[selectedCourseId].push({name:d.name,weight,grades:{}});notify(t('assessmentAdded'));renderPage()}else if(role==='presbitero'){let c=itaicCourses.find(x=>x.year===d.year&&x.campus===d.campus);if(!c){c={id:`${d.year}-${Date.now()}`,year:d.year,campus:d.campus,teacher:d.teacher,students:members.map(m=>m.id)};itaicCourses.push(c);courseAssessments[c.id]=[]}teacherAssignments=teacherAssignments.filter(a=>a.course!==c.id);c.teacher=d.teacher;teacherAssignments.push({teacher:d.teacher,course:c.id});notify(t('teacherAssigned'));renderPage()}$('#modalRoot').innerHTML=''}}
// English/Spanish labels added for the teacher gradebook and assignment workflow.
Object.assign(I.es,{myCourses:'Mis cursos',teacherWelcome:'Consulta tus grupos asignados y actualiza las calificaciones.',assignedOnly:'Grupo asignado a',openCourse:'Abrir curso',weightGraded:'Porcentaje evaluado',remainingWeight:'Porcentaje pendiente',gradebook:'Registro de calificaciones',weightedNote:'Las notas se califican de 0 a 5 y se ponderan según el porcentaje definido para cada evaluación.',addAssessment:'Añadir evaluación',saveGrades:'Guardar calificaciones',weightedTotal:'Nota ponderada',completedWeight:'Peso registrado',addFirstAssessment:'Añade una evaluación para empezar a ingresar notas.',assignTeacher:'Asignar maestro',onlyPresbyterAssign:'Solo el Presbítero puede asignar maestros a una sede y año.',teacherLabel:'Maestro',courseYear:'Año de curso',weightRule:'El peso debe completar como máximo el 100%. Disponible',assessmentName:'Nombre de la evaluación',weightPercent:'Porcentaje de la nota final (%)',weightExceeded:'El total de porcentajes supera el 100%.',assessmentAdded:'Evaluación añadida.',teacherAssigned:'Maestro asignado al curso.',assignmentRemoved:'Asignación retirada.',gradesSaved:'Calificaciones guardadas.',noAssignedCourses:'No tienes cursos ITAIC asignados.'});Object.assign(I.en,{myCourses:'My courses',teacherWelcome:'View your assigned groups and update student grades.',assignedOnly:'Assigned group for',openCourse:'Open course',weightGraded:'Graded weight',remainingWeight:'Remaining weight',gradebook:'Gradebook',weightedNote:'Grades use a 0–5 scale and are weighted by the percentage set for each assessment.',addAssessment:'Add assessment',saveGrades:'Save grades',weightedTotal:'Weighted grade',completedWeight:'Recorded weight',addFirstAssessment:'Add an assessment to start entering grades.',assignTeacher:'Assign teacher',onlyPresbyterAssign:'Only the Presbyter can assign teachers to a campus and year.',teacherLabel:'Teacher',courseYear:'Course year',weightRule:'Assessment weights may total up to 100%. Available',assessmentName:'Assessment name',weightPercent:'Final grade percentage (%)',weightExceeded:'The assessment weights exceed 100%.',assessmentAdded:'Assessment added.',teacherAssigned:'Teacher assigned to course.',assignmentRemoved:'Assignment removed.',gradesSaved:'Grades saved.',noAssignedCourses:'You have no ITAIC courses assigned.'});

// ITAIC has its own administrator role and report center.
navInfo.itaicFinance=['◈','itaicFinance'];
const itaicPayments=[
 {id:'1.067.245.891',due:300000,paid:300000},{id:'1.102.834.567',due:300000,paid:150000},
 {id:'1.098.324.550',due:300000,paid:300000},{id:'1.004.528.311',due:300000,paid:0},{id:'1.056.743.220',due:300000,paid:150000}
];
let itaicCampuses=['Sede Central','Sede Betania'];
let activeReport=null;
Object.assign(I.es,{itaicFinance:'Finanzas ITAIC',itaicAdmin:'Administración del instituto',itaicSecretaryReport:'Informe general de secretaría',itaicFinanceReport:'Informe financiero ITAIC',reportingPeriod:'Periodo del informe',scopeGeneral:'Todo ITAIC · Todas las sedes',scopeCampus:'Sede',reportActions:'Descargar en Excel, Word editable o PDF',exportExcel:'Excel',exportWord:'Word editable',exportPdf:'Guardar como PDF',reportTitle:'Informe',headerAic:'Asamblea de Iglesias Cristianas (AIC)',headerCircuit:'Circuito Córdoba',general:'General',studentsByYear:'Estudiantes por año',studentsByCampus:'Estudiantes por sede',averageByGroup:'Promedio de notas por grupo',averageByCampus:'Promedio de notas por sede',topByGroup:'Mejor nota por grupo',topByCampus:'Mejor nota por sede',totalCollected:'Total recaudado',outstanding:'Pendiente por recaudar',paidAccounts:'Estudiantes a paz y salvo',owingAccounts:'Estudiantes con saldo pendiente',verifyPayments:'Verificar pagos',tuition:'Valor del periodo',paid:'Pagado',owed:'Saldo pendiente',markPayment:'Registrar pago',amountToAdd:'Valor recibido',paymentRecorded:'Pago registrado.',paymentStatus:'Estado de cuenta',paymentFullyPaid:'A paz y salvo',paymentPartial:'Saldo pendiente',itaicReports:'Informes ITAIC',studentsReport:'Informe de secretaría',allCourses:'Todos los cursos',gradesCheck:'Ver calificaciones',editAssignment:'Solo ITAIC administra cursos y asignaciones.',studentCount:'Total de estudiantes',average:'Promedio',topStudent:'Estudiante con mejor nota',notAvailable:'Sin calificaciones disponibles',reportGenerated:'Informe listo para descargar.'});
Object.assign(I.en,{itaicFinance:'ITAIC Finance',itaicAdmin:'Institute administration',itaicSecretaryReport:'General secretariat report',itaicFinanceReport:'ITAIC financial report',reportingPeriod:'Report period',scopeGeneral:'All ITAIC · All campuses',scopeCampus:'Campus',reportActions:'Download as Excel, editable Word, or PDF',exportExcel:'Excel',exportWord:'Editable Word',exportPdf:'Save as PDF',reportTitle:'Report',headerAic:'Assembly of Christian Churches (AIC)',headerCircuit:'Córdoba Circuit',general:'General',studentsByYear:'Students by year',studentsByCampus:'Students by campus',averageByGroup:'Average grades by group',averageByCampus:'Average grades by campus',topByGroup:'Top grade by group',topByCampus:'Top grade by campus',totalCollected:'Total collected',outstanding:'Outstanding balance',paidAccounts:'Students paid in full',owingAccounts:'Students with balance due',verifyPayments:'Verify payments',tuition:'Term fee',paid:'Paid',owed:'Balance due',markPayment:'Record payment',amountToAdd:'Amount received',paymentRecorded:'Payment recorded.',paymentStatus:'Account status',paymentFullyPaid:'Paid in full',paymentPartial:'Balance due',itaicReports:'ITAIC reports',studentsReport:'Secretariat report',allCourses:'All courses',gradesCheck:'Review grades',editAssignment:'Only ITAIC administers courses and teacher assignments.',studentCount:'Total students',average:'Average',topStudent:'Highest grade student',notAvailable:'No grades available',reportGenerated:'Report ready to download.'});
const reportEsc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paymentFor=id=>itaicPayments.find(p=>p.id===id)||{id,due:300000,paid:0};
const courseStudents=c=>c.students.map(id=>members.find(m=>m.id===id)).filter(Boolean);
function itaicCourseStats(courses){let rows=courses.map(c=>{let ss=courseStudents(c),avg=ss.length?ss.reduce((s,m)=>s+weightedTotal(c,m.id),0)/ss.length:0,top=ss.slice().sort((a,b)=>weightedTotal(c,b.id)-weightedTotal(c,a.id))[0];return {course:c,students:ss,avg,top,topGrade:top?weightedTotal(c,top.id):null}});return rows}
function itaicReportRows(kind,scope){let courses=itaicCourses.filter(c=>scope==='General'||c.campus===scope),groups=itaicCourseStats(courses),unique=[...new Set(courses.flatMap(c=>c.students))],pays=unique.map(paymentFor),sumDue=pays.reduce((a,p)=>a+p.due,0),sumPaid=pays.reduce((a,p)=>a+p.paid,0),fully=pays.filter(p=>p.paid>=p.due).length,owing=pays.filter(p=>p.paid<p.due).length,rows=[];if(kind==='itaic-finance'){rows=[['Indicador','Resultado'],[t('studentCount'),unique.length],[t('tuition')+' · '+t('allCourses'),sumDue],[t('totalCollected'),sumPaid],[t('outstanding'),sumDue-sumPaid],[t('paidAccounts'),fully],[t('owingAccounts'),owing],['Detalle por estudiante',''],...unique.map(id=>{let m=members.find(x=>x.id===id),p=paymentFor(id);return [m?.name||id,`${t('paid')}: ${p.paid} · ${t('owed')}: ${p.due-p.paid} · ${p.paid>=p.due?t('paymentFullyPaid'):t('paymentPartial')}`]})];return rows}rows=[['Indicador','Grupo / sede','Resultado'],[t('studentCount'),scope,unique.length]];for(let g of groups)rows.push([t('studentsByYear'),`${t(g.course.year)} · ${g.course.campus}`,g.students.length]);for(let campus of [...new Set(courses.map(c=>c.campus))]){let cs=courses.filter(c=>c.campus===campus),ids=[...new Set(cs.flatMap(c=>c.students))];rows.push([t('studentsByCampus'),campus,ids.length]);let vals=cs.flatMap(c=>c.students.map(id=>weightedTotal(c,id)));rows.push([t('averageByCampus'),campus,vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(2):t('notAvailable')])}for(let g of groups){rows.push([t('averageByGroup'),`${t(g.course.year)} · ${g.course.campus}`,g.students.length?g.avg.toFixed(2):t('notAvailable')]);rows.push([t('topByGroup'),`${t(g.course.year)} · ${g.course.campus}`,g.top?`${g.top.name} · ${g.topGrade.toFixed(2)}`:t('notAvailable')])}for(let campus of [...new Set(courses.map(c=>c.campus))]){let cs=courses.filter(c=>c.campus===campus),entries=cs.flatMap(c=>c.students.map(id=>({m:members.find(x=>x.id===id),grade:weightedTotal(c,id)}))).filter(x=>x.m).sort((a,b)=>b.grade-a.grade),grades=entries.map(x=>x.grade);rows.push([t('topByCampus'),campus,entries[0]?`${entries[0].m.name} · ${entries[0].grade.toFixed(2)}`:t('notAvailable')]);rows.push([t('averageByCampus'),campus,grades.length?(grades.reduce((a,b)=>a+b,0)/grades.length).toFixed(2):t('notAvailable')])}return rows}
function reportHeader(kind,scope){let lines=[t('headerAic'),t('headerCircuit')];if(kind.startsWith('itaic'))lines.push(scope==='General'?'ITAIC':`ITAIC · ${scope}`);else if(role==='pastor')lines.push('Iglesia Central');return lines}
function reportRows(kind,scope){if(kind.startsWith('itaic'))return itaicReportRows(kind,scope);if(kind==='finance'){return [['Iglesia',t('initial'),t('income'),t('expenses'),t('final')],...(role==='pastor'?[churches[0]]:churches).map((c,i)=>[c[0],1800000+i*380000,2450000-i*260000,1130000-i*110000,3120000+i*230000])]}if(kind==='secretary'){if(role==='pastor')return [['Nombre',t('document'),t('age'),t('sex'),t('civil'),L('Asociación','Association'),t('baptism')],...members.map(m=>[m.name,m.id,m.age,m.sex,m.civil,assocName(m),m.baptized?t('yes'):t('no')])];return [['Iglesia',t('totalMembers'),t('baptized'),t('women'),t('men'),t('children')],...churches.map((c,i)=>[c[0],c[3],Math.round(Number(c[3])*.74),Math.round(Number(c[3])*.56),Math.round(Number(c[3])*.44),Math.round(Number(c[3])*.15)])]}return [['Nombre',t('document'),t('age'),t('sex'),t('civil'),L('Asociación','Association'),t('baptism')],...members.map(m=>[m.name,m.id,m.age,m.sex,m.civil,assocName(m),m.baptized?t('yes'):t('no')])]}
function reportScopeName(kind,scope){return kind.startsWith('itaic')?(scope==='General'?'ITAIC':`ITAIC · ${scope}`):role==='pastor'?'Iglesia Central':t('general')}
function reportHtml(kind,scope){let title=kind==='itaic-finance'?t('itaicFinanceReport'):kind==='itaic-secretary'?t('itaicSecretaryReport'):kind==='finance'?t('finance'):t('secretary'),headers=reportHeader(kind,scope),rows=reportRows(kind,scope),body=rows.map((r,i)=>`<tr>${r.map(v=>i===0?`<th>${reportEsc(v)}</th>`:`<td>${reportEsc(v)}</td>`).join('')}</tr>`).join('');return `<article class="formal-report"><header class="report-letterhead"><div class="report-seal">AIC</div><div><b>${reportEsc(headers[0])}</b><span>${reportEsc(headers[1])}</span>${headers[2]?`<span>${reportEsc(headers[2])}</span>`:''}</div></header><h1>${reportEsc(title)}</h1><p class="report-date">${reportEsc(t('reportingPeriod'))}: ${new Date().toLocaleDateString(lang==='es'?'es-CO':'en-US')}</p><table class="formal-table">${body}</table><footer>${reportEsc(t('headerAic'))} · ${reportEsc(t('headerCircuit'))}</footer></article>`}
function openReportBuilder(kind){activeReport=kind;let scopes=['General',...new Set(itaicCourses.map(c=>c.campus))],isItaic=kind.startsWith('itaic');let html=reportHtml(kind,isItaic?'General':reportScopeName(kind,'General'));$('#modalRoot').innerHTML=`<div class="modal-backdrop"><section class="modal report-modal"><div class="panel-head"><div><h2>${t('reportTitle')} · ${kind.includes('finance')?t('finance'):t('secretary')}</h2><p>${t('reportActions')}</p></div><button class="inline-actions" id="closeReport">×</button></div>${isItaic?`<div class="field"><label>${t('scopeCampus')}</label><select id="reportScope">${scopes.map(s=>`<option>${s==='General'?t('scopeGeneral'):s}</option>`).join('')}</select></div>`:''}<div id="reportPreview">${html}</div><div class="modal-actions report-actions"><button class="secondary" data-report-format="excel">${t('exportExcel')}</button><button class="secondary" data-report-format="word">${t('exportWord')}</button><button class="primary" data-report-format="pdf">${t('exportPdf')}</button></div></section></div>`;$('#closeReport').onclick=()=>$('#modalRoot').innerHTML='';const scopeValue=()=>{let v=$('#reportScope')?.value||'General';return v===t('scopeGeneral')?'General':v};$('#reportScope')?.addEventListener('change',()=>{$('#reportPreview').innerHTML=reportHtml(kind,scopeValue())});$$('[data-report-format]').forEach(b=>b.onclick=()=>exportFormalReport(kind,scopeValue(),b.dataset.reportFormat))}
function exportFormalReport(kind,scope,format){let title=reportTitleFor(kind,scope,kind==='itaic-finance'?t('itaicFinanceReport'):kind==='itaic-secretary'?t('itaicSecretaryReport'):kind==='finance'?t('finance'):t('secretary')),html=reportHtml(kind,scope),rows=reportRows(kind,scope),safeTitle=title.toLowerCase().replace(/[^a-z0-9]+/gi,'-');if(format==='pdf'){let w=window.open('','_blank');if(!w){notify('Permite las ventanas emergentes para imprimir el informe.');return}w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${reportEsc(title)}</title><style>${document.querySelector('style')?.textContent||''}body{font:14px Arial;padding:30px}.formal-report{max-width:900px;margin:auto}.report-letterhead{display:flex;gap:15px;border-bottom:2px solid #174b41;padding-bottom:15px}.report-letterhead span{display:block;margin-top:5px}.formal-table{width:100%;border-collapse:collapse}.formal-table td,.formal-table th{border:1px solid #d8e0dc;padding:8px;text-align:left}.formal-report footer{margin-top:35px;border-top:1px solid #ccc;padding-top:10px}@page{margin:20mm}</style></head><body>${html}<script>onload=()=>setTimeout(()=>print(),300)<\/script></body></html>`);w.document.close();return}if(format==='word'){exportDocx(kind,scope,title,safeTitle);return}let body=`<html><head><meta charset="utf-8"><title>${reportEsc(title)}</title><style>body{font-family:Arial;color:#1b2c27}.report-letterhead{border-bottom:2px solid #174b41;padding:0 0 12px;margin-bottom:20px}.report-letterhead span{display:block;margin-top:4px}.report-seal{font-weight:bold;color:#174b41}.formal-report h1{font-size:22px}.report-date{color:#65756e}.formal-table{border-collapse:collapse;width:100%}.formal-table td,.formal-table th{border:1px solid #cbd5cf;padding:8px;text-align:left}.formal-report footer{margin-top:30px;border-top:1px solid #ccc;padding-top:8px}</style></head><body>${html}</body></html>`;let mime= format==='excel'?'application/vnd.ms-excel':'application/msword',ext=format==='excel'?'xls':'doc';downloadFile(body,`${safeTitle}.`+ext,mime);notify(t('reportGenerated'))}
function downloadFile(content,name,mime){let blob=new Blob([content],{type:`${mime};charset=utf-8`}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function itaicFinancePage(){let totalDue=itaicPayments.reduce((a,p)=>a+p.due,0),collected=itaicPayments.reduce((a,p)=>a+p.paid,0),paid=itaicPayments.filter(p=>p.paid>=p.due).length,owing=itaicPayments.length-paid;return `${pageHead(t('itaicFinance'),t('itaicFinanceReport'),`<button class="secondary" data-report="itaic-finance">${t('generate')} →</button>`)}${stats([['◈',t('totalCollected'),`$${collected.toLocaleString('es-CO')}`,t('paid')],['◌',t('outstanding'),`$${(totalDue-collected).toLocaleString('es-CO')}`,t('owed')],['✓',t('paidAccounts'),paid,t('paymentFullyPaid')],['!',t('owingAccounts'),owing,t('paymentPartial')]])}<section class="table-card"><div class="table-tools"><b>${t('verifyPayments')}</b></div><table class="data-table"><thead><tr><th>${t('student')}</th><th>${t('tuition')}</th><th>${t('paid')}</th><th>${t('owed')}</th><th>${t('paymentStatus')}</th><th></th></tr></thead><tbody>${itaicPayments.map(p=>{let m=members.find(x=>x.id===p.id),due=p.due-p.paid;return `<tr><td><strong>${m?.name||p.id}</strong></td><td>$${p.due.toLocaleString('es-CO')}</td><td>$${p.paid.toLocaleString('es-CO')}</td><td>$${due.toLocaleString('es-CO')}</td><td><span class="status ${due?'pending':''}">${due?t('paymentPartial'):t('paymentFullyPaid')}</span></td><td>${role==='itaic'?`<button class="secondary" data-payment-student="${p.id}">${t('markPayment')}</button>`:''}</td></tr>`}).join('')}</tbody></table></section>`}
function itaicAdminPage(){let canManage=role==='itaic',actions=`<button class="secondary" data-report="itaic-secretary">${t('studentsReport')} · ${t('generate')}</button>${canManage?`<button class="primary" data-modal="teacher">＋ ${t('assignTeacher')}</button>`:''}`;return `${pageHead(t('itaic'),t('itaicAdmin'),actions)}<div class="stats-grid">${[['▣',t('students'),'5',t('registered')],['⌂',t('campuses'),'2',lang==='es'?'sedes activas':'active campuses'],['♙',t('teachersTitle'),teacherAssignments.length,lang==='es'?'asignaciones activas':'active assignments'],['◈',t('totalCollected'),`$${itaicPayments.reduce((n,p)=>n+p.paid,0).toLocaleString('es-CO')}`,t('itaicFinance')]].map(a=>`<article class="stat-card"><div class="stat-top"><span>${a[1]}</span><span class="stat-icon">${a[0]}</span></div><div class="stat-value">${a[2]}</div><div class="stat-note">${a[3]}</div></article>`).join('')}</div><section class="panel"><div class="panel-head"><div><h2>${t('courseGroups')}</h2><p>${t('courseGroupsHint')}</p></div><button class="secondary" data-go="itaicFinance">${t('itaicFinance')} →</button></div>${itaicCourses.map(c=>`<div class="church-row"><div class="church-emblem">✧</div><div><b>${t(c.year)} · ${c.campus}</b><small>${t('teacherLabel')}: ${c.teacher||t('select')}</small></div><div class="row-end"><b>${c.students.length}</b><small>${t('students').toLowerCase()}</small></div><button class="text-link" data-admin-course="${c.id}">${t('gradesCheck')} →</button></div>`).join('')}</section><section class="panel"><div class="panel-head"><div><h2>${t('assignments')}</h2><p>${t('editAssignment')}</p></div>${canManage?`<button class="secondary" data-modal="teacher">＋ ${t('assignTeacher')}</button>`:''}</div>${teacherAssignments.map(a=>{let c=itaicCourses.find(x=>x.id===a.course);return `<div class="church-row"><div class="church-emblem">♙</div><div><b>${a.teacher}</b><small>${t(c.year)} · ${c.campus}</small></div>${canManage?`<button class="inline-actions" data-remove-assignment="${a.course}">×</button>`:''}</div>`}).join('')}</section>`}
function renderNav(){let list=role==='presbitero'?['dashboard','churches','finance','secretary','itaic','itaicGrades','itaicFinance','pastors']:role==='tesorero'?['dashboard','finance']:role==='secretario'?['dashboard','secretary','pastors']:role==='pastor'?['dashboard','members','finance',...(isItaicTeacher()?['itaic','itaicGrades','itaicFinance']:[])]:role==='maestro'?['dashboard','itaic','itaicGrades','itaicFinance']:role==='itaic'?['dashboard','itaic','itaicGrades','itaicFinance']:['dashboard'];$('#navigation').innerHTML=list.map((key,i)=>`<button class="nav-item ${page===key?'active':''}" data-page="${key}"><span class="nav-icon">${navInfo[key][0]}</span>${key==='itaic'&&isItaicTeacher()?t('myCourses'):t(navInfo[key][1])}</button>`).join('');$$('.nav-item').forEach(b=>b.onclick=()=>{page=b.dataset.page;selectedCourseId=null;$('#sidebar').classList.remove('open');renderNav();renderPage()})}
function coursePage(){let course=(role==='itaic'||role==='presbitero'?itaicCourses:teacherCourseList()).find(c=>c.id===selectedCourseId);if(!course)return teacherHome();let assessments=courseAssessments[course.id]||[],weight=assessments.reduce((n,a)=>n+a.weight,0),students=courseStudents(course),editable=['maestro','pastor'].includes(role)&&teacherCourseList().some(c=>c.id===course.id);return `${pageHead(`${course.subjectName||''} · ${t(course.year)} · ${course.campus}`,`${t('teacherWelcome')} · ${course.teacher}`,`<button class="secondary" data-back-courses>← ${role==='itaic'?t('itaic'):t('myCourses')}</button>${editable?`<button class="primary" data-modal="assessment" ${weight>=100?'disabled':''}>＋ ${t('addAssessment')}</button>`:''}`)}<div class="summary-band"><div><small>${t('students')}</small><b>${students.length}</b></div><div><small>${t('weightGraded')}</small><b>${weight}%</b></div><div><small>${t('remainingWeight')}</small><b>${100-weight}%</b></div></div><section class="panel"><div class="panel-head"><div><h2>${t('gradebook')}</h2><p>${t('weightedNote')}</p></div>${editable?`<button class="secondary" data-save-grades>${t('saveGrades')}</button>`:''}</div><div class="table-card"><table class="data-table grade-table"><thead><tr><th>${t('student')}</th>${assessments.map(a=>`<th>${a.name}<small class="weight-label">${a.weight}%</small></th>`).join('')}<th>${t('weightedTotal')}</th><th>${t('completedWeight')}</th></tr></thead><tbody>${students.map(m=>{let got=assessments.reduce((n,a)=>n+(a.grades[m.id]!==undefined?a.weight:0),0),total=weightedTotal(course,m.id);return `<tr><td><strong>${m.name}</strong><small class="student-meta">${m.id}</small></td>${assessments.map((a,i)=>`<td>${editable?`<input aria-label="${a.name} · ${m.name}" class="grade-input" data-grade-course="${course.id}" data-grade-assessment="${i}" data-grade-student="${m.id}" type="number" min="0" max="5" step="0.1" value="${a.grades[m.id]??''}" placeholder="—">`:(a.grades[m.id]??'—')}</td>`).join('')}<td><strong class="weighted-result">${total.toFixed(2)} / 5.00</strong></td><td><span class="status ${got<100?'pending':''}">${got}%</span></td></tr>`}).join('')}</tbody></table></div></section>`}
function previousRenderPage(){if(page==='itaic'&&['itaic','presbitero'].includes(role)){$('#breadcrumb').textContent=t('itaic');$('#content').innerHTML=itaicAdminPage();bindPage();return}if(page==='itaicFinance'&&role==='itaic'){$('#breadcrumb').textContent=t('itaicFinance');$('#content').innerHTML=itaicFinancePage();bindPage();return}if(page==='itaic'&&isItaicTeacher())page='teacherHome';if((page==='teacherHome'||page==='teacherCourse')&&(['itaic','presbitero'].includes(role)||isItaicTeacher())){$('#breadcrumb').textContent=page==='teacherCourse'?t('gradesCheck'):t('myCourses');$('#content').innerHTML=page==='teacherCourse'?coursePage():teacherHome();bindPage();return}if(page==='teacherHome'||page==='teacherCourse'||(page==='itaic'&&role!=='presbitero'&&role!=='itaic'))page='dashboard';if(page==='dashboard'){let title=t('dashboard');$('#breadcrumb').textContent=title;$('#content').innerHTML=role==='itaic'?`${pageHead(t('itaicAdmin'),t('itaicSubtitle'))}<section class="panel"><div class="toolbar"><button class="primary" data-go="itaic">${t('itaic')} →</button><button class="secondary" data-go="itaicFinance">${t('itaicFinance')} →</button></div></section>`:dashboard()}else if(page==='itaic'){return renderPage()}else if(page==='itaicFinance'){page='dashboard';return renderPage()}else{let title=navInfo[page]?t(navInfo[page][1]):t('dashboard');$('#breadcrumb').textContent=title;$('#content').innerHTML=page==='churches'?churchPage():page==='finance'?financePage():page==='secretary'||page==='members'?secretaryPage():page==='pastors'?simplePage(page):`<div class="empty">${t('noAccess')}</div>`}bindPage()}
function bindPage(){if(page==='itaic'&&['itaic','presbitero'].includes(role)){ $$('[data-go="itaicFinance"]').forEach(b=>b.onclick=()=>{page='itaicFinance';renderPage()});$$('[data-modal="teacher"]').forEach(b=>{if(role==='itaic')b.onclick=()=>openModal('teacher');else b.remove()});$$('[data-report]').forEach(b=>b.onclick=()=>openReportBuilder(b.dataset.report));$$('[data-admin-course]').forEach(b=>b.onclick=()=>{selectedCourseId=b.dataset.adminCourse;page='teacherCourse';renderPage()});$$('[data-remove-assignment]').forEach(b=>b.onclick=()=>{if(role!=='itaic')return;let id=b.dataset.removeAssignment;teacherAssignments=teacherAssignments.filter(a=>a.course!==id);let c=itaicCourses.find(x=>x.id===id);if(c)c.teacher='';renderPage()});return}originalBindPage();$$('[data-do="report"]').forEach(b=>b.onclick=()=>openReportBuilder(page==='finance'?'finance':'secretary'));$$('[data-report]').forEach(b=>b.onclick=()=>openReportBuilder(b.dataset.report));$$('[data-open-course]').forEach(b=>b.onclick=()=>{selectedCourseId=b.dataset.openCourse;page='teacherCourse';renderPage()});$$('[data-payment-student]').forEach(b=>b.onclick=()=>openModal('payment',b.dataset.paymentStudent));$$('[data-go="itaicFinance"]').forEach(b=>b.onclick=()=>{page='itaicFinance';renderPage()});}
function openModal(type,studentId){if(type==='teacher'){if(role!=='itaic'){notify(t('editAssignment'));return}let content=`<h2>${t('assignTeacher')}</h2><p>${t('editAssignment')}</p><div class="field"><label>${t('teacherLabel')}</label><select name="teacher"><option>Pr. José Martínez</option><option>Pr. David López</option><option>Pr. Samuel Ríos</option><option>Pr. Andrés Pérez</option>${members.map(m=>`<option>${m.name}</option>`).join('')}</select></div><div class="field"><label>${t('courseYear')}</label><select name="year"><option value="year1">${t('year1')}</option><option value="year2">${t('year2')}</option><option value="year3">${t('year3')}</option></select></div><div class="field"><label>${t('campuses')}</label><select name="campus"><option>Sede Central</option><option>Sede Betania</option></select></div>`;showModalForm(content,d=>{let c=itaicCourses.find(x=>x.year===d.year&&x.campus===d.campus);if(!c){c={id:`${d.year}-${Date.now()}`,year:d.year,campus:d.campus,teacher:d.teacher,students:members.map(m=>m.id)};itaicCourses.push(c);courseAssessments[c.id]=[]}teacherAssignments=teacherAssignments.filter(a=>a.course!==c.id);c.teacher=d.teacher;teacherAssignments.push({teacher:d.teacher,course:c.id});notify(t('teacherAssigned'));renderPage()});return}if(type==='assessment'){if(!['maestro','pastor'].includes(role)||!teacherCourseList().some(c=>c.id===selectedCourseId))return;let max=100-(courseAssessments[selectedCourseId]||[]).reduce((n,a)=>n+a.weight,0),content=`<h2>${t('addAssessment')}</h2><p>${t('weightRule')} ${max}%.</p><div class="field"><label>${t('assessmentName')}</label><input name="name" required></div><div class="field"><label>${t('weightPercent')}</label><input name="weight" type="number" min="1" max="${max}" required></div>`;showModalForm(content,d=>{let total=(courseAssessments[selectedCourseId]||[]).reduce((n,a)=>n+a.weight,0),weight=Number(d.weight);if(total+weight>100){notify(t('weightExceeded'));return}courseAssessments[selectedCourseId].push({name:d.name,weight,grades:{}});notify(t('assessmentAdded'));renderPage()});return}if(type==='payment'){if(role!=='presbitero')return;let id=studentId,p=paymentFor(id),m=members.find(x=>x.id===id),content=`<h2>${t('markPayment')}</h2><p>${m?.name||id} · ${t('owed')}: $${(p.due-p.paid).toLocaleString('es-CO')}</p><div class="field"><label>${t('amountToAdd')}</label><input name="amount" type="number" min="1" max="${p.due-p.paid}" required></div>`;showModalForm(content,d=>{p.paid=Math.min(p.due,p.paid+Number(d.amount));notify(t('paymentRecorded'));renderPage()});return}originalOpenModal(type)}
const openModalBeforeCampus=teacherOpenModal;const bindPageBeforeCampus=teacherBindPage;
function campusOpenModal(type,studentId){if(type==='campus'){if(role!=='presbitero')return;showModalForm(`<h2>${t('addCampus')}</h2><p>${t('itaicSubtitle')}</p><div class="field"><label>${t('campusName')}</label><input name="name" required></div>`,d=>{let name=d.name.trim();if(name&&!itaicCampuses.includes(name)){itaicCampuses.push(name);notify(t('campusAdded'));renderPage()}});return}openModalBeforeCampus(type,studentId);if(type==='teacher'){let select=$('#modalForm select[name="campus"]');if(select)select.innerHTML=itaicCampuses.map(c=>`<option>${reportEsc(c)}</option>`).join('')}}
function campusBindPage(){bindPageBeforeCampus();if(page==='itaic'&&role==='itaic'){$$('[data-modal="campus"]').forEach(b=>b.onclick=()=>openModal('campus'));$$('[data-remove-campus]').forEach(b=>b.onclick=()=>{if(role!=='itaic')return;let name=b.dataset.removeCampus;itaicCampuses=itaicCampuses.filter(c=>c!==name);let removed=itaicCourses.filter(c=>c.campus===name).map(c=>c.id);itaicCourses.splice(0,itaicCourses.length,...itaicCourses.filter(c=>c.campus!==name));teacherAssignments=teacherAssignments.filter(a=>!removed.includes(a.course));removed.forEach(id=>delete courseAssessments[id]);renderPage()})}}
function itaicAdminPage(){let canManage=role==='itaic',actions=`<button class="secondary" data-report="itaic-secretary">${t('studentsReport')} · ${t('generate')}</button>${canManage?`<button class="primary" data-modal="teacher">＋ ${t('assignTeacher')}</button>`:''}`;return `${pageHead(t('itaic'),t('itaicAdmin'),actions)}<div class="stats-grid">${[['▣',t('students'),'5',t('registered')],['⌂',t('campuses'),itaicCampuses.length,lang==='es'?'sedes activas':'active campuses'],['♙',t('teachersTitle'),teacherAssignments.length,lang==='es'?'asignaciones activas':'active assignments'],['◈',t('totalCollected'),`$${itaicPayments.reduce((n,p)=>n+p.paid,0).toLocaleString('es-CO')}`,t('itaicFinance')]].map(a=>`<article class="stat-card"><div class="stat-top"><span>${a[1]}</span><span class="stat-icon">${a[0]}</span></div><div class="stat-value">${a[2]}</div><div class="stat-note">${a[3]}</div></article>`).join('')}</div><section class="panel"><div class="panel-head"><div><h2>${t('courseGroups')}</h2><p>${t('courseGroupsHint')}</p></div><button class="secondary" data-go="itaicFinance">${t('itaicFinance')} →</button></div>${itaicCourses.map(c=>`<div class="church-row"><div class="church-emblem">✧</div><div><b>${t(c.year)} · ${c.campus}</b><small>${t('teacherLabel')}: ${c.teacher||t('select')}</small></div><div class="row-end"><b>${c.students.length}</b><small>${t('students').toLowerCase()}</small></div><button class="text-link" data-admin-course="${c.id}">${t('gradesCheck')} →</button></div>`).join('')}</section><section class="panel"><div class="panel-head"><div><h2>${t('campuses')}</h2><p>${t('campusManagement')}</p></div>${canManage?`<button class="secondary" data-modal="campus">＋ ${t('addCampus')}</button>`:''}</div>${itaicCampuses.map(name=>`<div class="church-row"><div class="church-emblem">⌂</div><div><b>${name}</b><small>${itaicCourses.filter(c=>c.campus===name).length} ${t('courseGroups').toLowerCase()}</small></div>${canManage?`<button class="inline-actions" data-remove-campus="${reportEsc(name)}">×</button>`:''}</div>`).join('')}</section><section class="panel"><div class="panel-head"><div><h2>${t('assignments')}</h2><p>${t('editAssignment')}</p></div>${canManage?`<button class="secondary" data-modal="teacher">＋ ${t('assignTeacher')}</button>`:''}</div>${teacherAssignments.map(a=>{let c=itaicCourses.find(x=>x.id===a.course);return c?`<div class="church-row"><div class="church-emblem">♙</div><div><b>${a.teacher}</b><small>${t(c.year)} · ${c.campus}</small></div>${canManage?`<button class="inline-actions" data-remove-assignment="${a.course}">×</button>`:''}</div>`:''}).join('')}</section>`}
Object.assign(I.es,{addCampus:'Añadir sede',campusName:'Nombre de la sede',campusAdded:'Sede añadida.',campusManagement:'Sedes disponibles para organizar grupos ITAIC.'});Object.assign(I.en,{addCampus:'Add campus',campusName:'Campus name',campusAdded:'Campus added.',campusManagement:'Campuses available for ITAIC groups.'});
document.addEventListener('click',e=>{let report=e.target.closest('[data-report]');if(report){openReportBuilder(report.dataset.report);return}let group=e.target.closest('[data-admin-course]');if(group){selectedCourseId=group.dataset.adminCourse;page='teacherCourse';renderPage()}});
courseAssessments['second-central'][0].grades['1.098.324.550']=4.7;delete courseAssessments['second-central'][0].grades['1.102.834.567'];
Object.assign(I.es,{financialReportTitle:'Informe financiero',generalReportTitle:'Informe general'});Object.assign(I.en,{financialReportTitle:'Financial report',generalReportTitle:'General report'});
let localAgeRanges={childrenMax:8,juvenilesMax:15,youthMax:30};
members.push({name:'Camilo Andrés Pérez',id:'1.111.222.333',age:19,sex:'Masculino',civil:'Soltero',baptized:false,church:'Iglesia Central'});
let itaicEnrollmentRequests=[];
function renderNav(){let list=role==='presbitero'?['dashboard','churches','finance','secretary','itaic','itaicGrades','itaicFinance','pastors']:role==='tesorero'?['dashboard','finance']:role==='secretario'?['dashboard','secretary','pastors']:role==='pastor'?['dashboard','members','finance','itaic',...(teacherCourseList().length?['itaicGrades','itaicFinance']:[])]:role==='maestro'?['dashboard','itaic','itaicGrades','itaicFinance']:role==='itaic'?['dashboard','itaic','itaicGrades','itaicFinance']:['dashboard'];$('#navigation').innerHTML=list.map((key,i)=>`<button class="nav-item ${page===key?'active':''}" data-page="${key}"><span class="nav-icon">${navInfo[key][0]}</span>${key==='itaic'&&role==='pastor'?(lang==='es'?'ITAIC · Inscripciones': 'ITAIC · Enrollment'):key==='itaic'&&isItaicTeacher()?t('myCourses'):t(navInfo[key][1])}</button>`).join('');$$('.nav-item').forEach(b=>b.onclick=()=>{page=b.dataset.page;selectedCourseId=null;$('#sidebar').classList.remove('open');renderNav();renderPage()})}
Object.assign(I.es,{no:'No bautizado',ageGroups:'Miembros por grupo de edad',editAgeRanges:'Establecer rangos',childrenRange:'Niños · desde 1 año hasta',juvenilesRange:'Juveniles · hasta',youthRange:'Jóvenes · hasta',ladiesGentlemen:'Damas y caballeros',noBaptism:'No bautizados',generalReport:'Informe general'});Object.assign(I.en,{ageGroups:'Members by age group',editAgeRanges:'Set age ranges',childrenRange:'Children · from age 1 to',juvenilesRange:'Juveniles · through age',youthRange:'Youth · through age',ladiesGentlemen:'Women and men',noBaptism:'Not baptized',generalReport:'General report'});
function memberAgeCategory(m){let age=Number(m.age),married=['Casado','Unión libre','Married','Common-law'].includes(m.civil),female=['Femenino','Female'].includes(m.sex);if(age>=1&&age<=localAgeRanges.childrenMax)return 'Niños';if(age<=localAgeRanges.juvenilesMax)return 'Juveniles';if(age<=localAgeRanges.youthMax&&!married)return 'Jóvenes';return female?'Damas':'Caballeros'}
function pastorDashboard(){let local=members.filter(m=>m.church===HOME_CHURCH),baptized=local.filter(m=>m.baptized).length,unbaptized=local.length-baptized,groups=['Niños','Juveniles','Jóvenes','Damas','Caballeros'],counts=Object.fromEntries(groups.map(g=>[g,local.filter(m=>memberAgeCategory(m)===g).length]));return `${pageHead(HOME_CHURCH,'Circuito Córdoba · Calle 15 # 8-42 · Montería')} ${stats([['♙',t('totalMembers'),local.length,t('membersSubtitle')],['✧',t('baptized'),baptized,lang==='es'?'Miembros bautizados':'Baptized members'],['○',t('noBaptism'),unbaptized,lang==='es'?'Miembros pendientes de bautismo':'Not baptized'],['◈',t('balance'),'$3.120.000',t('thisMonth')]])}<section class="panel"><div class="panel-head"><div><h2>${t('ageGroups')}</h2><p>${t('childrenRange')} ${localAgeRanges.childrenMax} · Juveniles ${localAgeRanges.childrenMax+1}–${localAgeRanges.juvenilesMax} · Jóvenes ${localAgeRanges.juvenilesMax+1}–${localAgeRanges.youthMax} · Damas/caballeros según edad, sexo y estado civil</p></div><button class="secondary" data-modal="ageRanges">${t('editAgeRanges')}</button></div><div class="summary-band">${groups.map((g,i)=>`<div><small>${g}</small><b>${counts[g]}</b></div>`).join('')}</div><div class="table-card"><table class="data-table"><thead><tr><th>${t('member')}</th><th>${t('age')}</th><th>${t('civil')}</th><th>${t('sex')}</th><th>${lang==='es'?'Grupo':'Group'}</th><th>${t('baptism')}</th></tr></thead><tbody>${local.map(m=>`<tr><td><strong>${m.name}</strong></td><td>${m.age}</td><td>${m.civil}</td><td>${m.sex}</td><td>${memberAgeCategory(m)}</td><td>${m.baptized?t('yes'):t('noBaptism')}</td></tr>`).join('')}</tbody></table></div></section><div class="grid-2"><section class="panel"><div class="panel-head"><div><h2>${lang==='es'?'Datos de mi iglesia':'My church details'}</h2><p>${t('pastorLabel')}: Pr. José Martínez</p></div></div><div class="church-row"><div class="church-emblem">⌂</div><div><b>${HOME_CHURCH}</b><small>${churches[0][1]}</small></div><div class="row-end"><b>$3.120.000</b><small>${t('balance')}</small></div></div></section><section class="panel"><div class="panel-head"><div><h2>${lang==='es'?'Actividad local':'Local activity'}</h2><p>${lang==='es'?'Actividad reciente de la iglesia':'Recent church activity'}</p></div></div><div class="activity-row"><div class="activity-dot">♙</div><div><b>${lang==='es'?'Miembros registrados':'Members registered'}</b><small>${local.length} ${t('membersLabel')}</small></div></div><div class="activity-row"><div class="activity-dot">◈</div><div><b>${lang==='es'?'Saldo del periodo':'Current period balance'}</b><small>$3.120.000</small></div></div></section></div>`}
const priorCampusOpenModal=campusOpenModal;function openModal(type,studentId){if(type!=='ageRanges'){if(type==='campus'&&role!=='presbitero')return;return priorCampusOpenModal(type,studentId)}if(role!=='pastor')return;let content=`<h2>${t('editAgeRanges')}</h2><p>${lang==='es'?'Los rangos se aplican automáticamente a los miembros de Iglesia Central.':'Ranges apply to members of Central Church.'}</p><div class="field"><label>${t('childrenRange')} (1–)</label><input name="childrenMax" type="number" min="1" value="${localAgeRanges.childrenMax}" required></div><div class="field"><label>Juveniles · ${Number(localAgeRanges.childrenMax)+1}–</label><input name="juvenilesMax" type="number" min="${localAgeRanges.childrenMax+1}" value="${localAgeRanges.juvenilesMax}" required></div><div class="field"><label>Jóvenes · ${Number(localAgeRanges.juvenilesMax)+1}–</label><input name="youthMax" type="number" min="${localAgeRanges.juvenilesMax+1}" value="${localAgeRanges.youthMax}" required></div><p class="muted">${lang==='es'?'Los menores de 30 años casados o en unión libre y las personas mayores del rango juvenil se clasifican como damas o caballeros según sexo.':'Married people under 30 and people above the youth range are classified as women or men by sex.'}</p>`;showModalForm(content,d=>{let c=Number(d.childrenMax),j=Number(d.juvenilesMax),y=Number(d.youthMax);if(c<1||j<=c||y<=j){notify(lang==='es'?'Define rangos consecutivos y sin superposición.':'Set consecutive, non-overlapping ranges.');return}localAgeRanges={childrenMax:c,juvenilesMax:j,youthMax:y};renderPage()})}
function itaicAdminPage(){let canManage=role==='presbitero',actions=`<button class="secondary" data-report="itaic-secretary">${t('studentsReport')} · ${t('generate')}</button>${canManage?`<button class="primary" data-modal="teacher">＋ ${t('assignTeacher')}</button>`:''}`;return `${pageHead(t('itaic'),t('itaicAdmin'),actions)}<div class="stats-grid">${[['▣',t('students'),'5',t('registered')],['⌂',t('campuses'),itaicCampuses.length,lang==='es'?'sedes activas':'active campuses'],['♙',t('teachersTitle'),teacherAssignments.length,lang==='es'?'asignaciones activas':'active assignments'],['◈',t('totalCollected'),`$${itaicPayments.reduce((n,p)=>n+p.paid,0).toLocaleString('es-CO')}`,t('itaicFinance')]].map(a=>`<article class="stat-card"><div class="stat-top"><span>${a[1]}</span><span class="stat-icon">${a[0]}</span></div><div class="stat-value">${a[2]}</div><div class="stat-note">${a[3]}</div></article>`).join('')}</div><section class="panel"><div class="panel-head"><div><h2>${t('courseGroups')}</h2><p>${t('courseGroupsHint')}</p></div><button class="secondary" data-go="itaicFinance">${t('itaicFinance')} →</button></div>${itaicCourses.map(c=>`<div class="church-row"><div class="church-emblem">✧</div><div><b>${t(c.year)} · ${c.campus}</b><small>${t('teacherLabel')}: ${c.teacher||t('select')}</small></div><div class="row-end"><b>${c.students.length}</b><small>${t('students').toLowerCase()}</small></div><button class="text-link" data-admin-course="${c.id}">${t('gradesCheck')} →</button></div>`).join('')}</section><section class="panel"><div class="panel-head"><div><h2>${t('campuses')}</h2><p>${t('campusManagement')}</p></div>${canManage?`<button class="secondary" data-modal="campus">＋ ${t('addCampus')}</button>`:''}</div>${itaicCampuses.map(name=>`<div class="church-row"><div class="church-emblem">⌂</div><div><b>${name}</b><small>${itaicCourses.filter(c=>c.campus===name).length} ${t('courseGroups').toLowerCase()}</small></div>${canManage?`<button class="inline-actions" data-remove-campus="${reportEsc(name)}">×</button>`:''}</div>`).join('')}</section><section class="panel"><div class="panel-head"><div><h2>${t('assignments')}</h2><p>${t('editAssignment')}</p></div>${canManage?`<button class="secondary" data-modal="teacher">＋ ${t('assignTeacher')}</button>`:''}</div>${teacherAssignments.map(a=>{let c=itaicCourses.find(x=>x.id===a.course);return c?`<div class="church-row"><div class="church-emblem">♙</div><div><b>${a.teacher}</b><small>${t(c.year)} · ${c.campus}</small></div>${canManage?`<button class="inline-actions" data-remove-assignment="${a.course}">×</button>`:''}</div>`:''}).join('')}</section>`}
function itaicFinancePage(){let totalDue=itaicPayments.reduce((a,p)=>a+p.due,0),collected=itaicPayments.reduce((a,p)=>a+p.paid,0),paid=itaicPayments.filter(p=>p.paid>=p.due).length,owing=itaicPayments.length-paid;return `${pageHead(t('itaicFinance'),t('itaicFinanceReport'),`<button class="secondary" data-report="itaic-finance">${t('generate')} →</button>`)}${stats([['◈',t('totalCollected'),`$${collected.toLocaleString('es-CO')}`,t('paid')],['◌',t('outstanding'),`$${(totalDue-collected).toLocaleString('es-CO')}`,t('owed')],['✓',t('paidAccounts'),paid,t('paymentFullyPaid')],['!',t('owingAccounts'),owing,t('paymentPartial')]])}<section class="table-card"><div class="table-tools"><b>${t('verifyPayments')}</b></div><table class="data-table"><thead><tr><th>${t('student')}</th><th>${t('tuition')}</th><th>${t('paid')}</th><th>${t('owed')}</th><th>${t('paymentStatus')}</th><th></th></tr></thead><tbody>${itaicPayments.map(p=>{let m=members.find(x=>x.id===p.id),due=p.due-p.paid;return `<tr><td><strong>${m?.name||p.id}</strong></td><td>$${p.due.toLocaleString('es-CO')}</td><td>$${p.paid.toLocaleString('es-CO')}</td><td>$${due.toLocaleString('es-CO')}</td><td><span class="status ${due?'pending':''}">${due?t('paymentPartial'):t('paymentFullyPaid')}</span></td><td>${role==='presbitero'&&due>0?`<button class="secondary" data-payment-student="${p.id}">${t('markPayment')}</button>`:''}</td></tr>`}).join('')}</tbody></table></section>`}
function reportRows(kind,scope){if(kind==='churches')return [['Iglesia',t('address'),t('pastorLabel'),t('totalMembers')],...churches.map(c=>[c[0],c[1],c[2],c[3]])];if(kind.startsWith('itaic'))return itaicReportRows(kind,scope);if(kind==='finance')return [['Iglesia',t('initial'),t('income'),t('expenses'),t('final')],...(role==='pastor'?[churches[0]]:churches).map((c,i)=>[c[0],1800000+i*380000,2450000-i*260000,1130000-i*110000,3120000+i*230000])];if(kind==='secretary'){if(role==='pastor')return [['Nombre',t('document'),t('age'),t('sex'),t('civil'),L('Asociación','Association'),t('baptism')],...members.map(m=>[m.name,m.id,m.age,m.sex,m.civil,assocName(m),m.baptized?t('yes'):t('no')])];return [['Iglesia',t('totalMembers'),t('baptized'),t('women'),t('men'),t('children')],...churches.map((c,i)=>[c[0],c[3],Math.round(Number(c[3])*.74),Math.round(Number(c[3])*.56),Math.round(Number(c[3])*.44),Math.round(Number(c[3])*.15)])]}return [['Nombre',t('document'),t('age'),t('sex'),t('civil'),L('Asociación','Association'),t('baptism')],...members.map(m=>[m.name,m.id,m.age,m.sex,m.civil,assocName(m),m.baptized?t('yes'):t('no')])]}
function reportHtml(kind,scope){let title=reportTitleFor(kind,scope,kind.endsWith('finance')||kind==='finance'?t('financialReportTitle'):t('generalReportTitle')),headers=reportHeader(kind,scope),rows=reportRows(kind,scope),body=rows.map((r,i)=>`<tr>${r.map(v=>i===0?`<th>${reportEsc(v)}</th>`:`<td>${reportEsc(v)}</td>`).join('')}</tr>`).join('');return `<article class="formal-report"><header class="report-letterhead"><img class="report-mark" style="width:58px;height:58px;object-fit:contain;flex:none" src="${window.AIC_REPORT_LOGO}" alt="Logo de la AIC"><div><b>${reportEsc(headers[0])}</b><span>${reportEsc(headers[1])}</span>${headers[2]?`<span>${reportEsc(headers[2])}</span>`:''}</div></header><h1>${reportEsc(title)}</h1><p class="report-date">${reportEsc(t('reportingPeriod'))}: ${new Date().toLocaleDateString(lang==='es'?'es-CO':'en-US')}</p><table class="formal-table">${body}</table><footer>${reportEsc(t('headerAic'))} · ${reportEsc(t('headerCircuit'))}</footer></article>`}
function openReportBuilder(kind){activeReport=kind;let isItaic=kind.startsWith('itaic'),title=kind.includes('finance')?t('financialReportTitle'):t('generalReportTitle'),scopeOptions=['General',...new Set(itaicCourses.map(c=>c.campus))],html=reportHtml(kind,isItaic?'General':'General');$('#modalRoot').innerHTML=`<div class="modal-backdrop"><section class="modal report-modal"><div class="panel-head"><div><h2>${title}</h2><p>${t('reportActions')}</p></div><button class="inline-actions" id="closeReport">×</button></div>${isItaic?`<div class="field"><label>${t('scopeCampus')}</label><select id="reportScope">${scopeOptions.map(s=>`<option value="${reportEsc(s)}">${s==='General'?t('scopeGeneral'):reportEsc(s)}</option>`).join('')}</select></div>`:''}<div id="reportPreview">${html}</div><div class="modal-actions report-actions"><button class="secondary" data-report-format="excel">${t('exportExcel')}</button><button class="secondary" data-report-format="word">${t('exportWord')}</button><button class="primary" data-report-format="pdf">${t('exportPdf')}</button></div></section></div>`;$('#closeReport').onclick=()=>$('#modalRoot').innerHTML='';const scopeValue=()=>$('#reportScope')?.value||'General';$('#reportScope')?.addEventListener('change',()=>$('#reportPreview').innerHTML=reportHtml(kind,scopeValue()));$$('[data-report-format]').forEach(b=>b.onclick=()=>exportFormalReport(kind,scopeValue(),b.dataset.reportFormat))}
function previousOpenModal(type,studentId){if(type==='ageRanges'){if(role!=='pastor')return;let content=`<h2>${t('editAgeRanges')}</h2><p>${lang==='es'?'Configura rangos consecutivos para clasificar los miembros de Iglesia Central.':'Set consecutive age ranges for members of Central Church.'}</p><div class="field"><label>${t('childrenRange')} (1–)</label><input name="childrenMax" type="number" min="1" value="${localAgeRanges.childrenMax}" required></div><div class="field"><label>Juveniles · ${localAgeRanges.childrenMax+1}–</label><input name="juvenilesMax" type="number" min="${localAgeRanges.childrenMax+1}" value="${localAgeRanges.juvenilesMax}" required></div><div class="field"><label>Jóvenes · ${localAgeRanges.juvenilesMax+1}–</label><input name="youthMax" type="number" min="${localAgeRanges.juvenilesMax+1}" value="${localAgeRanges.youthMax}" required></div><p class="muted">${lang==='es'?'Menores de 30 años casados o en unión libre, y mayores del rango juvenil, se clasifican por sexo como Damas o Caballeros.':'Married people under 30 and people above the youth range are classified by sex as women or men.'}</p>`;showModalForm(content,d=>{let c=Number(d.childrenMax),j=Number(d.juvenilesMax),y=Number(d.youthMax);if(c<1||j<=c||y<=j){notify(lang==='es'?'Define rangos consecutivos y sin superposición.':'Set consecutive, non-overlapping ranges.');return}localAgeRanges={childrenMax:c,juvenilesMax:j,youthMax:y};renderPage()});return}priorCampusOpenModal(type,studentId)}
function bindPage(){campusBindPage();$$('[data-payment-student]').forEach(b=>b.onclick=()=>openModal('payment',b.dataset.paymentStudent));$$('[data-do="report"]').forEach(b=>b.onclick=()=>openReportBuilder(page==='finance'?'finance':page==='churches'?'churches':'secretary'));$$('[data-export]').forEach(b=>b.onclick=()=>openReportBuilder(b.dataset.export==='finance'?'finance':b.dataset.export==='churches'?'churches':b.dataset.export==='students'?'itaic-secretary':b.dataset.export==='members'?'secretary':'secretary'));if(page==='itaic'&&role==='presbitero'){$$('[data-modal="campus"]').forEach(b=>b.onclick=()=>openModal('campus'));$$('[data-remove-campus]').forEach(b=>b.onclick=()=>{let name=b.dataset.removeCampus;itaicCampuses=itaicCampuses.filter(c=>c!==name);let removed=itaicCourses.filter(c=>c.campus===name).map(c=>c.id);itaicCourses.splice(0,itaicCourses.length,...itaicCourses.filter(c=>c.campus!==name));teacherAssignments=teacherAssignments.filter(a=>!removed.includes(a.course));removed.forEach(id=>delete courseAssessments[id]);renderPage()})}}
Object.assign(I.es,{enrollmentRequests:'Solicitudes de inscripción',requestEnrollment:'Solicitar inscripción',requestedStudent:'Estudiante',requestedCourse:'Año y sede solicitados',requestStatus:'Estado',approve:'Aprobar',reject:'Rechazar',pendingRequest:'Pendiente',approvedRequest:'Aprobada',rejectedRequest:'Rechazada',enrollmentSent:'Solicitud enviada al Administrador ITAIC.',noEnrollmentRequests:'Aún no hay solicitudes de inscripción.',teacherStudents:'Estudiantes de mis cursos',recordPayment:'Registrar abono',paymentsReceived:'Abonos recibidos',studentApproved:'Estudiante aprobado y asignado al grupo.',studentRejected:'Solicitud rechazada.',approvalOnly:'Solo el Administrador ITAIC puede aprobar matrículas.',assignmentOnly:'Solo el Administrador ITAIC puede asignar maestros.'});Object.assign(I.en,{enrollmentRequests:'Enrollment requests',requestEnrollment:'Request enrollment',requestedStudent:'Student',requestedCourse:'Requested year and campus',requestStatus:'Status',approve:'Approve',reject:'Reject',pendingRequest:'Pending',approvedRequest:'Approved',rejectedRequest:'Rejected',enrollmentSent:'Request sent to the ITAIC administrator.',noEnrollmentRequests:'There are no enrollment requests yet.',teacherStudents:'Students in my courses',recordPayment:'Record payment',paymentsReceived:'Payments received',studentApproved:'Student approved and assigned to the group.',studentRejected:'Request rejected.',approvalOnly:'Only the ITAIC administrator can approve enrollments.',assignmentOnly:'Only the ITAIC administrator can assign teachers.'});
function itaicFinancePage(){let due=itaicPayments.reduce((a,p)=>a+p.due,0),collected=itaicPayments.reduce((a,p)=>a+p.paid,0),fully=itaicPayments.filter(p=>p.paid>=p.due).length,owing=itaicPayments.length-fully;return `${pageHead(t('itaicFinance'),t('itaicFinanceReport'),`<button class="primary" data-report="itaic-finance">${t('generate')} →</button>`)}${stats([['◈',t('totalCollected'),`$${collected.toLocaleString('es-CO')}`,t('paid')],['◌',t('outstanding'),`$${(due-collected).toLocaleString('es-CO')}`,t('owed')],['✓',t('paidAccounts'),fully,t('paymentFullyPaid')],['!',t('owingAccounts'),owing,t('paymentPartial')]])}<section class="table-card"><div class="table-tools"><b>${t('verifyPayments')}</b></div><table class="data-table"><thead><tr><th>${t('student')}</th><th>${t('tuition')}</th><th>${t('paid')}</th><th>${t('owed')}</th><th>${t('paymentStatus')}</th></tr></thead><tbody>${itaicPayments.map(p=>{let m=members.find(x=>x.id===p.id),balance=p.due-p.paid;return `<tr><td><strong>${m?.name||p.id}</strong></td><td>$${p.due.toLocaleString('es-CO')}</td><td>$${p.paid.toLocaleString('es-CO')}</td><td>$${balance.toLocaleString('es-CO')}</td><td><span class="status ${balance?'pending':''}">${balance?t('paymentPartial'):t('paymentFullyPaid')}</span></td></tr>`}).join('')}</tbody></table></section>`}
function teacherSummary(course){let assessments=courseAssessments[course.id]||[],weight=assessments.reduce((n,a)=>n+a.weight,0),students=courseStudents(course);return `<section class="panel teacher-course"><div class="panel-head"><div><div class="eyebrow-line">${(course.subjectName||'').toUpperCase()} · ${t(course.year).toUpperCase()} · ${course.campus}</div><h2>${t('students')} · ${students.length}</h2><p>${course.teacher}</p></div><div class="head-actions"><button class="secondary" data-it9="goGrades|${course.id}">${L('Notas','Grades')} →</button><button class="secondary" data-it9="goMoney|${course.id}">${L('Financiero','Financial')} →</button><button class="primary" data-open-course="${course.id}">${t('openCourse')} →</button></div></div><div class="grade-progress"><span>${t('weightGraded')}</span><b>${weight}%</b><div class="progress-track"><i style="width:${Math.min(100,weight)}%"></i></div><small>${t('remainingWeight')}: ${100-weight}%</small></div></section>`}
function activeCourseForStudent(id){return itaicCourses.find(c=>c.students.includes(id))}
function pastorItaicPage(){let own=itaicEnrollmentRequests.filter(r=>r.church===HOME_CHURCH),available=members.filter(m=>m.church===HOME_CHURCH&&!activeCourseForStudent(m.id)&&!itaicEnrollmentRequests.some(r=>r.memberId===m.id&&r.status==='Pendiente'));return `${pageHead('ITAIC · Inscripciones',lang==='es'?'Solicita una sede y un año para los miembros de tu iglesia.':'Request a campus and year for members of your church.',`<button class="primary" data-modal="enrollment" ${available.length?'':'disabled'}>＋ ${t('requestEnrollment')}</button>`)}<section class="panel"><div class="panel-head"><div><h2>${t('enrollmentRequests')}</h2><p>${HOME_CHURCH}</p></div></div>${own.length?`<div class="table-card"><table class="data-table"><thead><tr><th>${t('requestedStudent')}</th><th>${t('requestedCourse')}</th><th>${t('date')}</th><th>${t('requestStatus')}</th></tr></thead><tbody>${own.map(r=>{let m=members.find(x=>x.id===r.memberId);return `<tr><td><strong>${m?.name||r.memberId}</strong></td><td>${t(r.year)} · ${r.campus}</td><td>${r.date}</td><td><span class="status ${r.status==='Pendiente'?'pending':''}">${t(r.status==='Aprobada'?'approvedRequest':r.status==='Rechazada'?'rejectedRequest':'pendingRequest')}</span></td></tr>`}).join('')}</tbody></table></div>`:`<div class="empty">${t('noEnrollmentRequests')}</div>`}</section>${isItaicTeacher()?`<section class="panel"><div class="panel-head"><div><h2>${t('teacherStudents')}</h2><p>${lang==='es'?'Tus grupos como maestro ITAIC':'Your ITAIC teaching groups'}</p></div></div>${teacherCourseList().map(c=>teacherSummary(c)).join('')}</section>`:''}`}
function itaicRequestPanel(){let rows=itaicEnrollmentRequests;return `<section class="panel"><div class="panel-head"><div><h2>${t('enrollmentRequests')}</h2><p>${rows.filter(r=>r.status==='Pendiente').length} ${t('pendingRequest').toLowerCase()}</p></div></div>${rows.length?`<div class="table-card"><table class="data-table"><thead><tr><th>${t('requestedStudent')}</th><th>${t('churchLabel')}</th><th>${t('requestedCourse')}</th><th>${t('date')}</th><th>${t('requestStatus')}</th><th></th></tr></thead><tbody>${rows.map(r=>{let m=members.find(x=>x.id===r.memberId);return `<tr><td><strong>${m?.name||r.memberId}</strong><small class="student-meta">${m?.id||r.memberId}</small></td><td>${r.church}</td><td>${t(r.year)} · ${r.campus}</td><td>${r.date}</td><td><span class="status ${r.status==='Pendiente'?'pending':''}">${t(r.status==='Aprobada'?'approvedRequest':r.status==='Rechazada'?'rejectedRequest':'pendingRequest')}</span></td><td>${role==='itaic'&&r.status==='Pendiente'?`<button class="secondary" data-enrollment-approve="${r.id}">${t('approve')}</button> <button class="secondary" data-enrollment-reject="${r.id}">${t('reject')}</button>`:''}</td></tr>`}).join('')}</tbody></table></div>`:`<div class="empty">${t('noEnrollmentRequests')}</div>`}</section>`}
function approveItaicEnrollment(id,approve){if(role!=='itaic')return;let r=itaicEnrollmentRequests.find(x=>x.id===id);if(!r||r.status!=='Pendiente')return;if(!approve){r.status='Rechazada';notify(t('studentRejected'));renderPage();return}let c=itaicCourses.find(x=>x.year===r.year&&x.campus===r.campus);if(!c){c={id:`${r.year}-${Date.now()}`,year:r.year,campus:r.campus,teacher:'',students:[]};itaicCourses.push(c);courseAssessments[c.id]=[]}if(!c.students.includes(r.memberId))c.students.push(r.memberId);if(!itaicPayments.some(p=>p.id===r.memberId))itaicPayments.push({id:r.memberId,due:300000,paid:0});r.status='Aprobada';r.approvedAt=new Date().toISOString();notify(t('studentApproved'));renderPage()}
function itaicAdminPage(){let canManage=role==='itaic';let headActions=`<button class="secondary" data-report="itaic-secretary">${t('generalReportTitle')} · ${t('generate')}</button>${canManage?`<button class="primary" data-modal="teacher">＋ ${t('assignTeacher')}</button>`:''}`;return `${pageHead(t('itaicAdmin'),t('itaicSubtitle'),headActions)}<div class="stats-grid">${[['▣',t('students'),[...new Set(itaicCourses.flatMap(c=>c.students))].length,t('registered')],['⌂',t('campuses'),itaicCampuses.length,lang==='es'?'sedes activas':'active campuses'],['♙',t('teachersTitle'),teacherAssignments.length,lang==='es'?'asignaciones activas':'active assignments'],['◈',t('totalCollected'),`$${itaicPayments.reduce((n,p)=>n+p.paid,0).toLocaleString('es-CO')}`,t('itaicFinance')]].map(a=>`<article class="stat-card"><div class="stat-top"><span>${a[1]}</span><span class="stat-icon">${a[0]}</span></div><div class="stat-value">${a[2]}</div><div class="stat-note">${a[3]}</div></article>`).join('')}</div><section class="panel"><div class="panel-head"><div><h2>${t('courseGroups')}</h2><p>${t('courseGroupsHint')}</p></div><button class="secondary" data-go="itaicFinance">${t('itaicFinance')} →</button></div>${itaicCourses.map(c=>`<div class="church-row"><div class="church-emblem">✧</div><div><b>${t(c.year)} · ${c.campus}</b><small>${t('teacherLabel')}: ${c.teacher||t('select')}</small></div><div class="row-end"><b>${c.students.length}</b><small>${t('students').toLowerCase()}</small></div><button class="text-link" data-admin-course="${c.id}">${t('gradesCheck')} →</button></div>`).join('')}</section><section class="panel"><div class="panel-head"><div><h2>${t('campuses')}</h2><p>${t('campusManagement')}</p></div>${canManage?`<button class="secondary" data-modal="campus">＋ ${t('addCampus')}</button>`:''}</div>${itaicCampuses.map(name=>`<div class="church-row"><div class="church-emblem">⌂</div><div><b>${name}</b><small>${itaicCourses.filter(c=>c.campus===name).length} ${t('courseGroups').toLowerCase()}</small></div>${canManage?`<button class="inline-actions" data-remove-campus="${reportEsc(name)}">×</button>`:''}</div>`).join('')}</section><section class="panel"><div class="panel-head"><div><h2>${t('assignments')}</h2><p>${t('assignmentOnly')}</p></div>${canManage?`<button class="secondary" data-modal="teacher">＋ ${t('assignTeacher')}</button>`:''}</div>${teacherAssignments.map(a=>{let c=itaicCourses.find(x=>x.id===a.course);return c?`<div class="church-row"><div class="church-emblem">♙</div><div><b>${a.teacher}</b><small>${t(c.year)} · ${c.campus}</small></div>${canManage?`<button class="inline-actions" data-remove-assignment="${a.course}">×</button>`:''}</div>`:''}).join('')}</section>${itaicRequestPanel()}`}
function teacherSummary(course){let as=courseAssessments[course.id]||[],weight=as.reduce((n,a)=>n+a.weight,0),students=courseStudents(course);return `<section class="panel teacher-course"><div class="panel-head"><div><div class="eyebrow-line">${(course.subjectName||'').toUpperCase()} · ${t(course.year).toUpperCase()} · ${course.campus}</div><h2>${t('students')} · ${students.length}</h2><p>${course.teacher}</p></div><div class="head-actions"><button class="secondary" data-it9="goGrades|${course.id}">${L('Notas','Grades')} →</button><button class="primary" data-open-course="${course.id}">${t('openCourse')} →</button></div></div><div class="grade-progress"><span>${t('weightGraded')}</span><b>${weight}%</b><div class="progress-track"><i style="width:${Math.min(100,weight)}%"></i></div><small>${t('remainingWeight')}: ${100-weight}%</small></div></section>`}
function teacherHome(){let courses=teacherFilteredList();return `${pageHead(t('myCourses'),t('teacherWelcome'))}${homeFilterBar()}${courses.map(teacherSummary).join('')||`<section class="panel empty">${t('noAssignedCourses')}</section>`}`}
function coursePage(){let course=teacherCourseList().find(c=>c.id===selectedCourseId);if(!course){selectedCourseId=null;return teacherHome()}let assessments=courseAssessments[course.id]||[],weight=assessments.reduce((n,a)=>n+a.weight,0),students=courseStudents(course),editable=teacherCourseList().some(c=>c.id===course.id);return `${pageHead(`${course.subjectName||''} · ${t(course.year)} · ${course.campus}`,`${t('teacherWelcome')} · ${course.teacher}`,`<button class="secondary" data-back-courses>← ${t('myCourses')}</button><button class="secondary" data-it9="goGrades|${course.id}">${L('Notas','Grades')} →</button><button class="secondary" data-it9="goMoney|${course.id}">${L('Financiero','Financial')} →</button>${editable?`<button class="primary" data-modal="assessment" ${weight>=100?'disabled':''}>＋ ${t('addAssessment')}</button>`:''}`)}<div class="summary-band"><div><small>${t('students')}</small><b>${students.length}</b></div><div><small>${t('weightGraded')}</small><b>${weight}%</b></div><div><small>${t('remainingWeight')}</small><b>${100-weight}%</b></div></div><section class="panel"><div class="panel-head"><div><h2>${t('gradebook')}</h2><p>${t('weightedNote')}</p></div>${editable?`<button class="secondary" data-save-grades>${t('saveGrades')}</button>`:''}</div><div class="table-card"><table class="data-table grade-table"><thead><tr><th>${t('student')}</th>${assessments.map(a=>`<th>${a.name}<small class="weight-label">${a.weight}%</small></th>`).join('')}<th>${t('weightedTotal')}</th><th>${t('completedWeight')}</th><th>${t('paymentsReceived')}</th><th>${t('owed')}</th><th></th></tr></thead><tbody>${students.map(m=>{let got=assessments.reduce((n,a)=>n+(a.grades[m.id]!==undefined?a.weight:0),0),total=weightedTotal(course,m.id),p=paymentFor(m.id);return `<tr><td><strong>${m.name}</strong><small class="student-meta">${m.id}</small></td>${assessments.map((a,i)=>`<td><input aria-label="${a.name} · ${m.name}" class="grade-input" data-grade-course="${course.id}" data-grade-assessment="${i}" data-grade-student="${m.id}" type="number" min="0" max="5" step="0.1" value="${a.grades[m.id]??''}" placeholder="—"></td>`).join('')}<td><strong class="weighted-result">${total.toFixed(2)} / 5.00</strong></td><td><span class="status ${got<100?'pending':''}">${got}%</span></td><td>$${p.paid.toLocaleString('es-CO')}</td><td>$${(p.due-p.paid).toLocaleString('es-CO')}</td><td><button class="secondary" data-payment-student="${m.id}" data-payment-course="${course.id}">${t('recordPayment')}</button></td></tr>`}).join('')}</tbody></table></div></section>`}
function itaicFinancePage(){let due=itaicPayments.reduce((a,p)=>a+p.due,0),paidAmount=itaicPayments.reduce((a,p)=>a+p.paid,0),fully=itaicPayments.filter(p=>p.paid>=p.due).length,owing=itaicPayments.length-fully;return `${pageHead(t('itaicFinance'),t('itaicFinanceReport'),`<button class="primary" data-report="itaic-finance">${t('generate')} →</button>`)}${stats([['◈',t('totalCollected'),`$${paidAmount.toLocaleString('es-CO')}`,t('paid')],['◌',t('outstanding'),`$${(due-paidAmount).toLocaleString('es-CO')}`,t('owed')],['✓',t('paidAccounts'),fully,t('paymentFullyPaid')],['!',t('owingAccounts'),owing,t('paymentPartial')]])}<section class="table-card"><div class="table-tools"><b>${t('verifyPayments')}</b></div><table class="data-table"><thead><tr><th>${t('student')}</th><th>${t('tuition')}</th><th>${t('paid')}</th><th>${t('owed')}</th><th>${t('paymentStatus')}</th></tr></thead><tbody>${itaicPayments.map(p=>{let m=members.find(x=>x.id===p.id),balance=p.due-p.paid;return `<tr><td><strong>${m?.name||p.id}</strong></td><td>$${p.due.toLocaleString('es-CO')}</td><td>$${p.paid.toLocaleString('es-CO')}</td><td>$${balance.toLocaleString('es-CO')}</td><td><span class="status ${balance?'pending':''}">${balance?t('paymentPartial'):t('paymentFullyPaid')}</span></td></tr>`}).join('')}</tbody></table></section>`}
function openReportBuilder(kind,onlyCampus=null){activeReport=kind;let itaic=kind.startsWith('itaic'),teacherContext=role==='maestro'||(role==='pastor'&&isItaicTeacher()),sites=onlyCampus?[onlyCampus]:teacherContext?[...new Set(teacherCourseList().map(c=>c.campus))]:[...new Set(itaicCourses.map(c=>c.campus))],scopes=itaic?(teacherContext?sites:['General',...sites]):[],defaultScope=itaic?(teacherContext?sites[0]||'General':'General'):'General',title=kind.includes('finance')?t('financialReportTitle'):t('generalReportTitle');$('#modalRoot').innerHTML=`<div class="modal-backdrop"><section class="modal report-modal"><div class="panel-head"><div><h2>${title}</h2><p>${t('reportActions')}</p></div><button class="inline-actions" id="closeReport">×</button></div>${itaic&&scopes.length?`<div class="field"><label>${t('scopeCampus')}</label><select id="reportScope">${scopes.map(s=>`<option value="${reportEsc(s)}" ${s===defaultScope?'selected':''}>${s==='General'?t('scopeGeneral'):reportEsc(s)}</option>`).join('')}</select></div>`:''}<div id="reportPreview">${reportHtml(kind,defaultScope)}</div><div class="modal-actions report-actions"><button class="secondary" data-report-format="excel">${t('exportExcel')}</button><button class="secondary" data-report-format="word">${t('exportWord')}</button><button class="primary" data-report-format="pdf">${t('exportPdf')}</button></div></section></div>`;$('#closeReport').onclick=()=>$('#modalRoot').innerHTML='';const scope=()=>$('#reportScope')?.value||defaultScope;$('#reportScope')?.addEventListener('change',()=>$('#reportPreview').innerHTML=reportHtml(kind,scope()));$$('[data-report-format]').forEach(b=>b.onclick=()=>exportFormalReport(kind,scope(),b.dataset.reportFormat))}
function studentFlowOpenModal(type,studentId,courseId){if(type==='enrollment'){if(role!=='pastor')return;let options=members.filter(m=>m.church===HOME_CHURCH&&!activeCourseForStudent(m.id)&&!itaicEnrollmentRequests.some(r=>r.memberId===m.id&&r.status==='Pendiente')),html=`<h2>${t('requestEnrollment')}</h2><p>${lang==='es'?'La solicitud debe aprobarla el Administrador ITAIC.':'The ITAIC administrator must approve the request.'}</p><div class="field"><label>${t('requestedStudent')}</label><select name="memberId" required>${options.map(m=>`<option value="${reportEsc(m.id)}">${reportEsc(m.name)} · ${reportEsc(m.id)}</option>`).join('')}</select></div><div class="field"><label>${t('courseYear')}</label><select name="year"><option value="year1">${t('year1')}</option><option value="year2">${t('year2')}</option><option value="year3">${t('year3')}</option></select></div><div class="field"><label>${t('campuses')}</label><select name="campus">${itaicCampuses.map(c=>`<option>${reportEsc(c)}</option>`).join('')}</select></div>`;showModalForm(html,d=>{itaicEnrollmentRequests.push({id:`req-${Date.now()}`,memberId:d.memberId,year:d.year,campus:d.campus,church:HOME_CHURCH,pastor:churches[0][2],date:new Date().toLocaleDateString('es-CO'),status:'Pendiente'});notify(t('enrollmentSent'));renderPage()});return}if(type==='teacher'){if(role!=='itaic')return;let html=`<h2>${t('assignTeacher')}</h2><p>${t('assignmentOnly')}</p><div class="field"><label>${t('teacherLabel')}</label><select name="teacher"><option>Pr. José Martínez</option><option>Pr. David López</option><option>Pr. Samuel Ríos</option><option>Pr. Andrés Pérez</option>${members.map(m=>`<option>${reportEsc(m.name)}</option>`).join('')}</select></div><div class="field"><label>${t('courseYear')}</label><select name="year"><option value="year1">${t('year1')}</option><option value="year2">${t('year2')}</option><option value="year3">${t('year3')}</option></select></div><div class="field"><label>${t('campuses')}</label><select name="campus">${itaicCampuses.map(c=>`<option>${reportEsc(c)}</option>`).join('')}</select></div>`;showModalForm(html,d=>{let c=itaicCourses.find(x=>x.year===d.year&&x.campus===d.campus);if(!c){c={id:`${d.year}-${Date.now()}`,year:d.year,campus:d.campus,teacher:d.teacher,students:[]};itaicCourses.push(c);courseAssessments[c.id]=[]}teacherAssignments=teacherAssignments.filter(a=>a.course!==c.id);c.teacher=d.teacher;teacherAssignments.push({teacher:d.teacher,course:c.id});notify(t('teacherAssigned'));renderPage()});return}if(type==='payment'){let c=teacherCourseList().find(x=>x.id===courseId&&x.students.includes(studentId));if(!c||!['maestro','pastor'].includes(role))return;let m=members.find(x=>x.id===studentId),p=paymentFor(studentId),remaining=p.due-p.paid;showModalForm(`<h2>${t('recordPayment')}</h2><p>${m?.name} · ${t(c.year)} · ${c.campus}</p><p>${t('owed')}: $${remaining.toLocaleString('es-CO')}</p><div class="field"><label>${t('amountToAdd')}</label><input name="amount" type="number" min="1" max="${remaining}" required></div>`,d=>{let saved=itaicPayments.find(x=>x.id===studentId);if(!saved){saved={id:studentId,due:300000,paid:0};itaicPayments.push(saved)}saved.paid=Math.min(saved.due,saved.paid+Number(d.amount));notify(t('paymentRecorded'));renderPage()});return}if(type==='campus'&&role!=='itaic')return;if(type==='campus'){showModalForm(`<h2>${t('addCampus')}</h2><div class="field"><label>${t('campusName')}</label><input name="name" required></div>`,d=>{let name=d.name.trim();if(name&&!itaicCampuses.includes(name)){itaicCampuses.push(name);renderPage()}});return}previousOpenModal(type,studentId)}
const incomeCategories=['Diezmos','Ofrendas','Primicias','Actividades','Otros'];
const expenseCategories=['Diezmo de diezmos','Diezmo de ofrendas','Servicios públicos','Pago pastor','Remodelación','Implementos de limpieza','Muebles','Compra de equipos','Mantenimiento de equipos'];
const incomeShares=[70,20,5,4,1],expenseShares=[20,8,16,40,5,4,3,2,2];
function splitCategories(total,categories,shares){let assigned=0;return categories.map((category,i)=>{let amount=i===categories.length-1?total-assigned:Math.floor(total*shares[i]/100);assigned+=amount;return {category,amount}})}
function makeSeedLedger(church,index){let incomeTotal=2450000-index*260000,expenseTotal=1130000-index*110000,opening=1800000+index*380000,transactions=[];for(const {category,amount} of splitCategories(incomeTotal,incomeCategories,incomeShares))if(amount)transactions.push({type:'income',category,description:category==='Actividades'?'Actividad congregacional':category==='Otros'?'Ingreso extraordinario':'',amount,date:'2026-06-01'});for(const {category,amount} of splitCategories(expenseTotal,expenseCategories,expenseShares))if(amount)transactions.push({type:'expense',category,description:'',amount,date:'2026-06-03'});return {church,opening,transactions}}
const financeLedgers=Object.fromEntries(churches.map((c,i)=>[c[0],makeSeedLedger(c[0],i)]));
function ensureLedger(church){if(!financeLedgers[church])financeLedgers[church]={church,opening:0,transactions:[]};return financeLedgers[church]}
function ledgerTotals(ledger){let income=ledger.transactions.filter(x=>x.type==='income').reduce((n,x)=>n+Number(x.amount),0),expenses=ledger.transactions.filter(x=>x.type==='expense').reduce((n,x)=>n+Number(x.amount),0);return {opening:Number(ledger.opening)||0,income,expenses,closing:(Number(ledger.opening)||0)+income-expenses}}
function sumLedgers(ledgers){return ledgers.reduce((a,l)=>{let x=ledgerTotals(l);a.opening+=x.opening;a.income+=x.income;a.expenses+=x.expenses;a.closing+=x.closing;return a},{opening:0,income:0,expenses:0,closing:0})}
const categoryLabel=c=>({Diezmos:'tithes',Ofrendas:'offerings',Primicias:'firstFruits',Actividades:'activities',Otros:'otherIncome','Diezmo de diezmos':'titheOfTithes','Diezmo de ofrendas':'titheOfOfferings','Servicios públicos':'utilities','Pago pastor':'pastorPay',Remodelación:'renovation','Implementos de limpieza':'cleaningSupplies',Muebles:'furniture','Compra de equipos':'equipmentPurchase','Mantenimiento de equipos':'equipmentMaintenance'}[c]?t(({Diezmos:'tithes',Ofrendas:'offerings',Primicias:'firstFruits',Actividades:'activities',Otros:'otherIncome','Diezmo de diezmos':'titheOfTithes','Diezmo de ofrendas':'titheOfOfferings','Servicios públicos':'utilities','Pago pastor':'pastorPay',Remodelación:'renovation','Implementos de limpieza':'cleaningSupplies',Muebles:'furniture','Compra de equipos':'equipmentPurchase','Mantenimiento de equipos':'equipmentMaintenance'})[c]):c);
Object.assign(I.es,{tithes:'Diezmos',offerings:'Ofrendas',firstFruits:'Primicias',activities:'Actividades',otherIncome:'Otros',titheOfTithes:'Diezmo de diezmos',titheOfOfferings:'Diezmo de ofrendas',utilities:'Servicios públicos',pastorPay:'Pago pastor',renovation:'Remodelación',cleaningSupplies:'Implementos de limpieza',furniture:'Muebles',equipmentPurchase:'Compra de equipos',equipmentMaintenance:'Mantenimiento de equipos',openingBalance:'Saldo inicial',incomeBreakdown:'Ingresos desglosados',expenseBreakdown:'Egresos desglosados',totalIncome:'Total ingresos',totalExpenses:'Total egresos',closingBalance:'Saldo final',recordMovement:'Registrar ingreso o egreso',manualDescription:'Descripción del movimiento',manualDescriptionHint:'Obligatoria para Actividades y Otros'});Object.assign(I.en,{tithes:'Tithes',offerings:'Offerings',firstFruits:'First fruits',activities:'Activities',otherIncome:'Other',titheOfTithes:'Tithe of tithes',titheOfOfferings:'Tithe of offerings',utilities:'Utilities',pastorPay:'Pastor payment',renovation:'Renovation',cleaningSupplies:'Cleaning supplies',furniture:'Furniture',equipmentPurchase:'Equipment purchase',equipmentMaintenance:'Equipment maintenance',openingBalance:'Opening balance',incomeBreakdown:'Income breakdown',expenseBreakdown:'Expense breakdown',totalIncome:'Total income',totalExpenses:'Total expenses',closingBalance:'Closing balance',recordMovement:'Record income or expense',manualDescription:'Transaction description',manualDescriptionHint:'Required for Activities and Other'});
function ledgerRows(ledger,includeChurch=false){let totals=ledgerTotals(ledger),rows=[[t('category'),t('date'),t('description'),t('amount')],[t('openingBalance'),'','',totals.opening]];for(const type of ['income','expense']){let list=ledger.transactions.filter(x=>x.type===type),cats=type==='income'?incomeCategories:expenseCategories;rows.push([type==='income'?t('incomeBreakdown'):t('expenseBreakdown'),'','', '']);for(const cat of cats){let entries=list.filter(x=>x.category===cat);if(!entries.length)continue;for(const item of entries)rows.push([categoryLabel(cat),item.date,item.description||'',Number(item.amount)]);rows.push([`${lang==='es'?'Subtotal':'Subtotal'} · ${categoryLabel(cat)}`,'','',entries.reduce((n,x)=>n+Number(x.amount),0)])}}rows.push([t('totalIncome'),'','',totals.income],[t('totalExpenses'),'','',totals.expenses],[t('closingBalance'),'','',totals.closing]);return rows}
function reportRowsPrevious(kind,scope){if(kind==='finance'){let ledgers=role==='pastor'?[ensureLedger(HOME_CHURCH)]:Object.values(financeLedgers),summary=sumLedgers(ledgers);if(role==='pastor')return ledgerRows(ledgers[0]);let rows=[[t('category'),t('churchLabel'),`${t('description')} / ${t('date')}`,t('amount')],[t('openingBalance'),t('general'),' ',summary.opening],[t('incomeBreakdown'),'','','']];for(const cat of incomeCategories){let entries=ledgers.flatMap(l=>l.transactions.filter(x=>x.type==='income'&&x.category===cat).map(x=>({...x,church:l.church})));if(entries.length){entries.forEach(x=>rows.push([categoryLabel(cat),x.church,x.description||x.date,x.amount]));rows.push([`${lang==='es'?'Subtotal':'Subtotal'} · ${categoryLabel(cat)}`,'','',entries.reduce((n,x)=>n+x.amount,0)])}}rows.push([t('totalIncome'),'','',summary.income],[t('expenseBreakdown'),'','','']);for(const cat of expenseCategories){let entries=ledgers.flatMap(l=>l.transactions.filter(x=>x.type==='expense'&&x.category===cat).map(x=>({...x,church:l.church})));if(entries.length){entries.forEach(x=>rows.push([categoryLabel(cat),x.church,x.description||x.date,x.amount]));rows.push([`${lang==='es'?'Subtotal':'Subtotal'} · ${categoryLabel(cat)}`,'','',entries.reduce((n,x)=>n+x.amount,0)])}}rows.push([t('totalExpenses'),'','',summary.expenses],[t('closingBalance'),t('general'),' ',summary.closing],['','', '', ''],[lang==='es'?'Saldo final por iglesia':'Closing balance by church','','','']);for(const l of ledgers)rows.push([l.church,'','',ledgerTotals(l).closing]);return rows}if(kind==='churches')return [['Iglesia',t('address'),t('pastorLabel'),t('totalMembers')],...churches.map(c=>[c[0],c[1],c[2],c[3]])];if(kind.startsWith('itaic'))return itaicReportRows(kind,scope);if(kind==='secretary'){if(role==='pastor')return [['Nombre',t('document'),t('age'),t('sex'),t('civil'),L('Asociación','Association'),t('baptism')],...members.filter(m=>m.church===HOME_CHURCH).map(m=>[m.name,m.id,m.age,m.sex,m.civil,assocName(m),m.baptized?t('yes'):t('no')])];return [['Iglesia',t('totalMembers'),t('baptized'),t('women'),t('men'),t('children')],...churches.map(c=>[c[0],c[3],Math.round(Number(c[3])*.74),Math.round(Number(c[3])*.56),Math.round(Number(c[3])*.44),Math.round(Number(c[3])*.15)])]}return [['Nombre',t('document'),t('age'),t('sex'),t('civil'),L('Asociación','Association'),t('baptism')],...members.map(m=>[m.name,m.id,m.age,m.sex,m.civil,assocName(m),m.baptized?t('yes'):t('no')])]}
function financePage(){if(role==='pastor'){let ledger=ensureLedger(HOME_CHURCH),totals=ledgerTotals(ledger),cats=(type,list)=>list.map(c=>{let sum=ledger.transactions.filter(x=>x.type===type&&x.category===c).reduce((n,x)=>n+Number(x.amount),0);return drillRows(type,c,sum,ledger)}).join('');return `${pageHead(t('finance'),HOME_CHURCH+' · '+periodLabelOf(HOME_CHURCH),`<button class="secondary" data-modal="openingBalance">${t('openingBalance')}</button><button class="secondary" data-export="finance">${t('generate')} →</button><button class="secondary" data-it4="closePeriod">${L('Cierre de periodo','Close period')}</button><button class="primary" data-modal="movement">＋ ${t('recordMovement')}</button>`)}<div class="summary-band"><div><small>${t('openingBalance')}</small><b>$${totals.opening.toLocaleString('es-CO')}</b></div><div><small>${t('totalIncome')}</small><b>$${totals.income.toLocaleString('es-CO')}</b></div><div><small>${t('totalExpenses')}</small><b>$${totals.expenses.toLocaleString('es-CO')}</b></div><div><small>${t('closingBalance')}</small><b>$${totals.closing.toLocaleString('es-CO')}</b></div></div><div class="grid-2"><section class="panel"><div class="panel-head"><div><h2>${t('incomeBreakdown')}</h2><p>${t('totalIncome')}: $${totals.income.toLocaleString('es-CO')}</p></div></div><div class="table-card"><table class="data-table compact"><tbody>${cats('income',incomeCategories)}</tbody></table></div></section><section class="panel"><div class="panel-head"><div><h2>${t('expenseBreakdown')}</h2><p>${t('totalExpenses')}: $${totals.expenses.toLocaleString('es-CO')}</p></div></div><div class="table-card"><table class="data-table compact"><tbody>${cats('expense',expenseCategories)}</tbody></table></div></section></div><section class="table-card"><div class="table-tools"><b>${lang==='es'?'Movimientos del periodo':'Current period transactions'}</b></div><table class="data-table"><thead><tr><th>${t('date')}</th><th>${t('type')}</th><th>${t('category')}</th><th>${t('description')}</th><th>${t('amount')}</th><th></th></tr></thead><tbody>${ledger.transactions.map((x,i)=>({x,i})).reverse().map(({x,i})=>`<tr><td>${x.date}</td><td>${t(x.type==='income'?'income':'expenses')}</td><td>${categoryLabel(x.category)}</td><td>${x.description||'—'}</td><td>$${Number(x.amount).toLocaleString('es-CO')}</td><td class="tx-actions">${x.auto?`<span class="status">${L('Auto','Auto')}</span>`:`<button class="inline-actions" data-it4="editTx|${i}" title="${L('Editar','Edit')}">✎</button><button class="inline-actions" data-it4="delTx|${i}" title="${L('Eliminar','Delete')}">×</button>`}</td></tr>`).join('')}</tbody></table></section>${periodPanel(HOME_CHURCH)}`}let ledgers=Object.values(financeLedgers),sum=sumLedgers(ledgers),churchRowsHtml=ledgers.map(l=>{let x=ledgerTotals(l);return `<tr><td><strong>${l.church}</strong></td><td>$${x.opening.toLocaleString('es-CO')}</td><td>$${x.income.toLocaleString('es-CO')}</td><td>$${x.expenses.toLocaleString('es-CO')}</td><td><strong>$${x.closing.toLocaleString('es-CO')}</strong></td></tr>`}).join('');return `${pageHead(t('finance'),t('financeSubtitle'),`<button class="primary" data-do="report">${t('generate')} →</button>`)}<div class="summary-band"><div><small>${t('openingBalance')}</small><b>$${sum.opening.toLocaleString('es-CO')}</b></div><div><small>${t('totalIncome')}</small><b>$${sum.income.toLocaleString('es-CO')}</b></div><div><small>${t('totalExpenses')}</small><b>$${sum.expenses.toLocaleString('es-CO')}</b></div><div><small>${t('closingBalance')}</small><b>$${sum.closing.toLocaleString('es-CO')}</b></div></div><section class="panel"><div class="panel-head"><div><h2>${lang==='es'?'Desglose general por concepto':'Circuit-wide breakdown by category'}</h2><p>${t('dateRange')}</p></div></div><div class="grid-2"><div><h3>${t('incomeBreakdown')}</h3><table class="data-table compact"><tbody>${incomeCategories.map(c=>`<tr><td>${categoryLabel(c)}</td><td>$${ledgers.flatMap(l=>l.transactions).filter(x=>x.type==='income'&&x.category===c).reduce((n,x)=>n+x.amount,0).toLocaleString('es-CO')}</td></tr>`).join('')}</tbody></table></div><div><h3>${t('expenseBreakdown')}</h3><table class="data-table compact"><tbody>${expenseCategories.map(c=>`<tr><td>${categoryLabel(c)}</td><td>$${ledgers.flatMap(l=>l.transactions).filter(x=>x.type==='expense'&&x.category===c).reduce((n,x)=>n+x.amount,0).toLocaleString('es-CO')}</td></tr>`).join('')}</tbody></table></div></div></section><section class="table-card"><table class="data-table"><thead><tr><th>${t('churchLabel')}</th><th>${t('openingBalance')}</th><th>${t('totalIncome')}</th><th>${t('totalExpenses')}</th><th>${t('closingBalance')}</th></tr></thead><tbody>${churchRowsHtml}</tbody></table></section>`}
function presbyterDashboard(){let s=sumLedgers(Object.values(financeLedgers));return `${pageHead(`${t('hello')}, ${roles.presbitero[lang]} 👋`,lang==='es'?'Resumen general del Circuito Córdoba.':'Córdoba Circuit overview.')} ${stats([['⌂',t('totalChurches'),'12',lang==='es'?'en el circuito':'in circuit'],['♙',t('totalMembers'),'1,246',`<span class="positive">↑ 4.8%</span> ${lang==='es'?'este año':'this year'}`],['✧',t('baptized'),'918','73.6%'],['◈',t('monthlyIncome'),`$${s.income.toLocaleString('es-CO')}`,t('thisMonth')]])}<div class="grid-2"><section class="panel"><div class="panel-head"><div><h2>${t('churchOverview')}</h2><p>${t('dateRange')}</p></div><button class="text-link" data-go="churches">${t('viewAll')} →</button></div>${churchRows()}</section><section class="panel"><div class="panel-head"><div><h2>${t('recentActivity')}</h2><p>${lang==='es'?'Actividad del circuito':'Circuit activity'}</p></div></div>${activityRows()}</section></div>`}
function reportHtml(kind,scope){let title=kind==='finance'||kind==='itaic-finance'?t('financialReportTitle'):t('generalReportTitle'),headers=reportHeader(kind,scope),rows=reportRows(kind,scope),body=rows.map((r,ri)=>`<tr>${r.map((v,ci)=>{let value=kind==='finance'&&ci===r.length-1&&typeof v==='number'?`$${v.toLocaleString('es-CO')}`:v;return ri===0?`<th>${reportEsc(value)}</th>`:`<td>${reportEsc(value)}</td>`}).join('')}</tr>`).join('');return `<article class="formal-report"><header class="report-letterhead"><img class="report-mark" style="width:58px;height:58px;object-fit:contain;flex:none" src="${window.AIC_REPORT_LOGO}" alt="Logo de la AIC"><div><b>${reportEsc(headers[0])}</b><span>${reportEsc(headers[1])}</span>${headers[2]?`<span>${reportEsc(headers[2])}</span>`:''}</div></header><h1>${reportEsc(title)}</h1><p class="report-date">${reportEsc(t('reportingPeriod'))}: ${new Date().toLocaleDateString(lang==='es'?'es-CO':'en-US')}</p><table class="formal-table">${body}</table><footer>${reportEsc(t('headerAic'))} · ${reportEsc(t('headerCircuit'))}</footer></article>`}
function treasurerDashboard(){let sum=sumLedgers(Object.values(financeLedgers));return `${pageHead(t('finance'),t('financeSubtitle'))}<div class="summary-band"><div><small>${t('openingBalance')}</small><b>$${sum.opening.toLocaleString('es-CO')}</b></div><div><small>${t('totalIncome')}</small><b>$${sum.income.toLocaleString('es-CO')}</b></div><div><small>${t('totalExpenses')}</small><b>$${sum.expenses.toLocaleString('es-CO')}</b></div><div><small>${t('closingBalance')}</small><b>$${sum.closing.toLocaleString('es-CO')}</b></div></div><section class="panel"><div class="panel-head"><div><h2>${t('incomeBreakdown')} · ${t('expenseBreakdown')}</h2><p>${t('dateRange')}</p></div><button class="primary" data-go="finance">${t('generate')} →</button></div><p>${lang==='es'?'Ingresos y egresos consolidados con rubros unificados.':'Income and expenses consolidated under shared categories.'}</p></section>`}
function treasurerDashboard(){let sum=sumLedgers(Object.values(financeLedgers));return `${pageHead(t('finance'),t('financeSubtitle'))}<div class="summary-band"><div><small>${t('openingBalance')}</small><b>$${sum.opening.toLocaleString('es-CO')}</b></div><div><small>${t('totalIncome')}</small><b>$${sum.income.toLocaleString('es-CO')}</b></div><div><small>${t('totalExpenses')}</small><b>$${sum.expenses.toLocaleString('es-CO')}</b></div><div><small>${t('closingBalance')}</small><b>$${sum.closing.toLocaleString('es-CO')}</b></div></div><section class="panel"><div class="panel-head"><div><h2>${t('incomeBreakdown')} · ${t('expenseBreakdown')}</h2><p>${t('dateRange')}</p></div><button class="primary" data-go="finance">${t('generate')} →</button></div><p>${lang==='es'?'Ingresos y egresos consolidados por los mismos rubros registrados por las iglesias.':'Income and expenses consolidated using the churches’ shared categories.'}</p></section>`}
const priorFlowOpenModal=studentFlowOpenModal;function openModal(type,studentId,courseId){if(type==='openingBalance'){if(role!=='pastor')return;let ledger=ensureLedger(HOME_CHURCH);showModalForm(`<h2>${t('openingBalance')}</h2><p>${HOME_CHURCH} · ${t('dateRange')}</p><div class="field"><label>${t('amount')}</label><input name="amount" type="number" min="0" value="${ledger.opening}" required></div>`,d=>{ledger.opening=Number(d.amount);notify(lang==='es'?'Saldo inicial actualizado.':'Opening balance updated.');renderPage()});return}if(type!=='movement'){priorFlowOpenModal(type,studentId,courseId);return}if(role!=='pastor')return;let content=`<h2>${t('recordMovement')}</h2><div class="field"><label>${t('type')}</label><select name="type" id="movementType"><option value="income">${t('income')}</option><option value="expense">${t('expenses')}</option></select></div><div class="field"><label>${t('category')}</label><select name="category" id="movementCategory"></select></div><div class="field" id="manualDescriptionField"><label>${t('manualDescription')}</label><input name="description" id="movementDescription"><small class="muted">${t('manualDescriptionHint')}</small></div><div class="field"><label>${t('amount')}</label><input name="amount" type="number" min="1" required></div><div class="field"><label>${t('date')}</label><input name="date" type="date" value="${new Date().toISOString().slice(0,10)}" required></div>`;showModalForm(content,d=>{let cat=d.category,description=(d.description||'').trim();if(d.type==='income'&&['Actividades','Otros'].includes(cat)&&!description){notify(t('manualDescriptionHint'));return}ensureLedger(HOME_CHURCH).transactions.push({type:d.type,category:cat,description,amount:Number(d.amount),date:d.date});notify(t('movementAdded'));renderPage()});let typeSelect=$('#movementType'),catSelect=$('#movementCategory'),desc=$('#movementDescription');function updateCategories(){let list=typeSelect.value==='income'?incomeCategories:expenseCategories;catSelect.innerHTML=list.map(c=>`<option value="${reportEsc(c)}">${categoryLabel(c)}</option>`).join('');updateDescription()}function updateDescription(){let required=typeSelect.value==='income'&&['Actividades','Otros'].includes(catSelect.value);desc.required=required;desc.placeholder=required?t('manualDescriptionHint'):'';$('#manualDescriptionField').classList.toggle('hidden',!required)}typeSelect.onchange=updateCategories;catSelect.onchange=updateDescription;updateCategories()}
function financeReportOpen(type){return openReportBuilder(type)}
Object.assign(I.es,{category:'Concepto',amount:'Valor',tithes:'Diezmos',offerings:'Ofrendas',firstFruits:'Primicias',activities:'Actividades',otherIncome:'Otros',titheOfTithes:'Diezmo de diezmos',titheOfOfferings:'Diezmo de ofrendas',utilities:'Servicios públicos',pastorPay:'Pago pastor',renovation:'Remodelación',cleaningSupplies:'Implementos de limpieza',furniture:'Muebles',equipmentPurchase:'Compra de equipos',equipmentMaintenance:'Mantenimiento de equipos',openingBalance:'Saldo inicial',incomeBreakdown:'Ingresos desglosados',expenseBreakdown:'Egresos desglosados',totalIncome:'Total ingresos',totalExpenses:'Total egresos',closingBalance:'Saldo final',recordMovement:'Registrar ingreso o egreso',manualDescription:'Descripción del movimiento',manualDescriptionHint:'Obligatoria para Actividades y Otros'});Object.assign(I.en,{category:'Category',amount:'Amount',tithes:'Tithes',offerings:'Offerings',firstFruits:'First fruits',activities:'Activities',otherIncome:'Other',titheOfTithes:'Tithe of tithes',titheOfOfferings:'Tithe of offerings',utilities:'Utilities',pastorPay:'Pastor payment',renovation:'Renovation',cleaningSupplies:'Cleaning supplies',furniture:'Furniture',equipmentPurchase:'Equipment purchase',equipmentMaintenance:'Equipment maintenance',openingBalance:'Opening balance',incomeBreakdown:'Income breakdown',expenseBreakdown:'Expense breakdown',totalIncome:'Total income',totalExpenses:'Total expenses',closingBalance:'Closing balance',recordMovement:'Record income or expense',manualDescription:'Transaction description',manualDescriptionHint:'Required for Activities and Other'});
I.es.type='Tipo';I.en.type='Type';
document.addEventListener('click',e=>{let report=e.target.closest('[data-do="report"]');if(report){e.preventDefault();e.stopImmediatePropagation();openReportBuilder(page==='finance'?'finance':page==='secretary'?'secretary':'finance')}},true);
function renderPage(){if(page==='itaic'&&role==='pastor'){$('#breadcrumb').textContent=t('itaic');$('#content').innerHTML=pastorItaicPage();bindPage();return}if(page==='itaic'&&['itaic','presbitero'].includes(role)){$('#breadcrumb').textContent=t('itaic');$('#content').innerHTML=itaicAdminPage();bindPage();return}if(page==='itaicFinance'&&['itaic','presbitero','maestro','pastor'].includes(role)){$('#breadcrumb').textContent=t('navMoney');$('#content').innerHTML=itaicFinancePage();bindPage();return}if(page==='itaicGrades'&&['itaic','presbitero','maestro','pastor'].includes(role)){$('#breadcrumb').textContent=t('navGrades');$('#content').innerHTML=itaicGradesPage();bindPage();return}previousRenderPage()}
document.addEventListener('click',e=>{let report=e.target.closest('[data-report]');if(report){e.preventDefault();e.stopImmediatePropagation();openReportBuilder(report.dataset.report,report.dataset.reportCampus||null);return}let pay=e.target.closest('[data-payment-student]');if(pay){e.preventDefault();e.stopImmediatePropagation();openModal('payment',pay.dataset.paymentStudent,pay.dataset.paymentCourse);return}let ok=e.target.closest('[data-enrollment-approve]');if(ok){e.preventDefault();e.stopImmediatePropagation();approveItaicEnrollment(ok.dataset.enrollmentApprove,true);return}let no=e.target.closest('[data-enrollment-reject]');if(no){e.preventDefault();e.stopImmediatePropagation();approveItaicEnrollment(no.dataset.enrollmentReject,false);return}},true);
function coursePage(){let readAll=['itaic','presbitero'].includes(role),course=(readAll?sections():teacherCourseList()).find(c=>c.id===selectedCourseId);if(!course){selectedCourseId=null;return readAll?itaicAdminPage():teacherHome()}let assessments=courseAssessments[course.id]||[],weight=assessments.reduce((n,a)=>n+a.weight,0),students=courseStudents(course),editable=!readAll&&teacherCourseList().some(c=>c.id===course.id),returnButton=readAll?`<button class="secondary" data-back-itaic>← ${t('itaic')}</button>`:`<button class="secondary" data-back-courses>← ${t('myCourses')}</button>`,reportButtons=role==='itaic'?`<button class="secondary" data-it9="goGrades|${course.id}">${L('Notas','Grades')} →</button><button class="secondary" data-it9="goMoney|${course.id}">${L('Financiero','Financial')} →</button>`:'';return `${pageHead(`${course.subjectName||''} · ${t(course.year)} · ${course.campus}`,`${t('teacherWelcome')} · ${course.teacher}`,`${returnButton}${reportButtons}${editable?`<button class="primary" data-modal="assessment" ${weight>=100?'disabled':''}>＋ ${t('addAssessment')}</button>`:''}`)}<div class="summary-band"><div><small>${t('students')}</small><b>${students.length}</b></div><div><small>${t('weightGraded')}</small><b>${weight}%</b></div><div><small>${t('remainingWeight')}</small><b>${100-weight}%</b></div></div><section class="panel"><div class="panel-head"><div><h2>${t('gradebook')}</h2><p>${t('weightedNote')}</p></div>${editable?`<button class="secondary" data-save-grades>${t('saveGrades')}</button>`:''}</div><div class="table-card"><table class="data-table grade-table"><thead><tr><th>${t('student')}</th>${assessments.map(a=>`<th>${a.name}<small class="weight-label">${a.weight}%</small></th>`).join('')}<th>${t('weightedTotal')}</th><th>${t('completedWeight')}</th><th>${t('paymentsReceived')}</th><th>${t('owed')}</th><th></th></tr></thead><tbody>${students.map(m=>{let got=assessments.reduce((n,a)=>n+(a.grades[m.id]!==undefined?a.weight:0),0),total=weightedTotal(course,m.id),p=paymentFor(m.id);return `<tr><td><strong>${m.name}</strong><small class="student-meta">${m.id}</small></td>${assessments.map((a,i)=>`<td>${editable?`<input aria-label="${a.name} · ${m.name}" class="grade-input" data-grade-course="${course.id}" data-grade-assessment="${i}" data-grade-student="${m.id}" type="number" min="0" max="5" step="0.1" value="${a.grades[m.id]??''}" placeholder="—">`:a.grades[m.id]??'—'}</td>`).join('')}<td><strong class="weighted-result">${total.toFixed(2)} / 5.00</strong></td><td><span class="status ${got<100?'pending':''}">${got}%</span></td><td>$${p.paid.toLocaleString('es-CO')}</td><td>$${(p.due-p.paid).toLocaleString('es-CO')}</td><td>${editable?`<button class="secondary" data-payment-student="${m.id}" data-payment-course="${course.id}">${t('recordPayment')}</button>`:''}<button class="secondary" data-it="studentReport|${m.id}">${L('Informe','Report')}</button></td></tr>`}).join('')}</tbody></table></div></section>`}
document.addEventListener('click',e=>{let back=e.target.closest('[data-back-itaic]');if(back){e.preventDefault();e.stopImmediatePropagation();page='itaic';renderPage()}},true);
document.addEventListener('click',e=>{let action=e.target.closest('[data-do="report"]');if(action){e.preventDefault();e.stopImmediatePropagation();openReportBuilder(page==='finance'?'finance':page==='churches'?'churches':'secretary');return}let exportButton=e.target.closest('[data-export]');if(exportButton){e.preventDefault();e.stopImmediatePropagation();let kind=exportButton.dataset.export==='finance'?'finance':exportButton.dataset.export==='churches'?'churches':exportButton.dataset.export==='students'?'itaic-secretary':'secretary';openReportBuilder(kind)}},true);
function reportHtml(kind,scope){let title=reportTitleFor(kind,scope,kind.endsWith('finance')||kind==='finance'?t('financialReportTitle'):t('generalReportTitle')),headers=reportHeader(kind,scope),rows=reportRows(kind,scope),body=rows.map((r,i)=>`<tr>${r.map(v=>i===0?`<th>${reportEsc(v)}</th>`:`<td>${reportEsc(v)}</td>`).join('')}</tr>`).join('');return `<article class="formal-report"><header class="report-letterhead"><img class="report-mark" style="width:58px;height:58px;object-fit:contain;flex:none" src="${window.AIC_REPORT_LOGO}" alt="Logo de la AIC"><div><b>${reportEsc(headers[0])}</b><span>${reportEsc(headers[1])}</span>${headers[2]?`<span>${reportEsc(headers[2])}</span>`:''}</div></header><h1>${reportEsc(title)}</h1><p class="report-date">${reportEsc(t('reportingPeriod'))}: ${new Date().toLocaleDateString(lang==='es'?'es-CO':'en-US')}</p><table class="formal-table">${body}</table><footer>${reportEsc(t('headerAic'))} · ${reportEsc(t('headerCircuit'))}</footer></article>`}
function pastorDashboard(){let local=members.filter(m=>m.church===HOME_CHURCH),baptized=local.filter(m=>m.baptized).length,unbaptized=local.length-baptized,kids=local.filter(m=>m.age<13).length,women=local.filter(m=>m.sex==='Femenino').length,men=local.length-women;return `${pageHead(lang==='es'?'Resumen de mi iglesia':'My church overview',HOME_CHURCH+' · '+churches[0][1])} ${stats([['♙',t('totalMembers'),local.length,t('membersSubtitle')],['✧',t('baptized'),baptized,lang==='es'?'Miembros bautizados':'Baptized members'],['○',t('no'),unbaptized,lang==='es'?'Miembros pendientes de bautismo':'Not baptized'],['◈',t('balance'),money(ledgerTotals(ensureLedger(HOME_CHURCH)).closing),periodLabelOf(HOME_CHURCH)]])}<div class="grid-2"><section class="panel"><div class="panel-head"><div><h2>${lang==='es'?'Composición de la iglesia':'Church composition'}</h2><p>${HOME_CHURCH}</p></div></div><div class="summary-band"><div><small>${t('women')}</small><b>${women}</b></div><div><small>${t('men')}</small><b>${men}</b></div><div><small>${t('children')}</small><b>${kids}</b></div></div><div class="church-row"><div class="church-emblem">⌂</div><div><b>${HOME_CHURCH}</b><small>${churches[0][1]}</small></div><div class="row-end"><small>${t('pastorLabel')}</small><b>${churches[0][2]}</b></div></div></section><section class="panel"><div class="panel-head"><div><h2>${lang==='es'?'Actividad de mi iglesia':'My church activity'}</h2><p>${lang==='es'?'Movimientos recientes locales':'Recent local activity'}</p></div></div><div class="activity"><div class="activity-row"><div class="activity-dot">♙</div><div><b>${lang==='es'?'Miembros registrados':'Members registered'}</b><small>${local.length} ${t('membersLabel')}</small></div><time>${t('thisMonth')}</time></div><div class="activity-row"><div class="activity-dot">◈</div><div><b>${lang==='es'?'Saldo del periodo':'Current period balance'}</b><small>${money(ledgerTotals(ensureLedger(HOME_CHURCH)).closing)}</small></div><time>${t('finance')}</time></div></div></section></div>`}
function teacherDashboard(){let courses=teacherFilteredList(),students=[...new Set(courses.flatMap(c=>c.students))],records=[];for(let c of courses){let assessments=courseAssessments[c.id]||[];for(let id of c.students){let m=members.find(x=>x.id===id),p=paymentFor(id);if(!m)continue;if(assessments.length)for(let a of assessments)records.push([`${t(c.year)} · ${m.name}`,`${a.name} (${a.weight}%)`,a.grades[id]??'—',a.grades[id]!==undefined?(Number(a.grades[id])*a.weight/100).toFixed(2):'—',`$${p.paid.toLocaleString('es-CO')}`,`$${(p.due-p.paid).toLocaleString('es-CO')}`]);else records.push([`${t(c.year)} · ${m.name}`,t('notAvailable'),'—','—',`$${p.paid.toLocaleString('es-CO')}`,`$${(p.due-p.paid).toLocaleString('es-CO')}`])}}let nAssess=courses.reduce((n,c)=>n+(courseAssessments[c.id]||[]).length,0);return `${pageHead(lang==='es'?'Panel de maestro':'Teacher dashboard',t('teacherWelcome'))}${homeFilterBar()}${stats([['▣',t('myCourses'),courses.length,lang==='es'?'Cursos asignados':'Assigned courses'],['♙',t('students'),students.length,lang==='es'?'Estudiantes de mis grupos':'Students in my groups'],['✎',t('grades'),nAssess,lang==='es'?'Evaluaciones en mis cursos':'Assessments in my courses']])}<section class="panel"><div class="panel-head"><div><h2>${t('myCourses')}</h2><p>${lang==='es'?'Solo aparecen los cursos y estudiantes asignados a tu usuario.':'Only your assigned courses and students are shown.'}</p></div></div>${courses.map(c=>teacherSummary(c)).join('')||`<div class="empty">${t('noAssignedCourses')}</div>`}</section><section class="panel"><div class="panel-head"><div><h2>${lang==='es'?'Notas y abonos de mis estudiantes':'My students’ grades and payments'}</h2><p>${lang==='es'?'Detalle por curso, estudiante y evaluación':'Details by course, student, and assessment'}</p></div></div><div class="table-card"><table class="data-table"><thead><tr><th>${t('student')} · ${t('courseYear')}</th><th>${t('assessmentName')}</th><th>${t('grades')}</th><th>${t('weightedTotal')}</th><th>${t('paid')}</th><th>${t('owed')}</th></tr></thead><tbody>${records.map(r=>`<tr>${r.map((v,i)=>`<td>${i===0||i===2?`<strong>${reportEsc(v)}</strong>`:reportEsc(v)}</td>`).join('')}</tr>`).join('')||`<tr><td colspan="6" class="empty">${t('noAssignedCourses')}</td></tr>`}</tbody></table></div></section>`}
function secretaryDashboard(){return `${pageHead(t('secretary'),t('secretarySubtitle'))}${stats(memberStats(members))}<section class="panel"><div class="panel-head"><div><h2>${t('churchOverview')}</h2><p>${lang==='es'?'Distribución de membresía por iglesia':'Membership by church'}</p></div><button class="primary" data-go="secretary">${t('generate')} →</button></div>${churchRows()}</section>`}
function treasurerDashboard(){return `${pageHead(t('finance'),t('financeSubtitle'))}<div class="summary-band"><div><small>${t('income')}</small><b>$18.640.000</b></div><div><small>${t('expenses')}</small><b>$9.520.000</b></div><div><small>${t('balance')}</small><b>$9.120.000</b></div></div><section class="panel"><div class="panel-head"><div><h2>${lang==='es'?'Resumen financiero por iglesia':'Finance by church'}</h2><p>${t('dateRange')}</p></div><button class="primary" data-go="finance">${t('generate')} →</button></div><div class="table-card"><table class="data-table"><thead><tr><th>${t('churchLabel')}</th><th>${t('income')}</th><th>${t('expenses')}</th><th>${t('final')}</th></tr></thead><tbody>${churches.map((c,i)=>`<tr><td><strong>${c[0]}</strong></td><td>$${(2450000-i*260000).toLocaleString('es-CO')}</td><td>$${(1130000-i*110000).toLocaleString('es-CO')}</td><td><strong>$${(3120000+i*230000).toLocaleString('es-CO')}</strong></td></tr>`).join('')}</tbody></table></div></section>`}
function presbyterDashboard(){return `${pageHead(`${t('hello')}, ${roles.presbitero[lang]} 👋`,lang==='es'?'Resumen general del Circuito Córdoba.':'Córdoba Circuit overview.')} ${stats([['⌂',t('totalChurches'),'12',lang==='es'?'en el circuito':'in circuit'],['♙',t('totalMembers'),'1,246',`<span class="positive">↑ 4.8%</span> ${lang==='es'?'este año':'this year'}`],['✧',t('baptized'),'918','73.6%'],['◈',t('monthlyIncome'),'$18.640.000',t('thisMonth')]])}<div class="grid-2"><section class="panel"><div class="panel-head"><div><h2>${t('churchOverview')}</h2><p>${t('dateRange')}</p></div><button class="text-link" data-go="churches">${t('viewAll')} →</button></div>${churchRows()}</section><section class="panel"><div class="panel-head"><div><h2>${t('recentActivity')}</h2><p>${lang==='es'?'Actividad del circuito':'Circuit activity'}</p></div></div>${activityRows()}</section></div>`}
function dashboard(){if(role==='pastor')return pastorDashboard();if(role==='maestro')return teacherDashboard();if(role==='tesorero')return treasurerDashboard();if(role==='secretario')return secretaryDashboard();if(role==='presbitero')return presbyterDashboard();return `${pageHead(t('itaicAdmin'),t('itaicSubtitle'))}<section class="panel"><div class="toolbar"><button class="primary" data-go="itaic">${t('itaic')} →</button><button class="secondary" data-go="itaicFinance">${t('itaicFinance')} →</button></div></section>`}
function showModalForm(content,onSave){$('#modalRoot').innerHTML=`<div class="modal-backdrop"><form class="modal" id="modalForm">${content}<div class="modal-actions"><button type="button" class="secondary" id="cancelModal">${t('cancel')}</button><button class="primary">${t('save')}</button></div></form></div>`;$('#cancelModal').onclick=()=>$('#modalRoot').innerHTML='';$('#modalForm').onsubmit=e=>{e.preventDefault();onSave(Object.fromEntries(new FormData(e.target)));$('#modalRoot').innerHTML=''}}
function itaicFinancePage(){let totalDue=itaicPayments.reduce((a,p)=>a+p.due,0),collected=itaicPayments.reduce((a,p)=>a+p.paid,0),paid=itaicPayments.filter(p=>p.paid>=p.due).length,owing=itaicPayments.length-paid;return `${pageHead(t('itaicFinance'),t('itaicFinanceReport'),`<button class="secondary" data-report="itaic-finance">${t('generate')} →</button>`)}${stats([['◈',t('totalCollected'),`$${collected.toLocaleString('es-CO')}`,t('paid')],['◌',t('outstanding'),`$${(totalDue-collected).toLocaleString('es-CO')}`,t('owed')],['✓',t('paidAccounts'),paid,t('paymentFullyPaid')],['!',t('owingAccounts'),owing,t('paymentPartial')]])}<section class="table-card"><div class="table-tools"><b>${t('verifyPayments')}</b></div><table class="data-table"><thead><tr><th>${t('student')}</th><th>${t('tuition')}</th><th>${t('paid')}</th><th>${t('owed')}</th><th>${t('paymentStatus')}</th><th></th></tr></thead><tbody>${itaicPayments.map(p=>{let m=members.find(x=>x.id===p.id),due=p.due-p.paid;return `<tr><td><strong>${m?.name||p.id}</strong></td><td>$${p.due.toLocaleString('es-CO')}</td><td>$${p.paid.toLocaleString('es-CO')}</td><td>$${due.toLocaleString('es-CO')}</td><td><span class="status ${due?'pending':''}">${due?t('paymentPartial'):t('paymentFullyPaid')}</span></td><td>${role==='itaic'&&due>0?`<button class="secondary" data-payment-student="${p.id}">${t('markPayment')}</button>`:''}</td></tr>`}).join('')}</tbody></table></section>`}
Object.assign(I.es,{courseGroups:'Cursos y grupos',courseGroupsHint:'Consulta los estudiantes, maestros y calificaciones por grupo.',teacherAssigned:'Maestro asignado al curso.',itaicSubtitle:'Instituto Teológico de la AIC.'});Object.assign(I.en,{courseGroups:'Courses and groups',courseGroupsHint:'Review students, teachers, and grades by group.',teacherAssigned:'Teacher assigned to course.',itaicSubtitle:'AIC Theological Institute.'});
function reportHtml(kind,scope){let title=reportTitleFor(kind,scope,kind.endsWith('finance')||kind==='finance'?t('financialReportTitle'):t('generalReportTitle')),headers=reportHeader(kind,scope),rows=reportRows(kind,scope),body=rows.map((r,i)=>`<tr>${r.map((v,ci)=>{let value=kind==='finance'&&ci===r.length-1&&typeof v==='number'?`$${v.toLocaleString('es-CO')}`:v;return i===0?`<th>${reportEsc(value)}</th>`:`<td>${reportEsc(value)}</td>`}).join('')}</tr>`).join('');return `<article class="formal-report"><header class="report-letterhead"><img class="report-mark" style="width:58px;height:58px;object-fit:contain;flex:none" src="${window.AIC_REPORT_LOGO}" alt="Logo de la AIC"><div><b>${reportEsc(headers[0])}</b><span>${reportEsc(headers[1])}</span>${headers[2]?`<span>${reportEsc(headers[2])}</span>`:''}</div></header><h1>${reportEsc(title)}</h1><p class="report-date">${reportEsc(t('reportingPeriod'))}: ${new Date().toLocaleDateString(lang==='es'?'es-CO':'en-US')}</p><table class="formal-table">${body}</table><footer>${reportEsc(t('headerAic'))} · ${reportEsc(t('headerCircuit'))}</footer></article>`}
function treasurerDashboard(){let s=sumLedgers(Object.values(financeLedgers));return `${pageHead(t('finance'),t('financeSubtitle'))}<div class="summary-band"><div><small>${t('openingBalance')}</small><b>$${s.opening.toLocaleString('es-CO')}</b></div><div><small>${t('totalIncome')}</small><b>$${s.income.toLocaleString('es-CO')}</b></div><div><small>${t('totalExpenses')}</small><b>$${s.expenses.toLocaleString('es-CO')}</b></div><div><small>${t('closingBalance')}</small><b>$${s.closing.toLocaleString('es-CO')}</b></div></div><section class="panel"><div class="panel-head"><div><h2>${t('incomeBreakdown')} · ${t('expenseBreakdown')}</h2><p>${t('dateRange')}</p></div><button class="primary" data-go="finance">${t('generate')} →</button></div><p>${lang==='es'?'Ingresos y egresos consolidados por rubro.':'Income and expenses consolidated by category.'}</p></section>`}
function presbyterDashboard(){let s=sumLedgers(Object.values(financeLedgers));return `${pageHead(`${t('hello')}, ${roles.presbitero[lang]} 👋`,lang==='es'?'Resumen general del Circuito Córdoba.':'Córdoba Circuit overview.')} ${stats([['⌂',t('totalChurches'),churches.length,lang==='es'?'en el circuito':'in circuit'],['♙',t('totalMembers'),members.length,t('registered')],['✧',t('baptized'),members.filter(m=>m.baptized).length,''],['◈',t('monthlyIncome'),`$${s.income.toLocaleString('es-CO')}`,t('thisMonth')]])}<div class="grid-2"><section class="panel"><div class="panel-head"><div><h2>${t('churchOverview')}</h2><p>${t('dateRange')}</p></div><button class="text-link" data-go="churches">${t('viewAll')} →</button></div>${churchRows()}</section><section class="panel"><div class="panel-head"><div><h2>${t('recentActivity')}</h2><p>${lang==='es'?'Actividad del circuito':'Circuit activity'}</p></div></div>${activityRows()}</section></div>`}
const originalReportRowsForFinance=reportRowsPrevious;
function reportRows(kind,scope){if(kind==='finance'&&role!=='pastor'){ let ledgers=Object.values(financeLedgers),summary=sumLedgers(ledgers),rows=[[t('category'),t('amount')],[t('openingBalance'),summary.opening],[t('incomeBreakdown'),'']];for(const cat of incomeCategories){let amount=ledgers.flatMap(l=>l.transactions).filter(x=>x.type==='income'&&x.category===cat).reduce((n,x)=>n+Number(x.amount),0);rows.push([categoryLabel(cat),amount])}rows.push([t('totalIncome'),summary.income],[t('expenseBreakdown'),'']);for(const cat of expenseCategories){let amount=ledgers.flatMap(l=>l.transactions).filter(x=>x.type==='expense'&&x.category===cat).reduce((n,x)=>n+Number(x.amount),0);rows.push([categoryLabel(cat),amount])}rows.push([t('totalExpenses'),summary.expenses],[t('closingBalance'),summary.closing]);return rows}return originalReportRowsForFinance(kind,scope)}

/* ===== Botón "atrás" del celular =====
   Android le pregunta a la app (window.aicBack) y la app decide: cierra la ventana o el menú abierto,
   retrocede una pantalla, o en el inicio pide cerrar sesión. Si devuelve false (pantalla de inicio de
   sesión), Android cierra la aplicación. No depende del historial del WebView. */
(function(){
  var stack=[],restoring=false;
  var appEl=document.getElementById('app'),modalRoot=document.getElementById('modalRoot'),sideEl=document.getElementById('sidebar');
  function inApp(){return !appEl.classList.contains('hidden')}
  function track(){
    if(restoring||!inApp())return;
    var key=page+'|'+(selectedCourseId||'')+'|'+assocFilter;
    if(page==='dashboard'){stack=[{page:page,sel:null,assoc:'',key:key}]}
    else if(stack.length>1&&stack[stack.length-2].key===key){stack.pop()}
    else if(!stack.length||stack[stack.length-1].key!==key){
      stack.push({page:page,sel:selectedCourseId||null,assoc:assocFilter,key:key});
      if(stack.length>40)stack.shift();
    }
  }
  var baseRenderPage=renderPage;
  renderPage=function(){var r=baseRenderPage.apply(this,arguments);track();return r};
  window.aicBack=function(){
    if(!inApp())return false;
    if(modalRoot.firstElementChild){modalRoot.innerHTML='';return true}
    if(sideEl.classList.contains('open')){sideEl.classList.remove('open');return true}
    if(stack.length>1){
      stack.pop();
      var prev=stack[stack.length-1];
      restoring=true;
      try{page=prev.page;selectedCourseId=prev.sel;assocFilter=prev.assoc||'';renderNav();renderPage()}finally{restoring=false}
      return true;
    }
    confirmModal('<h2>'+L('Cerrar sesión','Sign out')+'</h2><p>'+L('¿Deseas cerrar sesión y volver a la pantalla de inicio?','Do you want to sign out and return to the start screen?')+'</p>',L('Cerrar sesión','Sign out'),function(){document.getElementById('logout').click()});
    return true;
  };
  var lo=document.getElementById('logout');
  if(lo)lo.addEventListener('click',function(){sideEl.classList.remove('open');stack=[]});
})();

/* ===================== ITAIC: materias por año, maestros por materia, informes con filtros ===================== */
function L(es,en){return lang==='es'?es:en}
let itaicSubjects=['year1','year2','year3'].map(y=>({id:'sub-'+y+'-general',year:y,name:'General'}));
let subjectTeachers=[];
let itaicSettings={passMin:3};
(function migrate(){
  let store={};
  itaicCourses.forEach(c=>{
    let sid='sub-'+c.year+'-general',key=sid+'|'+c.campus;
    if(courseAssessments[c.id]){store[key]=courseAssessments[c.id]}
    if(c.teacher)subjectTeachers.push({subjectId:sid,campus:c.campus,teacher:c.teacher});
  });
  // las listas de evaluaciones se crean solas al consultarlas por primera vez
  courseAssessments=new Proxy(store,{get(o,k){if(typeof k==='string'&&k.indexOf('|')>0&&!(k in o))o[k]=[];return o[k]}});
})();
function syncTA(){teacherAssignments=subjectTeachers.map(a=>({teacher:a.teacher,course:a.subjectId+'|'+a.campus}))}
syncTA();
function sections(){
  let out=[];
  itaicSubjects.forEach(sub=>itaicCampuses.forEach(campus=>{
    let course=itaicCourses.find(c=>c.year===sub.year&&c.campus===campus),tr=subjectTeachers.find(a=>a.subjectId===sub.id&&a.campus===campus);
    out.push({id:sub.id+'|'+campus,subjectId:sub.id,subjectName:sub.name,year:sub.year,campus,teacher:tr?tr.teacher:'',students:course?course.students:[]});
  }));
  return out;
}
const itaicReadAll=()=>['itaic','presbitero'].includes(role);
const visibleSections=()=>itaicReadAll()?sections():teacherCourseList();
const subjectLabel=sub=>`${sub.name} · ${t(sub.year)}`;
const studentName=id=>(members.find(m=>m.id===id)||{}).name||id;
const passed=g=>g>=itaicSettings.passMin;
const resultLabel=g=>passed(g)?L('Aprobó','Passed'):L('Reprobó','Failed');
const money=n=>'$'+Number(n).toLocaleString('es-CO');

/* ---------- Informes (académico y financiero) con filtros ---------- */
function scopeParse(scope){
  if(!scope||scope==='General')return {mode:'general',value:''};
  let i=scope.indexOf('|');
  return i<0?{mode:'campus',value:scope}:{mode:scope.slice(0,i),value:scope.slice(i+1)};
}
function scopeLabel(scope){
  let f=scopeParse(scope);
  if(f.mode==='campus')return L('Sede: ','Campus: ')+f.value;
  if(f.mode==='subject'){let sub=itaicSubjects.find(x=>x.id===f.value);return L('Materia: ','Subject: ')+(sub?subjectLabel(sub):f.value)}
  if(f.mode==='student')return L('Alumno: ','Student: ')+studentName(f.value)+' ('+f.value+')';
  return L('General','General');
}
function filteredSections(f){
  let list=visibleSections();
  if(f.mode==='campus')list=list.filter(x=>x.campus===f.value);
  if(f.mode==='subject')list=list.filter(x=>x.subjectId===f.value);
  return list;
}
function academicRows(f){
  let secs=filteredSections(f),rows;
  if(f.mode==='student'){
    rows=[[L('Materia','Subject'),L('Sede','Campus'),L('Evaluación','Assessment'),L('Peso','Weight'),L('Nota','Grade')]];
    secs.filter(x=>x.students.includes(f.value)).forEach(x=>{
      (courseAssessments[x.id]||[]).forEach(a=>rows.push([`${x.subjectName} (${t(x.year)})`,x.campus,a.name,a.weight+'%',a.grades[f.value]!==undefined?Number(a.grades[f.value]).toFixed(1):'—']));
      let fin=weightedTotal(x,f.value);
      rows.push([`${x.subjectName} (${t(x.year)})`,x.campus,L('NOTA FINAL','FINAL GRADE'),'',`${fin.toFixed(2)} · ${resultLabel(fin)}`]);
    });
  }else{
    rows=[[L('Alumno','Student'),L('Documento','ID'),L('Año','Year'),L('Materia','Subject'),L('Sede','Campus'),L('Nota final','Final grade'),L('Resultado','Result')]];
    secs.slice().sort((a,b)=>a.campus.localeCompare(b.campus)||a.year.localeCompare(b.year)||a.subjectName.localeCompare(b.subjectName)).forEach(x=>{
      x.students.slice().sort((a,b)=>studentName(a).localeCompare(studentName(b))).forEach(id=>{let g=weightedTotal(x,id);rows.push([studentName(id),id,t(x.year),x.subjectName,x.campus,g.toFixed(2),resultLabel(g)])});
    });
  }
  if(rows.length===1)rows.push([L('Sin registros para este filtro','No records for this filter')]);
  return rows;
}
function financeRows(f){
  let ids;
  if(f.mode==='student')ids=[f.value];
  else if(f.mode==='subject')ids=[...new Set(filteredSections(f).flatMap(x=>x.students))];
  else if(itaicReadAll())ids=[...new Set(itaicCourses.filter(c=>f.mode!=='campus'||c.campus===f.value).flatMap(c=>c.students))];
  else ids=[...new Set(filteredSections(f).flatMap(x=>x.students))];
  let pays=ids.map(paymentFor),due=pays.reduce((a,p)=>a+p.due,0),paid=pays.reduce((a,p)=>a+p.paid,0);
  if(f.mode==='student'){
    let p=pays[0]||{due:0,paid:0};
    return [[L('Concepto','Item'),L('Valor','Value')],[L('Alumno','Student'),studentName(f.value)],[L('Documento','ID'),f.value],[L('Valor anual (matrícula)','Annual tuition'),money(p.due)],[L('Total abonado','Total paid'),money(p.paid)],[L('Saldo pendiente','Outstanding'),money(p.due-p.paid)],[L('Estado','Status'),p.paid>=p.due?t('paymentFullyPaid'):t('paymentPartial')]];
  }
  let rows=[['Indicador','Resultado'],[t('studentCount'),ids.length],[L('Valor anual (matrícula)','Annual tuition'),money(due)],[t('totalCollected'),money(paid)],[t('outstanding'),money(due-paid)],[t('paidAccounts'),pays.filter(p=>p.paid>=p.due).length],[t('owingAccounts'),pays.filter(p=>p.paid<p.due).length]];
  if(f.mode==='subject')rows.push([L('Nota','Note'),L('El pago es anual por alumno, no por materia','Payment is annual per student, not per subject')]);
  rows.push([L('Detalle por alumno','Detail by student'),'']);
  ids.forEach(id=>{let p=paymentFor(id);rows.push([studentName(id),`${t('paid')}: ${money(p.paid)} · ${t('owed')}: ${money(p.due-p.paid)} · ${p.paid>=p.due?t('paymentFullyPaid'):t('paymentPartial')}`])});
  return rows;
}
itaicReportRows=function(kind,scope){let f=scopeParse(scope);return kind==='itaic-finance'?financeRows(f):academicRows(f)};
let baseReportHeader=reportHeader;
reportHeader=function(kind,scope){
  if(!kind.startsWith('itaic'))return baseReportHeader(kind,scope);
  return [t('headerAic'),t('headerCircuit'),'ITAIC · '+scopeLabel(scope)];
};

/* ---------- Ventana de informes con filtros ---------- */
function itaicFilterOptions(mode){
  let secs=visibleSections();
  if(mode==='campus')return itaicCampuses.map(c=>[c,c]);
  if(mode==='subject')return itaicSubjects.filter(sub=>secs.some(x=>x.subjectId===sub.id)).map(sub=>[sub.id,subjectLabel(sub)]);
  if(mode==='student'){
    let ids=[...new Set(secs.flatMap(x=>x.students))].sort((a,b)=>studentName(a).localeCompare(studentName(b)));
    return ids.map(id=>[id,`${studentName(id)} · ${id}`]);
  }
  return [];
}
function itaicOpenReport(kind,preset){
  let admin=itaicReadAll(),st={kind:kind,mode:(preset&&preset.mode)||'general',value:(preset&&preset.value)||''};
  let modes=admin?[['general',L('General (todas las sedes)','General (all campuses)')],['campus',L('Por sede','By campus')],['subject',L('Por materia','By subject')],['student',L('Por alumno','By student')]]:[['general',L('Mis materias (general)','My subjects (general)')],['student',L('Por alumno (desglose)','By student (breakdown)')]];
  let scope=()=>st.mode==='general'?'General':st.mode+'|'+st.value;
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><section class="modal report-modal"><div class="panel-head"><div><h2>${L('Informe ITAIC','ITAIC report')}</h2><p>${t('reportActions')}</p></div><button class="inline-actions" id="closeReport">×</button></div>
  <div class="modal-grid"><div class="field"><label>${L('Tipo de informe','Report type')}</label><select id="irKind"><option value="itaic-secretary">${L('Académico (notas)','Academic (grades)')}</option><option value="itaic-finance">${L('Financiero','Financial')}</option></select></div>
  <div class="field"><label>${L('Alcance','Scope')}</label><select id="irMode">${modes.map(m=>`<option value="${m[0]}">${m[1]}</option>`).join('')}</select></div></div>
  <div class="field" id="irValWrap"><label id="irValLbl"></label><select id="irVal"></select></div>
  <div id="reportPreview"></div>
  <div class="modal-actions report-actions"><button class="secondary" data-report-format="excel">${t('exportExcel')}</button><button class="secondary" data-report-format="word">${t('exportWord')}</button><button class="primary" data-report-format="pdf">${t('exportPdf')}</button></div></section></div>`;
  function refresh(){
    let opts=itaicFilterOptions(st.mode),wrap=$('#irValWrap');
    wrap.style.display=st.mode==='general'?'none':'';
    $('#irValLbl').textContent=({campus:L('Sede','Campus'),subject:L('Materia','Subject'),student:L('Alumno','Student')})[st.mode]||'';
    if(st.mode!=='general'&&!opts.some(o=>o[0]===st.value))st.value=opts.length?opts[0][0]:'';
    $('#irVal').innerHTML=opts.map(o=>`<option value="${reportEsc(o[0])}" ${o[0]===st.value?'selected':''}>${reportEsc(o[1])}</option>`).join('');
    $('#irKind').value=st.kind;$('#irMode').value=st.mode;
    $('#reportPreview').innerHTML=reportHtml(st.kind,scope());
  }
  $('#closeReport').onclick=()=>$('#modalRoot').innerHTML='';
  $('#irKind').onchange=e=>{st.kind=e.target.value;refresh()};
  $('#irMode').onchange=e=>{st.mode=e.target.value;st.value='';refresh()};
  $('#irVal').onchange=e=>{st.value=e.target.value;refresh()};
  $$('[data-report-format]').forEach(b=>b.onclick=()=>exportFormalReport(st.kind,scope(),b.dataset.reportFormat));
  refresh();
}
let baseOpenReportBuilder=openReportBuilder;
openReportBuilder=function(kind,onlyCampus){
  if(!String(kind).startsWith('itaic'))return baseOpenReportBuilder.apply(this,arguments);
  itaicOpenReport(kind,onlyCampus&&itaicReadAll()?{mode:'campus',value:onlyCampus}:null);
};

/* ---------- Panel ITAIC: materias, maestros por materia y valores de referencia ---------- */
itaicAdminPage=function(){
  let can=role==='itaic',secs=sections(),active=secs.filter(x=>x.teacher||x.students.length);
  let head=`<button class="secondary" data-go="itaicGrades">${L('Notas','Grades')} →</button><button class="secondary" data-go="itaicFinance">${L('Financiero','Financial')} →</button>`;
  let stat=[['▣',t('students'),[...new Set(itaicCourses.flatMap(c=>c.students))].length,t('registered')],['⌂',t('campuses'),itaicCampuses.length,L('sedes activas','active campuses')],['♙',t('teachersTitle'),subjectTeachers.length,L('asignaciones activas','active assignments')],['◈',t('totalCollected'),money(itaicPayments.reduce((n,p)=>n+p.paid,0)),t('itaicFinance')]];
  let years=['year1','year2','year3'].map(y=>`<div class="subject-year"><div class="panel-head"><div><div class="eyebrow-line">${t(y).toUpperCase()}</div></div>${can?`<button class="secondary" data-it="newSubject|${y}">＋ ${L('Agregar materia','Add subject')}</button>`:''}</div>${itaicSubjects.filter(x=>x.year===y).map(sub=>`<div class="church-row"><div class="church-emblem">✎</div><div><b>${reportEsc(sub.name)}</b><small>${secs.filter(x=>x.subjectId===sub.id&&x.teacher).length} ${L('sedes con maestro','campuses with teacher')}</small></div>${can?`<button class="inline-actions" data-it="editSubject|${sub.id}" title="${L('Renombrar','Rename')}">✎</button><button class="inline-actions" data-it="delSubject|${sub.id}" title="${L('Eliminar','Delete')}">×</button>`:''}</div>`).join('')||`<div class="empty">${L('Sin materias para este año','No subjects for this year')}</div>`}</div>`).join('');
  let assigns=subjectTeachers.map(a=>{let sub=itaicSubjects.find(x=>x.id===a.subjectId);return sub&&itaicCampuses.includes(a.campus)?`<div class="church-row"><div class="church-emblem">♙</div><div><b>${reportEsc(a.teacher)}</b><small>${reportEsc(subjectLabel(sub))} · ${reportEsc(a.campus)}</small></div>${can?`<button class="inline-actions" data-it="unassign|${a.subjectId}|${reportEsc(a.campus)}">×</button>`:''}</div>`:''}).join('');
  return `${pageHead(t('itaicAdmin'),t('itaicSubtitle'),head)}<div class="stats-grid">${stat.map(a=>`<article class="stat-card"><div class="stat-top"><span>${a[1]}</span><span class="stat-icon">${a[0]}</span></div><div class="stat-value">${a[2]}</div><div class="stat-note">${a[3]}</div></article>`).join('')}</div>
  <section class="panel"><div class="panel-head"><div><h2>${L('Materias por año','Subjects by year')}</h2><p>${L('Los estudiantes se matriculan al año completo y aparecen en todas sus materias.','Students enroll in the whole year and appear in all of its subjects.')}</p></div></div>${years}</section>
  <section class="panel"><div class="panel-head"><div><h2>${t('assignments')}</h2><p>${L('Cada materia tiene su maestro en cada sede.','Each subject has its own teacher at each campus.')}</p></div>${can?`<button class="secondary" data-it="assign">＋ ${t('assignTeacher')}</button>`:''}</div>${assigns||`<div class="empty">${L('Aún no hay maestros asignados','No teachers assigned yet')}</div>`}</section>
  <section class="panel"><div class="panel-head"><div><h2>${t('courseGroups')}</h2><p>${L('Materias por sede con su maestro y estudiantes','Subjects per campus with teacher and students')}</p></div><button class="secondary" data-go="itaicFinance">${t('itaicFinance')} →</button></div>${active.map(x=>`<div class="church-row"><div class="church-emblem">✧</div><div><b>${reportEsc(x.subjectName)} · ${t(x.year)} · ${reportEsc(x.campus)}</b><small>${t('teacherLabel')}: ${reportEsc(x.teacher)||t('select')}</small></div><div class="row-end"><b>${x.students.length}</b><small>${t('students').toLowerCase()}</small></div><button class="text-link" data-admin-course="${reportEsc(x.id)}">${t('gradesCheck')} →</button></div>`).join('')||`<div class="empty">${L('Aún no hay materias activas','No active subjects yet')}</div>`}</section>
  <section class="panel"><div class="panel-head"><div><h2>${t('campuses')}</h2><p>${t('campusManagement')}</p></div>${can?`<button class="secondary" data-modal="campus">＋ ${t('addCampus')}</button>`:''}</div>${itaicCampuses.map(name=>`<div class="church-row"><div class="church-emblem">⌂</div><div><b>${reportEsc(name)}</b><small>${itaicCourses.filter(c=>c.campus===name).length} ${t('courseGroups').toLowerCase()}</small></div>${can?`<button class="inline-actions" data-remove-campus="${reportEsc(name)}">×</button>`:''}</div>`).join('')}</section>
  <section class="panel"><div class="panel-head"><div><h2>${L('Valores de referencia','Reference values')}</h2><p>${L('Escala de 0.0 a 5.0. Define cuándo un alumno aprueba una materia.','Scale 0.0 to 5.0. Defines when a student passes a subject.')}</p></div></div><div class="church-row"><div class="church-emblem">✓</div><div><b>${L('Nota mínima para aprobar','Minimum passing grade')}</b><small>${L('Reprobó','Failed')} &lt; ${itaicSettings.passMin.toFixed(1)} · ${L('Aprobó','Passed')} ≥ ${itaicSettings.passMin.toFixed(1)}</small></div>${can?`<input id="passMinInput" class="grade-input" type="number" min="0" max="5" step="0.1" value="${itaicSettings.passMin}"><button class="secondary" data-it="savePass">${t('save')}</button>`:`<div class="row-end"><b>${itaicSettings.passMin.toFixed(1)}</b></div>`}</div></section>${itaicRequestPanel()}`;
};

/* ---------- Acciones del panel (ventanas y botones) ---------- */
document.addEventListener('click',e=>{
  let el=e.target.closest('[data-it]');if(!el)return;
  e.preventDefault();e.stopImmediatePropagation();
  let a=el.dataset.it.split('|'),act=a[0],can=role==='itaic';
  if(act==='studentReport'){itaicOpenReport('itaic-secretary',{mode:'student',value:a[1]});return}
  if(!can)return;
  if(act==='newSubject'||act==='editSubject'){
    let editing=act==='editSubject',sub=editing?itaicSubjects.find(x=>x.id===a[1]):null,year=editing?sub.year:a[1];
    showModalForm(`<h2>${editing?L('Renombrar materia','Rename subject'):L('Agregar materia','Add subject')}</h2><p>${t(year)}</p><div class="field"><label>${L('Nombre de la materia','Subject name')}</label><input name="name" required value="${editing?reportEsc(sub.name):''}"></div>`,d=>{
      let name=String(d.name||'').trim();if(!name)return;
      if(itaicSubjects.some(x=>x.year===year&&x.id!==(sub&&sub.id)&&x.name.toLowerCase()===name.toLowerCase())){notify(L('Ya existe esa materia en el año','That subject already exists in the year'));return}
      if(editing)sub.name=name;else itaicSubjects.push({id:'sub-'+Date.now(),year,name});
      renderPage();
    });return;
  }
  if(act==='delSubject'){
    let sub=itaicSubjects.find(x=>x.id===a[1]);if(!sub)return;
    showModalForm(`<h2>${L('Eliminar materia','Delete subject')}</h2><p>${reportEsc(subjectLabel(sub))}</p><p>${L('Se eliminarán también sus evaluaciones, notas y maestros asignados.','Its assessments, grades and assigned teachers will also be deleted.')}</p>`,()=>{
      itaicSubjects=itaicSubjects.filter(x=>x.id!==sub.id);subjectTeachers=subjectTeachers.filter(x=>x.subjectId!==sub.id);
      Object.keys(courseAssessments).filter(k=>k.indexOf(sub.id+'|')===0).forEach(k=>delete courseAssessments[k]);
      syncTA();renderPage();
    });return;
  }
  if(act==='assign'){
    if(!itaicSubjects.length||!itaicCampuses.length){notify(L('Primero crea materias y sedes','Create subjects and campuses first'));return}
    let names=churches.map(c=>c[2]).concat(['Ana Lucía Ríos']);
    showModalForm(`<h2>${t('assignTeacher')}</h2><p>${t('assignmentOnly')}</p><div class="field"><label>${L('Materia','Subject')}</label><select name="subject">${itaicSubjects.map(sub=>`<option value="${sub.id}">${reportEsc(subjectLabel(sub))}</option>`).join('')}</select></div><div class="field"><label>${t('campuses')}</label><select name="campus">${itaicCampuses.map(c=>`<option>${reportEsc(c)}</option>`).join('')}</select></div><div class="field"><label>${t('teacherLabel')}</label><select name="teacher">${[...new Set(names.concat(members.map(m=>m.name)))].map(n=>`<option>${reportEsc(n)}</option>`).join('')}</select></div>`,d=>{
      subjectTeachers=subjectTeachers.filter(x=>!(x.subjectId===d.subject&&x.campus===d.campus));
      subjectTeachers.push({subjectId:d.subject,campus:d.campus,teacher:d.teacher});
      syncTA();notify(t('teacherAssigned'));renderPage();
    });return;
  }
  if(act==='unassign'){subjectTeachers=subjectTeachers.filter(x=>!(x.subjectId===a[1]&&x.campus===a[2]));syncTA();renderPage();return}
  if(act==='savePass'){
    let v=Number(($('#passMinInput')||{}).value);
    if(!(v>=0&&v<=5)){notify(L('Ingresa un valor entre 0 y 5','Enter a value between 0 and 5'));return}
    itaicSettings.passMin=Math.round(v*10)/10;notify(L('Valor de referencia guardado','Reference value saved'));renderPage();
  }
},true);
Object.assign(I.es,{assignments:'Maestros por materia',student:'Estudiante'});Object.assign(I.en,{assignments:'Teachers by subject',student:'Student'});

/* ===================== Entrega 3: guardado en el celular, permisos de edición, asociaciones, detalle por concepto ===================== */
let HOME_CHURCH=churches[0][0];

/* ---------- Asociaciones ---------- */
function assocList(){return [['ACAIC',L('Caballeros','Men')],['ADAIC',L('Damas','Women')],['AJAIC',L('Jóvenes','Youth')],['AJUVAIC',L('Juveniles','Juveniles')],['ANAIC',L('Niños','Children')]]}
function assocName(m){return m.assoc||L('Sin asociación','No association')}
function suggestAssoc(age,sex,civil){
  let r=localAgeRanges;age=Number(age);
  if(age<=r.childrenMax)return 'ANAIC';
  if(age<=r.juvenilesMax)return 'AJUVAIC';
  let married=['Casado','Unión libre'].includes(civil);
  if(age<=r.youthMax&&!married)return 'AJAIC';
  return sex==='Masculino'?'ACAIC':'ADAIC';
}
let assocFilter='';
function assocBar(){
  let chip=(k,label,n)=>`<button type="button" class="chip${assocFilter===k?' active':''}" data-it3="assocFilter|${k}">${label} · ${n}</button>`;
  return `<div class="assoc-bar">${chip('',L('Todos','All'),members.length)}${assocList().map(a=>chip(a[0],a[0],members.filter(m=>m.assoc===a[0]).length)).join('')}${chip('none',L('Sin asociación','None'),members.filter(m=>!m.assoc).length)}</div>`;
}
memberRows=function(){
  let data=members.filter(m=>`${m.name} ${m.id}`.toLowerCase().includes(filter.toLowerCase())&&(!assocFilter||(assocFilter==='none'?!m.assoc:m.assoc===assocFilter))),can=role==='pastor';
  return data.map(m=>`<tr><td><div class="person-cell"><span class="mini-avatar">${reportEsc(m.name.split(' ').map(x=>x[0]).slice(0,2).join(''))}</span><strong>${reportEsc(m.name)}</strong></div></td><td>${reportEsc(m.id)}</td><td>${m.age}</td><td>${m.sex}</td><td>${m.civil}</td><td>${m.assoc?`<span class="assoc-badge">${m.assoc}</span>`:'<span class="muted">—</span>'}</td><td><span class="status ${m.baptized?'':'pending'}">${m.baptized?t('yes'):t('no')}</span></td><td>${can?`<button class="inline-actions" data-it3="editMember|${reportEsc(m.id)}" title="${L('Editar','Edit')}">✎</button>`:''}</td></tr>`).join('')||`<tr><td colspan="8" class="empty">${t('empty')}</td></tr>`;
};
function assocField(sel){return `<div class="field"><label>${L('Asociación','Association')}</label><select name="assoc"><option value="">${L('Sin asociación','No association')}</option>${assocList().map(a=>`<option value="${a[0]}" ${sel===a[0]?'selected':''}>${a[0]} · ${a[1]}</option>`).join('')}</select></div>`}
function wireAssocSuggestion(form,touched){
  let sel=form.querySelector('[name=assoc]');if(!sel)return;
  sel.addEventListener('change',()=>{touched=true});
  let update=()=>{if(touched)return;let age=form.querySelector('[name=age]').value;if(age==='')return;sel.value=suggestAssoc(age,form.querySelector('[name=sex]').value,form.querySelector('[name=civil]').value)};
  ['age','sex','civil'].forEach(n=>{let el=form.querySelector('[name='+n+']');if(el){el.addEventListener('input',update);el.addEventListener('change',update)}});
}
let baseOpenModalE3=openModal;
openModal=function(type){
  baseOpenModalE3.apply(this,arguments);
  if(type==='member'&&role==='pastor'){
    let form=document.getElementById('modalForm'),grid=form&&form.querySelector('.modal-grid');
    if(grid){grid.insertAdjacentHTML('beforeend',assocField(''));wireAssocSuggestion(form,false)}
  }
};

/* ---------- Edición de datos (solo quien los crea) ---------- */
function renameMemberId(oldId,newId){
  itaicCourses.forEach(c=>{let i=c.students.indexOf(oldId);if(i>=0)c.students[i]=newId});
  itaicPayments.forEach(p=>{if(p.id===oldId)p.id=newId});
  Object.values(courseAssessments).forEach(list=>list.forEach(a=>{if(oldId in a.grades){a.grades[newId]=a.grades[oldId];delete a.grades[oldId]}}));
  itaicEnrollmentRequests.forEach(r=>{if(r.memberId===oldId)r.memberId=newId});
}
function editMember(id){
  let m=members.find(x=>x.id===id);if(!m||role!=='pastor')return;
  showModalForm(`<h2>${L('Editar miembro','Edit member')}</h2><p>${reportEsc(m.name)}</p><div class="modal-grid"><div class="field"><label>${t('name')}</label><input name="name" required value="${reportEsc(m.name)}"></div><div class="field"><label>${t('document')}</label><input name="id" required value="${reportEsc(m.id)}"></div><div class="field"><label>${t('age')}</label><input name="age" type="number" min="0" required value="${m.age}"></div><div class="field"><label>${t('sex')}</label><select name="sex"><option ${m.sex==='Femenino'?'selected':''}>Femenino</option><option ${m.sex==='Masculino'?'selected':''}>Masculino</option></select></div><div class="field"><label>${t('civil')}</label><select name="civil">${['Soltero','Casado','Unión libre','No aplica'].map(c=>`<option ${m.civil===c?'selected':''}>${c}</option>`).join('')}</select></div><div class="field"><label>${t('baptism')}</label><select name="baptized"><option value="true" ${m.baptized?'selected':''}>${t('yes')}</option><option value="false" ${m.baptized?'':'selected'}>${t('no')}</option></select></div>${assocField(m.assoc||'')}</div>${studiesField(m.studies)}`,d=>{
    let name=String(d.name||'').trim(),newId=String(d.id||'').trim();if(!name||!newId)return;
    if(newId!==m.id&&members.some(x=>x.id===newId)){notify(L('Ya existe un miembro con ese documento','A member with that ID already exists'));return}
    if(newId!==m.id)renameMemberId(m.id,newId);
    Object.assign(m,{name,id:newId,age:Number(d.age),sex:d.sex,civil:d.civil,baptized:d.baptized==='true',assoc:d.assoc||'',studies:readStudies(document.getElementById('modalForm'))});
    notify(L('Miembro actualizado ✓','Member updated ✓'));renderPage();
  });
  wireAssocSuggestion(document.getElementById('modalForm'),true);
}
churchRows=function(){
  let list=role==='pastor'?[churches[0]]:churches;
  return `<div class="church-list">${list.map(c=>{let i=churches.indexOf(c);return `<div class="church-row"><div class="church-emblem">⌂</div><div><b>${reportEsc(c[0])}</b><small>${reportEsc(c[1])}</small></div><div class="row-end"><b>${c[3]}</b><small>${t('membersLabel')}</small></div>${role==='presbitero'?`<button class="inline-actions" data-it3="editChurch|${i}" title="${L('Editar','Edit')}">✎</button>`:''}<button class="text-link" data-church="${i}">→</button></div>`}).join('')}</div>`;
};
function editChurch(i){
  let c=churches[i];if(!c||role!=='presbitero')return;
  showModalForm(`<h2>${L('Editar iglesia','Edit church')}</h2><div class="field"><label>${t('name')}</label><input name="name" required value="${reportEsc(c[0])}"></div><div class="field"><label>${t('address')}</label><input name="address" required value="${reportEsc(c[1])}"></div>`,d=>{
    let name=String(d.name||'').trim(),old=c[0];if(!name)return;
    if(churches.some((x,j)=>j!==i&&x[0].toLowerCase()===name.toLowerCase())){notify(L('Ya existe una iglesia con ese nombre','A church with that name already exists'));return}
    c[0]=name;c[1]=String(d.address||'').trim();
    if(name!==old){
      if(financeLedgers[old]){financeLedgers[name]=financeLedgers[old];delete financeLedgers[old];financeLedgers[name].church=name}if(financeClosures[old]){financeClosures[name]=financeClosures[old];delete financeClosures[old];financeClosures[name].requests.forEach(r=>{r.church=name})}
      members.forEach(m=>{if(m.church===old)m.church=name});
      itaicEnrollmentRequests.forEach(r=>{if(r.church===old)r.church=name});
      if(i===0)HOME_CHURCH=name;
    }
    notify(L('Iglesia actualizada ✓','Church updated ✓'));renderPage();
  });
}
function editPastor(i){
  let c=churches[i];if(!c||role!=='presbitero')return;
  showModalForm(`<h2>${L('Editar pastor','Edit pastor')}</h2><p>${reportEsc(c[0])}</p><div class="field"><label>${t('name')}</label><input name="name" required value="${reportEsc(c[2])}"></div>`,d=>{
    let name=String(d.name||'').trim(),old=c[2];if(!name)return;
    c[2]=name;
    if(name!==old){
      subjectTeachers.forEach(a=>{if(a.teacher===old)a.teacher=name});
      itaicCourses.forEach(x=>{if(x.teacher===old)x.teacher=name});
      itaicEnrollmentRequests.forEach(r=>{if(r.pastor===old)r.pastor=name});
      syncTA();
    }
    notify(L('Pastor actualizado ✓','Pastor updated ✓'));renderPage();
  });
}

/* ---------- Finanzas del pastor: detalle por concepto (solo pantalla, no afecta informes) ---------- */
function drillRows(type,cat,sum,ledger){
  let tx=ledger.transactions.filter(x=>x.type===type&&x.category===cat).slice().sort((a,b)=>String(a.date).localeCompare(String(b.date))),key=type+'|'+cat;
  return `<tr class="drill-head" data-drill="${reportEsc(key)}"><td><span class="drill-caret">›</span> ${categoryLabel(cat)}${tx.length?` <small class="muted">(${tx.length})</small>`:''}</td><td>$${sum.toLocaleString('es-CO')}</td></tr><tr class="drill-body hidden" data-drill-body="${reportEsc(key)}"><td colspan="2">${tx.length?`<div class="drill-list">${tx.map(x=>`<div class="drill-item"><span>${reportEsc(x.date)}</span><span>${reportEsc(x.description||'')}</span><b>$${Number(x.amount).toLocaleString('es-CO')}</b></div>`).join('')}</div>`:`<div class="empty">${L('Sin movimientos en el periodo','No transactions in this period')}</div>`}</td></tr>`;
}

/* ---------- Clics de las nuevas acciones ---------- */
document.addEventListener('click',e=>{
  let dr=e.target.closest('[data-drill]');
  if(dr){
    let key=dr.dataset.drill,body=[...document.querySelectorAll('[data-drill-body]')].find(x=>x.dataset.drillBody===key);
    if(body){body.classList.toggle('hidden');dr.classList.toggle('open',!body.classList.contains('hidden'))}
    return;
  }
  let el=e.target.closest('[data-it3]');if(!el)return;
  e.preventDefault();e.stopImmediatePropagation();
  let a=el.dataset.it3.split('|'),act=a[0];
  if(act==='assocFilter'){assocFilter=a[1]||'';renderPage()}
  else if(act==='editMember')editMember(a.slice(1).join('|'));
  else if(act==='editChurch')editChurch(Number(a[1]));
  else if(act==='editPastor')editPastor(Number(a[1]));
},true);

/* ---------- Guardado en el celular (localStorage) ---------- */
const PERSIST_KEY='aic-app-state-v2';
const PERSIST_VARS=['members','churches','financeLedgers','itaicCourses','itaicPayments','itaicCampuses','itaicSubjects','subjectTeachers','itaicSettings','localAgeRanges','itaicEnrollmentRequests','courseAssessments','financeClosures','circuitState','pastorsList'];
let persistBlocked=false;
function persistSave(){
  if(persistBlocked)return;
  try{let o={};PERSIST_VARS.forEach(n=>{try{o[n]=eval(n)}catch(e){}});localStorage.setItem(PERSIST_KEY,JSON.stringify({v:1,data:o}))}catch(e){}
}
function persistLoad(){
  let raw;try{raw=localStorage.getItem(PERSIST_KEY)}catch(e){return}
  if(!raw)return;
  let saved;try{saved=JSON.parse(raw).data}catch(e){return}
  PERSIST_VARS.forEach(n=>{
    try{
      if(!(n in saved))return;
      let cur=eval(n),val=saved[n];
      if(Array.isArray(cur)){cur.length=0;val.forEach(x=>cur.push(x))}
      else{Object.keys(cur).forEach(k=>delete cur[k]);Object.assign(cur,val)}
    }catch(e){}
  });
  HOME_CHURCH=churches[0][0];syncTA();
}
setTimeout(persistLoad,0); /* se restaura al terminar de cargar todo el script */
let persistTimer=null;
function persistSoon(){clearTimeout(persistTimer);persistTimer=setTimeout(persistSave,350)}
['click','input','change'].forEach(ev=>document.addEventListener(ev,persistSoon,true));
document.addEventListener('visibilitychange',()=>{if(document.hidden)persistSave()});
window.addEventListener('pagehide',persistSave);
(function(){
  let card=document.querySelector('.login-card');if(!card)return;
  let b=document.createElement('button');b.type='button';b.className='text-link reset-data';b.textContent=L('Restablecer datos de ejemplo','Reset sample data');
  b.onclick=()=>{if(confirm(L('Se borrarán los datos guardados en este celular y volverán los datos de ejemplo. ¿Continuar?','Data saved on this phone will be erased and the sample data restored. Continue?'))){persistBlocked=true;try{localStorage.removeItem(PERSIST_KEY)}catch(e){}location.reload()}};
  card.appendChild(b);
})();

/* ===================== Entrega 4: cierre de periodo, historial, comparativos, cierre anual y reapertura ===================== */
let financeClosures={};
function closureData(church){
  let d=financeClosures[church];
  if(!d)d=financeClosures[church]={closed:[],annual:[],requests:[]};
  if(!d.closed)d.closed=[];if(!d.annual)d.annual=[];if(!d.requests)d.requests=[];
  return d;
}
function periodLabel(id){
  let a=String(id).split('-').map(Number),name=new Date(a[0],a[1]-1,1).toLocaleDateString(lang==='es'?'es-CO':'en-US',{month:'long'});
  return name.charAt(0).toUpperCase()+name.slice(1)+' '+a[0];
}
function nextPeriod(id){let a=String(id).split('-').map(Number),m=a[1]+1,y=a[0];if(m>12){m=1;y++}return y+'-'+String(m).padStart(2,'0')}
function lastDayOf(id){let a=String(id).split('-').map(Number);return new Date(a[0],a[1],0).getDate()}
function ledgerPeriod(ledger){
  if(!ledger.period){
    let months=ledger.transactions.map(x=>String(x.date).slice(0,7)).filter(x=>/^\d{4}-\d{2}$/.test(x)).sort();
    ledger.period=months.length?months[months.length-1]:new Date().toISOString().slice(0,7);
  }
  return ledger.period;
}
const periodLabelOf=church=>periodLabel(ledgerPeriod(ensureLedger(church)));
const snapLedger=(church,snap)=>({church,opening:snap.opening,transactions:snap.transactions});

/* ---------- Cierre y reapertura ---------- */
function doClosePeriod(church){
  let ledger=ensureLedger(church),id=ledgerPeriod(ledger),tot=ledgerTotals(ledger),cd=closureData(church),a=id.split('-').map(Number);
  cd.closed.push({id,year:a[0],month:a[1],closedAt:new Date().toISOString(),snap:{opening:tot.opening,income:tot.income,expenses:tot.expenses,closing:tot.closing,transactions:ledger.transactions.map(x=>Object.assign({},x))}});
  cd.closed.sort((x,y)=>x.id.localeCompare(y.id));
  let parked=ledger.parked,next=nextPeriod(id);
  ledger.opening=tot.closing;ledger.period=next;
  ledger.transactions=parked&&parked.period===next?parked.transactions:[];
  delete ledger.parked;
}
function doReopen(church,periodId){
  let cd=closureData(church),ledger=ensureLedger(church),i=cd.closed.findIndex(c=>c.id===periodId);
  if(i<0||i!==cd.closed.length-1)return false;
  let c=cd.closed[i];
  ledger.parked={period:ledger.period,transactions:ledger.transactions};
  ledger.period=c.id;ledger.opening=c.snap.opening;ledger.transactions=c.snap.transactions.map(x=>Object.assign({},x));
  cd.closed.splice(i,1);
  cd.annual=cd.annual.filter(a=>a.year!==c.year);
  return true;
}
function pendingRequests(){
  let out=[];
  Object.keys(financeClosures).forEach(ch=>closureData(ch).requests.forEach(r=>{if(r.status==='pending')out.push(r)}));
  return out;
}

/* ---------- Datos agregados, anual y comparativos ---------- */
function aggregateMonths(months){
  let byCat={income:{},expense:{}};
  months.forEach(c=>c.snap.transactions.forEach(x=>{let b=byCat[x.type==='income'?'income':'expense'];b[x.category]=(b[x.category]||0)+Number(x.amount)}));
  return {opening:months[0].snap.opening,income:months.reduce((n,c)=>n+c.snap.income,0),expenses:months.reduce((n,c)=>n+c.snap.expenses,0),closing:months[months.length-1].snap.closing,byCat,
    months:months.map(c=>({id:c.id,label:periodLabel(c.id),income:c.snap.income,expenses:c.snap.expenses,closing:c.snap.closing}))};
}
function closedYears(church){return [...new Set(closureData(church).closed.map(c=>c.year))].sort()}
function doAnnualClose(church,year){
  let cd=closureData(church),months=cd.closed.filter(c=>c.year===Number(year));if(!months.length)return;
  cd.annual=cd.annual.filter(a=>a.year!==Number(year));
  cd.annual.push({id:'annual-'+year,year:Number(year),createdAt:new Date().toISOString(),monthIds:months.map(c=>c.id),snap:aggregateMonths(months)});
  cd.annual.sort((a,b)=>a.year-b.year);
}
function periodData(church,mode,id){
  let cd=closureData(church);
  if(mode==='m'){let c=cd.closed.find(x=>x.id===id);return c?aggregateMonths([c]):null}
  let months=cd.closed.filter(c=>String(c.year)===String(id));return months.length?aggregateMonths(months):null;
}
const signedMoney=n=>(n<0?'-':n>0?'+':'')+money(Math.abs(n));
function compareRows(church,mode,ida,idb){
  let A=periodData(church,mode,ida),B=periodData(church,mode,idb);
  if(!A||!B)return [[L('Sin datos para comparar','No data to compare')]];
  let la=mode==='m'?periodLabel(ida):String(ida),lb=mode==='m'?periodLabel(idb):String(idb);
  let line=(label,a,b)=>[label,money(a),money(b),signedMoney(b-a),a?((b-a)/Math.abs(a)*100).toFixed(1)+'%':'—'];
  let rows=[[L('Concepto','Item'),la,lb,L('Diferencia','Difference'),L('Variación','Change')],line(t('openingBalance'),A.opening,B.opening),[t('incomeBreakdown'),'','','','']];
  incomeCategories.forEach(c=>rows.push(line(categoryLabel(c),A.byCat.income[c]||0,B.byCat.income[c]||0)));
  rows.push(line(t('totalIncome'),A.income,B.income),[t('expenseBreakdown'),'','','','']);
  expenseCategories.forEach(c=>rows.push(line(categoryLabel(c),A.byCat.expense[c]||0,B.byCat.expense[c]||0)));
  rows.push(line(t('totalExpenses'),A.expenses,B.expenses),line(t('closingBalance'),A.closing,B.closing));
  return rows;
}
function annualRows(church,year){
  let a=closureData(church).annual.find(x=>x.year===Number(year));if(!a)return [[L('Sin datos','No data')]];
  let sn=a.snap,rows=[[L('Concepto','Item'),L('Valor','Value')],[L('Saldo inicial del año','Opening balance of the year'),money(sn.opening)],[t('incomeBreakdown'),'']];
  incomeCategories.forEach(c=>{if(sn.byCat.income[c])rows.push([categoryLabel(c),money(sn.byCat.income[c])])});
  rows.push([t('totalIncome'),money(sn.income)],[t('expenseBreakdown'),'']);
  expenseCategories.forEach(c=>{if(sn.byCat.expense[c])rows.push([categoryLabel(c),money(sn.byCat.expense[c])])});
  rows.push([t('totalExpenses'),money(sn.expenses)],[L('Saldo final del año','Closing balance of the year'),money(sn.closing)],['',''],[L('Resumen mensual','Monthly summary'),'']);
  sn.months.forEach(m=>rows.push([m.label,`${L('Ingresos','Income')} ${money(m.income)} · ${L('Egresos','Expenses')} ${money(m.expenses)} · ${L('Saldo final','Closing')} ${money(m.closing)}`]));
  return rows;
}

/* ---------- Conexión con el sistema de informes ---------- */
const SNAP_KINDS=['period-finance','annual-finance','compare-finance'];
function snapParts(scope){return String(scope).split('|')}
function reportTitleFor(kind,scope,fallback){
  if(!SNAP_KINDS.includes(kind))return fallback;
  let a=snapParts(scope);
  if(kind==='period-finance')return `${L('Informe financiero','Financial report')} · ${a[0]} · ${periodLabel(a[1])}`;
  if(kind==='annual-finance')return `${L('Informe general contable','General accounting report')} · ${a[0]} · ${a[1]}`;
  return `${L('Comparativo financiero','Financial comparison')} · ${a[0]}`;
}
let baseReportRowsE4=reportRows;
reportRows=function(kind,scope){
  if(!SNAP_KINDS.includes(kind))return baseReportRowsE4.apply(this,arguments);
  let a=snapParts(scope);
  if(kind==='period-finance'){let c=closureData(a[0]).closed.find(x=>x.id===a[1]);return c?ledgerRows(snapLedger(a[0],c.snap)):[[L('Sin datos','No data')]]}
  if(kind==='annual-finance')return annualRows(a[0],a[2]||a[1]);
  return compareRows(a[0],a[1],a[2],a[3]);
};
let baseReportHeaderE4=reportHeader;
reportHeader=function(kind,scope){
  if(!SNAP_KINDS.includes(kind))return baseReportHeaderE4.apply(this,arguments);
  let a=snapParts(scope),third=kind==='period-finance'?`${a[0]} · ${periodLabel(a[1])}`:kind==='annual-finance'?`${a[0]} · ${a[1]}`:a[0];
  return [t('headerAic'),t('headerCircuit'),third];
};
function openPlainReport(kind,scope,heading){
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><section class="modal report-modal"><div class="panel-head"><div><h2>${reportEsc(heading)}</h2><p>${t('reportActions')}</p></div><button class="inline-actions" id="closeReport">×</button></div><div id="reportPreview">${reportHtml(kind,scope)}</div><div class="modal-actions report-actions"><button class="secondary" data-report-format="excel">${t('exportExcel')}</button><button class="secondary" data-report-format="word">${t('exportWord')}</button><button class="primary" data-report-format="pdf">${t('exportPdf')}</button></div></section></div>`;
  $('#closeReport').onclick=()=>$('#modalRoot').innerHTML='';
  $$('[data-report-format]').forEach(b=>b.onclick=()=>exportFormalReport(kind,scope,b.dataset.reportFormat));
}
function openCompare(church){
  let cd=closureData(church),years=closedYears(church),st={mode:'m',a:'',b:''};
  if(cd.closed.length<2&&years.length<2){notify(L('Necesitas al menos dos periodos cerrados para comparar','You need at least two closed periods to compare'));return}
  let opts=()=>st.mode==='m'?cd.closed.slice().reverse().map(c=>[c.id,periodLabel(c.id)]):years.slice().reverse().map(y=>[String(y),String(y)]);
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><section class="modal report-modal"><div class="panel-head"><div><h2>${L('Comparar periodos','Compare periods')}</h2><p>${t('reportActions')}</p></div><button class="inline-actions" id="closeReport">×</button></div><div class="modal-grid"><div class="field"><label>${L('Comparación','Comparison')}</label><select id="cmpMode"><option value="m">${L('Mes con mes','Month vs month')}</option><option value="y">${L('Año con año','Year vs year')}</option></select></div><div></div><div class="field"><label>${L('Periodo base','Base period')}</label><select id="cmpA"></select></div><div class="field"><label>${L('Comparar con','Compare with')}</label><select id="cmpB"></select></div></div><div id="reportPreview"></div><div class="modal-actions report-actions"><button class="secondary" data-report-format="excel">${t('exportExcel')}</button><button class="secondary" data-report-format="word">${t('exportWord')}</button><button class="primary" data-report-format="pdf">${t('exportPdf')}</button></div></section></div>`;
  let scope=()=>`${church}|${st.mode}|${st.a}|${st.b}`;
  function refresh(){
    let o=opts();
    if(!o.some(x=>x[0]===st.a))st.a=o.length>1?o[1][0]:(o[0]?o[0][0]:'');
    if(!o.some(x=>x[0]===st.b)||st.b===st.a)st.b=o.length?o[0][0]:'';
    let html=o.map(x=>`<option value="${reportEsc(x[0])}">${reportEsc(x[1])}</option>`).join('');
    $('#cmpA').innerHTML=html;$('#cmpB').innerHTML=html;$('#cmpA').value=st.a;$('#cmpB').value=st.b;$('#cmpMode').value=st.mode;
    $('#reportPreview').innerHTML=o.length>1?reportHtml('compare-finance',scope()):`<div class="empty">${L('No hay suficientes periodos para esta comparación','Not enough periods for this comparison')}</div>`;
  }
  $('#closeReport').onclick=()=>$('#modalRoot').innerHTML='';
  $('#cmpMode').onchange=e=>{st.mode=e.target.value;st.a='';st.b='';refresh()};
  $('#cmpA').onchange=e=>{st.a=e.target.value;refresh()};
  $('#cmpB').onchange=e=>{st.b=e.target.value;refresh()};
  $$('[data-report-format]').forEach(b=>b.onclick=()=>exportFormalReport('compare-finance',scope(),b.dataset.reportFormat));
  refresh();
}

/* ---------- Panel de periodos (pantalla Finanzas del pastor) ---------- */
function periodPanel(church){
  let cd=closureData(church),ledger=ensureLedger(church),open=periodLabel(ledgerPeriod(ledger)),last=cd.closed[cd.closed.length-1];
  let lastReq=last?cd.requests.filter(r=>r.periodId===last.id).slice(-1)[0]:null,note='';
  if(ledger.parked)note=`<div class="notice">${L('Periodo reabierto con aprobación del presbítero. Corrige lo necesario y ciérralo de nuevo: los saldos del periodo siguiente se recalcularán.','Period reopened with the presbyter’s approval. Make the corrections and close it again: the next period balances will be recalculated.')}</div>`;
  else {let rej=cd.requests.filter(r=>r.status==='rejected').slice(-1)[0];if(rej&&rej.decidedAt&&Date.now()-Date.parse(rej.decidedAt)<7*864e5)note=`<div class="notice">${L('El presbítero rechazó la reapertura de','The presbyter rejected reopening')} ${periodLabel(rej.periodId)}.</div>`}
  let rows=cd.closed.slice().reverse().map((c,i)=>{
    let canReq=i===0,pending=lastReq&&lastReq.status==='pending'&&canReq;
    return `<div class="church-row"><div class="church-emblem">▤</div><div><b>${periodLabel(c.id)}</b><small>${L('Ingresos','Income')} ${money(c.snap.income)} · ${L('Egresos','Expenses')} ${money(c.snap.expenses)} · ${L('Saldo final','Closing')} ${money(c.snap.closing)}</small></div><button class="secondary" data-it4="periodReport|${c.id}">${L('Informe','Report')}</button>${canReq?(pending?`<span class="status pending">${L('Reapertura solicitada','Reopening requested')}</span>`:`<button class="secondary" data-it4="requestReopen|${c.id}">${L('Solicitar reapertura','Request reopening')}</button>`):''}</div>`;
  }).join('')||`<div class="empty">${L('Aún no hay periodos cerrados','No closed periods yet')}</div>`;
  let annual=cd.annual.slice().reverse().map(a=>{
    let months=cd.closed.filter(c=>c.year===a.year).map(c=>c.id),stale=months.join()!==a.monthIds.join();
    return `<div class="church-row"><div class="church-emblem">★</div><div><b>${L('Informe general contable','General accounting report')} · ${reportEsc(church)} · ${a.year}</b><small>${a.monthIds.length} ${L('meses consolidados','months consolidated')}${stale?` · ${L('desactualizado: hay cambios en los meses','outdated: months changed')}`:''}</small></div><button class="secondary" data-it4="annualReport|${a.year}">${L('Informe','Report')}</button></div>`;
  }).join('');
  return `<section class="panel period-panel"><div class="panel-head"><div><h2>${L('Cierre de periodos','Period closing')}</h2><p>${L('Periodo abierto','Open period')}: <b>${open}</b></p></div><div class="head-actions"><button class="secondary" data-it4="compare">${L('Comparar','Compare')}</button><button class="secondary" data-it4="annualClose">${L('Cierre anual','Annual closing')}</button></div></div>${note}${rows}${annual?`<div class="eyebrow-line" style="margin-top:14px">${L('INFORMES ANUALES','ANNUAL REPORTS')}</div>${annual}`:''}</section>`;
}

/* ---------- Solicitudes de reapertura (presbítero) ---------- */
function reopenRequestsPanel(){
  let pend=pendingRequests();
  let decided=[];Object.keys(financeClosures).forEach(ch=>closureData(ch).requests.forEach(r=>{if(r.status!=='pending')decided.push(r)}));
  decided.sort((a,b)=>String(b.decidedAt).localeCompare(String(a.decidedAt)));
  let row=r=>`<div class="church-row"><div class="church-emblem">↺</div><div><b>${reportEsc(r.church)} · ${periodLabel(r.periodId)}</b><small>${reportEsc(r.reason)}</small></div>${r.status==='pending'?`<button class="secondary" data-it4="rejectReopen|${r.id}">${L('Rechazar','Reject')}</button><button class="primary" data-it4="approveReopen|${r.id}">${L('Aprobar','Approve')}</button>`:`<span class="status ${r.status==='approved'?'':'pending'}">${r.status==='approved'?L('Aprobada','Approved'):L('Rechazada','Rejected')}</span>`}</div>`;
  return `<section class="panel"><div class="panel-head"><div><h2>${L('Solicitudes de reapertura de periodo','Period reopening requests')}</h2><p>${L('Los pastores piden reabrir su último periodo cerrado para corregirlo.','Pastors ask to reopen their last closed period to correct it.')}</p></div></div>${pend.map(row).join('')||`<div class="empty">${L('No hay solicitudes pendientes','No pending requests')}</div>`}${decided.length?`<div class="eyebrow-line" style="margin-top:12px">${L('RECIENTES','RECENT')}</div>${decided.slice(0,4).map(row).join('')}`:''}</section>`;
}
let baseRenderPageE4=renderPage;
renderPage=function(){
  let r=baseRenderPageE4.apply(this,arguments);
  try{
    let c=document.getElementById('content');
    if(c&&role==='presbitero'&&page==='finance'){let band=c.querySelector('.summary-band');if(band)band.insertAdjacentHTML('beforebegin',reopenRequestsPanel())}
    if(c&&role==='presbitero'&&page==='dashboard'&&pendingRequests().length&&c.firstElementChild)c.firstElementChild.insertAdjacentHTML('afterend',`<div class="notice"><b>${pendingRequests().length}</b> ${L('solicitud(es) de reapertura de periodo esperan tu decisión.','period reopening request(s) are waiting for your decision.')} <button class="text-link" data-it4="goFinance">${L('Revisar','Review')} →</button></div>`);
  }catch(e){}
  return r;
};

/* ---------- Ventanas de acciones ---------- */
function confirmModal(html,okLabel,onOk){
  showModalForm(html,onOk);
  let b=document.querySelector('#modalForm .primary');if(b)b.textContent=okLabel;
}
function txForm(x,per){
  let types=['income','expense'];
  return `<div class="modal-grid"><div class="field"><label>${t('type')}</label><select name="type" id="txType">${types.map(v=>`<option value="${v}" ${x.type===v?'selected':''}>${v==='income'?t('income'):t('expenses')}</option>`).join('')}</select></div><div class="field"><label>${t('category')}</label><select name="category" id="txCat"></select></div><div class="field"><label>${t('description')}</label><input name="description" value="${reportEsc(x.description||'')}"></div><div class="field"><label>${t('amount')}</label><input name="amount" type="number" min="1" step="1" required value="${x.amount}"></div><div class="field"><label>${t('date')}</label><input name="date" type="date" required min="${per}-01" max="${per}-${lastDayOf(per)}" value="${x.date}"></div></div>`;
}
function wireTxCategories(sel){
  let type=document.getElementById('txType'),cat=document.getElementById('txCat');
  let fill=()=>{let list=(type.value==='income'?incomeCategories:expenseCategories).filter(c=>!AUTO_CATS.includes(c));cat.innerHTML=list.map(c=>`<option value="${c}" ${c===sel?'selected':''}>${categoryLabel(c)}</option>`).join('')};
  type.onchange=()=>{sel='';fill()};fill();
}
function editTx(i){
  let ledger=ensureLedger(HOME_CHURCH),x=ledger.transactions[i];if(!x||x.auto||role!=='pastor')return;
  let per=ledgerPeriod(ledger);
  showModalForm(`<h2>${L('Editar movimiento','Edit transaction')}</h2><p>${L('Periodo abierto','Open period')}: ${periodLabel(per)}</p>${txForm(x,per)}`,d=>{
    let amount=Number(d.amount),date=String(d.date||'');
    if(!(amount>0)||date.slice(0,7)!==per){notify(L('La fecha debe estar dentro del periodo abierto','The date must be inside the open period'));return}
    Object.assign(x,{type:d.type,category:d.category,description:String(d.description||'').trim(),amount,date});
    notify(L('Movimiento actualizado ✓','Transaction updated ✓'));renderPage();
  });
  wireTxCategories(x.category);
}
function delTx(i){
  let ledger=ensureLedger(HOME_CHURCH),x=ledger.transactions[i];if(!x||x.auto||role!=='pastor')return;
  confirmModal(`<h2>${L('Eliminar movimiento','Delete transaction')}</h2><p>${reportEsc(x.date)} · ${categoryLabel(x.category)} · ${money(x.amount)}</p><p>${L('Solo se pueden eliminar movimientos del periodo abierto.','Only transactions of the open period can be deleted.')}</p>`,L('Eliminar','Delete'),()=>{ledger.transactions.splice(i,1);notify(L('Movimiento eliminado','Transaction deleted'));renderPage()});
}
function closePeriodDialog(){
  let church=HOME_CHURCH,ledger=ensureLedger(church),id=ledgerPeriod(ledger),tot=ledgerTotals(ledger);
  confirmModal(`<h2>${L('Cierre de periodo','Close period')} · ${periodLabel(id)}</h2><p>${L('Se cerrará el periodo contable con estos valores:','The accounting period will be closed with these values:')}</p><div class="summary-band"><div><span>${t('openingBalance')}</span><b>${money(tot.opening)}</b></div><div><span>${t('totalIncome')}</span><b>${money(tot.income)}</b></div><div><span>${t('totalExpenses')}</span><b>${money(tot.expenses)}</b></div><div><span>${t('closingBalance')}</span><b>${money(tot.closing)}</b></div></div><p>${L('El saldo final pasará a ser el saldo inicial de','The closing balance will become the opening balance of')} <b>${periodLabel(nextPeriod(id))}</b> ${L('y los ingresos y egresos quedarán en cero.','and income and expenses will reset to zero.')}</p><p class="muted">${L('Para corregir un periodo cerrado deberás solicitar su reapertura al presbítero.','To correct a closed period you must request reopening from the presbyter.')}</p>`,L('Cerrar periodo','Close period'),()=>{
    doClosePeriod(church);notify(`${periodLabel(id)} · ${L('periodo cerrado ✓','period closed ✓')}`);renderPage();
  });
}
function annualCloseDialog(){
  let church=HOME_CHURCH,years=closedYears(church);
  if(!years.length){notify(L('Primero cierra al menos un mes del año','Close at least one month of the year first'));return}
  let cd=closureData(church),info=y=>{let ms=cd.closed.filter(c=>c.year===Number(y)).map(c=>c.month),miss=[];for(let m=1;m<=12;m++)if(!ms.includes(m))miss.push(periodLabel(y+'-'+String(m).padStart(2,'0')).split(' ')[0]);return miss.length?`${ms.length} ${L('de 12 meses cerrados. Faltan:','of 12 months closed. Missing:')} ${miss.join(', ')}.`:L('Los 12 meses están cerrados.','All 12 months are closed.')};
  let last=years[years.length-1];
  confirmModal(`<h2>${L('Cierre anual contable','Annual accounting closing')}</h2><p>${reportEsc(church)}</p><div class="field"><label>${L('Año','Year')}</label><select name="year" id="annualYear">${years.slice().reverse().map(y=>`<option>${y}</option>`).join('')}</select></div><p id="annualInfo" class="muted">${info(last)}</p><p>${L('Se consolidará la información de los meses cerrados y se guardará como "Informe general contable · iglesia · año".','The closed months will be consolidated and saved as "General accounting report · church · year".')}</p>`,L('Generar cierre anual','Generate annual closing'),d=>{
    doAnnualClose(church,d.year);notify(L('Cierre anual guardado ✓','Annual closing saved ✓'));renderPage();
    setTimeout(()=>openPlainReport('annual-finance',church+'|'+d.year,reportTitleFor('annual-finance',church+'|'+d.year,'')),0);
  });
  document.getElementById('annualYear').onchange=e=>{document.getElementById('annualInfo').textContent=info(e.target.value)};
}
function requestReopenDialog(periodId){
  let church=HOME_CHURCH;
  showModalForm(`<h2>${L('Solicitar reapertura','Request reopening')} · ${periodLabel(periodId)}</h2><p>${L('El presbítero revisará tu solicitud. Si la aprueba, podrás corregir el periodo y cerrarlo de nuevo.','The presbyter will review your request. If approved, you can correct the period and close it again.')}</p><div class="field"><label>${L('Motivo de la corrección','Reason for the correction')}</label><textarea name="reason" required rows="3"></textarea></div>`,d=>{
    let reason=String(d.reason||'').trim();if(!reason)return;
    closureData(church).requests.push({id:'rq-'+Date.now(),church,periodId,reason,requestedAt:new Date().toISOString(),status:'pending'});
    notify(L('Solicitud enviada al presbítero ✓','Request sent to the presbyter ✓'));renderPage();
  });
  let b=document.querySelector('#modalForm .primary');if(b)b.textContent=L('Enviar solicitud','Send request');
}
function decideReopen(id,approve){
  let req=null;Object.keys(financeClosures).forEach(ch=>closureData(ch).requests.forEach(r=>{if(r.id===id)req=r}));
  if(!req||req.status!=='pending'||role!=='presbitero')return;
  confirmModal(`<h2>${approve?L('Aprobar reapertura','Approve reopening'):L('Rechazar reapertura','Reject reopening')}</h2><p><b>${reportEsc(req.church)}</b> · ${periodLabel(req.periodId)}</p><p>${reportEsc(req.reason)}</p>${approve?`<p class="muted">${L('Si existe un informe anual de ese año, se eliminará y habrá que generarlo de nuevo.','If an annual report exists for that year it will be removed and must be generated again.')}</p>`:''}`,approve?L('Aprobar','Approve'):L('Rechazar','Reject'),()=>{
    if(approve&&!doReopen(req.church,req.periodId)){notify(L('Solo se puede reabrir el último periodo cerrado','Only the last closed period can be reopened'));req.status='rejected'}
    else req.status=approve?'approved':'rejected';
    req.decidedAt=new Date().toISOString();
    notify(approve?L('Periodo reabierto ✓','Period reopened ✓'):L('Solicitud rechazada','Request rejected'));renderPage();
  });
}

/* ---------- Reglas del periodo abierto en el formulario de movimientos / saldo inicial ---------- */
let baseOpenModalE4=openModal;
openModal=function(type){
  if(type==='openingBalance'&&role==='pastor'&&closureData(HOME_CHURCH).closed.length){
    notify(L('El saldo inicial viene del cierre del periodo anterior','The opening balance comes from the previous period closing'));return;
  }
  baseOpenModalE4.apply(this,arguments);
  if(type==='movement'&&role==='pastor'){
    let form=document.getElementById('modalForm'),di=form&&form.querySelector('[name=date]');
    if(di){
      let per=ledgerPeriod(ensureLedger(HOME_CHURCH)),min=per+'-01',max=per+'-'+lastDayOf(per);
      di.min=min;di.max=max;if(!(di.value>=min&&di.value<=max))di.value=min;
      di.insertAdjacentHTML('afterend',`<small class="muted">${L('Periodo abierto','Open period')}: ${periodLabel(per)}</small>`);
      let prev=form.onsubmit;
      form.onsubmit=function(e){
        if(!(di.value>=min&&di.value<=max)){e.preventDefault();notify(L('La fecha debe estar dentro del periodo abierto','The date must be inside the open period'));return false}
        return prev?prev.call(this,e):undefined;
      };
    }
  }
};

/* ---------- Clics ---------- */
document.addEventListener('click',e=>{
  let el=e.target.closest('[data-it4]');if(!el)return;
  e.preventDefault();e.stopImmediatePropagation();
  let a=el.dataset.it4.split('|'),act=a[0];
  if(role==='pastor'){
    if(act==='closePeriod')closePeriodDialog();
    else if(act==='editTx')editTx(Number(a[1]));
    else if(act==='delTx')delTx(Number(a[1]));
    else if(act==='annualClose')annualCloseDialog();
    else if(act==='compare')openCompare(HOME_CHURCH);
    else if(act==='requestReopen')requestReopenDialog(a[1]);
    else if(act==='periodReport')openPlainReport('period-finance',HOME_CHURCH+'|'+a[1],reportTitleFor('period-finance',HOME_CHURCH+'|'+a[1],''));
    else if(act==='annualReport')openPlainReport('annual-finance',HOME_CHURCH+'|'+a[1],reportTitleFor('annual-finance',HOME_CHURCH+'|'+a[1],''));
  }else if(role==='presbitero'){
    if(act==='approveReopen')decideReopen(a[1],true);
    else if(act==='rejectReopen')decideReopen(a[1],false);
    else if(act==='goFinance'){page='finance';renderNav();renderPage()}
  }
},true);

/* ===================== Entrega 5: consolidado automático del circuito (tesorero) ===================== */
let circuitState={seen:[]};
const CIRCUIT_KINDS=['circuit-period-finance','circuit-annual-finance','circuit-compare-finance'];
const circuitNames=()=>churches.map(c=>c[0]);

/* ---------- Datos consolidados (se calculan de los cierres de cada iglesia) ---------- */
function circuitSnaps(P){return circuitNames().map(n=>{let c=closureData(n).closed.find(x=>x.id===P);return c?{church:n,snap:c.snap,closedAt:c.closedAt}:null})}
function circuitPeriods(){
  let ids=new Set();circuitNames().forEach(n=>closureData(n).closed.forEach(c=>ids.add(c.id)));
  return [...ids].filter(P=>circuitSnaps(P).every(Boolean)).sort();
}
function circuitKey(P){return P+'@'+circuitSnaps(P).map(x=>x.closedAt).sort().slice(-1)[0]}
function sumCats(list){
  let by={income:{},expense:{}};
  list.forEach(x=>x.snap.transactions.forEach(tx=>{let b=by[tx.type==='income'?'income':'expense'];b[tx.category]=(b[tx.category]||0)+Number(tx.amount)}));
  return by;
}
function monthTotals(P){
  let list=circuitSnaps(P);if(!list.every(Boolean))return null;
  return {opening:list.reduce((n,x)=>n+x.snap.opening,0),income:list.reduce((n,x)=>n+x.snap.income,0),expenses:list.reduce((n,x)=>n+x.snap.expenses,0),closing:list.reduce((n,x)=>n+x.snap.closing,0),byCat:sumCats(list),
    perChurch:list.map(x=>({church:x.church,income:x.snap.income,expenses:x.snap.expenses,closing:x.snap.closing}))};
}
function yearTotals(Y){
  let ids=circuitPeriods().filter(P=>P.slice(0,4)===String(Y));if(!ids.length)return null;
  let ms=ids.map(monthTotals),by={income:{},expense:{}};
  ms.forEach(m=>['income','expense'].forEach(k=>Object.keys(m.byCat[k]).forEach(c=>{by[k][c]=(by[k][c]||0)+m.byCat[k][c]})));
  let per=circuitNames().map(n=>({church:n,income:ms.reduce((a,m)=>a+m.perChurch.find(x=>x.church===n).income,0),expenses:ms.reduce((a,m)=>a+m.perChurch.find(x=>x.church===n).expenses,0),closing:ms[ms.length-1].perChurch.find(x=>x.church===n).closing}));
  return {opening:ms[0].opening,income:ms.reduce((n,m)=>n+m.income,0),expenses:ms.reduce((n,m)=>n+m.expenses,0),closing:ms[ms.length-1].closing,byCat:by,perChurch:per,months:ids.map((P,i)=>({label:periodLabel(P),income:ms[i].income,expenses:ms[i].expenses,closing:ms[i].closing}))};
}
function circuitAnnualYears(){
  let ys=new Set();circuitNames().forEach(n=>closureData(n).annual.forEach(a=>ys.add(a.year)));
  return [...ys].filter(y=>circuitNames().every(n=>closureData(n).annual.some(a=>a.year===y))).sort();
}
function circuitAnnual(Y){
  let list=circuitNames().map(n=>({church:n,a:closureData(n).annual.find(x=>x.year===Number(Y))}));if(!list.every(x=>x.a))return null;
  let by={income:{},expense:{}},months={};
  list.forEach(x=>{['income','expense'].forEach(k=>Object.keys(x.a.snap.byCat[k]).forEach(c=>{by[k][c]=(by[k][c]||0)+x.a.snap.byCat[k][c]}));x.a.snap.months.forEach(m=>{let o=months[m.id]||(months[m.id]={label:m.label,income:0,expenses:0,closing:0});o.income+=m.income;o.expenses+=m.expenses;o.closing+=m.closing})});
  return {opening:list.reduce((n,x)=>n+x.a.snap.opening,0),income:list.reduce((n,x)=>n+x.a.snap.income,0),expenses:list.reduce((n,x)=>n+x.a.snap.expenses,0),closing:list.reduce((n,x)=>n+x.a.snap.closing,0),byCat:by,
    perChurch:list.map(x=>({church:x.church,income:x.a.snap.income,expenses:x.a.snap.expenses,closing:x.a.snap.closing})),months:Object.keys(months).sort().map(k=>months[k]),createdAt:list.map(x=>x.a.createdAt).sort().slice(-1)[0]};
}
function circuitWorkingPeriod(){return circuitNames().map(n=>ledgerPeriod(ensureLedger(n))).sort()[0]}

/* ---------- Filas de informes consolidados ---------- */
function consolidatedRows(d,labels){
  let rows=[[L('Concepto','Item'),L('Valor','Value')],[labels.opening,money(d.opening)],[t('incomeBreakdown'),'']];
  incomeCategories.forEach(c=>rows.push([categoryLabel(c),money(d.byCat.income[c]||0)]));
  rows.push([t('totalIncome'),money(d.income)],[t('expenseBreakdown'),'']);
  expenseCategories.forEach(c=>rows.push([categoryLabel(c),money(d.byCat.expense[c]||0)]));
  rows.push([t('totalExpenses'),money(d.expenses)],[labels.closing,money(d.closing)],['',''],[L('Detalle por iglesia','Detail by church'),'']);
  d.perChurch.forEach(c=>rows.push([c.church,`${L('Ingresos','Income')} ${money(c.income)} · ${L('Egresos','Expenses')} ${money(c.expenses)} · ${L('Saldo final','Closing')} ${money(c.closing)}`]));
  if(d.months){rows.push(['',''],[L('Resumen mensual','Monthly summary'),'']);d.months.forEach(m=>rows.push([m.label,`${L('Ingresos','Income')} ${money(m.income)} · ${L('Egresos','Expenses')} ${money(m.expenses)} · ${L('Saldo final','Closing')} ${money(m.closing)}`]))}
  return rows;
}
function compareFromData(A,B,la,lb){
  if(!A||!B)return [[L('Sin datos para comparar','No data to compare')]];
  let line=(label,a,b)=>[label,money(a),money(b),signedMoney(b-a),a?((b-a)/Math.abs(a)*100).toFixed(1)+'%':'—'];
  let rows=[[L('Concepto','Item'),la,lb,L('Diferencia','Difference'),L('Variación','Change')],line(t('openingBalance'),A.opening,B.opening),[t('incomeBreakdown'),'','','','']];
  incomeCategories.forEach(c=>rows.push(line(categoryLabel(c),A.byCat.income[c]||0,B.byCat.income[c]||0)));
  rows.push(line(t('totalIncome'),A.income,B.income),[t('expenseBreakdown'),'','','','']);
  expenseCategories.forEach(c=>rows.push(line(categoryLabel(c),A.byCat.expense[c]||0,B.byCat.expense[c]||0)));
  rows.push(line(t('totalExpenses'),A.expenses,B.expenses),line(t('closingBalance'),A.closing,B.closing));
  return rows;
}
let baseReportRowsE5=reportRows;
reportRows=function(kind,scope){
  if(!CIRCUIT_KINDS.includes(kind))return baseReportRowsE5.apply(this,arguments);
  let a=String(scope).split('|');
  if(kind==='circuit-period-finance'){let d=monthTotals(a[0]);return d?consolidatedRows(d,{opening:t('openingBalance'),closing:t('closingBalance')}):[[L('Sin datos','No data')]]}
  if(kind==='circuit-annual-finance'){let d=circuitAnnual(a[0]);return d?consolidatedRows(d,{opening:L('Saldo inicial del año','Opening balance of the year'),closing:L('Saldo final del año','Closing balance of the year')}):[[L('Sin datos','No data')]]}
  let m=a[0]==='m',get=id=>m?monthTotals(id):yearTotals(id);
  return compareFromData(get(a[1]),get(a[2]),m?periodLabel(a[1]):a[1],m?periodLabel(a[2]):a[2]);
};
let baseReportHeaderE5=reportHeader;
reportHeader=function(kind,scope){
  if(!CIRCUIT_KINDS.includes(kind))return baseReportHeaderE5.apply(this,arguments);
  let a=String(scope).split('|'),third=kind==='circuit-period-finance'?`${L('Consolidado','Consolidated')} · ${periodLabel(a[0])}`:kind==='circuit-annual-finance'?`${L('Consolidado anual','Annual consolidated')} · ${a[0]}`:L('Consolidado del circuito','Circuit consolidated');
  return [t('headerAic'),t('headerCircuit'),third];
};
let baseReportTitleE5=reportTitleFor;
reportTitleFor=function(kind,scope,fallback){
  if(!CIRCUIT_KINDS.includes(kind))return baseReportTitleE5(kind,scope,fallback);
  let a=String(scope).split('|');
  if(kind==='circuit-period-finance')return `${L('Informe financiero consolidado','Consolidated financial report')} · ${periodLabel(a[0])}`;
  if(kind==='circuit-annual-finance')return `${L('Informe general contable consolidado','Consolidated general accounting report')} · ${a[0]}`;
  return L('Comparativo financiero consolidado','Consolidated financial comparison');
};

/* ---------- Panel "Cierres del circuito" ---------- */
function circuitNotices(){
  let out=[];
  circuitPeriods().forEach(P=>{let k=circuitKey(P);if(!circuitState.seen.includes(k))out.push({key:k,label:periodLabel(P),kind:'circuit-period-finance',scope:P})});
  circuitAnnualYears().forEach(y=>{let d=circuitAnnual(y),k='annual-'+y+'@'+d.createdAt;if(!circuitState.seen.includes(k))out.push({key:k,label:L('año ','year ')+y,kind:'circuit-annual-finance',scope:String(y)})});
  return out;
}
function circuitNoticeHtml(){
  return circuitNotices().map(n=>`<div class="notice">${L('Se generó automáticamente el cierre consolidado de','The consolidated closing was automatically generated for')} <b>${n.label}</b>. <button class="text-link" data-it5="openNotice|${reportEsc(n.key)}">${L('Ver informe','View report')} →</button></div>`).join('');
}
function circuitPanel(){
  let P=circuitWorkingPeriod(),names=circuitNames(),done=names.filter(n=>closureData(n).closed.some(c=>c.id===P)),pend=names.filter(n=>!done.includes(n));
  let pastorOf=n=>(churches.find(c=>c[0]===n)||[])[2]||'';
  let chip=(n,ok)=>`<div class="church-row"><div class="church-emblem">${ok?'✓':'…'}</div><div><b>${reportEsc(n)}</b><small>${reportEsc(pastorOf(n))}</small></div><span class="status ${ok?'':'pending'}">${ok?L('Cerrado','Closed'):L('Pendiente','Pending')}</span></div>`;
  let months=circuitPeriods().slice().reverse().map(Q=>{let d=monthTotals(Q);return `<div class="church-row"><div class="church-emblem">▤</div><div><b>${periodLabel(Q)}</b><small>${L('Ingresos','Income')} ${money(d.income)} · ${L('Egresos','Expenses')} ${money(d.expenses)} · ${L('Saldo final','Closing')} ${money(d.closing)}</small></div><button class="secondary" data-it5="periodReport|${Q}">${L('Informe','Report')}</button></div>`}).join('')||`<div class="empty">${L('Aún no hay cierres consolidados','No consolidated closings yet')}</div>`;
  let years=circuitAnnualYears().slice().reverse().map(y=>{let d=circuitAnnual(y);return `<div class="church-row"><div class="church-emblem">★</div><div><b>${L('Informe general contable consolidado','Consolidated general accounting report')} · ${y}</b><small>${L('Ingresos','Income')} ${money(d.income)} · ${L('Egresos','Expenses')} ${money(d.expenses)} · ${L('Saldo final','Closing')} ${money(d.closing)}</small></div><button class="secondary" data-it5="annualReport|${y}">${L('Informe','Report')}</button></div>`}).join('');
  let yearsAny=[...new Set(names.flatMap(n=>closureData(n).closed.map(c=>c.year)))].sort(),Y=yearsAny[yearsAny.length-1],annualPend='';
  if(Y&&!circuitAnnualYears().includes(Y)){let ok=names.filter(n=>closureData(n).annual.some(a=>a.year===Y));annualPend=`<div class="notice">${L('Cierre anual','Annual closing')} ${Y}: ${ok.length} ${L('de','of')} ${names.length} ${L('iglesias lo han realizado. El consolidado anual se genera solo cuando todas lo hagan.','churches have done it. The annual consolidation is generated automatically once all do.')}</div>`}
  let tools='';
  return `<section class="panel circuit-panel"><div class="panel-head"><div><h2>${L('Cierres del circuito','Circuit closings')}</h2><p>${L('El consolidado se genera automáticamente cuando todos los pastores cierran el periodo.','The consolidation is generated automatically when all pastors close the period.')}</p></div><div class="head-actions"><button class="secondary" data-it5="compare">${L('Comparar','Compare')}</button></div></div>${circuitNoticeHtml()}<div class="eyebrow-line">${L('PERIODO EN CIERRE','PERIOD IN PROGRESS')} · ${periodLabel(P).toUpperCase()} · ${done.length} ${L('DE','OF')} ${names.length}</div>${names.map(n=>chip(n,done.includes(n))).join('')}${annualPend}<div class="eyebrow-line" style="margin-top:14px">${L('CIERRES MENSUALES CONSOLIDADOS','CONSOLIDATED MONTHLY CLOSINGS')}</div>${months}${years?`<div class="eyebrow-line" style="margin-top:14px">${L('CIERRES ANUALES CONSOLIDADOS','CONSOLIDATED ANNUAL CLOSINGS')}</div>${years}`:''}</section>`;
}
function openCircuitCompare(){
  let mp=circuitPeriods(),yrs=[...new Set(mp.map(P=>P.slice(0,4)))],st={mode:'m',a:'',b:''};
  if(mp.length<2&&yrs.length<2){notify(L('Necesitas al menos dos cierres consolidados para comparar','You need at least two consolidated closings to compare'));return}
  let opts=()=>st.mode==='m'?mp.slice().reverse().map(P=>[P,periodLabel(P)]):yrs.slice().reverse().map(y=>[y,y]);
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><section class="modal report-modal"><div class="panel-head"><div><h2>${L('Comparar cierres del circuito','Compare circuit closings')}</h2><p>${t('reportActions')}</p></div><button class="inline-actions" id="closeReport">×</button></div><div class="modal-grid"><div class="field"><label>${L('Comparación','Comparison')}</label><select id="cmpMode"><option value="m">${L('Mes con mes','Month vs month')}</option><option value="y">${L('Año con año','Year vs year')}</option></select></div><div></div><div class="field"><label>${L('Periodo base','Base period')}</label><select id="cmpA"></select></div><div class="field"><label>${L('Comparar con','Compare with')}</label><select id="cmpB"></select></div></div><div id="reportPreview"></div><div class="modal-actions report-actions"><button class="secondary" data-report-format="excel">${t('exportExcel')}</button><button class="secondary" data-report-format="word">${t('exportWord')}</button><button class="primary" data-report-format="pdf">${t('exportPdf')}</button></div></section></div>`;
  let scope=()=>`${st.mode}|${st.a}|${st.b}`;
  function refresh(){
    let o=opts();
    if(!o.some(x=>x[0]===st.a))st.a=o.length>1?o[1][0]:(o[0]?o[0][0]:'');
    if(!o.some(x=>x[0]===st.b)||st.b===st.a)st.b=o.length?o[0][0]:'';
    let html=o.map(x=>`<option value="${reportEsc(x[0])}">${reportEsc(x[1])}</option>`).join('');
    $('#cmpA').innerHTML=html;$('#cmpB').innerHTML=html;$('#cmpA').value=st.a;$('#cmpB').value=st.b;$('#cmpMode').value=st.mode;
    $('#reportPreview').innerHTML=o.length>1?reportHtml('circuit-compare-finance',scope()):`<div class="empty">${L('No hay suficientes cierres para esta comparación','Not enough closings for this comparison')}</div>`;
  }
  $('#closeReport').onclick=()=>$('#modalRoot').innerHTML='';
  $('#cmpMode').onchange=e=>{st.mode=e.target.value;st.a='';st.b='';refresh()};
  $('#cmpA').onchange=e=>{st.a=e.target.value;refresh()};
  $('#cmpB').onchange=e=>{st.b=e.target.value;refresh()};
  $$('[data-report-format]').forEach(b=>b.onclick=()=>exportFormalReport('circuit-compare-finance',scope(),b.dataset.reportFormat));
  refresh();
}

/* ---------- Integración con las pantallas ---------- */
let baseRenderPageE5=renderPage;
renderPage=function(){
  let r=baseRenderPageE5.apply(this,arguments);
  try{
    let c=document.getElementById('content');
    if(c&&['tesorero','presbitero'].includes(role)&&page==='finance')c.insertAdjacentHTML('beforeend',circuitPanel());
    if(c&&role==='tesorero'&&page==='dashboard'&&c.firstElementChild){let h=circuitNoticeHtml();if(h)c.firstElementChild.insertAdjacentHTML('afterend',h)}
  }catch(e){}
  return r;
};
document.addEventListener('click',e=>{
  let el=e.target.closest('[data-it5]');if(!el)return;
  e.preventDefault();e.stopImmediatePropagation();
  if(!['tesorero','presbitero'].includes(role))return;
  let a=el.dataset.it5.split('|'),act=a[0];
  if(act==='periodReport')openPlainReport('circuit-period-finance',a[1],reportTitleFor('circuit-period-finance',a[1],''));
  else if(act==='annualReport')openPlainReport('circuit-annual-finance',a[1],reportTitleFor('circuit-annual-finance',a[1],''));
  else if(act==='compare')openCircuitCompare();
  else if(act==='openNotice'){
    let key=a.slice(1).join('|'),n=circuitNotices().find(x=>x.key===key);
    if(n){circuitState.seen.push(key);renderPage();openPlainReport(n.kind,n.scope,reportTitleFor(n.kind,n.scope,''))}
  }
},true);

/* ===================== Entrega 6: Secretaría por asociaciones, cifras dinámicas y año de ejemplo ===================== */
function assocLabel(code){let a=assocList().find(x=>x[0]===code);return a?a[1]:''}
const assocTitle=code=>code?`${code} — ${assocLabel(code)}`:L('Todas las asociaciones','All associations');
let churchFilter='';
function scopeMembers(){return role==='pastor'?members.filter(m=>m.church===HOME_CHURCH):members.filter(m=>!churchFilter||m.church===churchFilter)}
function memberStats(list){
  let b=list.filter(m=>m.baptized).length,w=list.filter(m=>m.sex==='Femenino').length,k=list.filter(m=>m.age<13).length;
  return [['♙',t('totalMembers'),list.length,t('registered')],['✧',t('baptized'),b,list.length?(b/list.length*100).toFixed(1)+'%':'0%'],['♀',t('women'),w,t('women')],['♧',t('children'),k,L('menores de 13 años','under 13 years')]];
}
function churchDetailStats(c){
  let list=members.filter(m=>m.church===c[0]),b=list.filter(m=>m.baptized).length,l=ensureLedger(c[0]);
  return [['♙',t('totalMembers'),list.length,t('registered')],['✧',t('baptized'),b,list.length?(b/list.length*100).toFixed(0)+'%':'0%'],['◈',t('balance'),money(ledgerTotals(l).closing),periodLabel(ledgerPeriod(l))],['♙',t('pastorLabel'),c[2],'']];
}
function syncChurchCounts(){churches.forEach(c=>{c[3]=String(members.filter(m=>m.church===c[0]).length)})}
function syncMemberDates(){members.forEach(m=>{if(!m.createdAt)m.createdAt=new Date().toISOString()})}
['es','en'].forEach(l=>Object.defineProperty(I[l],'dateRange',{configurable:true,enumerable:true,get(){let y=circuitWorkingPeriod().slice(0,4);return l==='es'?`Periodo: enero – diciembre ${y}`:`Period: January – December ${y}`}}));
function studentCsvRows(){
  let rows=[['Estudiante',t('churchLabel'),t('grades'),t('itaic')]];
  itaicCourses.forEach(c=>c.students.forEach(id=>{
    let m=members.find(x=>x.id===id),secs=sections().filter(x=>x.year===c.year&&x.campus===c.campus&&x.students.includes(id)),avg=secs.length?(secs.reduce((n,x)=>n+weightedTotal(x,id),0)/secs.length).toFixed(1):'—';
    rows.push([m?m.name:id,m?m.church:'',avg,t(c.year)]);
  }));
  return rows;
}

/* ---------- Asociación obligatoria al registrar o editar miembros ---------- */
assocField=function(sel){return `<div class="field"><label>${L('Asociación','Association')} *</label><select name="assoc" required><option value="">${L('Selecciona la asociación','Select the association')}</option>${assocList().map(a=>`<option value="${a[0]}" ${sel===a[0]?'selected':''}>${a[0]} · ${a[1]}</option>`).join('')}</select></div>`};
let baseOpenModalE6=openModal;
openModal=function(type){
  baseOpenModalE6.apply(this,arguments);
  if(type==='member'&&role==='pastor'){
    let form=document.getElementById('modalForm');
    if(form){let prev=form.onsubmit;form.onsubmit=function(e){let sel=form.querySelector('[name=assoc]');if(sel&&!sel.value){e.preventDefault();notify(L('Selecciona la asociación del miembro','Select the member’s association'));return false}return prev?prev.call(this,e):undefined}}
  }
};
let baseEditMemberE6=editMember;
editMember=function(id){
  baseEditMemberE6.apply(this,arguments);
  let form=document.getElementById('modalForm');
  if(form){let prev=form.onsubmit;form.onsubmit=function(e){let sel=form.querySelector('[name=assoc]');if(sel&&!sel.value){e.preventDefault();notify(L('Selecciona la asociación del miembro','Select the member’s association'));return false}return prev?prev.call(this,e):undefined}}
};

/* ---------- Página de Secretaría ---------- */
memberRows=function(){
  let circuit=role!=='pastor',can=role==='pastor',q=filter.toLowerCase();
  let data=scopeMembers().filter(m=>`${m.name} ${m.id}`.toLowerCase().includes(q)&&(!assocFilter||m.assoc===assocFilter));
  return data.map(m=>`<tr><td><div class="person-cell"><span class="mini-avatar">${reportEsc(m.name.split(' ').map(x=>x[0]).slice(0,2).join(''))}</span><strong>${reportEsc(m.name)}</strong></div></td><td>${reportEsc(m.id)}</td><td>${m.age}</td><td>${m.sex}</td><td>${m.civil}</td>${circuit?`<td>${reportEsc(m.church)}</td>`:''}<td>${m.assoc?`<span class="assoc-badge">${m.assoc}</span>`:'<span class="muted">—</span>'}</td><td><span class="status ${m.baptized?'':'pending'}">${m.baptized?t('yes'):t('no')}</span></td><td><button class="inline-actions" data-it7="viewMember|${reportEsc(m.id)}" title="${L('Ver detalle','View details')}">ⓘ</button>${can?`<button class="inline-actions" data-it3="editMember|${reportEsc(m.id)}" title="${L('Editar','Edit')}">✎</button>`:''}</td></tr>`).join('')||`<tr><td colspan="${circuit?9:8}" class="empty">${t('empty')}</td></tr>`;
};
secretaryPage=function(){
  let af=assocFilter,circuit=role!=='pastor',scoped=scopeMembers(),inA=af?scoped.filter(m=>m.assoc===af):scoped;
  let place=circuit?(churchFilter||L('Todas las iglesias','All churches')):HOME_CHURCH;
  let actions=`${role==='pastor'?`<button class="primary" data-modal="member">＋ ${t('addMember')}</button>`:''}<button class="secondary" data-it6="assocReport">${t('generate')} →</button>`;
  let cards=af?'':`<section class="panel"><div class="panel-head"><div><h2>${L('Miembros por asociación','Members by association')}</h2><p>${reportEsc(place)}</p></div></div><div class="assoc-cards">${assocList().map(a=>`<button type="button" class="assoc-card" data-it6="goAssoc|${a[0]}"><b>${scoped.filter(m=>m.assoc===a[0]).length}</b><span>${a[0]}</span><small>${a[1]}</small></button>`).join('')}</div></section>`;
  let churchSel=circuit?`<select id="churchFilterSel" class="filter"><option value="">${t('allChurches')}</option>${churches.map(c=>`<option ${churchFilter===c[0]?'selected':''}>${reportEsc(c[0])}</option>`).join('')}</select>`:'';
  return `${pageHead(t('secretary')+(af?' · '+af:''),af?`${assocLabel(af)} · ${reportEsc(place)}`:t('secretarySubtitle'),actions)}${stats(memberStats(inA))}${cards}<section class="table-card"><div class="table-tools"><div class="search"><input id="memberSearch" placeholder="${L('Buscar por nombre o documento','Search by name or ID')}" value="${reportEsc(filter||'')}"></div>${churchSel}</div><table class="data-table"><thead><tr><th>${L('Miembro','Member')}</th><th>${t('document')}</th><th>${t('age')}</th><th>${t('sex')}</th><th>${t('civil')}</th>${circuit?`<th>${L('Iglesia','Church')}</th>`:''}<th>${L('Asociación','Association')}</th><th>${t('baptism')}</th><th></th></tr></thead><tbody id="memberRows">${memberRows()}</tbody></table></section>`;
};

/* ---------- Informe de miembros por asociación ---------- */
function assocReportRows(code,church){
  let circuit=role!=='pastor';
  let list=members.filter(m=>(circuit?(!church||m.church===church):m.church===HOME_CHURCH)&&(!code||m.assoc===code)).sort((a,b)=>a.church.localeCompare(b.church)||a.name.localeCompare(b.name));
  let head=[L('Nombre','Name'),L('Documento','ID'),L('Edad','Age'),L('Sexo','Sex'),L('Estado civil','Marital status'),L('Bautizado','Baptized')];
  if(!code)head.push(L('Asociación','Association'));
  if(circuit)head.push(L('Iglesia','Church'));
  let rows=[head].concat(list.map(m=>{let r=[m.name,m.id,m.age,m.sex,m.civil,m.baptized?t('yes'):t('no')];if(!code)r.push(m.assoc||'—');if(circuit)r.push(m.church);return r}));
  let pad=(label,n)=>{let r=Array(head.length).fill('');r[0]=label;r[head.length-1]=String(n);return r};
  if(circuit&&!church){let by={};list.forEach(m=>{by[m.church]=(by[m.church]||0)+1});Object.keys(by).forEach(c=>rows.push(pad('Subtotal · '+c,by[c])))}
  rows.push(pad(L('Total de miembros','Total members'),list.length));
  return rows;
}
let baseReportRowsE6=reportRows;
reportRows=function(kind,scope){
  if(kind!=='assoc-members')return baseReportRowsE6.apply(this,arguments);
  let a=String(scope).split('|');return assocReportRows(a[0],a[1]||'');
};
let baseReportHeaderE6=reportHeader;
reportHeader=function(kind,scope){
  if(kind!=='assoc-members')return baseReportHeaderE6.apply(this,arguments);
  let a=String(scope).split('|'),place=role==='pastor'?HOME_CHURCH:(a[1]||L('Circuito','Circuit'));
  return [t('headerAic'),t('headerCircuit'),`${t('secretary')} · ${assocTitle(a[0])} · ${place}`];
};
let baseReportTitleE6=reportTitleFor;
reportTitleFor=function(kind,scope,fallback){
  if(kind!=='assoc-members')return baseReportTitleE6(kind,scope,fallback);
  let a=String(scope).split('|');
  return `${L('Informe de miembros','Members report')} · ${assocTitle(a[0])} · ${role==='pastor'?HOME_CHURCH:(a[1]||L('Circuito','Circuit'))}`;
};

/* ---------- Menú lateral: asociaciones como subcategorías de Secretaría ---------- */
let baseRenderNavE6=renderNav;
renderNav=function(){
  baseRenderNavE6.apply(this,arguments);
  let key=role==='pastor'?'members':['secretario','presbitero'].includes(role)?'secretary':null,nav=document.getElementById('navigation');
  if(!key||!nav)return;
  let parent=nav.querySelector(`.nav-item[data-page="${key}"]`);if(!parent)return;
  if(role==='pastor'&&parent.childNodes[1])parent.childNodes[1].textContent=t('secretary');
  if(page===key&&assocFilter)parent.classList.remove('active');
  let scoped=scopeMembers(),html=assocList().map(a=>`<button class="nav-item nav-sub ${page===key&&assocFilter===a[0]?'active':''}" data-page="${key}" data-assoc="${a[0]}"><span class="nav-icon">•</span>${a[0]}<span class="nav-count">${scoped.filter(m=>m.assoc===a[0]).length}</span></button>`).join('');
  parent.insertAdjacentHTML('afterend',html);
  nav.querySelectorAll('.nav-sub').forEach(b=>b.onclick=()=>{page=key;selectedCourseId=null;assocFilter=b.dataset.assoc;let sb=document.getElementById('sidebar');if(sb)sb.classList.remove('open');renderNav();renderPage()});
};
document.getElementById('navigation').addEventListener('click',e=>{let b=e.target.closest('.nav-item');if(b&&!b.classList.contains('nav-sub'))assocFilter=''},true);

/* ---------- Actividad reciente dinámica ---------- */
activityRows=function(){
  let ev=[];
  members.forEach(m=>{if(m.createdAt)ev.push({ts:m.createdAt,icon:'＋',title:L('Nuevo miembro registrado','New member registered'),sub:`${m.church} · ${m.name}`})});
  Object.keys(financeClosures).forEach(ch=>{let cd=closureData(ch);
    cd.closed.forEach(c=>ev.push({ts:c.closedAt,icon:'◈',title:L('Periodo cerrado','Period closed'),sub:`${ch} · ${periodLabel(c.id)}`}));
    cd.annual.forEach(a=>ev.push({ts:a.createdAt,icon:'★',title:L('Cierre anual','Annual closing'),sub:`${ch} · ${a.year}`}));
    cd.requests.forEach(r=>ev.push({ts:r.decidedAt||r.requestedAt,icon:'↺',title:r.status==='pending'?L('Reapertura solicitada','Reopening requested'):r.status==='approved'?L('Reapertura aprobada','Reopening approved'):L('Reapertura rechazada','Reopening rejected'),sub:`${r.church} · ${periodLabel(r.periodId)}`}))});
  ev.sort((a,b)=>String(b.ts).localeCompare(String(a.ts)));
  let fmt=ts=>new Date(ts).toLocaleDateString(lang==='es'?'es-CO':'en-US',{day:'numeric',month:'short'});
  return `<div class="activity">${ev.slice(0,5).map(e=>`<div class="activity-row"><div class="activity-dot">${e.icon}</div><div><b>${e.title}</b><small>${reportEsc(e.sub)}</small></div><time>${fmt(e.ts)}</time></div>`).join('')||`<div class="empty">${t('empty')}</div>`}</div>`;
};

/* ---------- Integración: render, clics y filtros ---------- */
let baseRenderPageE6=renderPage;
renderPage=function(){
  if(!['secretary','members'].includes(page))assocFilter='';
  syncChurchCounts();syncMemberDates();
  let r=baseRenderPageE6.apply(this,arguments);
  if(['secretario','presbitero','pastor'].includes(role)&&document.getElementById('navigation'))renderNav();
  return r;
};
document.addEventListener('click',e=>{
  let el=e.target.closest('[data-it6]');if(!el)return;
  e.preventDefault();e.stopImmediatePropagation();
  let a=el.dataset.it6.split('|');
  if(a[0]==='goAssoc'){assocFilter=a[1];renderNav();renderPage()}
  else if(a[0]==='assocReport'){let sc=`${assocFilter}|${role==='pastor'?'':churchFilter}`;openPlainReport('assoc-members',sc,reportTitleFor('assoc-members',sc,''))}
},true);
document.addEventListener('change',e=>{if(e.target&&e.target.id==='churchFilterSel'){churchFilter=e.target.value;renderPage()}},true);

/* ---------- Año de ejemplo (2026): datos propios, 12 meses ---------- */
function seedDemoData(){
  let seed=20260101;const rnd=()=>{seed=(seed*1664525+1013904223)%4294967296;return seed/4294967296};
  const pick=(a,b)=>Math.round((a+(b-a)*rnd())/1000)*1000;
  const pad2=n=>String(n).padStart(2,'0');
  const empty=o=>Object.keys(o).forEach(k=>delete o[k]);
  /* Iglesias y miembros */
  churches.length=0;
  [['Iglesia Central','Calle 15 # 8-42 · Montería','Pr. José Martínez'],['Iglesia Betania','Carrera 6 # 32-18 · Montería','Pr. David López'],['Iglesia El Redentor','Calle 41 # 12-05 · Cereté','Pr. Samuel Ríos'],['Iglesia Nueva Vida','Carrera 9 # 20-33 · Lorica','Pr. Andrés Pérez']].forEach(c=>churches.push([c[0],c[1],c[2],'0']));
  const roster=[
   ['Iglesia Central',[['Ana Lucía Ríos',34,'Femenino','Casado',true],['Carlos Mario Ortega',45,'Masculino','Casado',true],['María Fernanda Gómez',24,'Femenino','Soltero',true],['Juan Sebastián Díaz',13,'Masculino','Soltero',false],['Laura Valentina Pérez',7,'Femenino','No aplica',false],['Luis Alberto Mendoza',22,'Masculino','Soltero',true]]],
   ['Iglesia Betania',[['Rosa Elena Martínez',52,'Femenino','Casado',true],['Pedro Pablo Castro',38,'Masculino','Casado',true],['Daniela Andrea Suárez',19,'Femenino','Soltero',true],['Miguel Ángel Torres',12,'Masculino','Soltero',false],['Sofía Camila Vargas',6,'Femenino','No aplica',false],['Jorge Iván Salcedo',29,'Masculino','Soltero',true]]],
   ['Iglesia El Redentor',[['Marta Lucía Herrera',47,'Femenino','Casado',true],['Andrés Felipe Cogollo',31,'Masculino','Casado',true],['Paola Andrea Ruiz',26,'Femenino','Soltero',true],['Santiago Hoyos',10,'Masculino','Soltero',false],['Isabella Narváez',5,'Femenino','No aplica',false],['Camilo Andrés Pastrana',20,'Masculino','Soltero',true]]],
   ['Iglesia Nueva Vida',[['Gladys Stella Berrío',58,'Femenino','Casado',true],['Wilson Darío Pacheco',43,'Masculino','Unión libre',false],['Karen Julieth Lozano',23,'Femenino','Soltero',true],['Emmanuel David Julio',14,'Masculino','Soltero',false],['Mariana Sofía Jiménez',8,'Femenino','No aplica',false],['Brayan Stiven Doria',27,'Masculino','Soltero',true]]]
  ];
  members.length=0;let n=0;
  roster.forEach(r=>r[1].forEach(x=>{n++;members.push({name:x[0],id:'1.'+String(40+n*3).padStart(3,'0')+'.'+String(100+n*37).padStart(3,'0')+'.'+String(100+(n*91)%900),age:x[1],sex:x[2],civil:x[3],baptized:x[4],church:r[0],assoc:suggestAssoc(x[1],x[2],x[3]),createdAt:new Date(2026,0,5+n*13).toISOString()})}));
  const idOf=name=>(members.find(m=>m.name===name)||{}).id;
  /* Finanzas: 12 meses por iglesia */
  empty(financeLedgers);empty(financeClosures);
  const scales=[1,.8,.6,.7],opens=[1800000,1200000,800000,950000];
  const addMonth=(ledger,m,sc,maxDay)=>{
    const add=(type,category,description,amount,day)=>{if(day<=maxDay&&amount>0)ledger.transactions.push({type,category,description,amount,date:`2026-${pad2(m)}-${pad2(day)}`})};
    let tithes=0,offers=0;
    [5,12,26].forEach(d=>{let a=pick(520000*sc,880000*sc);if(d<=maxDay)tithes+=a;add('income','Diezmos','',a,d)});
    [8,22].forEach(d=>{let a=pick(150000*sc,330000*sc);if(d<=maxDay)offers+=a;add('income','Ofrendas','',a,d)});
    if(m%3===1)add('income','Primicias','',pick(100000*sc,240000*sc),15);
    if(m%4===0||m===6)add('income','Actividades','Actividad congregacional',pick(220000*sc,460000*sc),20);
    if(m%5===0)add('income','Otros','Ingreso extraordinario',pick(90000*sc,180000*sc),18);
    add('expense','Servicios públicos','',pick(150000*sc,230000*sc),10);
    add('expense','Pago pastor','',Math.round(900000*sc/1000)*1000,28);
    add('expense','Implementos de limpieza','',pick(40000*sc,90000*sc),18);
    if(m%2===0)add('expense','Mantenimiento de equipos','',pick(60000*sc,120000*sc),14);
    if(m===3)add('expense','Remodelación','Pintura y adecuación del templo',Math.round(450000*sc/1000)*1000,16);
    if(m===7)add('expense','Muebles','Sillas nuevas',Math.round(300000*sc/1000)*1000,21);
    if(m===10)add('expense','Compra de equipos','Equipo de sonido',Math.round(380000*sc/1000)*1000,12);
  };
  const stamp=(plan,k)=>new Date(Math.min(plan,Date.now()-k*3600000)).toISOString();
  churches.forEach((c,ci)=>{
    let name=c[0],lastClosed=ci===0?11:12,ledger=financeLedgers[name]={church:name,opening:opens[ci],transactions:[],period:'2026-01'};
    for(let m=1;m<=12;m++){
      ledger.period='2026-'+pad2(m);
      addMonth(ledger,m,scales[ci],m<=lastClosed?28:15);
      if(m<=lastClosed){doClosePeriod(name);let cl=closureData(name).closed;cl[cl.length-1].closedAt=stamp(new Date(2026,m,2,10,0).getTime(),14-m)}
    }
    if(ci>0){doAnnualClose(name,2026);let an=closureData(name).annual;an[an.length-1].createdAt=stamp(new Date(2027,0,6,10,0).getTime(),1)}
  });
  circuitState.seen=circuitPeriods().map(circuitKey);
  /* ITAIC */
  itaicCampuses.length=0;itaicCampuses.push('Sede Central','Sede Betania');
  itaicSubjects.length=0;
  [['year1',['Introducción a la Biblia','Doctrina Cristiana']],['year2',['Hermenéutica','Historia de la Iglesia']],['year3',['Teología Sistemática','Homilética']]].forEach(y=>y[1].forEach((name,i)=>itaicSubjects.push({id:`sub-${y[0]}-${i+1}`,year:y[0],name})));
  const groups=[['year1','Sede Central',['Luis Alberto Mendoza','Camilo Andrés Pastrana']],['year1','Sede Betania',['Daniela Andrea Suárez']],['year2','Sede Central',['María Fernanda Gómez']],['year2','Sede Betania',['Jorge Iván Salcedo','Karen Julieth Lozano']],['year3','Sede Central',['Paola Andrea Ruiz']],['year3','Sede Betania',['Brayan Stiven Doria','Andrés Felipe Cogollo']]];
  itaicCourses.length=0;itaicPayments.length=0;
  const paid=[300000,150000,300000,0,300000,150000,300000,150000,0];let pi=0;
  groups.forEach(g=>{let ids=g[2].map(idOf);itaicCourses.push({id:`${g[0]}-${g[1]==='Sede Central'?'central':'betania'}`,year:g[0],campus:g[1],teacher:'',students:ids});ids.forEach(id=>itaicPayments.push({id,due:300000,paid:paid[pi++%paid.length]}))});
  subjectTeachers.length=0;
  const ana='Ana Lucía Ríos',teach={'sub-year1-1':[churches[0][2],churches[0][2]],'sub-year1-2':[ana,ana],'sub-year2-1':[churches[1][2],churches[1][2]],'sub-year2-2':[ana,churches[2][2]],'sub-year3-1':[churches[3][2],churches[3][2]],'sub-year3-2':[churches[0][2],churches[0][2]]};
  Object.keys(teach).forEach(sid=>['Sede Central','Sede Betania'].forEach((campus,i)=>subjectTeachers.push({subjectId:sid,campus,teacher:teach[sid][i]})));
  Object.keys(courseAssessments).forEach(k=>delete courseAssessments[k]);
  sections().forEach(sec=>{
    if(!sec.students.length)return;
    let list=courseAssessments[sec.id];
    [['Quiz 1',20],['Taller',30],['Examen final',50]].forEach((ev,ei)=>{
      let grades={};sec.students.forEach((id,si)=>{if(ei===2&&si===sec.students.length-1&&sec.students.length>1)return;grades[id]=Math.round((3+rnd()*2)*10)/10});
      list.push({name:ev[0],weight:ev[1],grades});
    });
  });
  syncTA();
  itaicEnrollmentRequests.length=0;
  [['Carlos Mario Ortega','year1','Sede Central',0],['Gladys Stella Berrío','year1','Sede Betania',3]].forEach((r,i)=>itaicEnrollmentRequests.push({id:'req-demo-'+(i+1),memberId:idOf(r[0]),year:r[1],campus:r[2],church:churches[r[3]][0],pastor:churches[r[3]][2],date:'15/11/2026',status:'Pendiente'}));
  itaicSettings.passMin=3;
  HOME_CHURCH=churches[0][0];assocFilter='';churchFilter='';
  syncChurchCounts();
}

/* ===================== Entrega 7: datos de pastores, estudios y edición de iglesias ===================== */
let pastorsList=[];
const canManagePastors=()=>['presbitero','secretario'].includes(role);
const churchOfPastor=name=>(churches.find(c=>c[2]===name)||[])[0]||'';
function syncPastors(){
  churches.forEach(c=>{if(c[2]&&c[2]!=='Por asignar'&&!pastorsList.some(p=>p.name===c[2]))pastorsList.push({id:'p-'+Date.now()+'-'+pastorsList.length,name:c[2],idNumber:'',phone:'',address:'',email:'',studies:[]})});
}

/* ---------- Estudios (varios, con botón +) ---------- */
function studyRow(x){
  x=x||{};
  return `<div class="study-row"><input class="s-title" placeholder="${L('Título o estudio','Title or study')}" value="${reportEsc(x.title||'')}"><input class="s-inst" placeholder="${L('Institución','Institution')}" value="${reportEsc(x.institution||'')}"><input class="s-year" type="number" min="1900" max="2100" placeholder="${L('Año','Year')}" value="${reportEsc(x.year||'')}"><button type="button" class="inline-actions" data-it7="delStudy" title="${L('Quitar','Remove')}">×</button></div>`;
}
function studiesField(list){
  let rows=(list&&list.length?list:[{}]).map(studyRow).join('');
  return `<div class="studies" data-studies><div class="studies-head"><label>${L('Estudios','Studies')}</label><button type="button" class="secondary" data-it7="addStudy">＋ ${L('Agregar estudio','Add study')}</button></div><div class="studies-list">${rows}</div></div>`;
}
function readStudies(form){
  if(!form)return [];
  return [...form.querySelectorAll('.study-row')].map(r=>({title:r.querySelector('.s-title').value.trim(),institution:r.querySelector('.s-inst').value.trim(),year:r.querySelector('.s-year').value.trim()})).filter(x=>x.title||x.institution||x.year);
}
const studiesText=list=>(list||[]).map(x=>[x.title,x.institution,x.year].filter(Boolean).join(' · ')).join(' | ');
function studiesView(list){
  return (list&&list.length)?`<ul class="studies-view">${list.map(x=>`<li><b>${reportEsc(x.title||'—')}</b><small>${reportEsc([x.institution,x.year].filter(Boolean).join(' · '))}</small></li>`).join('')}</ul>`:`<p class="muted">${L('Sin estudios registrados','No studies registered')}</p>`;
}

/* ---------- Miembros: estudios al registrar y detalle ---------- */
let baseOpenModalE7=openModal;
openModal=function(type){
  baseOpenModalE7.apply(this,arguments);
  if(type==='member'&&role==='pastor'){
    let form=document.getElementById('modalForm'),grid=form&&form.querySelector('.modal-grid');
    if(grid){
      grid.insertAdjacentHTML('afterend',studiesField([]));
      let prev=form.onsubmit;
      form.onsubmit=function(e){let st=readStudies(form),n0=members.length,r=prev?prev.call(this,e):undefined;if(members.length>n0)members[0].studies=st;return r};
    }
  }
};
function showInfoModal(html){
  $('#modalRoot').innerHTML=`<div class="modal-backdrop"><section class="modal">${html}<div class="modal-actions"><button type="button" class="primary" id="closeInfo">${L('Cerrar','Close')}</button></div></section></div>`;
  $('#closeInfo').onclick=()=>$('#modalRoot').innerHTML='';
}
function viewMember(id){
  let m=members.find(x=>x.id===id);if(!m)return;
  let row=(k,v)=>`<div class="info-row"><span>${k}</span><b>${reportEsc(v||'—')}</b></div>`;
  showInfoModal(`<h2>${reportEsc(m.name)}</h2><p>${reportEsc(m.church)}</p>${row(t('document'),m.id)}${row(t('age'),m.age)}${row(t('sex'),m.sex)}${row(t('civil'),m.civil)}${row(L('Asociación','Association'),m.assoc?`${m.assoc} · ${assocLabel(m.assoc)}`:'')}${row(t('baptism'),m.baptized?t('yes'):t('no'))}<div class="eyebrow-line" style="margin:14px 0 6px">${L('ESTUDIOS','STUDIES')}</div>${studiesView(m.studies)}`);
}

/* ---------- Pastores ---------- */
function pastorForm(p){
  return `<div class="modal-grid"><div class="field"><label>${t('name')} *</label><input name="name" required value="${reportEsc(p.name||'')}"></div><div class="field"><label>${L('Cédula','ID number')}</label><input name="idNumber" value="${reportEsc(p.idNumber||'')}"></div><div class="field"><label>${L('Teléfono','Phone')}</label><input name="phone" type="tel" value="${reportEsc(p.phone||'')}"></div><div class="field"><label>${L('Correo electrónico','Email')}</label><input name="email" type="email" value="${reportEsc(p.email||'')}"></div></div><div class="field"><label>${L('Dirección','Address')}</label><input name="address" value="${reportEsc(p.address||'')}"></div>${studiesField(p.studies)}`;
}
function pastorsPage(){
  syncPastors();
  let can=canManagePastors(),assigned=pastorsList.filter(p=>churchOfPastor(p.name)).length;
  let rows=pastorsList.map(p=>`<div class="church-row pastor-row"><div class="church-emblem">♙</div><div><b>${reportEsc(p.name)}</b><small>${reportEsc(churchOfPastor(p.name)||L('Sin iglesia asignada','No church assigned'))}${p.phone?' · '+reportEsc(p.phone):''}${p.email?' · '+reportEsc(p.email):''}</small>${p.studies&&p.studies.length?`<small>${L('Estudios','Studies')}: ${reportEsc(studiesText(p.studies))}</small>`:''}</div><button class="inline-actions" data-it7="editPastor|${reportEsc(p.id)}" title="${can?L('Editar','Edit'):L('Ver','View')}">✎</button></div>`).join('');
  return `${pageHead(t('pastors'),L('Datos de los pastores del circuito','Circuit pastors’ data'),can?`<button class="primary" data-it7="newPastor">＋ ${t('newPastor')}</button>`:'')}${stats([['♙',t('pastors'),pastorsList.length,L('registrados','registered')],['⌂',L('Con iglesia','With church'),assigned,L('asignados','assigned')],['◌',L('Sin iglesia','Unassigned'),pastorsList.length-assigned,L('disponibles','available')],['✉',L('Con correo','With email'),pastorsList.filter(p=>p.email).length,L('registrados','registered')]])}<section class="panel"><div class="panel-head"><div><h2>${t('pastors')}</h2><p>${pastorsList.length} · ${L('toca ✎ para ver o editar sus datos','tap ✎ to view or edit their data')}</p></div></div>${rows||`<div class="empty">${t('empty')}</div>`}</section>`;
}
let baseSimplePageE7=simplePage;
simplePage=function(type){return type==='pastors'?pastorsPage():baseSimplePageE7.apply(this,arguments)};
function savePastorFromForm(p,d,isNew){
  let name=String(d.name||'').trim();if(!name)return false;
  if(pastorsList.some(x=>x!==p&&x.name.toLowerCase()===name.toLowerCase())){notify(L('Ya existe un pastor con ese nombre','A pastor with that name already exists'));return false}
  let old=p.name;
  Object.assign(p,{name,idNumber:String(d.idNumber||'').trim(),phone:String(d.phone||'').trim(),email:String(d.email||'').trim(),address:String(d.address||'').trim(),studies:readStudies(document.getElementById('modalForm'))});
  if(!isNew&&name!==old){
    churches.forEach(c=>{if(c[2]===old)c[2]=name});
    subjectTeachers.forEach(a=>{if(a.teacher===old)a.teacher=name});
    itaicCourses.forEach(x=>{if(x.teacher===old)x.teacher=name});
    itaicEnrollmentRequests.forEach(r=>{if(r.pastor===old)r.pastor=name});
    syncTA();
  }
  return true;
}
function newPastorDialog(){
  if(!canManagePastors())return;
  showModalForm(`<h2>${t('newPastor')}</h2><p>${L('Después puedes asignarlo a una iglesia desde la edición de la iglesia.','You can assign him to a church later from the church edit screen.')}</p>${pastorForm({})}`,d=>{
    let p={id:'p-'+Date.now(),name:'',idNumber:'',phone:'',address:'',email:'',studies:[]};
    if(savePastorFromForm(p,d,true)){pastorsList.push(p);notify(L('Pastor agregado ✓','Pastor added ✓'));renderPage()}
  });
}
function editPastorDialog(id){
  let p=pastorsList.find(x=>x.id===id);if(!p)return;
  if(!canManagePastors()){showInfoModal(`<h2>${reportEsc(p.name)}</h2><p>${reportEsc(churchOfPastor(p.name))}</p>${studiesView(p.studies)}`);return}
  showModalForm(`<h2>${L('Datos del pastor','Pastor data')}</h2><p>${reportEsc(churchOfPastor(p.name)||L('Sin iglesia asignada','No church assigned'))}</p>${pastorForm(p)}`,d=>{
    if(savePastorFromForm(p,d,false)){notify(L('Pastor actualizado ✓','Pastor updated ✓'));renderPage()}
  });
}

/* ---------- Iglesias: editar conservando sus datos; el presbítero puede cambiar el pastor ---------- */
editChurch=function(i){
  let c=churches[i];if(!c||role!=='presbitero')return;
  syncPastors();
  let avail=pastorsList.filter(p=>p.name===c[2]||!churchOfPastor(p.name));
  showModalForm(`<h2>${L('Editar iglesia','Edit church')}</h2><div class="field"><label>${t('name')}</label><input name="name" required value="${reportEsc(c[0])}"></div><div class="field"><label>${t('address')}</label><input name="address" required value="${reportEsc(c[1])}"></div><div class="field"><label>${L('Pastor asignado','Assigned pastor')}</label><select name="pastor"><option value="">${L('Por asignar','To be assigned')}</option>${avail.map(p=>`<option ${p.name===c[2]?'selected':''}>${reportEsc(p.name)}</option>`).join('')}</select></div>`,d=>{
    let name=String(d.name||'').trim(),old=c[0];if(!name)return;
    if(churches.some((x,j)=>j!==i&&x[0].toLowerCase()===name.toLowerCase())){notify(L('Ya existe una iglesia con ese nombre','A church with that name already exists'));return}
    c[0]=name;c[1]=String(d.address||'').trim();c[2]=d.pastor||'Por asignar';
    if(name!==old){
      if(financeLedgers[old]){financeLedgers[name]=financeLedgers[old];delete financeLedgers[old];financeLedgers[name].church=name}
      if(financeClosures[old]){financeClosures[name]=financeClosures[old];delete financeClosures[old];financeClosures[name].requests.forEach(r=>{r.church=name})}
      members.forEach(m=>{if(m.church===old)m.church=name});
      itaicEnrollmentRequests.forEach(r=>{if(r.church===old)r.church=name});
      if(i===0)HOME_CHURCH=name;
    }
    notify(L('Iglesia actualizada ✓','Church updated ✓'));renderPage();
  });
};

/* ---------- Clics ---------- */
document.addEventListener('click',e=>{
  let el=e.target.closest('[data-it7]');if(!el)return;
  e.preventDefault();e.stopImmediatePropagation();
  let a=el.dataset.it7.split('|'),act=a[0];
  if(act==='addStudy'){let list=el.closest('[data-studies]').querySelector('.studies-list');list.insertAdjacentHTML('beforeend',studyRow({}));let ins=list.querySelectorAll('.s-title');ins[ins.length-1].focus()}
  else if(act==='delStudy'){let row=el.closest('.study-row'),list=row.parentNode;row.remove();if(!list.children.length)list.insertAdjacentHTML('beforeend',studyRow({}))}
  else if(act==='viewMember')viewMember(a.slice(1).join('|'));
  else if(act==='newPastor')newPastorDialog();
  else if(act==='editPastor')editPastorDialog(a.slice(1).join('|'));
},true);
let baseRenderPageE7=renderPage;
renderPage=function(){syncPastors();return baseRenderPageE7.apply(this,arguments)};

/* ---------- Datos de ejemplo: pastores y estudios ---------- */
function seedPastors(){
  pastorsList.length=0;
  [['Pr. José Martínez','1.067.412.558','310 456 7821','jose.martinez@iglesia.example','Calle 15 # 8-42 · Montería',[['Licenciatura en Teología','Seminario Bíblico del Caribe','2008'],['Maestría en Consejería Pastoral','Universidad Cristiana de Córdoba','2015']]],
   ['Pr. David López','1.003.221.874','312 908 4416','david.lopez@iglesia.example','Carrera 6 # 32-18 · Montería',[['Técnico en Estudios Bíblicos','Instituto Bíblico Betania','2011']]],
   ['Pr. Samuel Ríos','1.102.775.309','315 220 7788','samuel.rios@iglesia.example','Calle 41 # 12-05 · Cereté',[['Licenciatura en Teología','Seminario Bíblico del Caribe','2010'],['Diplomado en Liderazgo','Universidad de Córdoba','2018']]],
   ['Pr. Andrés Pérez','1.064.118.642','318 774 3095','andres.perez@iglesia.example','Carrera 9 # 20-33 · Lorica',[['Instituto Bíblico','Instituto Bíblico del Sinú','2013']]],
   ['Pr. Luis Fernando Gómez','1.070.556.213','301 662 9054','luis.gomez@iglesia.example','Calle 30 # 14-20 · Sahagún',[['Licenciatura en Teología','Seminario Bíblico del Caribe','2016']]]
  ].forEach((x,i)=>pastorsList.push({id:'p-'+(i+1),name:x[0],idNumber:x[1],phone:x[2],email:x[3],address:x[4],studies:x[5].map(y=>({title:y[0],institution:y[1],year:y[2]}))}));
  const st={'Ana Lucía Ríos':[['Licenciatura en Educación Religiosa','Universidad Cristiana de Córdoba','2016']],'Carlos Mario Ortega':[['Técnico en Contabilidad','SENA','2012']],'María Fernanda Gómez':[['Profesional en Educación Infantil','Universidad de Córdoba','2023']]};
  members.forEach(m=>{if(st[m.name])m.studies=st[m.name].map(y=>({title:y[0],institution:y[1],year:y[2]}))});
}

/* ===================== Entrega 8: diezmos automáticos y comparación en pantalla ===================== */
const AUTO_CATS=['Diezmo de diezmos','Diezmo de ofrendas'];
function syncAutoTithes(ledger){
  if(!ledger||!Array.isArray(ledger.transactions))return;
  let manual=ledger.transactions.filter(x=>!AUTO_CATS.includes(x.category));
  ledger.transactions.length=0;manual.forEach(x=>ledger.transactions.push(x));
  let per=ledgerPeriod(ledger),date=`${per}-${String(lastDayOf(per)).padStart(2,'0')}`;
  let sum=cat=>manual.filter(x=>x.type==='income'&&x.category===cat).reduce((n,x)=>n+Number(x.amount),0);
  [['Diezmos','Diezmo de diezmos',L('10% de los diezmos','10% of tithes')],['Ofrendas','Diezmo de ofrendas',L('10% de las ofrendas','10% of offerings')]].forEach(r=>{
    let base=sum(r[0]);
    if(base>0)ledger.transactions.push({type:'expense',category:r[1],description:L('Calculado automáticamente · ','Automatically calculated · ')+r[2],amount:Math.round(base*0.1),date,auto:true});
  });
}
let baseEnsureLedgerE8=ensureLedger;
ensureLedger=function(church){let l=baseEnsureLedgerE8.apply(this,arguments);syncAutoTithes(l);return l};
let baseOpenModalE8=openModal;
openModal=function(type){
  baseOpenModalE8.apply(this,arguments);
  if(type==='movement'&&role==='pastor'){
    let sel=document.querySelector('#modalForm [name=category]');
    if(sel){
      let autoLabels=AUTO_CATS.map(c=>categoryLabel(c));
      let clean=()=>[...sel.options].forEach(o=>{if(AUTO_CATS.includes(o.value)||autoLabels.includes(o.textContent))o.remove()});
      clean();new MutationObserver(clean).observe(sel,{childList:true});
      sel.insertAdjacentHTML('afterend',`<small class="muted">${L('El diezmo de diezmos y el de ofrendas se calculan solos (10%).','Tithe of tithes and of offerings are calculated automatically (10%).')}</small>`);
    }
  }
};

/* ---------- Comparación: primero en pantalla, después se decide generar el informe ---------- */
let cmpState={mode:'m',a:'',b:''};
const compareKind=()=>role==='pastor'?'compare-finance':'circuit-compare-finance';
function compareOptions(mode){
  if(role==='pastor'){let cd=closureData(HOME_CHURCH);return mode==='m'?cd.closed.slice().reverse().map(c=>[c.id,periodLabel(c.id)]):closedYears(HOME_CHURCH).slice().reverse().map(y=>[String(y),String(y)])}
  let mp=circuitPeriods();return mode==='m'?mp.slice().reverse().map(P=>[P,periodLabel(P)]):[...new Set(mp.map(P=>P.slice(0,4)))].reverse().map(y=>[y,y]);
}
const compareScope=()=>role==='pastor'?`${HOME_CHURCH}|${cmpState.mode}|${cmpState.a}|${cmpState.b}`:`${cmpState.mode}|${cmpState.a}|${cmpState.b}`;
function rowsToTable(rows){
  let head=rows[0],body=rows.slice(1);
  return `<table class="data-table compare-table"><thead><tr>${head.map(h=>`<th>${reportEsc(h)}</th>`).join('')}</tr></thead><tbody>${body.map(r=>`<tr class="${r.length>1&&r.slice(1).every(x=>x==='')?'section-row':''}">${r.map((c,i)=>`<td class="${i?'num':''}">${reportEsc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}
function comparePageHtml(){
  let o=compareOptions(cmpState.mode),ok=o.length>1;
  if(!o.some(x=>x[0]===cmpState.a))cmpState.a=ok?o[1][0]:(o[0]?o[0][0]:'');
  if(!o.some(x=>x[0]===cmpState.b)||cmpState.b===cmpState.a)cmpState.b=(o.find(x=>x[0]!==cmpState.a)||[''])[0];
  let opts=v=>o.map(x=>`<option value="${reportEsc(x[0])}" ${x[0]===v?'selected':''}>${reportEsc(x[1])}</option>`).join('');
  let place=role==='pastor'?HOME_CHURCH:t('headerCircuit');
  let rows=ok?reportRows(compareKind(),compareScope()):null;
  return `${pageHead(L('Comparar periodos','Compare periods'),place,`<button class="secondary" data-it8="backFinance">← ${t('finance')}</button><button class="primary" data-it8="compareReport" ${ok?'':'disabled'}>${t('generate')} →</button>`)}<section class="panel"><div class="modal-grid"><div class="field"><label>${L('Comparación','Comparison')}</label><select id="cmpModeSel"><option value="m" ${cmpState.mode==='m'?'selected':''}>${L('Mes con mes','Month vs month')}</option><option value="y" ${cmpState.mode==='y'?'selected':''}>${L('Año con año','Year vs year')}</option></select></div><div></div><div class="field"><label>${L('Periodo base','Base period')}</label><select id="cmpASel">${opts(cmpState.a)}</select></div><div class="field"><label>${L('Comparar con','Compare with')}</label><select id="cmpBSel">${opts(cmpState.b)}</select></div></div></section>${ok?`<section class="table-card">${rowsToTable(rows)}</section>`:`<div class="empty">${L('No hay suficientes periodos para esta comparación','Not enough periods for this comparison')}</div>`}`;
}
function goCompare(){cmpState={mode:'m',a:'',b:''};selectedCourseId='compare';renderPage()}
openCompare=function(church){
  if(closureData(church).closed.length<2&&closedYears(church).length<2){notify(L('Necesitas al menos dos periodos cerrados para comparar','You need at least two closed periods to compare'));return}
  goCompare();
};
openCircuitCompare=function(){
  let mp=circuitPeriods();
  if(mp.length<2&&new Set(mp.map(P=>P.slice(0,4))).size<2){notify(L('Necesitas al menos dos cierres consolidados para comparar','You need at least two consolidated closings to compare'));return}
  goCompare();
};
let baseRenderPageE8=renderPage;
renderPage=function(){
  Object.values(financeLedgers).forEach(syncAutoTithes);
  if(page!=='finance'&&selectedCourseId==='compare')selectedCourseId=null;
  let r=baseRenderPageE8.apply(this,arguments);
  if(page==='finance'&&selectedCourseId==='compare'&&['pastor','tesorero','presbitero'].includes(role)){let c=document.getElementById('content');if(c)c.innerHTML=comparePageHtml()}
  return r;
};
document.addEventListener('click',e=>{
  let el=e.target.closest('[data-it8]');if(!el)return;
  e.preventDefault();e.stopImmediatePropagation();
  let act=el.dataset.it8;
  if(act==='backFinance'){selectedCourseId=null;renderPage()}
  else if(act==='compareReport'&&!el.disabled){let sc=compareScope();openPlainReport(compareKind(),sc,reportTitleFor(compareKind(),sc,''))}
},true);
document.addEventListener('change',e=>{
  let id=e.target&&e.target.id;if(!['cmpModeSel','cmpASel','cmpBSel'].includes(id))return;
  if(id==='cmpModeSel'){cmpState.mode=e.target.value;cmpState.a='';cmpState.b=''}
  else if(id==='cmpASel')cmpState.a=e.target.value;
  else cmpState.b=e.target.value;
  renderPage();
},true);


/* ===================== Entrega 9: ITAIC con filtros previos, Notas y Financiero ===================== */
Object.assign(I.es,{navGrades:'Notas',navMoney:'Financiero'});Object.assign(I.en,{navGrades:'Grades',navMoney:'Financial'});
navInfo.itaicGrades=['✎','navGrades'];navInfo.itaicFinance=['◈','navMoney'];
const ITF_KEYS=['year','campus','subject','student'];
let gradeFilter={year:'',campus:'',subject:'',student:''},moneyFilter={year:'',campus:'',subject:'',student:''},homeFilter={year:'',campus:'',subject:'',student:''};
const ITF_STATE={grade:()=>gradeFilter,money:()=>moneyFilter,home:()=>homeFilter};
const itfScope=f=>'f|'+ITF_KEYS.map(k=>f[k]||'').join('|');
function itfParse(scope){let a=String(scope).split('|');return {year:a[1]||'',campus:a[2]||'',subject:a[3]||'',student:a[4]||''}}
const itfMatch=(x,f)=>(!f.year||x.year===f.year)&&(!f.campus||x.campus===f.campus)&&(!f.subject||x.subjectId===f.subject)&&(!f.student||x.students.includes(f.student));
const itfSections=(f,base)=>(base||visibleSections()).filter(x=>itfMatch(x,f));
function itfOptions(f,base){
  let bySub=base.filter(x=>!f.year||x.year===f.year),subs=[...new Map(bySub.map(x=>[x.subjectId,x])).values()];
  let studs=[...new Set(itfSections({year:f.year,campus:f.campus,subject:f.subject,student:''},base).flatMap(x=>x.students))].sort((a,b)=>studentName(a).localeCompare(studentName(b)));
  return {years:[...new Set(base.map(x=>x.year))].sort(),campuses:[...new Set(base.map(x=>x.campus))],subjects:subs.map(x=>[x.subjectId,`${x.subjectName} · ${t(x.year)}`]),students:studs};
}
function itfFix(f,base){
  for(let i=0;i<2;i++){let o=itfOptions(f,base);
    if(f.year&&!o.years.includes(f.year))f.year='';
    if(f.campus&&!o.campuses.includes(f.campus))f.campus='';
    if(f.subject&&!o.subjects.some(x=>x[0]===f.subject))f.subject='';
    if(f.student&&!o.students.includes(f.student))f.student='';}
  return f;
}
function itfBar(state,f,base,withStudent){
  let o=itfOptions(f,base),sel=(key,label,opts,all)=>`<div class="field"><label>${label}</label><select id="itf-${state}-${key}"><option value="">${all}</option>${opts.map(x=>`<option value="${reportEsc(x[0])}" ${x[0]===f[key]?'selected':''}>${reportEsc(x[1])}</option>`).join('')}</select></div>`;
  return `<section class="panel filter-panel"><div class="filter-bar">${sel('year',L('Año','Year'),o.years.map(y=>[y,t(y)]),L('Todos los años','All years'))}${sel('campus',L('Sede','Campus'),o.campuses.map(c=>[c,c]),L('Todas las sedes','All campuses'))}${sel('subject',L('Materia','Subject'),o.subjects,L('Todas las materias','All subjects'))}${withStudent?sel('student',L('Alumno','Student'),o.students.map(id=>[id,`${studentName(id)}`]),L('Todos los alumnos','All students')):''}<button type="button" class="secondary" data-it9="clear|${state}">${L('Limpiar','Clear')}</button></div></section>`;
}

/* ---------- Pantalla principal del maestro: filtro de sus cursos ---------- */
function teacherFilteredList(){let f=itfFix(homeFilter,teacherCourseList());return teacherCourseList().filter(x=>itfMatch(x,f))}
function homeFilterBar(){return itfBar('home',homeFilter,teacherCourseList(),false)}

/* ---------- Filas de informe con filtros previos ---------- */
function academicRowsF(f){
  let secs=itfSections(f),rows,finals=[];
  if(f.student){
    rows=[[L('Materia','Subject'),L('Sede','Campus'),L('Evaluación','Assessment'),L('Peso','Weight'),L('Nota','Grade')]];
    secs.filter(x=>x.students.includes(f.student)).forEach(x=>{
      (courseAssessments[x.id]||[]).forEach(a=>rows.push([`${x.subjectName} (${t(x.year)})`,x.campus,a.name,a.weight+'%',a.grades[f.student]!==undefined?Number(a.grades[f.student]).toFixed(1):'—']));
      let fin=weightedTotal(x,f.student);rows.push([`${x.subjectName} (${t(x.year)})`,x.campus,L('NOTA FINAL','FINAL GRADE'),'',`${fin.toFixed(2)} · ${resultLabel(fin)}`]);
    });
  }else{
    rows=[[L('Alumno','Student'),L('Documento','ID'),L('Año','Year'),L('Materia','Subject'),L('Sede','Campus'),L('Nota final','Final grade'),L('Resultado','Result')]];
    secs.slice().sort((a,b)=>a.campus.localeCompare(b.campus)||a.year.localeCompare(b.year)||a.subjectName.localeCompare(b.subjectName)).forEach(x=>{
      x.students.slice().sort((a,b)=>studentName(a).localeCompare(studentName(b))).forEach(id=>{let g=weightedTotal(x,id);finals.push(g);rows.push([studentName(id),id,t(x.year),x.subjectName,x.campus,g.toFixed(2),resultLabel(g)])});
    });
    if(finals.length)rows.push(['','','','',L('Promedio','Average'),(finals.reduce((a,b)=>a+b,0)/finals.length).toFixed(2),`${finals.filter(passed).length}/${finals.length} ${L('aprueban','pass')}`]);
  }
  if(rows.length===1)rows.push([L('Sin registros para este filtro','No records for this filter')]);
  return rows;
}
function moneyStudents(f){
  let ids;
  if(f.subject||f.student||!itaicReadAll())ids=[...new Set(itfSections(f).flatMap(x=>x.students))];
  else ids=[...new Set(itaicCourses.filter(c=>(!f.year||c.year===f.year)&&(!f.campus||c.campus===f.campus)).flatMap(c=>c.students))];
  return ids.sort((a,b)=>studentName(a).localeCompare(studentName(b))).map(id=>{
    let c=itaicCourses.find(x=>x.students.includes(id))||{},p=paymentFor(id);
    return {id,name:studentName(id),year:c.year?t(c.year):'—',campus:c.campus||'—',due:p.due,paid:p.paid};
  });
}
function financeTableRows(f){
  let list=moneyStudents(f);
  let rows=[[L('Alumno','Student'),L('Documento','ID'),L('Año','Year'),L('Sede','Campus'),L('Valor anual','Annual tuition'),L('Abonado','Paid'),L('Saldo','Balance'),L('Estado','Status')]];
  list.forEach(r=>rows.push([r.name,r.id,r.year,r.campus,money(r.due),money(r.paid),money(r.due-r.paid),r.paid>=r.due?t('paymentFullyPaid'):t('paymentPartial')]));
  if(list.length){let d=list.reduce((n,r)=>n+r.due,0),p=list.reduce((n,r)=>n+r.paid,0);rows.push([L('TOTAL','TOTAL'),String(list.length)+' '+L('alumnos','students'),'','',money(d),money(p),money(d-p),`${list.filter(r=>r.paid>=r.due).length} ${L('al día','paid up')}`])}
  else rows.push([L('Sin registros para este filtro','No records for this filter')]);
  return rows;
}
let baseItaicReportRowsE9=itaicReportRows;
itaicReportRows=function(kind,scope){
  if(String(scope).startsWith('f|')){let f=itfParse(scope);return kind==='itaic-finance'?financeTableRows(f):academicRowsF(f)}
  return baseItaicReportRowsE9.apply(this,arguments);
};
let baseScopeLabelE9=scopeLabel;
scopeLabel=function(scope){
  if(!String(scope).startsWith('f|'))return baseScopeLabelE9.apply(this,arguments);
  let f=itfParse(scope),parts=[];
  if(f.year)parts.push(t(f.year));if(f.campus)parts.push(f.campus);
  if(f.subject){let sub=itaicSubjects.find(x=>x.id===f.subject);parts.push(sub?sub.name:f.subject)}
  if(f.student)parts.push(`${studentName(f.student)} (${f.student})`);
  return parts.length?parts.join(' · '):L('General','General');
};

/* ---------- Páginas Notas y Financiero ---------- */
const plainTable=rows=>`<table class="data-table plain-table"><thead><tr>${rows[0].map(h=>`<th>${reportEsc(h)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(r=>`<tr class="${/NOTA FINAL|FINAL GRADE/.test(String(r[2]))?'section-row':''}">${r.map(c=>`<td>${reportEsc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const scopeNote=()=>itaicReadAll()?L('Todas las sedes','All campuses'):L('Solo tus materias y alumnos asignados','Only your assigned subjects and students');
function itaicGradesPage(){
  let base=visibleSections(),f=itfFix(gradeFilter,base),rows=academicRowsF(f),secs=itfSections(f,base);
  let finals=[];if(!f.student)secs.forEach(x=>x.students.forEach(id=>finals.push(weightedTotal(x,id))));
  let studs=new Set(secs.flatMap(x=>x.students)),avg=finals.length?(finals.reduce((a,b)=>a+b,0)/finals.length).toFixed(2):'—';
  let st=f.student?[['♙',L('Alumno','Student'),1,studentName(f.student)],['▣',L('Materias','Subjects'),secs.filter(x=>x.students.includes(f.student)).length,L('que cursa','enrolled')]]:[['♙',t('students'),studs.size,L('en el filtro','in the filter')],['▣',L('Materias','Subjects'),new Set(secs.filter(x=>x.students.length).map(x=>x.subjectId)).size,L('con alumnos','with students')],['✎',L('Promedio','Average'),avg,L('nota final','final grade')],['✓',L('Aprobación','Pass rate'),finals.length?Math.round(finals.filter(passed).length/finals.length*100)+'%':'—',`≥ ${itaicSettings.passMin.toFixed(1)}`]];
  return `${pageHead(L('Notas','Grades'),scopeNote(),`<button class="primary" data-it9="gradesReport">${t('generate')} →</button>`)}${itfBar('grade',f,base,true)}${stats(st)}<section class="table-card">${plainTable(rows)}</section>`;
}
itaicFinancePage=function(){
  let base=visibleSections(),f=itfFix(moneyFilter,base),list=moneyStudents(f),due=list.reduce((n,r)=>n+r.due,0),paid=list.reduce((n,r)=>n+r.paid,0),ok=list.filter(r=>r.paid>=r.due).length;
  let can=false; /* los abonos los registra el maestro desde su libreta */
  return `${pageHead(L('Financiero','Financial'),scopeNote(),`<button class="primary" data-it9="moneyReport">${t('generate')} →</button>`)}${itfBar('money',f,base,true)}${stats([['◈',t('totalCollected'),money(paid),t('paid')],['◌',t('outstanding'),money(due-paid),t('owed')],['✓',t('paidAccounts'),ok,t('paymentFullyPaid')],['!',t('owingAccounts'),list.length-ok,t('paymentPartial')]])}<section class="table-card"><table class="data-table plain-table"><thead><tr><th>${t('student')}</th><th>${L('Año','Year')}</th><th>${L('Sede','Campus')}</th><th>${t('tuition')}</th><th>${t('paid')}</th><th>${t('owed')}</th><th>${t('paymentStatus')}</th>${can?'<th></th>':''}</tr></thead><tbody>${list.map(r=>{let bal=r.due-r.paid;return `<tr><td><strong>${reportEsc(r.name)}</strong></td><td>${reportEsc(r.year)}</td><td>${reportEsc(r.campus)}</td><td>${money(r.due)}</td><td>${money(r.paid)}</td><td>${money(bal)}</td><td><span class="status ${bal>0?'pending':''}">${bal>0?t('paymentPartial'):t('paymentFullyPaid')}</span></td>${can?`<td>${bal>0?`<button class="secondary" data-payment-student="${reportEsc(r.id)}">${t('markPayment')}</button>`:''}</td>`:''}</tr>`}).join('')||`<tr><td colspan="${can?8:7}" class="empty">${L('Sin registros para este filtro','No records for this filter')}</td></tr>`}</tbody></table></section>`;
};

/* ---------- Navegación desde botones antiguos ---------- */
function goItaicPage(p,preset){
  if(preset){let f={year:preset.year,campus:preset.campus,subject:preset.subjectId,student:''};if(p==='itaicGrades')gradeFilter=f;else moneyFilter=f}
  page=p;selectedCourseId=null;renderNav();renderPage();
}
let baseOpenReportBuilderE9=openReportBuilder;
openReportBuilder=function(kind){
  if(!String(kind).startsWith('itaic'))return baseOpenReportBuilderE9.apply(this,arguments);
  let allowed=['itaic','presbitero','maestro'].includes(role)||(role==='pastor'&&teacherCourseList().length>0);
  if(!allowed)return baseOpenReportBuilderE9.apply(this,arguments);
  goItaicPage(kind==='itaic-finance'?'itaicFinance':'itaicGrades');
};
document.addEventListener('click',e=>{
  let el=e.target.closest('[data-it9]');if(!el)return;
  e.preventDefault();e.stopImmediatePropagation();
  let a=el.dataset.it9.split('|'),act=a[0];
  if(act==='goGrades'||act==='goMoney'){let sec=sections().find(x=>x.id===a.slice(1).join('|'));goItaicPage(act==='goGrades'?'itaicGrades':'itaicFinance',sec)}
  else if(act==='gradesReport'){let sc=itfScope(itfFix(gradeFilter,visibleSections()));openPlainReport('itaic-secretary',sc,`${L('Informe de notas','Grades report')} · ${scopeLabel(sc)}`)}
  else if(act==='moneyReport'){let sc=itfScope(itfFix(moneyFilter,visibleSections()));openPlainReport('itaic-finance',sc,`${L('Informe financiero ITAIC','ITAIC financial report')} · ${scopeLabel(sc)}`)}
  else if(act==='clear'){let f=ITF_STATE[a[1]]();ITF_KEYS.forEach(k=>{f[k]=''});renderPage()}
},true);
document.addEventListener('change',e=>{
  let id=e.target&&e.target.id,m=/^itf-(grade|money|home)-(year|campus|subject|student)$/.exec(id||'');if(!m)return;
  let f=ITF_STATE[m[1]]();f[m[2]]=e.target.value;renderPage();
},true);

(function(){let lo=document.getElementById('logout');if(lo)lo.addEventListener('click',()=>{[gradeFilter,moneyFilter,homeFilter].forEach(f=>ITF_KEYS.forEach(k=>{f[k]=''}))})})();


/* ===================== Entrega 10: Word real (.docx) ===================== */
const DOCX_COLOR='174B41';
const xmlEsc=v=>String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function docxRun(text,o){o=o||{};return `<w:r><w:rPr>${o.b?'<w:b/>':''}${o.color?`<w:color w:val="${o.color}"/>`:''}${o.sz?`<w:sz w:val="${o.sz}"/>`:''}</w:rPr><w:t xml:space="preserve">${xmlEsc(text)}</w:t></w:r>`}
function docxPara(runs,o){o=o||{};return `<w:p><w:pPr>${o.border?`<w:pBdr>${o.border==='top'?'<w:top':'<w:bottom'} w:val="single" w:sz="8" w:space="4" w:color="${DOCX_COLOR}"/></w:pBdr>`:''}<w:spacing w:before="${o.before||0}" w:after="${o.after==null?80:o.after}"/>${o.jc?`<w:jc w:val="${o.jc}"/>`:''}</w:pPr>${runs}</w:p>`}
const isNumericCell=v=>/^[-+]?\$?\s?[\d.,]+%?$/.test(String(v).trim());
function docxCell(text,w,o){
  o=o||{};
  return `<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/>${o.fill?`<w:shd w:val="clear" w:color="auto" w:fill="${o.fill}"/>`:''}<w:vAlign w:val="center"/></w:tcPr>${docxPara(docxRun(text,{b:o.b,color:o.color,sz:o.sz||19}),{jc:o.jc,after:0,before:0})}</w:tc>`;
}
function buildDocxZip(kind,scope){
  if(typeof JSZip==='undefined')throw new Error('JSZip no disponible');
  let title=reportTitleFor(kind,scope,kind.endsWith('finance')||kind==='finance'?t('financialReportTitle'):t('generalReportTitle')),headers=reportHeader(kind,scope),rows=reportRows(kind,scope);
  rows=rows.map(r=>r.map((v,ci)=>kind==='finance'&&ci===r.length-1&&typeof v==='number'?`$${v.toLocaleString('es-CO')}`:String(v==null?'':v)));
  let cols=Math.max.apply(null,rows.map(r=>r.length)),landscape=cols>=6,total=landscape?14838:9026;
  let weights=[];for(let c=0;c<cols;c++){let m=Math.max.apply(null,rows.map(r=>String(r[c]||'').length));weights.push(Math.min(Math.max(m,6),42))}
  let sw=weights.reduce((a,b)=>a+b,0),widths=weights.map(w=>Math.floor(total*w/sw));
  let numeric=[];for(let c=0;c<cols;c++){let body=rows.slice(1).map(r=>r[c]).filter(v=>v!==undefined&&v!==''),n=body.filter(isNumericCell).length;numeric.push(c>0&&body.length>0&&n/body.length>=0.6)}
  let borders=['top','left','bottom','right','insideH','insideV'].map(k=>`<w:${k} w:val="single" w:sz="4" w:space="0" w:color="CBD5CF"/>`).join('');
  let tbl=`<w:tbl><w:tblPr><w:tblW w:w="${total}" w:type="dxa"/><w:tblBorders>${borders}</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${widths.map(w=>`<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>`;
  rows.forEach((r,ri)=>{
    let cells=[];
    let section=ri>0&&r.length>0&&String(r[0]).trim()!==''&&r.slice(1).every(v=>String(v).trim()===''),totalRow=ri>0&&/^(total|subtotal|nota final|promedio)/i.test(String(r[0]).trim());
    for(let c=0;c<cols;c++){
      let v=r[c]===undefined?'':r[c],o={jc:numeric[c]?'right':undefined};
      if(ri===0){o.fill=DOCX_COLOR;o.color='FFFFFF';o.b=true}
      else if(section){o.fill='EFF5F1';o.b=true;o.color=DOCX_COLOR}
      else if(totalRow){o.b=true;o.fill='F4F7F5'}
      cells.push(docxCell(v,widths[c],o));
    }
    tbl+=`<w:tr>${ri===0?'<w:trPr><w:tblHeader/></w:trPr>':''}${cells.join('')}</w:tr>`;
  });
  tbl+='</w:tbl>';
  let logoNs='xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"';
  let logoRun=`<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="640080" cy="640080"/><wp:docPr id="1" name="Logo AIC"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="0" name="logo.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="640080" cy="640080"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
  let none=['top','left','bottom','right','insideH','insideV'].map(k=>`<w:${k} w:val="nil"/>`).join('');
  let head=`<w:tbl><w:tblPr><w:tblW w:w="${total}" w:type="dxa"/><w:tblBorders>${none}</w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid><w:gridCol w:w="1200"/><w:gridCol w:w="${total-1200}"/></w:tblGrid><w:tr><w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/></w:tcPr>${docxPara(logoRun,{after:0})}</w:tc><w:tc><w:tcPr><w:tcW w:w="${total-1200}" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr>${docxPara(docxRun(headers[0],{b:true,color:DOCX_COLOR,sz:26}),{after:20})}${docxPara(docxRun(headers[1],{sz:20}),{after:20})}${headers[2]?docxPara(docxRun(headers[2],{sz:20}),{after:0}):''}</w:tc></w:tr></w:tbl>`;
  let date=`${t('reportingPeriod')}: ${new Date().toLocaleDateString(lang==='es'?'es-CO':'en-US')}`;
  let body=head+docxPara('',{border:'bottom',after:120})+docxPara(docxRun(title,{b:true,sz:34,color:DOCX_COLOR}),{before:120,after:60})+docxPara(docxRun(date,{sz:19,color:'65756E'}),{after:200})+tbl+docxPara(docxRun(`${t('headerAic')} · ${t('headerCircuit')}`,{sz:17,color:'65756E'}),{before:320,after:0,border:'top'});
  let sect=landscape?'<w:sectPr><w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/><w:pgMar w:top="1134" w:right="1000" w:bottom="1134" w:left="1000" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>':'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1440" w:bottom="1134" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>';
  let doc=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ${logoNs}><w:body>${body}${sect}</w:body></w:document>`;
  let zip=new JSZip();
  zip.file('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>');
  zip.file('_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
  zip.file('word/_rels/document.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/logo.png"/></Relationships>');
  zip.file('word/styles.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri" w:eastAsia="Calibri"/><w:sz w:val="21"/><w:lang w:val="es-CO"/></w:rPr></w:rPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>');
  zip.file('word/document.xml',doc);
  let logo=String(window.AIC_REPORT_LOGO||''),m=/^data:image\/png;base64,(.+)$/.exec(logo);
  if(m)zip.file('word/media/logo.png',m[1],{base64:true});
  else zip.file('word/media/logo.png','iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',{base64:true});
  return zip;
}
function downloadBlob(blob,name){let url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function exportDocx(kind,scope,title,safeTitle){
  try{
    buildDocxZip(kind,scope).generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}).then(blob=>{downloadBlob(blob,`${safeTitle}.docx`);notify(t('reportGenerated'))}).catch(err=>{console.error(err);notify(L('No se pudo generar el documento Word','Could not generate the Word document'))});
  }catch(err){console.error(err);notify(L('No se pudo generar el documento Word','Could not generate the Word document'))}
}

/*__BOOT__*/
/* Los datos de ejemplo se cargan al final, cuando todo el código ya está definido. Los módulos nuevos se agregan ANTES de esta línea. */
seedDemoData();
seedPastors();
