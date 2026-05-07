import { useState } from "react";
import Icon from "@/components/ui/icon";

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

interface ContactsSectionProps {
  onOpenModal: () => void;
}

export default function ContactsSection({ onOpenModal }: ContactsSectionProps) {
  return (
    <>
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

              <ContactFormInline onOpenModal={onOpenModal} />
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
    </>
  );
}
