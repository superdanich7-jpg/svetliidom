/* ============================================================
   СВЕТЛЫЙ ДОМ — логика страницы
   Каталог, фильтры, слайдеры, модалка, FAQ, меню, анимации.
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const fmt = (n) => n.toLocaleString("ru-RU");

  const ICONS = {
    square: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h5V4"/></svg>',
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 20v-2h18v2"/><path d="M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/></svg>',
    door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="1.5"/><circle cx="14.5" cy="12" r="1" fill="currentColor" stroke="none"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 10h14"/><circle cx="9" cy="13.5" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="13.5" r="1" fill="currentColor" stroke="none"/><path d="m8 20-1.5 1.5M16 20l1.5 1.5M9 17l-2 3M15 17l2 3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 6-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.5 6 6 6-6 6"/></svg>'
  };

  const bedsLabel = (beds) => {
    const n = String(beds);
    if (n.includes("+")) {
      const parts = n.split("+").map(Number);
      return `${parts[0]}–${parts[0] + parts[1]} гостей`;
    }
    return `${Math.min(+n, 2)} гостей`;
  };

  const photoUrl = (ap, i) => `images/apartments/${ap.slug}/${i}.jpg`;

  /* ---------- Каталог ---------- */

  const cardsRoot = $("#cards");

  function amenityChips(list) {
    const max = 3;
    const shown = list.slice(0, max);
    const rest = list.length - max;
    return `<div class="card__amenities">` +
      shown.map(a => `<span class="mini">${a}</span>`).join("") +
      (rest > 0 ? `<span class="mini" title="${list.slice(max).join(", ")}">ещё ${rest}</span>` : "") +
      `</div>`;
  }

  function cardHTML(ap) {
    const slides = Array.from({ length: ap.photos }, (_, i) =>
      `<img src="${photoUrl(ap, i + 1)}" alt="Апартаменты «${ap.name}» — фото ${i + 1}" loading="lazy">`).join("");

    return `
    <article class="card reveal" data-loc="${ap.loc}" data-slug="${ap.slug}">
      <div class="slider" data-slider>
        <div class="slider__track">${slides}</div>
        ${ap.tag ? `<span class="slider__tag tag tag--accent">${ap.tag}</span>` : ""}
        <div class="slider__nav">
          <button class="slider__btn" data-slide="-1" aria-label="Предыдущее фото">${ICONS.left}</button>
          <button class="slider__btn" data-slide="1" aria-label="Следующее фото">${ICONS.right}</button>
        </div>
        <div class="slider__dots" role="presentation">
          ${Array.from({ length: ap.photos }, (_, i) => `<span class="slider__dot${i === 0 ? " is-active" : ""}"></span>`).join("")}
        </div>
      </div>
      <div class="card__body">
        <div class="card__top">
          <h3 class="card__name">Апартаменты «${ap.name}»</h3>
        </div>
        <span class="card__addr">${ICONS.pin}${ap.addr} · м. ${ap.metro}</span>
        <div class="card__params">
          <span>${ICONS.square}${ap.size} м²</span>
          <span>${ICONS.door}${ap.rooms} комн.</span>
          <span>${ICONS.bed}${bedsLabel(ap.beds)}</span>
        </div>
        ${amenityChips(ap.amenities)}
        <div class="card__foot">
          <div class="card__price">
            <small>за сутки</small>
            <b>от ${fmt(ap.price)} ₽</b>
          </div>
          <div class="card__actions">
            <button class="btn btn--ghost" data-details="${ap.slug}">Подробнее</button>
            <a href="#booking" class="btn btn--primary" data-book="${ap.name}">Забронировать</a>
          </div>
        </div>
      </div>
    </article>`;
  }

  if (cardsRoot) {
    cardsRoot.innerHTML = APARTMENTS.map(cardHTML).join("");
    // счётчики фильтров
    $$("[data-count]").forEach(el => {
      const f = el.dataset.count;
      el.textContent = f === "all" ? APARTMENTS.length : APARTMENTS.filter(a => a.loc === f).length;
    });
  }

  /* Фильтры: локация + вместимость по гостям */

  const filtersRoot = $("#filters");
  let currentLoc = "all";
  let guestsFilter = null; // выбранное число гостей для фильтра каталога

  const capacity = (ap) => String(ap.beds).split("+").reduce((s, n) => s + Number(n), 0);
  const MAX_GUESTS = Math.max(...APARTMENTS.map(capacity));

  let statusEl = null;

  function ensureStatus() {
    if (statusEl || !filtersRoot) return;
    statusEl = document.createElement("div");
    statusEl.className = "guests-status";
    statusEl.hidden = true;
    filtersRoot.after(statusEl);
    statusEl.addEventListener("click", (e) => {
      if (e.target.closest("[data-reset-guests]")) {
        guestsFilter = null;
        applyFilters();
      }
    });
  }

  function applyFilters() {
    ensureStatus();
    let shown = 0;
    $$(".card", cardsRoot).forEach(card => {
      const ap = APARTMENTS.find(a => a.slug === card.dataset.slug);
      const locOk = currentLoc === "all" || ap.loc === currentLoc;
      const capOk = !guestsFilter || capacity(ap) >= guestsFilter;
      const show = locOk && capOk;
      card.classList.toggle("is-hidden", !show);
      if (show) { card.classList.add("is-visible"); shown++; }
    });
    if (guestsFilter && statusEl) {
      const dateTxt = (typeof checkin !== "undefined" && checkin && checkout)
        ? ` с ${fmtDay(checkin)} по ${fmtDay(checkout)}` : "";
      const verb = shown === 1 ? "Найден" : "Найдено";
      statusEl.hidden = false;
      statusEl.innerHTML =
        `<span>${verb} ${shown} ${plural(shown, "апартамент", "апартамента", "апартаментов")}` +
        ` для ${guestsFilter} ${plural(guestsFilter, "гостя", "гостей", "гостей")}${dateTxt}` +
        `. Точную доступность дат проверьте в разделе «Онлайн-бронирование».</span>` +
        `<button type="button" data-reset-guests>сбросить фильтр</button>`;
    } else if (statusEl) {
      statusEl.hidden = true;
    }
  }

  if (filtersRoot) {
    filtersRoot.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip", filtersRoot).forEach(c => {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-selected", c === chip ? "true" : "false");
      });
      currentLoc = chip.dataset.filter;
      applyFilters();
    });
  }

  /* ---------- Слайдеры ---------- */

  function initSlider(slider) {
    const track = $(".slider__track", slider);
    const imgs = $$("img", track);
    const dots = $$(".slider__dot", slider);
    let idx = 0;

    const go = (dir) => {
      idx = (idx + dir + imgs.length) % imgs.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    };

    const set = (n) => {
      idx = Math.max(0, Math.min(imgs.length - 1, n));
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    };

    $$("[data-slide]", slider).forEach(b =>
      b.addEventListener("click", (e) => { e.stopPropagation(); go(+b.dataset.slide); }));

    // свайп
    let x0 = null;
    track.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });

    return { set, go };
  }

  $$("[data-slider]").forEach(initSlider);

  /* ---------- Модалка ---------- */

  const modal = $("#apModal");
  const modalGallery = $("#modalGallery");
  const modalInfo = $("#modalInfo");
  let modalSlider = null;
  let lastFocus = null;

  function openModal(slug) {
    const ap = APARTMENTS.find(a => a.slug === slug);
    if (!ap) return;

    const slides = Array.from({ length: ap.photos }, (_, i) =>
      `<img src="${photoUrl(ap, i + 1)}" alt="Апартаменты «${ap.name}» — фото ${i + 1}">`).join("");

    modalGallery.innerHTML = `
      <div class="slider" data-slider>
        <div class="slider__track">${slides}</div>
        <div class="slider__nav">
          <button class="slider__btn" data-slide="-1" aria-label="Предыдущее фото">${ICONS.left}</button>
          <button class="slider__btn" data-slide="1" aria-label="Следующее фото">${ICONS.right}</button>
        </div>
        <div class="slider__dots">
          ${Array.from({ length: ap.photos }, (_, i) => `<span class="slider__dot${i === 0 ? " is-active" : ""}"></span>`).join("")}
        </div>
      </div>`;

    const desc = ap.desc ||
      `Уютные апартаменты ${ap.size} м² у метро «${ap.metro}». Всё необходимое для проживания: свежее постельное бельё и полотенца, посуда и бытовая техника. Заселение самостоятельное, круглосуточно.`;

    modalInfo.innerHTML = `
      <span class="kicker">${LOCATIONS[ap.loc].label}</span>
      <h3 class="card__name" style="font-size:30px">Апартаменты «${ap.name}»</h3>
      <span class="card__addr">${ICONS.pin}${ap.addr} · м. ${ap.metro}</span>
      <div class="modal__specs">
        <div class="spec"><b>${ap.size} м²</b><span>площадь</span></div>
        <div class="spec"><b>${ap.beds}</b><span>спальных мест</span></div>
        <div class="spec"><b>${ap.rooms}</b><span>комната</span></div>
      </div>
      <p class="modal__desc">${desc}</p>
      <div class="modal__all-amenities">${ap.amenities.map(a => `<span class="mini">${a}</span>`).join("")}</div>
      <p class="modal__desc muted" style="font-size:13px">Залог ${fmt(SITE.deposit)} ₽ возвращается в день выезда. Отчётные документы по запросу — бесплатно.</p>
      <div class="modal__price-row">
        <div><b>от ${fmt(ap.price)} ₽</b><small>за сутки · скидка от 7 ночей</small></div>
        <div class="btns">
          <a href="#booking" class="btn btn--primary" data-book="${ap.name}">Забронировать</a>
          <a href="tel:${SITE.phoneRaw}" class="btn btn--ghost btn--sm">Позвонить</a>
        </div>
      </div>`;

    modal.classList.add("is-open");
    document.body.classList.add("no-scroll");
    modalSlider = initSlider($("[data-slider]", modalGallery));
    lastFocus = document.activeElement;
    $(".modal__close", modal).focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener("click", (e) => {
    const detailsBtn = e.target.closest("[data-details]");
    if (detailsBtn) { openModal(detailsBtn.dataset.details); return; }

    if (e.target.closest("[data-modal-close]")) { closeModal(); return; }

    // «Забронировать» — скроллим точно к форме брони (списку виджета,
    // где у каждой квартиры своя кнопка бронирования)
    if (e.target.closest("[data-book]") || e.target.closest('a[href="#booking"]')) {
      closeModal();
      const target = document.querySelector(".booking__frame") || $("#booking");
      if (target) {
        if (e.target.closest("[data-book]")) e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ---------- FAQ ---------- */

  $$(".faq__item").forEach(item => {
    const q = $(".faq__q", item);
    const a = $(".faq__a", item);
    q.addEventListener("click", () => {
      const open = item.classList.contains("is-open");
      // закрыть остальные
      $$(".faq__item.is-open").forEach(o => {
        if (o !== item) { o.classList.remove("is-open"); $(".faq__q", o).setAttribute("aria-expanded", "false"); $(".faq__a", o).style.maxHeight = "0"; }
      });
      item.classList.toggle("is-open", !open);
      q.setAttribute("aria-expanded", String(!open));
      a.style.maxHeight = !open ? a.scrollHeight + "px" : "0";
    });
  });

  /* ---------- Хедер ---------- */

  const header = $("#header");
  const hero = $(".hero");

  const onScroll = () => {
    const past = (hero ? hero.offsetHeight : 400) - 90;
    header.classList.toggle("header--solid", window.scrollY > past);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Мобильное меню ---------- */

  const burger = $("#burger");
  const mobileMenu = $("#mobileMenu");

  const toggleMenu = (open) => {
    burger.classList.toggle("is-open", open);
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("no-scroll", open);
  };

  burger.addEventListener("click", () => toggleMenu(!mobileMenu.classList.contains("is-open")));
  $$("a", mobileMenu).forEach(a => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------- Панель бронирования: календарь и гости ---------- */

  const bookbar = $("#bookbar");
  const bbIn = $("#bb-in");
  const bbOut = $("#bb-out");
  const bbGuests = $("#bb-guests");
  const bbRangeVal = $("#bb-range-val");
  const bbGuestsVal = $("#bb-guests-val");
  const bbBtnRange = $("#bb-btn-range");
  const bbBtnGuests = $("#bb-btn-guests");

  const DAY = 86400000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const fromIso = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const fmtDay = (d) => new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(d);
  const fmtWd = (d) => new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(d).replace(".", "");
  const plural = (n, one, few, many) => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  };
  const guestsLabel = (n) => n + " " + plural(n, "гость", "гостя", "гостей");
  const nightsLabel = (n) => n + " " + plural(n, "ночь", "ночи", "ночей");

  let guests = 2;
  let checkin = null, checkout = null;   // Date или null
  let hoverDate = null;
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();

  const rangePicker = document.createElement("div");
  rangePicker.className = "picker";
  rangePicker.setAttribute("role", "dialog");
  rangePicker.setAttribute("aria-label", "Выбор дат заезда и выезда");
  const guestsPicker = document.createElement("div");
  guestsPicker.className = "picker picker--guests";
  guestsPicker.setAttribute("role", "dialog");
  guestsPicker.setAttribute("aria-label", "Выбор количества гостей");
  const backdrop = document.createElement("div");
  backdrop.className = "picker-backdrop";
  bookbar.appendChild(rangePicker);
  bookbar.appendChild(guestsPicker);
  document.body.appendChild(backdrop);

  const syncHidden = () => {
    bbIn.value = checkin ? iso(checkin) : "";
    bbOut.value = checkout ? iso(checkout) : "";
    bbGuests.value = guests;
  };

  const updateRangeValue = () => {
    if (checkin && checkout) {
      bbRangeVal.textContent = `${fmtDay(checkin)}, ${fmtWd(checkin)} — ${fmtDay(checkout)}, ${fmtWd(checkout)}`;
      bbRangeVal.classList.remove("bookbar__value--empty");
    } else if (checkin) {
      bbRangeVal.textContent = `${fmtDay(checkin)}, ${fmtWd(checkin)} — выезд?`;
      bbRangeVal.classList.remove("bookbar__value--empty");
    } else {
      bbRangeVal.textContent = "Выбрать даты";
      bbRangeVal.classList.add("bookbar__value--empty");
    }
  };

  const updateGuestsValue = () => {
    bbGuestsVal.textContent = guestsLabel(guests);
    bbGuestsVal.classList.toggle("bookbar__value--empty", false);
  };

  /* --- Календарь --- */

  const renderCalendar = () => {
    const m2 = new Date(viewYear, viewMonth + 1, 1);
    const canPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth();
    const arrowL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 6-6 6 6 6"/></svg>`;
    const arrowR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.5 6 6 6-6 6"/></svg>`;

    const monthHTML = (base, hidden) => {
      const y = base.getFullYear(), m = base.getMonth();
      const first = new Date(y, m, 1);
      let offset = (first.getDay() + 6) % 7; // Пн=0
      const days = new Date(y, m + 1, 0).getDate();
      const wdNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
      let cells = wdNames.map(w => `<span class="cal__wd">${w}</span>`).join("");
      for (let i = 0; i < offset; i++) cells += `<span class="cal__day is-out"></span>`;
      for (let d = 1; d <= days; d++) {
        const date = new Date(y, m, d);
        const t = date.getTime();
        const disabled = t < today.getTime();
        const cls = ["cal__day"];
        if (checkin && t === checkin.getTime()) cls.push("is-endpoint");
        if (checkout && t === checkout.getTime()) cls.push("is-endpoint");
        if (checkin && checkout && t > checkin.getTime() && t < checkout.getTime()) cls.push("is-in-range");
        if (!checkout && checkin && hoverDate && ((t > checkin.getTime() && t <= hoverDate.getTime()) || (t >= hoverDate.getTime() && t < checkin.getTime()))) cls.push("is-hover");
        cells += `<button type="button" class="${cls.join(" ")}" data-t="${t}" ${disabled ? "disabled" : ""} aria-label="${fmtDay(date)}">${d}</button>`;
      }
      return `<div class="cal__month${hidden ? " is-hidden-mobile" : ""}">
        <div class="cal__head">
          <span class="cal__title">${new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(base)}</span>
        </div>
        <div class="cal__grid">${cells}</div>
      </div>`;
    };

    const nights = checkin && checkout ? Math.round((checkout - checkin) / DAY) : 0;
    rangePicker.innerHTML = `
      <div class="cal">
        ${monthHTML(new Date(viewYear, viewMonth, 1), false)}
        ${monthHTML(m2, true)}
        <div class="cal__navs" style="position:absolute;top:22px;right:22px;display:flex;gap:6px">
          <button type="button" class="cal__nav" data-nav="-1" ${canPrev ? "" : "disabled"} aria-label="Предыдущий месяц">${arrowL}</button>
          <button type="button" class="cal__nav" data-nav="1" aria-label="Следующий месяц">${arrowR}</button>
        </div>
      </div>
      <div class="cal__foot">
        <span class="cal__nights">${nights ? `<b>${nightsLabel(nights)}</b>${checkin ? ", " + fmtDay(checkin) + " — " + fmtDay(checkout) : ""}` : (checkin ? "Выберите дату выезда" : "Выберите даты заезда и выезда")}</span>
        <button type="button" class="cal__reset" data-reset>Сбросить</button>
      </div>`;
  };

  const closePickers = () => {
    rangePicker.classList.remove("is-open");
    guestsPicker.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    bbBtnRange.classList.remove("is-open");
    bbBtnGuests.classList.remove("is-open");
    bbBtnRange.setAttribute("aria-expanded", "false");
    bbBtnGuests.setAttribute("aria-expanded", "false");
  };

  const openPicker = (which) => {
    renderCalendar();
    renderGuests();
    closePickers();
    const el = which === "range" ? rangePicker : guestsPicker;
    const btn = which === "range" ? bbBtnRange : bbBtnGuests;
    el.classList.add("is-open");
    btn.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    if (window.matchMedia("(max-width: 720px)").matches) backdrop.classList.add("is-open");
  };

  bbBtnRange.addEventListener("click", () => {
    rangePicker.classList.contains("is-open") ? closePickers() : openPicker("range");
  });
  bbBtnGuests.addEventListener("click", () => {
    guestsPicker.classList.contains("is-open") ? closePickers() : openPicker("guests");
  });
  backdrop.addEventListener("click", closePickers);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePickers();
  });
  // Клик снаружи закрывает поповеры. Флаг берём на фазе захвата — ДО того,
  // как обработчики перерисуют поповер и «оторвут» кликнутый элемент от DOM.
  let clickInsideBookbar = false;
  document.addEventListener("click", (e) => {
    clickInsideBookbar = bookbar.contains(e.target);
  }, true);
  document.addEventListener("click", () => {
    if (!clickInsideBookbar) closePickers();
  });

  rangePicker.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-nav]");
    if (nav) {
      const d = new Date(viewYear, viewMonth + Number(nav.dataset.nav), 1);
      viewYear = d.getFullYear(); viewMonth = d.getMonth();
      renderCalendar();
      return;
    }
    const reset = e.target.closest("[data-reset]");
    if (reset) {
      checkin = checkout = null; hoverDate = null;
      renderCalendar(); updateRangeValue(); syncHidden();
      return;
    }
    const day = e.target.closest(".cal__day[data-t]");
    if (!day || day.disabled) return;
    const t = new Date(Number(day.dataset.t));
    if (!checkin || (checkin && checkout)) {
      checkin = t; checkout = null;
    } else if (t.getTime() > checkin.getTime()) {
      checkout = t;
      setTimeout(closePickers, 180);
    } else if (t.getTime() < checkin.getTime()) {
      // выбрали дату раньше заезда — просто меняем местами
      checkout = checkin;
      checkin = t;
      setTimeout(closePickers, 180);
    }
    // t === checkin: ничего не делаем
    renderCalendar(); updateRangeValue(); syncHidden();
  });

  rangePicker.addEventListener("mouseover", (e) => {
    const day = e.target.closest(".cal__day[data-t]");
    if (!day || day.disabled) return;
    if (!checkin || checkout) return;
    // Превью диапазона — ТОЛЬКО классами, без перерисовки DOM:
    // пересборка на mouseover рвёт связку mousedown+mouseup и клик не срабатывает.
    const t = Number(day.dataset.t);
    $$(".cal__day[data-t]", rangePicker).forEach(btn => {
      const bt = Number(btn.dataset.t);
      const inPrev = (bt > checkin.getTime() && bt <= t) || (bt >= t && bt < checkin.getTime());
      btn.classList.toggle("is-hover", inPrev);
    });
  });

  rangePicker.addEventListener("mouseleave", () => {
    $$(".cal__day.is-hover", rangePicker).forEach(b => b.classList.remove("is-hover"));
  });

  /* --- Гости --- */

  const renderGuests = () => {
    guestsPicker.innerHTML = `
      <div class="guests__row">
        <div><b>Гостей</b><span>взрослые и дети</span></div>
        <div class="stepper">
          <button type="button" data-step="-1" ${guests <= 1 ? "disabled" : ""} aria-label="Меньше">−</button>
          <output>${guests}</output>
          <button type="button" data-step="1" ${guests >= MAX_GUESTS ? "disabled" : ""} aria-label="Больше">+</button>
        </div>
      </div>
      <p class="guests__note">Максимум в наших апартаментах — ${MAX_GUESTS} гостя (спальные места 2+2). Дети — тоже гости: укажите их при бронировании.</p>`;
  };

  const updateStepper = () => {
    const out = $("output", guestsPicker);
    if (out) out.textContent = guests;
    const minus = $('[data-step="-1"]', guestsPicker);
    const plus = $('[data-step="1"]', guestsPicker);
    if (minus) minus.disabled = guests <= 1;
    if (plus) plus.disabled = guests >= MAX_GUESTS;
  };

  guestsPicker.addEventListener("click", (e) => {
    const step = e.target.closest("[data-step]");
    if (!step) return;
    guests = Math.min(MAX_GUESTS, Math.max(1, guests + Number(step.dataset.step)));
    updateStepper();
    updateGuestsValue();
    syncHidden();
    // если фильтр по гостям уже включён — обновляем каталог на месте
    if (guestsFilter !== null) applyFilters();
  });

  updateRangeValue(); updateGuestsValue(); syncHidden();

  bookbar.addEventListener("submit", (e) => {
    e.preventDefault();
    // «Подобрать апартаменты»: фильтруем каталог по вместимости и ведём к нему
    guestsFilter = guests;
    applyFilters();
    closePickers();
    $("#apartments").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Защита от недогруженных фото ---------- */

  // Фолбэк для фото ВИДЖЕТА бронирования: если CDN realtycalendar недоступен,
  // подставляем локальную копию той же квартиры (по названию в карточке).
  const CYR = { M: "М", K: "К", H: "Н", O: "О", P: "Р", A: "А", C: "С", T: "Т", B: "В", X: "Х", "3": "З" };
  const normName = (s) => (s || "")
    .toUpperCase()
    .replace(/[MKHOPACTBX3]/g, ch => CYR[ch] || ch)
    .replace(/[^А-ЯЁ0-9]/g, "");

  function widgetImgFallback(img) {
    const card = img.closest(".hotel-card");
    if (!card) return;
    const titleEl = card.querySelector("h1, h2, h3, [class*='title'], [class*='name']");
    const clean = normName((titleEl ? titleEl.textContent : card.textContent)
      .replace(/апартаменты/gi, " ").replace(/["«»]/g, " "));
    const ap = APARTMENTS.find(a => {
      const n = normName(a.name);
      return clean === n || clean.startsWith(n);
    });
    if (!ap) return;
    const slides = Array.from(card.querySelectorAll(".swiper-slide")).filter(s => s.querySelector("img"));
    const idx = Math.max(0, slides.findIndex(s => s.contains(img)));
    img.src = photoUrl(ap, (idx % ap.photos) + 1);
  }

  document.addEventListener("error", (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.fbDone) return;
    img.dataset.fbDone = "1";
    if (img.closest("#hr-widget")) { widgetImgFallback(img); return; }
    // подставляем фото той же локации по номеру кадра
    const m = img.src.match(/apartments\/([a-z-]+)\/(\d)\.jpg/);
    const idx = m ? m[2] : "1";
    img.src = "images/apartments/monte-karlo/" + idx + ".jpg";
  }, true);

  // Активная зачистка: фото виджета, которые не загрузились за пару секунд
  // (CDN realtycalendar бывает недоступен), заменяем локальными копиями.
  let widgetSweeps = 0;
  let widgetSweepTimer = null;
  function startWidgetSweep() {
    widgetSweeps = 0;
    if (widgetSweepTimer) clearInterval(widgetSweepTimer);
    widgetSweepTimer = setInterval(() => {
      widgetSweeps++;
      const w = document.querySelector("#hr-widget");
      if (!w || !w.querySelectorAll(".hotel-card").length) {
        if (widgetSweeps > 60) clearInterval(widgetSweepTimer);
        return;
      }
      let pending = 0;
      w.querySelectorAll(".hotel-card img").forEach(img => {
        if (img.dataset.fbDone) return;
        if (img.complete && img.naturalWidth > 0) return; // загрузилось с CDN
        img.dataset.fbDone = "1";
        widgetImgFallback(img);
        pending++;
      });
      if (widgetSweeps > 40 || (!pending && widgetSweeps > 2)) clearInterval(widgetSweepTimer);
    }, 2500);
  }
  startWidgetSweep();


  /* ---------- Появление при скролле ---------- */

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("is-visible");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px" });

  $$(".reveal").forEach(el => io.observe(el));

})();
