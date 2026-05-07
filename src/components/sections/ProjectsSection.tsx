import { PROJECTS } from "@/components/sections/shared";

export default function ProjectsSection() {
  return (
    <>
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
    </>
  );
}
