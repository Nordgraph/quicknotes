/* QuickNotes для телефона: те же дела, что на ПК, через облако Supabase. */
'use strict';
const CFG = { url: 'https://yxrhcibioapcfvcbdrfz.supabase.co', key: 'sb_publishable_nV8lOBp4bRfxuGzUWcgGTQ_9iqJR_lv' };
const sb = supabase.createClient(CFG.url, CFG.key, {
  auth: { flowType: 'pkce', persistSession: true, detectSessionInUrl: true, autoRefreshToken: true } });

// ---------- тексты (как в десктопе) ----------
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const MONTHS_NOM = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONTHS_PREP = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'];
const WEEKDAYS = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
const WD_SHORT = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const CAPTIONS_ALL_DONE = ['Всё сделано. Красота.', 'Список закрыт. Кайф.', 'Галочки на месте. Отдыхай.', 'Сделано всё. Ты машина.', 'Чисто. Можно чилить.'];
const CAPTIONS_EMPTY = ['Пусто. Можно выдохнуть.', 'Тишина. Дел нет.', 'Чистый лист. Красиво.', 'Ни одного дела. Подозрительно.', 'Пусто — и это нормально.'];
const TIMER_QUOTES = ['Потихоньку, но едем.', 'Красиво сделаешь потом.', 'Положи телефон экраном вниз.', 'Самое сложное было начать.', 'Сейчас только одно дело ↓', 'Ещё чуть-чуть, потом чай.', 'Доделаешь и выкинешь из головы.', 'Пусть криво, лишь бы готово.', 'Нормально идёшь, продолжай.', 'Плечи опусти, челюсть разожми.', 'Поставишь галочку, станет легче.', 'Завтрашний ты скажет спасибо.', 'Мемы никуда не денутся.', 'Не тормози, ангел заскучал.', 'Тише едешь, всё равно едешь.', 'Нимб начищен, работаем.', 'Ещё немного, и галочка.', 'Без паники, просто дальше.', 'Список меньше, чем кажется.', 'Ангел за тебя болеет.', 'Ютуб подождёт до перерыва.', 'Медленно тоже считается.', 'Думать потом, сейчас делаем.', 'Йоу, я тут, я с тобой. Погнали.', 'Кофе остыл? Пох**, работаем.', 'Залип в работу? Красава.', 'Прокрастинация — иди погуляй.', 'Про воду не забываем, чувак.', 'Йоу, чувак, х**рим.', 'Сел и сделал. Всё, легенда.', 'Опять в телефоне? Я всё вижу.', 'Хорош скроллить, бро.', 'Ты чё, зря таймер ставил?', 'Красава, держи темп.', 'Ещё одна галочка, и ты бог.', 'Давай-давай, не сдувайся.', 'Мозг ноет? Пусть ноет.', 'Лень — это не план, бро.', 'Тихо х**рим, громко отдыхаем.', 'Устал? Это разминка была.', 'Я в тебя верю. Иногда.', 'Нимб просто так не дают.', 'Сделаешь, и с меня нимб.', 'Перерыв будет. Не сейчас.', 'Минус дело, плюс уважуха.', 'Жёстко идёшь, не тормози.', 'Йоу, ещё кружок.', 'Без суеты, но по делу.', 'Глаза в задачу, бро.', 'Залипнешь, получишь нимбом.', 'Ты реально работаешь? Уважаю.', 'Чилить будем потом.', 'Таймер тикает, ты тоже.', 'Всё по красоте, погнали дальше.', 'Дофамин потом, сейчас дело.', 'Не сливайся, бро, почти всё.', 'Кто доделал, тот и прав.', 'В чём сила, брат? Сила в правках.', 'Ну, погоди! Сначала доделай.', 'Мы с тобой одной крови: ленивой.', 'Шах и мат, прокрастинация.', 'Это база. Доделывай.', 'Сильно. Мощно. Доделано.', 'Ловкость рук и никакой лени.', 'Работа не волк. Но делать надо.', 'Галочка сама себя не поставит.', 'Пацаны, он реально работает.', 'Кайф? Кайф. Дальше.', 'Красиво стелешь, теперь сделай.', 'Тяжело в учении, легко в раю.', 'Не баг, а фича. Доделывай.', 'Кто прочитал, тот х**рит.'];
const TIMER_OUT_LEFT = ['Время вышло, а дела остались. Жми +5.', 'Таймер всё. Дела — ещё нет.', 'Не успел? Бывает. Ещё кружок?', 'Финишная прямая затянулась, бро.', 'Чуть-чуть не хватило. +5 и добьём.', 'Время кончилось, совесть — нет.', 'Дзынь! А галочки где?', 'Перерыв или дожмём? Решай.'];
const TIMER_OUT_FREE = ['Дзынь! Можно выдохнуть.', 'Время вышло. Перерыв заслужен.', 'Всё, отдыхай. Чай, вода, потянись.', 'Готово. Встань, разомни спину.'];
const TIMER_ALL_DONE = ['Всё сделано. Ты легенда.', 'Список закрыт, можно чилить.', 'Чисто сработано, бро.', 'Все галочки на месте. Кайф.', 'Вот это темп. Уважуха.', 'Дела закрыты, нимб заслужен.', 'Сделал всё — иди отдыхай.', 'Ангел доволен. Это редкость.', 'Красава. Остаток времени — твой.', 'Минус все дела, плюс вечер.'];
const ANGELS = ['angel1', 'angel2', 'angel3', 'angel4'];
const TIMER_ART = ['angel1', 'angel2', 'angel3', 'angel4', 'focus', 'hurry', 'hmm', 'happy'];
const art = n => `art/${n}.webp`;

