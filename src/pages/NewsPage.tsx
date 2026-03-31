import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { mockNews } from "@/data/sites";

const allNews = [
  ...mockNews,
  {
    id: 4,
    title: "Новые категории в каталоге: Спорт и Мода",
    excerpt: "Расширяем охват: теперь в каталоге доступны 2 новые тематические категории для сайтов.",
    date: "10 марта 2024",
    category: "Каталог",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=338&fit=crop",
    readTime: "2 мин",
  },
  {
    id: 5,
    title: "API для разработчиков — ранний доступ",
    excerpt: "Открываем ранний доступ к публичному API для интеграции статистики ТОПСайт в ваши проекты.",
    date: "5 марта 2024",
    category: "Разработка",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=338&fit=crop",
    readTime: "5 мин",
  },
];

export function NewsPage() {
  return (
    <div className="py-10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Новости</span>
          </div>
          <h1 className="font-display font-black text-4xl text-foreground">Последние обновления</h1>
        </div>

        {/* Featured */}
        <Link
          to={`/news/${allNews[0].id}`}
          className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl border border-border shadow-card card-hover overflow-hidden mb-8 group"
        >
          <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
            <img src={allNews[0].image} alt={allNews[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex-1 p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="tag-badge">{allNews[0].category}</span>
              <span className="text-xs text-muted-foreground">{allNews[0].readTime}</span>
              <span className="ml-auto px-2.5 py-1 rounded-full bg-primary text-white text-xs font-semibold">Главное</span>
            </div>
            <h2 className="font-display font-black text-2xl md:text-3xl text-foreground mb-3 group-hover:text-primary transition-colors">
              {allNews[0].title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">{allNews[0].excerpt}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="Calendar" size={12} />
              {allNews[0].date}
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.slice(1).map((news, i) => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className={`bg-white rounded-2xl border border-border shadow-card card-hover overflow-hidden group animate-fade-in stagger-${i + 1}`}
            >
              <div className="aspect-video overflow-hidden">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="tag-badge">{news.category}</span>
                  <span className="text-xs text-muted-foreground">{news.readTime}</span>
                </div>
                <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{news.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{news.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    {news.date}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                    Читать
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NewsDetailPage() {
  const { id } = useParams();
  const news = allNews.find((n) => n.id === Number(id)) || allNews[0];

  return (
    <div className="py-10">
      <div className="container max-w-3xl mx-auto px-4">
        <Link to="/news" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <Icon name="ArrowLeft" size={15} />
          Все новости
        </Link>

        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="tag-badge">{news.category}</span>
              <span className="text-xs text-muted-foreground">{news.readTime}</span>
            </div>
            <h1 className="font-display font-black text-3xl text-foreground mb-4">{news.title}</h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
              <Icon name="Calendar" size={12} />
              {news.date}
            </div>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>{news.excerpt}</p>
              <p>Наша команда продолжает работу над улучшением платформы. Это обновление стало результатом многочисленных запросов от пользователей каталога.</p>
              <p>Мы рады объявить об этих улучшениях и будем продолжать развивать платформу, чтобы сделать её максимально удобной для владельцев сайтов.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
