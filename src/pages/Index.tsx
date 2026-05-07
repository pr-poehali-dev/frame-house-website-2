import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b9909ceb-423f-4796-aaa5-013544a14d2b/files/2f26f809-0513-4372-a4f7-e35bb6d19036.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Проекты", href: "#projects" },
  { label: "Галерея", href: "#gallery" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const STATS = [
  { value: 500, suffix: "+", label: "Объектов сдано" },
  { value: 12, suffix: " лет", label: "На рынке" },
  { value: 30, suffix: "%", label: "Экономия клиента" },
  { value: 98, suffix: "%", label: "Довольных клиентов" },
];

const PROJECTS = [
  {
    title: "ЖК «Северный»",
    type: "Жилой комплекс",
    area: "12 000 м²",
    duration: "8 месяцев",
    price: "от 45 000 ₽/м²",
    color: "bg-navy",
  },
  {
    title: "БЦ «Проспект»",
    type: "Бизнес-центр",
    area: "5 500 м²",
    duration: "6 месяцев",
    price: "от 52 000 ₽/м²",
    color: "bg-navy-light",
  },
  {
    title: "ТЦ «Горизонт»",
    type: "Торговый центр",
    area: "8 200 м²",
    duration: "10 месяцев",
    price: "от 48 000 ₽/м²",
    color: "bg-navy",
  },
];

const GALLERY_ITEMS = [
  { label: "Жилые дома", count: 210 },
  { label: "Коммерция", count: 145 },
  { label: "Промышленные", count: 87 },
  { label: "Реконструкция", count: 68 },
];

const BLOG_POSTS = [
  {
    date: "15 апреля 2026",
    tag: "Советы",
    title: "Как сэкономить 30% на строительстве без потери качества",
    excerpt: "Раскрываем профессиональные секреты закупки материалов и оптимизации процессов.",
  },
  {
    date: "2 апреля 2026",
    tag: "Технологии",
    title: "Быстровозводимые конструкции: миф или реальность?",
    excerpt: "Разбираем современные технологии строительства и их применение в реальных проектах.",
  },
  {
    date: "20 марта 2026",
    tag: "Рынок",
    title: "Прогноз цен на строительные материалы в 2026 году",
    excerpt: "Аналитика рынка и рекомендации по срокам начала строительства.",
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({ value, suffix, label, animate }: { value: number; suffix: string; label: string; animate: boolean }) {
  const count = useCountUp(value, 1800, animate);
  return (
    <div className="text-center">
      <div className="font-display text-5xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-white/60 mt-2 font-body text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}

function Calculator() {
  const [area, setArea] = useState(100);
  const [type, setType] = useState("Жилой дом");
  const [floors, setFloors] = useState(1);

  const basePrice: Record<string, number> = {
    "Жилой дом": 35000,
    "Коммерческий объект": 42000,
    "Промышленный объект": 28000,
  };

  const total = Math.round(area * (basePrice[type] || 35000) * (1 + (floors - 1) * 0.07));

  return (
    <div className="bg-white rounded-sm shadow-xl p-8 border border-gray-100">
      <h3 className="font-display text-2xl font-bold text-navy mb-6 uppercase tracking-wide">
        Рассчитать стоимость
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
            Площадь: <span className="text-gold font-bold">{area} м²</span>
          </label>
          <input
            type="range" min={50} max={5000} step={10} value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-[hsl(42,90%,48%)] h-2 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>50 м²</span><span>5 000 м²</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
            Тип объекта
          </label>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(basePrice).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-3 text-left text-sm font-semibold border-2 transition-all ${
                  type === t
                    ? "border-gold bg-gold/10 text-navy"
                    : "border-gray-200 text-gray-600 hover:border-navy/30"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
            Этажей: <span className="text-gold font-bold">{floors}</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((f) => (
              <button
                key={f}
                onClick={() => setFloors(f)}
                className={`flex-1 py-2 font-bold border-2 text-sm transition-all ${
                  floors === f ? "bg-navy border-navy text-white" : "border-gray-200 text-gray-600 hover:border-navy/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-navy rounded-sm p-6 text-center">
          <div className="text-white/70 text-sm uppercase tracking-wider mb-1">Примерная стоимость</div>
          <div className="font-display text-4xl font-bold text-gold">
            {total.toLocaleString("ru")} ₽
          </div>
          <div className="text-white/50 text-xs mt-2">Точная цена после консультации</div>
        </div>

        <button className="w-full bg-gold hover:bg-gold-dark text-navy font-display font-bold py-4 uppercase tracking-widest text-sm transition-all">
          Получить точный расчёт
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      {/* НАВИГАЦИЯ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-navy shadow-2xl" : "bg-navy/95"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold flex items-center justify-center">
                <Icon name="Building2" size={18} className="text-navy" />
              </div>
              <span className="font-display font-bold text-white text-lg uppercase tracking-wider">
                СтройГрупп
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-gold text-sm uppercase tracking-widest font-semibold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+78001234567" className="text-white font-semibold text-sm hover:text-gold transition-colors">
                8 800 123-45-67
              </a>
              <button className="bg-gold text-navy font-display font-bold px-5 py-2 text-sm uppercase tracking-wider hover:bg-gold-light transition-all">
                Консультация
              </button>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2">
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-navy border-t border-white/10">
            <div className="container mx-auto px-4 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white/70 hover:text-gold text-sm uppercase tracking-widest font-semibold py-2"
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full bg-gold text-navy font-display font-bold py-3 uppercase tracking-wider mt-4">
                Консультация
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Строительство" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        </div>

        <div className="relative container mx-auto px-4 pt-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.3em] font-semibold">
                Профессиональное строительство
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-white uppercase leading-tight mb-6">
              Строим{" "}
              <span className="text-gold">быстро.</span>
              <br />
              Строим{" "}
              <span className="text-gold">доступно.</span>
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg font-body">
              Полный цикл строительства от фундамента до сдачи ключей.
              Экономия до 30% без ущерба для качества.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#calculator"
                className="bg-gold text-navy font-display font-bold px-8 py-4 uppercase tracking-widest text-sm hover:bg-gold-light transition-all text-center"
              >
                Рассчитать стоимость
              </a>
              <a
                href="#projects"
                className="border-2 border-white/40 text-white font-display font-bold px-8 py-4 uppercase tracking-widest text-sm hover:border-gold hover:text-gold transition-all text-center"
              >
                Наши проекты
              </a>
            </div>

            <div className="flex flex-wrap gap-8 mt-12">
              {[
                { icon: "ShieldCheck", text: "Гарантия 5 лет" },
                { icon: "Clock", text: "Сдача в срок" },
                { icon: "Banknote", text: "Без скрытых доплат" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <Icon name={item.icon} fallback="Star" size={16} className="text-gold" />
                  <span className="text-white/70 text-sm font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a href="#projects" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-gold transition-colors animate-bounce">
          <Icon name="ChevronDown" size={32} />
        </a>
      </section>

      {/* СТАТИСТИКА */}
      <section ref={statsRef} className="bg-navy py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} animate={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ПРОЕКТЫ */}
      <section id="projects" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-14">
            <h2 className="section-title gold-line">Наши проекты</h2>
            <p className="text-muted-foreground mt-6 max-w-lg leading-relaxed">
              Реализованные объекты — наша лучшая визитная карточка. Каждый проект сдан в срок.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div key={project.title} className="group cursor-pointer">
                <div className={`${project.color} p-8 h-56 flex flex-col justify-between relative overflow-hidden transition-all group-hover:scale-[1.02]`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full" />
                  <div>
                    <span className="text-gold text-xs uppercase tracking-widest font-semibold">{project.type}</span>
                    <h3 className="font-display text-2xl font-bold text-white mt-2 uppercase">{project.title}</h3>
                  </div>
                  <Icon name="ArrowUpRight" size={24} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity self-end" />
                </div>
                <div className="border border-gray-200 p-6 grid grid-cols-3 gap-4">
                  {[
                    { label: "Площадь", value: project.area },
                    { label: "Срок", value: project.duration },
                    { label: "Цена", value: project.price },
                  ].map((detail) => (
                    <div key={detail.label}>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{detail.label}</div>
                      <div className="font-semibold text-navy text-sm">{detail.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="border-2 border-navy text-navy font-display font-bold px-10 py-3 uppercase tracking-widest text-sm hover:bg-navy hover:text-white transition-all">
              Все проекты
            </button>
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title gold-line-center">Галерея</h2>
            <p className="text-muted-foreground mt-6 max-w-lg mx-auto leading-relaxed">
              Более 500 реализованных объектов по всей стране
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className="relative bg-navy group cursor-pointer overflow-hidden"
                style={{ height: i % 2 === 0 ? "280px" : "220px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="font-display text-3xl font-bold text-gold">{item.count}</div>
                  <div className="text-white text-sm uppercase tracking-wider">{item.label}</div>
                </div>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-navy text-white font-display font-bold px-10 py-3 uppercase tracking-widest text-sm hover:bg-navy-light transition-all">
              Открыть галерею
            </button>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ МЫ */}
      <section className="py-24 bg-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-white uppercase tracking-wider gold-line-center">
              Почему выбирают нас
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Zap",
                title: "Быстрые сроки",
                text: "Современные технологии позволяют сокращать сроки строительства на 40% по сравнению с классическими методами.",
              },
              {
                icon: "PiggyBank",
                title: "Доступные цены",
                text: "Прямые контракты с производителями материалов и оптимизированная логистика снижают затраты без ущерба для качества.",
              },
              {
                icon: "ShieldCheck",
                title: "Гарантия качества",
                text: "Собственный технадзор на каждом объекте. Гарантия 5 лет на все конструктивные элементы здания.",
              },
              {
                icon: "FileText",
                title: "Прозрачный договор",
                text: "Фиксированная цена в договоре. Никаких скрытых доплат и изменения стоимости после подписания.",
              },
              {
                icon: "Users",
                title: "Опытная команда",
                text: "Более 200 квалифицированных специалистов в штате. Средний опыт работы — 8 лет в отрасли.",
              },
              {
                icon: "MapPin",
                title: "Работаем по России",
                text: "Присутствие в 25 регионах. Собственные бригады без привлечения субподрядчиков.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 p-8 hover:border-gold/40 transition-all group">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-all">
                  <Icon name={item.icon} fallback="Star" size={22} className="text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide mb-3">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАЛЬКУЛЯТОР */}
      <section id="calculator" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="section-title gold-line mb-6">Калькулятор стоимости</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Получите предварительный расчёт стоимости вашего объекта за 30 секунд.
                После расчёта наш специалист свяжется с вами для уточнения деталей.
              </p>

              <div className="space-y-4">
                {[
                  { icon: "CheckCircle2", text: "Расчёт за 30 секунд без регистрации" },
                  { icon: "CheckCircle2", text: "Индивидуальное коммерческое предложение за 24 часа" },
                  { icon: "CheckCircle2", text: "Бесплатный выезд специалиста на объект" },
                  { icon: "CheckCircle2", text: "Фиксация цены в договоре" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <Icon name={item.icon} fallback="Check" size={18} className="text-gold mt-0.5 shrink-0" />
                    <span className="text-foreground/80 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-gray-50 border-l-4 border-gold">
                <div className="font-display font-bold text-navy uppercase tracking-wide mb-2">
                  Акция до конца мая
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  При заключении договора до 31 мая — бесплатный проект фундамента
                  стоимостью от 120 000 ₽
                </div>
              </div>
            </div>

            <Calculator />
          </div>
        </div>
      </section>

      {/* БЛОГ */}
      <section id="blog" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <h2 className="section-title gold-line">Блог</h2>
              <p className="text-muted-foreground mt-6 max-w-md leading-relaxed">
                Экспертные материалы о строительстве, технологиях и рынке недвижимости
              </p>
            </div>
            <button className="hidden md:block border-2 border-navy text-navy font-display font-bold px-6 py-2 uppercase tracking-widest text-sm hover:bg-navy hover:text-white transition-all">
              Все статьи
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <article key={post.title} className="bg-white border border-gray-100 group cursor-pointer hover:shadow-lg transition-all">
                <div className={`h-2 ${i === 0 ? "bg-gold" : "bg-navy"}`} />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-navy/5 text-navy text-xs font-semibold uppercase tracking-wider px-3 py-1">
                      {post.tag}
                    </span>
                    <span className="text-gray-400 text-xs">{post.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy uppercase leading-tight mb-3 group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="mt-5 flex items-center gap-2 text-gold text-sm font-semibold">
                    Читать далее
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="section-title gold-line mb-6">Контакты</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Оставьте заявку — перезвоним в течение 15 минут в рабочее время
              </p>

              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "8 800 123-45-67", sub: "Бесплатно по России" },
                  { icon: "Mail", label: "Email", value: "info@stroigroup.ru", sub: "Отвечаем в течение часа" },
                  { icon: "MapPin", label: "Офис", value: "Москва, ул. Строителей, 1", sub: "Пн–Пт: 9:00 – 18:00" },
                ].map((contact) => (
                  <div key={contact.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-navy/5 flex items-center justify-center shrink-0">
                      <Icon name={contact.icon} fallback="Phone" size={20} className="text-navy" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{contact.label}</div>
                      <div className="font-semibold text-navy">{contact.value}</div>
                      <div className="text-sm text-gray-400">{contact.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-navy uppercase tracking-wide mb-6">
                Оставить заявку
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Опишите проект
                  </label>
                  <textarea
                    placeholder="Что планируете строить, площадь, регион..."
                    rows={4}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors resize-none"
                  />
                </div>
                <button className="w-full bg-navy text-white font-display font-bold py-4 uppercase tracking-widest text-sm hover:bg-navy-light transition-all">
                  Отправить заявку
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ФУТЕР */}
      <footer className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gold flex items-center justify-center">
                  <Icon name="Building2" size={16} className="text-navy" />
                </div>
                <span className="font-display font-bold text-white text-lg uppercase tracking-wider">
                  СтройГрупп
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Профессиональное строительство с 2014 года. Более 500 сданных объектов.
              </p>
            </div>

            {[
              {
                title: "Компания",
                links: ["О нас", "Команда", "Лицензии", "Вакансии"],
              },
              {
                title: "Услуги",
                links: ["Жилое строительство", "Коммерческое", "Промышленное", "Реконструкция"],
              },
              {
                title: "Контакты",
                links: ["8 800 123-45-67", "info@stroigroup.ru", "Москва, ул. Строителей, 1"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-display font-bold text-white uppercase tracking-wider text-sm mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/40 text-sm hover:text-gold transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">© 2026 СтройГрупп. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/30 text-sm hover:text-gold transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-white/30 text-sm hover:text-gold transition-colors">
                Договор оферты
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}