import { useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { HERO_IMAGE, NAV_LINKS, STATS, StatItem } from "@/components/sections/shared";

interface HeroSectionProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  statsVisible: boolean;
  statsRef: React.RefObject<HTMLDivElement>;
  onOpenModal: () => void;
}

export default function HeroSection({
  scrolled,
  menuOpen,
  setMenuOpen,
  statsVisible,
  statsRef,
  onOpenModal,
}: HeroSectionProps) {
  return (
    <>
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
                onClick={onOpenModal}
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
                onClick={() => { onOpenModal(); setMenuOpen(false); }}
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
                onClick={onOpenModal}
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
    </>
  );
}