// ---------- мелочи ----------
const ICON = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3.5" y="4.5" width="5" height="5" rx="1.3"/><rect x="3.5" y="14.5" width="5" height="5" rx="1.3"/><path d="M12 7h9M12 17h9"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  timer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5.5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="18.5" cy="12" r="1.7"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 7V4.5h4V7M6.5 7l1 13h9l1-13"/></svg>',
  move: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M14 6l6 6-6 6"/></svg>',
  bang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 4v11M12 19.5v.5"/></svg>',
  nest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v9a3 3 0 003 3h10M15 12l4 4-4 4"/></svg>',
  unnest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M10 6l-6 6 6 6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="M20 16l-5-5-8 8.5"/></svg>',
  door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h4.5v16H14M10 8l-4 4 4 4M6 12h10"/></svg>',
};
const $ = (s, r = document) => r.querySelector(s);
function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
  return e;
}
const icon = (name, cls) => h('span', { class: cls, html: ICON[name], style: 'display:contents' });
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseDay = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parseDay(s); d.setDate(d.getDate() + n); return ymd(d); };
const today = () => ymd(new Date());
const diffDays = (a, b) => Math.round((parseDay(a) - parseDay(b)) / 864e5);
const ordinal = s => Math.round(parseDay(s) / 864e5);
const localNaive = d => `${ymd(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
const pick = (arr, seed) => arr[((seed % arr.length) + arr.length) % arr.length];
const rnd = arr => arr[Math.floor(Math.random() * arr.length)];
function plural(n, one, few, many) {
  if (n % 10 === 1 && n % 100 !== 11) return one;
  if (n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14)) return few;
  return many;
}
function dayLabel(s) {
  const d = parseDay(s), t = today();
  const name = `${d.getDate()} ${MONTHS[d.getMonth()]}` + (d.getFullYear() !== parseDay(t).getFullYear() ? ` ${d.getFullYear()}` : '');
  if (s === t) return ['Сегодня', name];
  if (s === addDays(t, -1)) return ['Вчера', name];
  if (s === addDays(t, 1)) return ['Завтра', name];
  const wd = WEEKDAYS[(d.getDay() + 6) % 7];
  return [wd[0].toUpperCase() + wd.slice(1), name];
}
const ls = {
  get(k, def) { try { const v = localStorage.getItem(k); return v == null ? def : JSON.parse(v); } catch { return def; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* память переполнена — не страшно */ } },
};
function toast(text) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = h('div', { class: 'toast' }, text);
  document.body.append(t);
  setTimeout(() => t.remove(), 2200);
}
const buzz = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch { /* нет вибрации */ } };

// ---------- данные и синхронизация ----------
let uid = null, user = null;
const D = { notes: new Map(), history: new Map(), state: { day_marks: {}, timer: null } };
let pending = new Map();   // что ещё не дошло до облака: ключ -> {table, row}
let syncState = 'ok';
let loaded = false;

function persist() {
  if (!uid) return;
  ls.set('qn:data:' + uid, { notes: [...D.notes.values()], history: [...D.history.values()], state: D.state });
  ls.set('qn:pending:' + uid, [...pending.entries()]);
}
function restore() {
  const c = ls.get('qn:data:' + uid, null);
  if (c) {
    D.notes = new Map(c.notes.map(r => [r.id, r]));
    D.history = new Map(c.history.map(r => [r.id, r]));
    D.state = c.state || D.state;
    loaded = true;
  }
  pending = new Map(ls.get('qn:pending:' + uid, []));
}
async function fetchAll(table) {
  const out = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb.from(table).select('*').eq('deleted', false).range(from, from + 999);
    if (error) throw error;
    out.push(...data);
    if (data.length < 1000) return out;
  }
}
async function loadAll() {
  try {
    const [notes, history, st] = await Promise.all([fetchAll('notes'), fetchAll('history'),
      sb.from('state').select('*').maybeSingle()]);
    if (st.error) throw st.error;
    D.notes = new Map(notes.map(r => [r.id, r]));
    D.history = new Map(history.map(r => [r.id, r]));
    D.state = st.data || { day_marks: {}, timer: null };
    for (const { table, row } of pending.values()) applyLocal(table, row);  // свои неотправленные правки сверху
    loaded = true;
    persist();
    finalizeDays();
    setSync(pending.size ? 'wait' : 'ok');
  } catch (e) {
    console.warn(e);
    setSync('err');
  }
  render();
}
function applyLocal(table, row) {
  if (table === 'state') { D.state = { ...D.state, ...row }; return; }
  const m = table === 'notes' ? D.notes : D.history;
  if (row.deleted) m.delete(row.id); else m.set(row.id, row);
}
function put(table, row) {
  row = { ...row, user_id: uid };
  delete row.updated_at;
  applyLocal(table, row);
  const key = table === 'state' ? 'state:' + Object.keys(row).filter(k => k !== 'user_id').sort().join(',') : `${table}:${row.id}`;
  pending.set(key, { table, row });
  persist();
  setSync('wait');
  clearTimeout(put.t);
  put.t = setTimeout(flush, 300);
}
const putState = patch => put('state', patch);
let flushing = false;
async function flush() {
  if (flushing || !pending.size || !uid) return;
  if (!navigator.onLine) { setSync('wait'); return; }
  flushing = true;
  let failed = false;
  try {
    for (const [key, entry] of [...pending]) {
      const { error } = await sb.from(entry.table).upsert(entry.row,
        { onConflict: entry.table === 'state' ? 'user_id' : 'user_id,id' });
      if (error) { console.warn(error); failed = true; break; }
      if (pending.get(key) === entry) pending.delete(key);
    }
  } catch (e) { console.warn(e); failed = true; }
  flushing = false;
  persist();
  setSync(failed ? 'err' : pending.size ? 'wait' : 'ok');
  if (failed) { clearTimeout(flush.t); flush.t = setTimeout(flush, 8000); }
  else if (pending.size) flush();
}
function setSync(s) {
  syncState = s;
  const dot = $('.sync');
  if (dot) dot.className = 'sync ' + s;
}
let channel = null;
function subscribe() {
  if (channel) sb.removeChannel(channel);
  channel = sb.channel('qn-' + uid);
  for (const table of ['notes', 'history', 'state']) {
    channel.on('postgres_changes', { event: '*', schema: 'public', table, filter: `user_id=eq.${uid}` },
      p => onRemote(table, p.new));
  }
  channel.subscribe();
}
function onRemote(table, row) {
  if (!row || !Object.keys(row).length) return;
  if (table === 'state') {
    const keep = {};
    for (const k of pending.keys()) if (k.startsWith('state:')) for (const f of k.slice(6).split(',')) keep[f] = D.state[f];
    D.state = { ...row, ...keep };
  } else {
    if (pending.has(`${table}:${row.id}`)) return;  // своя правка ещё в пути — она главнее
    const m = table === 'notes' ? D.notes : D.history;
    if (row.deleted) m.delete(row.id); else m.set(row.id, row);
  }
  persist();
  renderSoon();
}
let renderT = null;
const renderSoon = () => { clearTimeout(renderT); renderT = setTimeout(render, 60); };

// ---------- дела ----------
const noteTitle = n => n.title || ((n.images || []).length ? 'Картинка' : 'Без названия');
const allNotes = () => [...D.notes.values()];
const dayNotes = day => allNotes().filter(n => n.day === day).sort((a, b) => a.sort - b.sort || (a.id < b.id ? -1 : 1));
const undoneOn = day => dayNotes(day).filter(n => !n.done);
function grouped(list) {
  // вложенные дела встают под своим родителем; вложенность одна
  const present = new Set(list.map(n => n.id));
  const par = {};
  for (const n of list) par[n.id] = n.parent && present.has(n.parent) && n.parent !== n.id ? n.parent : null;
  for (const id in par) if (par[id] && par[par[id]]) par[id] = null;
  const kids = {};
  for (const n of list) if (par[n.id]) (kids[par[n.id]] ||= []).push(n);
  const out = [];
  for (const n of list) {
    if (par[n.id]) continue;
    out.push({ n, kid: false });
    const ks = kids[n.id] || [];
    ks.forEach((k, i) => out.push({ n: k, kid: true, last: i === ks.length - 1 }));
  }
  return out;
}
function newId() {
  const d = new Date();
  return `${ymd(d).replace(/-/g, '')}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}-m${Math.random().toString(36).slice(2, 6)}.txt`;
}
const maxSort = () => allNotes().reduce((m, n) => Math.max(m, n.sort || 0), 0) + 1;
function addNote(title, day) {
  const n = { id: newId(), title: title.trim(), body: '', day, done: false, done_on: null, sort: maxSort(),
    parent: null, important: false, deleted: false, images: [] };
  put('notes', n);
  return n;
}
const upd = (n, patch) => { const r = { ...D.notes.get(n.id) || n, ...patch }; put('notes', r); return r; };
function toggleDone(n) {
  n = D.notes.get(n.id) || n;
  if (n.done) {
    upd(n, { done: false, done_on: null });
    const last = [...D.history.values()].filter(x => x.note === n.id).sort((a, b) => a.time < b.time ? -1 : 1).pop();
    if (last) put('history', { ...last, deleted: true });
    buzz(8);
  } else {
    upd(n, { done: true, done_on: today() });
    const now = new Date();
    put('history', { id: `${localNaive(now)}|${n.id}`, time: now.toISOString(), title: noteTitle(n), note: n.id, deleted: false });
    buzz(undoneOn(n.day).length ? 12 : [20, 60, 30]);
  }
  const t = getTimer();
  if (t && t.tasks && !t.done) {  // таймер с делами: всё отмечено — часы превращаются в галочку
    const all = !undoneOn(today()).length && dayNotes(today()).length > 0;
    if (!!t.all_done !== all) setTimer({ ...t, all_done: all });
  }
  render();
}
function deleteNote(n) {
  for (const k of allNotes()) if (k.parent === n.id) upd(k, { parent: null });  // дети становятся обычными
  put('notes', { ...n, deleted: true });
  render();
}
function moveGroup(n) {
  return [n.id, ...allNotes().filter(k => k.parent === n.id && !k.done && k.day === n.day).map(k => k.id)];
}
function moveNotes(ids, dst) {
  if (!ids.length) return;
  const moved = new Set(ids);
  for (const id of ids) {
    const n = D.notes.get(id);
    if (!n) continue;
    const patch = { day: dst };
    if (n.parent && !moved.has(n.parent)) patch.parent = null;  // родитель остался — дело становится обычным
    upd(n, patch);
  }
  for (const k of allNotes()) if (k.parent && moved.has(k.parent) && !moved.has(k.id)) upd(k, { parent: null });
  toast(`Перенесено: ${ids.length}`);
}
function finalizeDays() {
  // прошедшие дни получают итог: ✓ всё сделано или ✕ что-то осталось
  const marks = { ...(D.state.day_marks || {}) }, t = today();
  const byDay = {};
  for (const n of allNotes()) {
    if (n.day < t && diffDays(t, n.day) <= 60) (byDay[n.day] ||= []).push(n.done);
  }
  let changed = false;
  for (const [d, states] of Object.entries(byDay)) {
    if (!(d in marks)) { marks[d] = states.every(Boolean) ? 'done' : 'miss'; changed = true; }
  }
  if (changed) putState({ day_marks: marks });
}

// ---------- таймер ----------
const timerShared = () => ls.get('qn:timerShared', true);
const getTimer = () => timerShared() ? D.state.timer || null : ls.get('qn:timer', null);
function setTimer(t) {
  if (timerShared()) putState({ timer: t }); else ls.set('qn:timer', t);
  render();
}
const timerLeft = t => t.left != null ? t.left : Math.max(0, t.end - Date.now() / 1000);
function fmtClock(sec) {
  sec = Math.ceil(sec);
  const hh = Math.floor(sec / 3600), mm = Math.floor(sec % 3600 / 60), ss = sec % 60;
  return hh ? `${hh}:${pad(mm)}:${pad(ss)}` : `${pad(mm)}:${pad(ss)}`;
}
function startTimer(minutes, title, tasks) {
  const secs = Math.round(minutes * 60);
  setTimer({ title: title || (tasks ? 'Дела дня' : 'Таймер'), total: secs, end: Date.now() / 1000 + secs, left: null, done: false, tasks: !!tasks });
  timerUi.artT = 0;
  buzz(15);
}
function timerAction() {
  const t = getTimer();
  if (!t || t.all_done) return;
  if (t.done) setTimer({ ...t, done: false, total: 300, end: Date.now() / 1000 + 300, left: null });
  else if (t.left == null) setTimer({ ...t, left: Math.max(0, t.end - Date.now() / 1000) });
  else setTimer({ ...t, end: Date.now() / 1000 + t.left, left: null });
}
const timerUi = { artT: 0, art: null, quote: '' };
setInterval(() => {
  const t = getTimer();
  if (!t) return;
  if (!t.done && !t.all_done && timerLeft(t) <= 0 && t.left == null) {
    setTimer({ ...t, done: true });
    buzz([200, 100, 200]);
    return;
  }
  tickTimerViews(t);
}, 250);

// ---------- экран ----------
let tab = 'list', shift = 0, revealDay = null, openId = null;
let calMonth = null, calDay = null, query = '', searchOpen = false, skipped = false;
document.addEventListener('focusout', () => setTimeout(() => { if (skipped) render(); }, 50));

function render() {
  const app = $('#app');
  if (!user) return renderLogin(app);
  const scroll = $('main') ? $('main').scrollTop : 0;
  const focused = document.activeElement && document.activeElement.closest && document.activeElement.closest('main') ? document.activeElement : null;
  if (focused && focused.matches('input, textarea')) { skipped = true; tickTimerViews(getTimer()); return; }  // не мешаем печатать
  skipped = false;
  app.replaceChildren(renderTop(), renderMain(), renderTabs());
  $('main').scrollTop = scroll;
  if (openId) refreshNotePage();
}
function renderTop() {
  const t = getTimer();
  const view = addDays(today(), shift);
  let title, sub, cls = '';
  if (tab === 'list') {
    const [a, b] = dayLabel(view);
    title = shift ? `${a}, ${b}` : 'Сегодня';
    sub = shift ? null : `${WEEKDAYS[(parseDay(view).getDay() + 6) % 7]}, ${b}`;
    cls = shift ? 'shifted' : '';
  } else if (tab === 'history') { title = 'История'; } else { title = 'Таймер'; }
  return h('header', { class: 'top' },
    tab === 'list' ? h('button', { class: 'icon-btn', 'aria-label': 'День назад', onclick: () => { shift--; revealDay = null; render(); } }, icon('left')) : null,
    h('div', { class: 'title' }, h('h1', { class: cls }, title), sub ? h('div', { class: 'sub' }, sub) : null),
    tab === 'list' ? h('button', { class: 'icon-btn', 'aria-label': 'День вперёд', onclick: () => { shift++; revealDay = null; render(); } }, icon('right')) : null,
    t && tab !== 'timer' ? h('button', { class: 'pill', id: 'tpill', onclick: () => go('timer') }, t.all_done ? '✓' : t.done ? 'Время!' : fmtClock(timerLeft(t))) : null,
    h('span', { class: 'sync ' + syncState, title: 'Синхронизация' }),
    h('button', { onclick: openMenu, 'aria-label': 'Меню' },
      user.user_metadata?.avatar_url ? h('img', { class: 'avatar', src: user.user_metadata.avatar_url, referrerpolicy: 'no-referrer', alt: '' }) : h('span', { class: 'avatar' })));
}
function renderTabs() {
  const n = undoneOn(today()).length;
  const b = (id, ic, label, badge) => h('button', { class: tab === id ? 'on' : '', onclick: () => go(id) },
    icon(ic), label, badge ? h('span', { class: 'badge' }, String(badge)) : null);
  return h('nav', { class: 'tabs' }, b('list', 'list', 'Дела', tab !== 'list' && n), b('history', 'cal', 'История'), b('timer', 'timer', 'Таймер'));
}
function go(id) {
  if (id === 'list' && tab === 'list') { shift = 0; revealDay = null; }
  if (id === 'history' && tab !== 'history') { calMonth = null; calDay = null; query = ''; searchOpen = false; }
  tab = id;
  render();
  $('main').scrollTop = 0;
}
function renderMain() {
  const main = h('main');
  if (!loaded) { main.append(h('div', { class: 'empty-note', style: 'padding:30px 20px' }, 'Загружаю дела…')); return main; }
  if (tab === 'list') renderList(main);
  else if (tab === 'history') renderHistory(main);
  else renderTimer(main);
  return main;
}

// --- список дня ---
function renderList(main) {
  const view = addDays(today(), shift);
  const notes = dayNotes(view);
  const rows = grouped(notes);
  // новый день: остались дела с прошлых дней — предложить перенести
  if (!shift && ls.get('qn:carryDay', '') !== today()) {
    for (let back = 1; back <= 7; back++) {
      const src = addDays(today(), -back), left = undoneOn(src);
      if (!left.length) continue;
      const when = back === 1 ? 'Вчера' : dayLabel(src)[1];
      const close = () => { ls.set('qn:carryDay', today()); render(); };
      main.append(h('div', { class: 'banner' },
        h('b', null, 'Новый день! '), `${when} осталось ${left.length} ${plural(left.length, 'несделанное дело', 'несделанных дела', 'несделанных дел')}: `,
        left.slice(0, 3).map(noteTitle).join(', ') + (left.length > 3 ? '…' : ''),
        h('div', { class: 'row-btns' },
          h('button', { class: 'btn ghost small', onclick: close }, 'Оставить'),
          h('button', { class: 'btn accent small', onclick: () => { moveNotes(left.map(n => n.id), today()); close(); } }, 'Перенести на сегодня'))));
      break;
    }
  }
  const left = notes.filter(n => !n.done);
  if (shift && left.length) {
    main.append(h('button', { class: 'link', onclick: () => { moveNotes(left.map(n => n.id), today()); shift = 0; render(); } },
      `→ перенести ${left.length} на сегодня`));
  }
  const allDone = notes.length > 0 && !left.length;
  if (allDone && revealDay !== view) {
    main.append(h('div', { class: 'mascot' }, h('img', { src: art('day_done'), alt: '' })),
      h('div', { class: 'done-card' }, h('div', { class: 'ok' }, '✓'), h('h3', null, 'День выполнен'),
        h('p', null, pick(CAPTIONS_ALL_DONE, ordinal(view) * 7)),
        h('button', { class: 'btn ghost small', onclick: () => { revealDay = view; render(); } }, 'Посмотреть задачи')));
    return;
  }
  const ul = h('ul', { class: 'list' });
  for (const { n, kid, last } of rows) {
    const cls = ['row', kid && 'kid', last && 'last', n.done && 'done', n.important && !n.done && 'imp'].filter(Boolean).join(' ');
    ul.append(h('li', { class: cls, 'data-id': n.id },
      h('button', { class: 'chk' + (n.done ? ' on' : ''), 'aria-label': 'Готово', onclick: e => { e.stopPropagation(); toggleDone(n); } }, n.done ? icon('check') : null),
      h('span', { class: 't', onclick: () => openNote(n.id) }, noteTitle(n)),
      n.important && !n.done ? h('span', { class: 'bang' }, '!') : null,
      h('button', { class: 'more', 'aria-label': 'Действия', onclick: () => noteMenu(n) }, icon('more'))));
  }
  main.append(ul);
  if (window.Sortable && rows.length > 1) {
    Sortable.create(ul, { delay: 220, delayOnTouchOnly: true, animation: 150, onEnd: () => {
      const ids = [...ul.children].map(li => li.dataset.id);
      const sorts = ids.map(id => D.notes.get(id).sort).sort((a, b) => a - b);
      ids.forEach((id, i) => { const n = D.notes.get(id); if (n.sort !== sorts[i]) upd(n, { sort: sorts[i] }); });
      render();
    } });
  }
  const inp = h('input', { placeholder: 'Новая заметка', enterkeyhint: 'done', onkeydown: e => {
    if (e.key === 'Enter' && inp.value.trim()) { addNote(inp.value, view); inp.value = ''; buzz(8); inp.blur(); render(); setTimeout(() => $('.add input')?.focus(), 30); }
  }, onblur: () => { if (inp.value.trim()) { addNote(inp.value, view); render(); } } });
  main.append(h('div', { class: 'add' }, h('span', { class: 'plus' }, icon('plus')), inp));
  if (!notes.length || allDone) {
    const caps = allDone ? CAPTIONS_ALL_DONE : CAPTIONS_EMPTY;
    main.append(h('div', { class: 'mascot' }, h('img', { src: art(pick(ANGELS, ordinal(view))), alt: '' }),
      h('div', { class: 'cap' }, pick(caps, ordinal(view) * 7))));
  }
}
function noteMenu(n) {
  n = D.notes.get(n.id) || n;
  const view = addDays(today(), shift);
  const vis = grouped(dayNotes(view));
  const i = vis.findIndex(r => r.n.id === n.id);
  const above = vis.slice(0, i).reverse().find(r => !r.kid);
  const hasKids = allNotes().some(k => k.parent === n.id);
  const items = [
    [n.important ? 'Не важное' : 'Важное', 'bang', () => upd(n, { important: !n.important })],
    n.parent ? ['Сделать обычным', 'unnest', () => upd(n, { parent: null })]
      : above && !hasKids ? [`Вложить в «${noteTitle(above.n)}»`, 'nest', () => upd(n, { parent: above.n.id })] : null,
    ['Перенести…', 'move', () => pickDay(d => moveNotes(moveGroup(n), d))],
    ['Удалить', 'trash', () => deleteNote(n), 'red'],
  ];
  sheet(noteTitle(n), items);
}

// --- заметка ---
function openNote(id) {
  openId = id;
  const n = D.notes.get(id);
  if (!n) return;
  const page = h('div', { class: 'page', id: 'notepage' });
  const back = () => { flushNote(); openId = null; page.remove(); history.state?.note && history.back(); render(); };
  page.back = back;
  const title = h('textarea', { class: 'note-title', rows: 1, placeholder: 'Название', enterkeyhint: 'next' });
  const body = h('textarea', { class: 'note-body', placeholder: 'Описание, мысли, ссылки…' });
  title.value = n.title; body.value = n.body;
  const grow = el => { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; };
  title.addEventListener('input', () => { grow(title); queueNote(); });
  title.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); body.focus(); } });
  body.addEventListener('input', queueNote);
  const chk = h('button', { class: 'chk', onclick: () => { flushNote(); toggleDone(D.notes.get(id)); } });
  const meta = h('div', { class: 'note-meta' });
  const gallery = h('div', { class: 'gallery' });
  page.append(
    h('div', { class: 'bar' }, h('button', { class: 'icon-btn', onclick: back, 'aria-label': 'Назад' }, icon('left')),
      h('div', { class: 'grow' }),
      h('button', { class: 'icon-btn', 'aria-label': 'Действия', onclick: () => { flushNote(); noteMenu(D.notes.get(id)); } }, icon('more'))),
    h('div', { class: 'body' }, h('div', { class: 'note-head' }, chk, title), meta, gallery, body));
  page.parts = { title, body, chk, meta, gallery };
  document.body.append(page);
  history.pushState({ note: id }, '');
  refreshNotePage(true);
  requestAnimationFrame(() => grow(title));
  if (!n.title) title.focus();
}
function queueNote() {
  clearTimeout(queueNote.t);
  queueNote.t = setTimeout(flushNote, 600);
}
function flushNote() {
  clearTimeout(queueNote.t);
  const page = $('#notepage');
  const n = openId && D.notes.get(openId);
  if (!page || !n) return;
  const { title, body } = page.parts;
  const t = title.value.replace(/\s*\n\s*/g, ' ').trim();
  if (t !== n.title || body.value !== n.body) upd(n, { title: t, body: body.value });
}
function refreshNotePage(first) {
  const page = $('#notepage');
  if (!page) return;
  const n = D.notes.get(openId);
  if (!n) { page.remove(); openId = null; return; }
  const { title, body, chk, meta, gallery } = page.parts;
  if (!first && document.activeElement !== title && n.title !== title.value) title.value = n.title;
  if (!first && document.activeElement !== body && n.body !== body.value) body.value = n.body;
  chk.className = 'chk' + (n.done ? ' on' : '');
  chk.innerHTML = n.done ? ICON.check : '';
  title.classList.toggle('done', n.done);
  body.disabled = n.done;  // выполненное не меняем случайно, пока не снимешь галочку
  const [a, b] = dayLabel(n.day);
  meta.replaceChildren(...[h('span', null, `${a} · ${b}`),
    n.important ? h('span', { class: 'imp-on' }, '! важное') : null,
    n.parent && D.notes.get(n.parent) ? h('span', null, `в «${noteTitle(D.notes.get(n.parent))}»`) : null].filter(Boolean));
  renderGallery(gallery, n);
}
const urlCache = new Map();
async function renderGallery(box, n) {
  const names = n.images || [];
  const key = names.join('|');
  if (box.dataset.key === key) return;
  box.dataset.key = key;
  const need = names.filter(x => !urlCache.has(x));
  if (need.length) {
    const { data } = await sb.storage.from('images').createSignedUrls(need.map(x => `${uid}/${x}`), 3600);
    (data || []).forEach((d, i) => d.signedUrl && urlCache.set(need[i], d.signedUrl));
  }
  const file = h('input', { type: 'file', accept: 'image/*', multiple: true, style: 'display:none', onchange: () => addImages(n.id, [...file.files]) });
  box.replaceChildren(...names.map((x, i) => urlCache.has(x)
    ? h('img', { class: 'th', src: urlCache.get(x), alt: '', onclick: () => viewImage(n.id, x) })
    : h('div', { class: 'th' })),
  h('button', { class: 'addimg', 'aria-label': 'Добавить картинку', onclick: () => file.click() }, icon('image')), file);
}
async function shrink(file) {
  // фото с телефона бывают по 5 МБ: ужимаем до 2000 px
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    if (k === 1 && file.size < 1.5e6) return { blob: file, ext: (file.name.split('.').pop() || 'jpg').toLowerCase() };
    const c = h('canvas');
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.86));
    return { blob, ext: 'jpg' };
  } catch { return { blob: file, ext: 'jpg' }; }
}
async function addImages(id, files) {
  for (const f of files) {
    toast('Загружаю картинку…');
    const { blob, ext } = await shrink(f);
    const name = `${Date.now()}-m${Math.random().toString(36).slice(2, 6)}.${ext}`;
    const { error } = await sb.storage.from('images').upload(`${uid}/${name}`, blob, { contentType: blob.type || 'image/jpeg' });
    if (error) { toast('Не загрузилось: нет сети?'); console.warn(error); return; }
    const n = D.notes.get(id);
    upd(n, { images: [...(n.images || []), name] });
  }
  refreshNotePage();
}
function viewImage(id, name) {
  const v = h('div', { class: 'viewer' }, h('img', { src: urlCache.get(name), alt: '' }),
    h('button', { class: 'icon-btn close', onclick: () => v.remove() }, icon('close')),
    h('button', { class: 'btn ghost small del', onclick: () => confirmBox('Удалить картинку?', 'Удалить', () => {
      const n = D.notes.get(id);
      upd(n, { images: (n.images || []).filter(x => x !== name) });
      sb.storage.from('images').remove([`${uid}/${name}`]);
      v.remove(); refreshNotePage();
    }) }, 'Удалить'));
  document.body.append(v);
}

// --- история и календарь ---
function historyDays() {
  const days = {};
  for (const it of D.history.values()) {
    const dt = new Date(it.time);
    (days[ymd(dt)] ||= []).push({ dt, title: it.title, note: it.note });
  }
  return days;
}
function plansByDay() {
  const days = {};
  for (const n of allNotes()) if (!n.done) (days[n.day] ||= []).push(n);
  for (const k in days) days[k].sort((a, b) => a.sort - b.sort);
  return days;
}
function renderHistory(main) {
  const t = today();
  calMonth ||= [parseDay(t).getFullYear(), parseDay(t).getMonth()];
  const days = historyDays(), plans = plansByDay(), marks = D.state.day_marks || {};
  const sinp = h('input', { placeholder: 'Поиск по делам', value: query, type: 'search', oninput: () => { query = sinp.value; renderSoonHist(); } });
  main.append(h('div', { class: 'search' }, icon('search'), sinp));
  const box = h('div', { id: 'histbox' });
  main.append(box);
  fillHistory(box, days, plans, marks);
}
let histT = null;
function renderSoonHist() {
  clearTimeout(histT);
  histT = setTimeout(() => {
    const box = $('#histbox');
    if (box) fillHistory(box, historyDays(), plansByDay(), D.state.day_marks || {});
  }, 150);
}
function fillHistory(box, days, plans, marks) {
  box.replaceChildren();
  const q = query.trim().toLowerCase();
  if (q) {
    const found = allNotes().filter(n => (noteTitle(n) + '\n' + n.body).toLowerCase().includes(q)).sort((a, b) => a.day < b.day ? 1 : -1);
    const hist = h('div', { class: 'hist' }, h('div', { class: 'sum' }, `Найдено: ${found.length}`));
    for (const n of found) {
      const d = parseDay(n.day);
      hist.append(hrow(noteTitle(n), n.done, `${d.getDate()} ${MONTHS[d.getMonth()]}`, '', () => openNote(n.id)));
    }
    box.append(hist);
    return;
  }
  const [y, m] = calMonth;
  const shiftMonth = s => { let mm = m + s, yy = y; if (mm < 0) { mm = 11; yy--; } if (mm > 11) { mm = 0; yy++; } calMonth = [yy, mm]; renderSoonHist(); };
  box.append(h('div', { class: 'cal-head' }, h('b', null, `${MONTHS_NOM[m]} ${y}`),
    h('button', { class: 'icon-btn', onclick: () => shiftMonth(-1) }, icon('left')),
    h('button', { class: 'icon-btn', onclick: () => shiftMonth(1) }, icon('right'))));
  const cal = h('div', { class: 'cal' }, WD_SHORT.map(w => h('div', { class: 'wd' }, w)));
  const first = (new Date(y, m, 1).getDay() + 6) % 7, nd = new Date(y, m + 1, 0).getDate();
  for (let i = 0; i < first; i++) cal.append(h('div'));
  const t = today();
  for (let d = 1; d <= nd; d++) {
    const s = ymd(new Date(y, m, d));
    const has = !!days[s], plan = !!(plans[s] && plans[s].length);
    const mark = s < t ? marks[s] : null;
    const cls = ['d', (has || plan) && 'has', s > t && 'future', s === t && 'today', s === calDay && 'sel'].filter(Boolean).join(' ');
    cal.append(h('button', { class: cls, onclick: () => { calDay = calDay === s ? null : s; renderSoonHist(); } }, String(d),
      h('span', { class: 'dots' }, has ? h('i') : null, plan ? h('i', { class: 'plan' }) : null),
      mark ? h('span', { class: 'mark' + (mark === 'miss' ? ' miss' : '') }, mark === 'done' ? '✓' : '✕') : null));
  }
  box.append(cal);
  const hist = h('div', { class: 'hist' });
  box.append(hist);
  if (!calDay) {
    const inMonth = s => { const d = parseDay(s); return d.getFullYear() === y && d.getMonth() === m; };
    const done = Object.entries(days).filter(([s]) => inMonth(s)).reduce((a, [, v]) => a + v.length, 0);
    const ahead = Object.entries(plans).filter(([s]) => inMonth(s) && s >= t).reduce((a, [, v]) => a + v.length, 0);
    const missed = Object.entries(plans).filter(([s]) => inMonth(s) && s < t).reduce((a, [, v]) => a + v.length, 0);
    const parts = [`В ${MONTHS_PREP[m]} сделано ${done}`];
    if (ahead) parts.push(`впереди ${ahead} ${plural(ahead, 'план', 'плана', 'планов')}`);
    if (missed) parts.push(`не сделано ${missed}`);
    hist.append(h('div', { class: 'sum' }, parts.join('  ·  ')));
    if (D.history.size || Object.keys(plans).length) {
      hist.append(h('button', { class: 'link', style: 'padding-left:0;color:var(--dim)', onclick: () => askClear(null) }, 'Очистить всю историю'));
    }
    return;
  }
  const d = calDay;
  const [a, b] = dayLabel(d);
  const dp = plans[d] || [], dh = (days[d] || []).sort((p, q) => p.dt - q.dt);
  hist.append(h('div', { class: 'dhead' }, h('b', null, `${a} · ${b}`),
    dp.length ? h('button', { class: 'icon-btn', 'aria-label': 'Перенести', onclick: () => pickDay(dst => moveNotes(dp.map(n => n.id), dst)) }, icon('move')) : null,
    dp.length || dh.length ? h('button', { class: 'icon-btn', 'aria-label': 'Очистить день', onclick: () => askClear(d) }, icon('trash')) : null));
  for (const n of dp) {
    hist.append(hrow(noteTitle(n), false, d < t ? 'не сделано' : '', 'late', () => openNote(n.id), () => toggleDone(n), () => deleteNote(n)));
  }
  for (const it of dh) {
    const opens = it.note && D.notes.has(it.note);
    hist.append(hrow(it.title, true, `${pad(it.dt.getHours())}:${pad(it.dt.getMinutes())}`, '', opens ? () => openNote(it.note) : null));
  }
  if (d > t) {
    const inp = h('input', { placeholder: 'Запланировать на этот день…', enterkeyhint: 'done', onkeydown: e => {
      if (e.key === 'Enter' && inp.value.trim()) { addNote(inp.value, d); inp.value = ''; renderSoonHist(); setTimeout(() => $('#planinp')?.focus(), 200); }
    }, id: 'planinp' });
    hist.append(h('div', { class: 'add', style: 'padding:0' }, h('span', { class: 'plus' }, icon('plus')), inp));
  } else if (!dp.length && !dh.length) {
    hist.append(h('div', { class: 'empty-note' }, 'В этот день ничего не отмечено.'));
  }
}
function hrow(title, done, right, rcls, onOpen, onBox, onX) {
  return h('div', { class: 'hrow' + (done ? ' done' : '') },
    h('button', { class: 'chk' + (done ? ' on' : ''), onclick: onBox || null, disabled: !onBox }, done ? icon('check') : null),
    h('span', { class: 't', onclick: onOpen || null }, title),
    right ? h('span', { class: 'r ' + rcls }, right) : null,
    onX ? h('button', { class: 'x', 'aria-label': 'Удалить', onclick: onX }, icon('close')) : null);
}
function askClear(d) {
  const msg = d == null ? 'Очистить всю историю дел и будущие планы?' : `Очистить историю и планы за ${dayLabel(d)[1]}?`;
  confirmBox(msg + '\nСегодняшний список это не тронет.', 'Очистить', () => {
    for (const it of [...D.history.values()]) if (d == null || ymd(new Date(it.time)) === d) put('history', { ...it, deleted: true });
    const view = addDays(today(), shift);
    for (const n of allNotes()) {
      if (n.day === today() || n.day === view) continue;
      const hit = n.done ? (d == null || n.done_on === d) : (d == null || n.day === d);
      if (hit) put('notes', { ...n, deleted: true });
    }
    render();
  });
}

// --- таймер ---
function renderTimer(main) {
  const t = getTimer();
  const box = h('div', { class: 'timer' });
  main.append(box);
  if (!t) {
    let minutes = ls.get('qn:lastMin', 25), tasks = ls.get('qn:lastTasks', false);
    const imgEl = h('img', { class: 'art', src: art('focus'), alt: '' });
    const chips = h('div', { class: 'chips' });
    const custom = h('input', { class: 'field', type: 'number', inputmode: 'numeric', min: 1, max: 600, placeholder: 'Своё время, минут' });
    const title = h('input', { class: 'field', placeholder: 'На что таймер? (необязательно)' });
    const drawChips = () => chips.replaceChildren(...[5, 15, 25, 45, 60].map(m => h('button', { class: 'chip' + (m === minutes && !custom.value ? ' on' : ''), onclick: () => { minutes = m; custom.value = ''; drawChips(); } }, `${m} мин`)));
    custom.addEventListener('input', drawChips);
    drawChips();
    const tg = toggleRow('Дела дня', 'Под таймером — список дел на сегодня', tasks, v => { tasks = v; });
    box.append(imgEl, chips, custom, title, tg, sharedToggle(),
      h('button', { class: 'btn accent', style: 'margin-top:14px;min-width:200px', onclick: () => {
        const m = Number(custom.value) || minutes;
        if (!(m > 0)) return;
        ls.set('qn:lastMin', m); ls.set('qn:lastTasks', tasks);
        custom.blur(); title.blur();
        startTimer(m, title.value.trim(), tasks);
      } }, 'Старт'));
    return;
  }
  if (!timerUi.art || Date.now() - timerUi.artT > 40000) {
    timerUi.art = rnd(TIMER_ART); timerUi.quote = rnd(TIMER_QUOTES); timerUi.artT = Date.now();
  }
  const won = !undoneOn(today()).length;
  let artName = timerUi.art, quote = timerUi.quote;
  if (t.all_done) { artName = 'win'; quote = pick(TIMER_ALL_DONE, Math.floor(t.end)); }
  else if (t.done) { artName = won ? 'win' : 'lose'; quote = won ? pick(TIMER_OUT_FREE, Math.floor(t.end)) : pick(TIMER_OUT_LEFT, Math.floor(t.end)); }
  const left = timerLeft(t);
  box.append(
    h('img', { class: 'art', id: 'tart', src: art(artName), alt: '' }),
    h('div', { class: 'quote', id: 'tquote' }, quote),
    h('div', { class: 'clock' + (t.left != null ? ' paused' : '') + (t.done || t.all_done ? ' out' : ''), id: 'tclock' }, t.all_done ? '✓' : t.done ? 'Время вышло' : fmtClock(left)),
    h('div', { class: 'ttl' }, t.all_done ? 'Всё сделано' : t.title),
    h('div', { class: 'progress' }, h('i', { id: 'tbar', style: `width:${t.all_done ? 100 : t.total ? left / t.total * 100 : 0}%` })),
    h('div', { class: 'acts' },
      !t.all_done ? h('button', { class: 'btn accent', id: 'tact', onclick: timerAction }, t.done ? '+5 минут' : t.left != null ? 'Продолжить' : 'Пауза') : null,
      h('button', { class: 'btn ghost', onclick: () => (t.done || t.all_done) ? setTimer(null) : confirmBox('Остановить таймер?', 'Остановить', () => setTimer(null)) }, t.done || t.all_done ? 'Готово' : 'Стоп')));
  if (t.tasks) {
    const list = h('ul', { class: 'list ttasks' });
    for (const { n, kid, last } of grouped(dayNotes(today()))) {
      list.append(h('li', { class: ['row', kid && 'kid', last && 'last', n.done && 'done', n.important && !n.done && 'imp'].filter(Boolean).join(' ') },
        h('button', { class: 'chk' + (n.done ? ' on' : ''), onclick: () => toggleDone(n) }, n.done ? icon('check') : null),
        h('span', { class: 't', onclick: () => openNote(n.id) }, noteTitle(n))));
    }
    box.append(list);
  }
  box.append(sharedToggle());
}
function tickTimerViews(t) {
  const pill = $('#tpill');
  if (pill && t) pill.textContent = t.all_done ? '✓' : t.done ? 'Время!' : fmtClock(timerLeft(t));
  const clock = $('#tclock');
  if (!clock || !t || t.done || t.all_done) return;
  clock.textContent = fmtClock(timerLeft(t));
  const bar = $('#tbar');
  if (bar && t.total) bar.style.width = `${timerLeft(t) / t.total * 100}%`;
  if (tab === 'timer' && Date.now() - timerUi.artT > 40000 && t.left == null) {
    timerUi.artT = Date.now();
    const img = $('#tart'), q = $('#tquote');
    if (img) { img.style.opacity = 0; q.style.opacity = 0; setTimeout(() => { timerUi.art = rnd(TIMER_ART); timerUi.quote = rnd(TIMER_QUOTES); img.src = art(timerUi.art); q.textContent = timerUi.quote; img.style.opacity = 1; q.style.opacity = 1; }, 600); }
  }
}
function toggleRow(label, desc, on, onChange) {
  const b = h('button', { class: 'toggle' + (on ? ' on' : '') }, h('span', { class: 'sw' }), h('span', null, label, desc ? h('small', null, desc) : null));
  b.addEventListener('click', () => { on = !on; b.classList.toggle('on', on); onChange(on); });
  return b;
}
const sharedToggle = () => toggleRow('Общий таймер', 'Один таймер на ПК и телефоне', timerShared(), v => {
  const cur = getTimer();
  ls.set('qn:timerShared', v);
  if (v && cur && !D.state.timer) putState({ timer: cur });   // свой таймер становится общим
  if (!v && D.state.timer) ls.set('qn:timer', D.state.timer); // и наоборот: забираем общий себе
  render();
});

// ---------- листы, диалоги, выбор дня ----------
function closeLayer() { $('#layer').replaceChildren(); }
function sheet(head, items) {
  const layer = $('#layer');
  const close = () => { closeLayer(); };
  layer.replaceChildren(h('div', { class: 'shade', onclick: close }),
    h('div', { class: 'sheet' }, h('div', { class: 'grip' }), head ? h('div', { class: 'head' }, head) : null,
      items.filter(Boolean).map(([label, ic, fn, cls]) => h('button', { class: 'item ' + (cls || ''), onclick: () => { close(); fn(); render(); } }, icon(ic), label))));
}
function confirmBox(text, ok, fn) {
  const layer = $('#layer');
  layer.replaceChildren(h('div', { class: 'shade', onclick: closeLayer }),
    h('div', { class: 'dialog' }, h('p', null, text), h('div', { class: 'row-btns' },
      h('button', { class: 'btn ghost', onclick: closeLayer }, 'Отмена'),
      h('button', { class: 'btn danger', onclick: () => { closeLayer(); fn(); } }, ok))));
}
function pickDay(fn) {
  const t = today();
  const date = h('input', { type: 'date', class: 'field', value: addDays(t, 1), style: 'margin:6px 20px;width:calc(100% - 40px);color-scheme:dark' });
  const layer = $('#layer');
  const done = d => { closeLayer(); fn(d); render(); };
  layer.replaceChildren(h('div', { class: 'shade', onclick: closeLayer }),
    h('div', { class: 'sheet' }, h('div', { class: 'grip' }), h('div', { class: 'head' }, 'Перенести на…'),
      h('button', { class: 'item', onclick: () => done(t) }, icon('move'), 'Сегодня'),
      h('button', { class: 'item', onclick: () => done(addDays(t, 1)) }, icon('move'), 'Завтра'),
      h('button', { class: 'item', onclick: () => done(addDays(t, 7)) }, icon('move'), 'Через неделю'),
      date, h('div', { style: 'padding:6px 20px 4px;text-align:right' }, h('button', { class: 'btn accent small', onclick: () => date.value && done(date.value) }, 'На эту дату'))));
}
function openMenu() {
  sheet(user.email, [
    ['Обновить', 'move', () => loadAll()],
    ['Выйти', 'door', () => confirmBox('Выйти из аккаунта на этом телефоне?', 'Выйти', async () => { await sb.auth.signOut(); })],
  ]);
}

// ---------- вход ----------
function renderLogin(app) {
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  app.replaceChildren(h('div', { class: 'login' },
    h('img', { class: 'logo', src: 'icon-192.png', alt: '' }),
    h('h1', null, 'QuickNotes'),
    h('p', null, 'Дела с компа — в телефоне. И обратно.'),
    h('button', { class: 'gbtn', onclick: login },
      h('span', { html: '<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.5z"/></svg>', style: 'display:flex' }),
      'Войти через Google'),
    !standalone ? h('div', { class: 'hint' }, ios ? 'Совет: в Safari нажми «Поделиться» → «На экран „Домой“», и QuickNotes откроется как приложение.'
      : 'Совет: в меню браузера выбери «Добавить на главный экран», и QuickNotes откроется как приложение.') : null));
}
async function login() {
  const { error } = await sb.auth.signInWithOAuth({ provider: 'google',
    options: { redirectTo: location.origin + location.pathname, queryParams: { prompt: 'select_account' } } });
  if (error) toast('Не вышло: ' + error.message);
}

// ---------- запуск ----------
async function setUser(u) {
  const changed = (u && u.id) !== uid;
  user = u; uid = u ? u.id : null;
  if (!u) { if (channel) sb.removeChannel(channel); channel = null; loaded = false; render(); return; }
  if (!changed) return;
  restore();
  render();
  subscribe();
  await loadAll();
  flush();
}
sb.auth.onAuthStateChange((_ev, session) => { setTimeout(() => setUser(session ? session.user : null), 0); });
sb.auth.getSession().then(({ data }) => { if (!data.session) render(); });
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && uid) { loadAll(); flush(); subscribe(); }
});
addEventListener('online', () => { flush(); if (uid) loadAll(); });
addEventListener('popstate', () => { const p = $('#notepage'); if (p) { flushNote(); openId = null; p.remove(); render(); } });
addEventListener('pagehide', flushNote);
let lastDay = today();
setInterval(() => { if (uid && today() !== lastDay) { lastDay = today(); finalizeDays(); render(); } }, 60000);
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js');
render();
