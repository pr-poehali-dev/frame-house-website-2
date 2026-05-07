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
    emoji: "🏘️",
    bg: "from-pistachio/20 to-olive/10",
  },
  {
    title: "БЦ «Проспект»",
    type: "Бизнес-центр",
    area: "5 500 м²",
    duration: "6 месяцев",
    price: "от 52 000 ₽/м²",
    emoji: "🏢",
    bg: "from-olive/20 to-pistachio/10",
  },
  {
    title: "ТЦ «Горизонт»",
    type: "Торговый центр",
    area: "8 200 м²",
    duration: "10 месяцев",
    price: "от 48 000 ₽/м²",
    emoji: "🏬",
    bg: "from-sage/20 to-pistachio/10",
  },
];

const BLOG_POSTS = [
  {
    date: "15 апр 2026",
    tag: "Советы",
    title: "Как сэкономить 30% на строительстве без потери качества",
    excerpt: "Профессиональные секреты закупки материалов и оптимизации процессов.",
    emoji: "💡",
  },
  {
    date: "2 апр 2026",
    tag: "Технологии",
    title: "Быстровозводимые конструкции: миф или реальность?",
    excerpt: "Разбираем современные технологии и их применение в реальных проектах.",
    emoji: "⚡",
  },
  {
    date: "20 мар 2026",
    tag: "Рынок",
    title: "Прогноз цен на строительные материалы в 2026 году",
    excerpt: "Аналитика рынка и рекомендации по срокам начала строительства.",
    emoji: "📊",
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
    <div className="text-center p-6">
      <div className="font-display text-5xl font-black text-olive-dark">
        {count}<span className="text-pistachio">{suffix}</span>
      </div>
      <div className="text-olive/70 mt-2 font-body text-sm font-medium">{label}</div>
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
    <div className="card-soft p-8">
      <h3 className="font-display text-2xl font-bold text-olive-dark mb-6">
        Рассчитать стоимость 🧮
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-olive/70 mb-3">
            Площадь: <span className="text-pistachio font-bold text-base">{area} м²</span>
          </label>
          <input
            type="range" min={50} max={5000} step={10} value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full h-2 cursor-pointer rounded-full accent-[hsl(88,45%,52%)]"
          />
          <div className="flex justify-between text-xs text-olive/40 mt-2">
            <span>50 м²</span><span>5 000 м²</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-olive/70 mb-3">
            Тип объекта
          </label>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(basePrice).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-3 text-left text-sm font-semibold rounded-xl border-2 transition-all ${
                  type === t
                    ? "border-pistachio bg-pistachio-pale text-olive-dark"
                    : "border-border text-olive/70 hover:border-pistachio/40 bg-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-olive/70 mb-3">
            Этажей: <span className="text-pistachio font-bold text-base">{floors}</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((f) => (
              <button
                key={f}
                onClick={() => setFloors(f)}
                className={`flex-1 py-2.5 font-bold rounded-xl border-2 text-sm transition-all ${
                  floors === f
                    ? "bg-pistachio border-pistachio text-white shadow-soft"
                    : "border-border text-olive/70 hover:border-pistachio/40 bg-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-pistachio-pale to-sage/20 rounded-2xl p-6 text-center">
          <div className="text-olive/60 text-sm font-medium mb-1">Примерная стоимость</div>
          <div className="font-display text-4xl font-black text-olive-dark">
            {total.toLocaleString("ru")} ₽
          </div>
          <div className="text-olive/40 text-xs mt-2">Точная цена после консультации</div>
        </div>

        <button className="w-full bg-pistachio hover:bg-pistachio-dark text-white font-display font-bold py-4 rounded-xl text-sm tracking-wide transition-all shadow-soft hover:shadow-soft-md hover:-translate-y-0.5">
          Получить точный расчёт →
        </button>
      </div>
    </div>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-olive-dark/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-soft-lg max-w-md w-full p-8 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-pistachio-pale text-olive hover:bg-pistachio/20 transition-colors"
        >
          <Icon name="X" size={18} />
        </button>

        {sent ? (
          <div className="text-center py-6">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="font-display text-2xl font-bold text-olive-dark mb-2">Отлично!</h3>
            <p className="text-olive/60">Мы получили вашу заявку и свяжемся с вами в течение 15 минут.</p>
            <button
              onClick={onClose}
              className="mt-6 bg-pistachio text-white font-display font-bold py-3 px-8 rounded-xl hover:bg-pistachio-dark transition-all"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="text-3xl mb-3">👋</div>
              <h3 className="font-display text-2xl font-bold text-olive-dark">Напишите нам</h3>
              <p className="text-olive/60 text-sm mt-1">Перезвоним за 15 минут в рабочее время</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-olive/60 mb-1.5 uppercase tracking-wider">Ваше имя</label>
                <input
                  type="text"
                  required
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full border-2 border-border focus:border-pistachio rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-pistachio-pale/30 placeholder:text-olive/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-olive/60 mb-1.5 uppercase tracking-wider">Телефон</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full border-2 border-border focus:border-pistachio rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-pistachio-pale/30 placeholder:text-olive/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-olive/60 mb-1.5 uppercase tracking-wider">Расскажите о проекте</label>
                <textarea
                  rows={3}
                  placeholder="Что планируете строить, площадь, регион..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full border-2 border-border focus:border-pistachio rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-pistachio-pale/30 placeholder:text-olive/30 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pistachio hover:bg-pistachio-dark text-white font-display font-bold py-4 rounded-xl text-sm tracking-wide transition-all shadow-soft hover:shadow-soft-md hover:-translate-y-0.5"
              >
                Отправить заявку →
              </button>
              <p className="text-xs text-olive/40 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}

      {/* НАВИГАЦИЯ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-pistachio rounded-xl flex items-center justify-center shadow-soft">
                <Icon name="Building2" size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-olive-dark text-lg">
                СтройГрупп
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-olive/70 hover:text-pistachio text-sm font-semibold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+78001234567" className="text-olive font-semibold text-sm hover:text-pistachio transition-colors">
                8 800 123-45-67
              </a>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-pistachio text-white font-display font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-pistachio-dark transition-all shadow-soft"
              >
                Консультация
              </button>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-olive p-2">
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-olive/70 hover:text-pistachio text-sm font-semibold py-2.5"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setModalOpen(true); setMenuOpen(false); }}
                className="w-full bg-pistachio text-white font-display font-bold py-3 rounded-xl mt-3"
              >
                Консультация
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Строительство" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-olive-dark/90 via-olive-dark/75 to-olive/30" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="relative container mx-auto px-4 pt-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="text-pistachio-light text-sm">🌿</span>
              <span className="text-white/90 text-sm font-medium">Профессиональное строительство</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Строим{" "}
              <span className="text-pistachio-light">быстро</span>
              {" "}и{" "}
              <span className="text-pistachio-light">доступно</span>
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
              Полный цикл строительства от фундамента до сдачи ключей.
              Экономия до 30% без ущерба для качества.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#calculator"
                className="bg-pistachio hover:bg-pistachio-dark text-white font-display font-bold px-8 py-4 rounded-2xl text-sm tracking-wide transition-all shadow-soft-md hover:-translate-y-0.5 text-center"
              >
                Рассчитать стоимость
              </a>
              <button
                onClick={() => setModalOpen(true)}
                className="border-2 border-white/40 text-white font-display font-bold px-8 py-4 rounded-2xl text-sm hover:border-pistachio-light hover:bg-white/10 transition-all"
              >
                Оставить заявку
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: "ShieldCheck", text: "Гарантия 5 лет" },
                { icon: "Clock", text: "Сдача в срок" },
                { icon: "Banknote", text: "Без скрытых доплат" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Icon name={item.icon} fallback="Star" size={15} className="text-pistachio-light" />
                  <span className="text-white/80 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a href="#projects" className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/60 hover:text-pistachio-light hover:bg-white/20 transition-all animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </a>
      </section>

      {/* СТАТИСТИКА */}
      <section ref={statsRef} className="bg-white border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} animate={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ПРОЕКТЫ */}
      <section id="projects" className="py-24 mesh-bg">
        <div className="container mx-auto px-4">
          <div className="mb-14">
            <h2 className="section-title pistachio-line">Наши проекты</h2>
            <p className="text-olive/60 mt-6 max-w-lg leading-relaxed">
              Реализованные объекты — наша лучшая визитная карточка. Каждый проект сдан в срок.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div key={project.title} className="card-soft group cursor-pointer overflow-hidden">
                <div className={`bg-gradient-to-br ${project.bg} p-8 h-44 flex flex-col justify-between relative`}>
                  <div className="text-4xl">{project.emoji}</div>
                  <div>
                    <span className="text-pistachio text-xs font-bold uppercase tracking-widest">{project.type}</span>
                    <h3 className="font-display text-xl font-bold text-olive-dark mt-1">{project.title}</h3>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-3 gap-4 border-t border-border">
                  {[
                    { label: "Площадь", value: project.area },
                    { label: "Срок", value: project.duration },
                    { label: "Цена", value: project.price },
                  ].map((detail) => (
                    <div key={detail.label}>
                      <div className="text-xs text-olive/40 font-medium mb-1">{detail.label}</div>
                      <div className="font-bold text-olive-dark text-sm">{detail.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="border-2 border-pistachio text-olive-dark font-display font-bold px-10 py-3 rounded-2xl text-sm hover:bg-pistachio-pale transition-all">
              Все проекты
            </button>
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title pistachio-line-center">Галерея</h2>
            <p className="text-olive/60 mt-6 max-w-lg mx-auto leading-relaxed">
              Более 500 реализованных объектов по всей стране
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Жилые дома", count: 210, emoji: "🏠", h: "h-64" },
              { label: "Коммерция", count: 145, emoji: "🏢", h: "h-48" },
              { label: "Промышленные", count: 87, emoji: "🏭", h: "h-64" },
              { label: "Реконструкция", count: 68, emoji: "🔨", h: "h-48" },
            ].map((item) => (
              <div
                key={item.label}
                className={`${item.h} bg-gradient-to-br from-pistachio-pale to-sage/20 rounded-2xl flex flex-col justify-end p-6 group cursor-pointer hover:shadow-soft-md transition-all hover:-translate-y-1 border border-pistachio/10`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.emoji}</div>
                <div className="font-display text-3xl font-black text-olive-dark">{item.count}</div>
                <div className="text-olive/60 text-sm font-medium">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-olive text-white font-display font-bold px-10 py-3 rounded-2xl text-sm hover:bg-olive-dark transition-all shadow-soft">
              Открыть галерею
            </button>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ МЫ */}
      <section className="py-24 bg-gradient-to-br from-olive-dark to-olive">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-black text-white">Почему выбирают нас</h2>
            <div className="w-12 h-1.5 bg-pistachio rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "⚡", title: "Быстрые сроки", text: "Современные технологии сокращают сроки строительства на 40% по сравнению с классическими методами." },
              { emoji: "💰", title: "Доступные цены", text: "Прямые контракты с производителями и оптимизированная логистика снижают затраты без ущерба для качества." },
              { emoji: "🛡️", title: "Гарантия качества", text: "Собственный технадзор на каждом объекте. Гарантия 5 лет на все конструктивные элементы здания." },
              { emoji: "📋", title: "Прозрачный договор", text: "Фиксированная цена в договоре. Никаких скрытых доплат и изменения стоимости после подписания." },
              { emoji: "👷", title: "Опытная команда", text: "Более 200 квалифицированных специалистов в штате. Средний опыт работы — 8 лет в отрасли." },
              { emoji: "🗺️", title: "Работаем по России", text: "Присутствие в 25 регионах. Собственные бригады без привлечения субподрядчиков." },
            ].map((item) => (
              <div key={item.title} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/12 hover:border-pistachio/40 transition-all group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.emoji}</div>
                <h3 className="font-display text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАЛЬКУЛЯТОР */}
      <section id="calculator" className="py-24 mesh-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="section-title pistachio-line mb-6">Калькулятор стоимости</h2>
              <p className="text-olive/60 leading-relaxed mb-8">
                Получите предварительный расчёт стоимости вашего объекта за 30 секунд.
                После расчёта наш специалист свяжется с вами для уточнения деталей.
              </p>

              <div className="space-y-3">
                {[
                  "✅ Расчёт за 30 секунд без регистрации",
                  "✅ Индивидуальное КП за 24 часа",
                  "✅ Бесплатный выезд специалиста на объект",
                  "✅ Фиксация цены в договоре",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-olive/70 font-medium">{text}</div>
                ))}
              </div>

              <div className="mt-10 bg-pistachio-pale border border-pistachio/20 rounded-2xl p-6">
                <div className="font-display font-bold text-olive-dark text-base mb-2">
                  🎁 Акция до конца мая
                </div>
                <div className="text-sm text-olive/60 leading-relaxed">
                  При заключении договора до 31 мая — бесплатный проект фундамента стоимостью от 120 000 ₽
                </div>
              </div>
            </div>

            <Calculator />
          </div>
        </div>
      </section>

      {/* БЛОГ */}
      <section id="blog" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <h2 className="section-title pistachio-line">Блог</h2>
              <p className="text-olive/60 mt-6 max-w-md leading-relaxed">
                Экспертные материалы о строительстве, технологиях и рынке
              </p>
            </div>
            <button className="hidden md:block border-2 border-pistachio text-olive-dark font-display font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-pistachio-pale transition-all">
              Все статьи
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.title} className="card-soft group cursor-pointer overflow-hidden">
                <div className="bg-gradient-to-br from-pistachio-pale to-sage/20 p-6 flex items-center justify-between">
                  <span className="text-4xl">{post.emoji}</span>
                  <span className="bg-white/70 text-olive text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-olive/40 text-xs mb-3">{post.date}</div>
                  <h3 className="font-display text-base font-bold text-olive-dark leading-snug mb-3 group-hover:text-pistachio transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-olive/50 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-pistachio text-sm font-bold">
                    Читать далее
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ФОРМА ОБРАТНОЙ СВЯЗИ */}
      <section id="contacts" className="py-24 mesh-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="section-title pistachio-line mb-6">Свяжитесь с нами</h2>
                <p className="text-olive/60 leading-relaxed mb-10">
                  Оставьте заявку — перезвоним в течение 15 минут в рабочее время 🌿
                </p>

                <div className="space-y-5">
                  {[
                    { icon: "Phone", label: "Телефон", value: "8 800 123-45-67", sub: "Бесплатно по России" },
                    { icon: "Mail", label: "Email", value: "info@stroigroup.ru", sub: "Отвечаем в течение часа" },
                    { icon: "MapPin", label: "Офис", value: "Москва, ул. Строителей, 1", sub: "Пн–Пт: 9:00 – 18:00" },
                  ].map((contact) => (
                    <div key={contact.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-pistachio-pale rounded-2xl flex items-center justify-center shrink-0">
                        <Icon name={contact.icon} fallback="Phone" size={20} className="text-pistachio" />
                      </div>
                      <div>
                        <div className="text-xs text-olive/40 font-medium uppercase tracking-wider mb-0.5">{contact.label}</div>
                        <div className="font-bold text-olive-dark">{contact.value}</div>
                        <div className="text-sm text-olive/50">{contact.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex gap-3">
                  {["VK", "Telegram", "WhatsApp"].map((s) => (
                    <a key={s} href="#" className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-olive/70 hover:border-pistachio hover:text-pistachio transition-all shadow-soft">
                      {s}
                    </a>
                  ))}
                </div>
              </div>

              {/* Форма */}
              <ContactFormInline onOpenModal={() => setModalOpen(true)} />
            </div>
          </div>
        </div>
      </section>

      {/* ФУТЕР */}
      <footer className="bg-olive-dark py-14">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-pistachio rounded-xl flex items-center justify-center">
                  <Icon name="Building2" size={16} className="text-white" />
                </div>
                <span className="font-display font-bold text-white text-lg">СтройГрупп</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Профессиональное строительство с 2014 года. Более 500 сданных объектов.
              </p>
            </div>

            {[
              { title: "Компания", links: ["О нас", "Команда", "Лицензии", "Вакансии"] },
              { title: "Услуги", links: ["Жилое строительство", "Коммерческое", "Промышленное", "Реконструкция"] },
              { title: "Контакты", links: ["8 800 123-45-67", "info@stroigroup.ru", "Москва, ул. Строителей, 1"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/40 text-sm hover:text-pistachio-light transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">© 2026 СтройГрупп. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/30 text-sm hover:text-pistachio-light transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-white/30 text-sm hover:text-pistachio-light transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactFormInline({ onOpenModal }: { onOpenModal: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card-soft p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="font-display text-2xl font-bold text-olive-dark mb-2">Заявка принята!</h3>
        <p className="text-olive/60 text-sm">Мы свяжемся с вами в течение 15 минут в рабочее время.</p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-pistachio text-sm font-semibold hover:text-pistachio-dark transition-colors"
        >
          Отправить ещё
        </button>
      </div>
    );
  }

  return (
    <div className="card-soft p-8">
      <h3 className="font-display text-xl font-bold text-olive-dark mb-6">Оставить заявку</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-olive/50 mb-1.5 uppercase tracking-wider">Ваше имя</label>
          <input
            type="text"
            required
            placeholder="Иван Иванов"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            className="w-full border-2 border-border focus:border-pistachio rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-pistachio-pale/20 placeholder:text-olive/30"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-olive/50 mb-1.5 uppercase tracking-wider">Телефон</label>
          <input
            type="tel"
            required
            placeholder="+7 (___) ___-__-__"
            value={form.phone}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            className="w-full border-2 border-border focus:border-pistachio rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-pistachio-pale/20 placeholder:text-olive/30"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-olive/50 mb-1.5 uppercase tracking-wider">Расскажите о проекте</label>
          <textarea
            rows={4}
            placeholder="Что планируете строить, площадь, регион..."
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            className="w-full border-2 border-border focus:border-pistachio rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-pistachio-pale/20 placeholder:text-olive/30 resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pistachio hover:bg-pistachio-dark text-white font-display font-bold py-4 rounded-xl text-sm tracking-wide transition-all shadow-soft hover:shadow-soft-md hover:-translate-y-0.5"
        >
          Отправить заявку →
        </button>
        <p className="text-xs text-olive/40 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
      </form>
    </div>
  );
}
