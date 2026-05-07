import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export const HERO_IMAGE = "https://cdn.poehali.dev/projects/b9909ceb-423f-4796-aaa5-013544a14d2b/files/2f26f809-0513-4372-a4f7-e35bb6d19036.jpg";

export const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Проекты", href: "#projects" },
  { label: "Галерея", href: "#gallery" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Объектов сдано" },
  { value: 12, suffix: " лет", label: "На рынке" },
  { value: 30, suffix: "%", label: "Экономия клиента" },
  { value: 98, suffix: "%", label: "Довольных клиентов" },
];

export const PROJECTS = [
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

export const BLOG_POSTS = [
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

export function useCountUp(target: number, duration = 2000, start = false) {
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

export function StatItem({ value, suffix, label, animate }: { value: number; suffix: string; label: string; animate: boolean }) {
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

export function Calculator() {
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

export function ContactModal({ onClose }: { onClose: () => void }) {
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
