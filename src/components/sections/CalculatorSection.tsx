import Icon from "@/components/ui/icon";
import { BLOG_POSTS, Calculator } from "@/components/sections/shared";

export default function CalculatorSection() {
  return (
    <>
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
    </>
  );
}
