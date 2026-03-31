import { useState } from "react";
import Icon from "@/components/ui/icon";

const contacts = [
  { icon: "Mail", label: "Email поддержки", value: "support@topsait.ru", href: "mailto:support@topsait.ru" },
  { icon: "Send", label: "Telegram", value: "@topsait_support", href: "https://t.me/topsait_support" },
  { icon: "Globe", label: "Сайт", value: "topsait.ru", href: "https://topsait.ru" },
];

const faqs = [
  { q: "Сколько стоит добавить сайт?", a: "Базовое размещение в каталоге абсолютно бесплатно. Мы монетизируемся через рекламу." },
  { q: "Как долго идёт модерация?", a: "Обычно проверка занимает от 2 до 24 часов в рабочие дни." },
  { q: "Как работает счётчик?", a: "Скрипт счётчика считает уникальных посетителей и переходы на ваш сайт из нашего каталога." },
  { q: "Можно ли купить рекламу?", a: "Да, мы предлагаем баннерную рекламу и спонсорское размещение в топе. Пишите на ads@topsait.ru." },
];

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="py-10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Контакты</span>
          </div>
          <h1 className="font-display font-black text-4xl text-foreground">Свяжитесь с нами</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-5">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border shadow-card card-hover group"
              >
                <div className="w-11 h-11 gradient-blue rounded-xl flex items-center justify-center shadow-blue shrink-0">
                  <Icon name={c.icon} size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{c.label}</div>
                  <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{c.value}</div>
                </div>
              </a>
            ))}

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-border shadow-card p-5">
              <h3 className="font-bold text-base text-foreground mb-4">Частые вопросы</h3>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">{faq.q}</span>
                      <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={15} className="text-muted-foreground shrink-0" />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-sm text-muted-foreground animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-border shadow-card p-7">
            <h2 className="font-bold text-lg text-foreground mb-6">Написать нам</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Имя</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Тема</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
                >
                  <option value="">Выберите тему</option>
                  <option>Добавление сайта</option>
                  <option>Технические проблемы</option>
                  <option>Реклама и партнёрство</option>
                  <option>Жалоба на сайт</option>
                  <option>Другое</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Сообщение</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Опишите ваш вопрос подробнее..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                />
              </div>
            </div>
            <button className="w-full mt-5 py-3.5 bg-primary text-white font-bold rounded-xl shadow-blue hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <Icon name="Send" size={16} />
              Отправить сообщение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
