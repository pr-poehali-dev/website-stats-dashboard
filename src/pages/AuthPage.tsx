import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface AuthPageProps {
  mode: "login" | "register";
}

export default function AuthPage({ mode }: AuthPageProps) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const isRegister = mode === "register";

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10">
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center shadow-blue">
              <Icon name="BarChart3" size={20} className="text-white" />
            </div>
            <span className="font-display font-black text-2xl tracking-tight">
              ТОП<span className="text-primary">Сайт</span>
            </span>
          </Link>
          <h1 className="font-display font-black text-2xl text-foreground mb-1">
            {isRegister ? "Создать аккаунт" : "Вход в аккаунт"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isRegister
              ? "Зарегистрируйтесь, чтобы добавить сайт в каталог"
              : "Войдите, чтобы управлять своими сайтами"}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-card p-7">
          <div className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Имя</label>
                <div className="relative">
                  <Icon name="User" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ваше имя"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <div className="relative">
                <Icon name="Mail" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Минимум 8 символов"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Повторите пароль</label>
                <div className="relative">
                  <Icon name="Lock" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    placeholder="Повторите пароль"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>
            )}

            {!isRegister && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-primary hover:text-blue-700 font-medium transition-colors">
                  Забыли пароль?
                </a>
              </div>
            )}
          </div>

          {isRegister && (
            <div className="mt-4 flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-0.5 accent-primary cursor-pointer" />
              <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
                Я согласен с{" "}
                <a href="#" className="text-primary hover:underline">правилами сервиса</a>{" "}
                и{" "}
                <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
              </label>
            </div>
          )}

          <button className="w-full mt-6 py-3.5 bg-primary text-white font-bold rounded-xl shadow-blue hover:bg-blue-700 hover:shadow-card-hover transition-all flex items-center justify-center gap-2">
            <Icon name={isRegister ? "UserPlus" : "LogIn"} size={17} />
            {isRegister ? "Создать аккаунт" : "Войти"}
          </button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-muted-foreground">или</span>
            </div>
          </div>

          <button className="w-full py-3 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all flex items-center justify-center gap-2">
            <Icon name="Globe" size={15} />
            Войти через Google
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isRegister ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}{" "}
          <Link to={isRegister ? "/login" : "/register"} className="text-primary font-semibold hover:text-blue-700 transition-colors">
            {isRegister ? "Войти" : "Зарегистрироваться"}
          </Link>
        </p>
      </div>
    </div>
  );
}
