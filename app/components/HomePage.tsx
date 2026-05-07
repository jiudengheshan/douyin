"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const slides = [
  {
    src: "/images/pet-shop-reception.png",
    alt: "高端宠物洗护店前台接待与等候区",
    label: "前台接待区",
  },
  {
    src: "/images/pet-shop-wash-area.png",
    alt: "高端宠物洗护店透明洗护区",
    label: "洗护区",
  },
  {
    src: "/images/pet-shop-grooming-area.png",
    alt: "高端宠物洗护店美容造型区",
    label: "美容造型区",
  },
];

const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function HomePage() {
  const today = useMemo(() => formatDate(new Date()), []);
  const [activeSlide, setActiveSlide] = useState(0);
  const [bookingDate, setBookingDate] = useState(today);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const service = String(data.get("service") ?? "");
    const date = String(data.get("date") ?? "");
    const time = String(data.get("time") ?? "");

    setNotice(`${name}，已收到 ${date} ${time} 的「${service}」预约，请保持电话畅通。`);
    form.reset();
    setBookingDate(today);
  };

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="沐爪宠物洗护店首页">
          <span className="brand-mark">爪</span>
          <span>沐爪宠物洗护</span>
        </a>
        <nav className="nav" aria-label="主导航">
          <a href="#services">服务</a>
          <a href="#process">流程</a>
          <a href="#prices">价目</a>
          <a href="#booking">预约</a>
          <a className="button alt" href="#booking">
            立即预约
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="tag">一宠一浴巾 · 分区消毒 · 可视化洗护</span>
            <h1>让毛孩子干净又放松</h1>
            <p className="lead">
              从基础洗澡到造型修剪，沐爪为猫狗提供温和、透明、低压力的洗护体验。护理师会根据毛发、皮肤和性格定制洗护节奏。
            </p>
            <div className="hero-actions">
              <a className="button" href="#booking">
                预约洗护
              </a>
              <a className="button alt" href="#prices">
                查看套餐
              </a>
            </div>
            <div className="proof" aria-label="门店数据">
              <div>
                <strong>4.9</strong>
                <span>顾客评分</span>
              </div>
              <div>
                <strong>30min</strong>
                <span>到店评估</span>
              </div>
              <div>
                <strong>1v1</strong>
                <span>专属护理师</span>
              </div>
            </div>
          </div>
          <div className="hero-media">
            <img
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=82"
              alt="宠物洗护后的狗狗"
            />
            <div className="floating-panel">
              <div>
                <strong>今日可预约 10:30 - 19:30</strong>
                <span>小型犬基础洗护约 60 分钟完成</span>
              </div>
              <a className="button alt" href="tel:13800008888">
                电话咨询
              </a>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="section-head">
            <h2>常用洗护服务</h2>
            <p>护理前先做皮毛检查，洗护中使用低刺激产品，结束后同步吹干、梳理和基础健康观察。</p>
          </div>
          <div className="services">
            <article className="service">
              <div className="service-icon">浴</div>
              <h3>香氛净洗</h3>
              <p>温水冲洗、专用浴液、护毛素、吹干梳顺，适合日常清洁维护。</p>
            </article>
            <article className="service">
              <div className="service-icon">剪</div>
              <h3>精致造型</h3>
              <p>脸部、脚底、腹底、尾部造型修剪，保留宠物自然轮廓和舒适活动空间。</p>
            </article>
            <article className="service">
              <div className="service-icon">护</div>
              <h3>基础护理</h3>
              <p>剪指甲、剃脚毛、清耳、洁眼、肛门腺护理，可单项加购。</p>
            </article>
            <article className="service">
              <div className="service-icon">调</div>
              <h3>皮毛调理</h3>
              <p>针对换毛、打结、干燥和敏感皮肤，提供去浮毛和深层护理方案。</p>
            </article>
          </div>
        </section>

        <section className="split-band" id="process">
          <div className="shop-photo">
            <div className="shop-carousel" aria-label="高端宠物洗护店内环境">
              {slides.map((slide, index) => (
                <img
                  className={`carousel-slide${index === activeSlide ? " is-active" : ""}`}
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                />
              ))}
              <div className="carousel-dots" aria-label="切换店内环境图片">
                {slides.map((slide, index) => (
                  <button
                    className={`carousel-dot${index === activeSlide ? " is-active" : ""}`}
                    type="button"
                    aria-label={slide.label}
                    key={slide.label}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="section-head">
              <h2>洗护流程透明可控</h2>
              <p>每一步都以宠物状态为准，紧张、年幼、年长或敏感宠物会降低刺激并增加休息时间。</p>
            </div>
            <div className="steps">
              <article className="step">
                <b>1</b>
                <div>
                  <h3>到店评估</h3>
                  <p>确认体重、毛量、皮肤状态和是否打结，明确预计时长与费用。</p>
                </div>
              </article>
              <article className="step">
                <b>2</b>
                <div>
                  <h3>分区洗护</h3>
                  <p>独立浴盆和吹水区，用品一客一消毒，减少交叉接触。</p>
                </div>
              </article>
              <article className="step">
                <b>3</b>
                <div>
                  <h3>交付反馈</h3>
                  <p>结束后说明耳朵、皮肤、毛结和指甲情况，并给出居家护理建议。</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="prices">
          <div className="section-head">
            <h2>清晰价目</h2>
            <p>最终价格会根据体型、毛量、打结程度和宠物配合度确认，到店评估后再开始服务。</p>
          </div>
          <div className="price-grid">
            <article className="price-card">
              <small>小型犬 / 短毛猫</small>
              <h3>基础净洗</h3>
              <div className="price">
                ¥88<span> 起</span>
              </div>
              <ul>
                <li>温和洗浴与吹干</li>
                <li>耳眼基础清洁</li>
                <li>指甲修剪</li>
              </ul>
            </article>
            <article className="price-card featured">
              <small>热门套餐</small>
              <h3>洗护造型</h3>
              <div className="price">
                ¥168<span> 起</span>
              </div>
              <ul>
                <li>基础净洗全套</li>
                <li>脚底腹底修剪</li>
                <li>脸部与尾部造型</li>
              </ul>
            </article>
            <article className="price-card">
              <small>换毛季推荐</small>
              <h3>深层护理</h3>
              <div className="price">
                ¥228<span> 起</span>
              </div>
              <ul>
                <li>去浮毛梳理</li>
                <li>护毛素调理</li>
                <li>护理报告反馈</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="booking" id="booking">
          <div>
            <div className="section-head">
              <h2>预约到店</h2>
              <p>提交后前台会在营业时间内联系确认。紧急护理、严重打结或皮肤异常建议先电话沟通。</p>
            </div>
            <div className="contact-list">
              <div className="contact-item">
                <strong>营业时间</strong>
                <span>周一至周日 10:00 - 20:00</span>
              </div>
              <div className="contact-item">
                <strong>门店地址</strong>
                <span>上海市静安区花园路 88 号 1 层</span>
              </div>
              <div className="contact-item">
                <strong>联系电话</strong>
                <span>138-0000-8888</span>
              </div>
            </div>
          </div>

          <form className="form" id="bookingForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">联系人</label>
                <input id="name" name="name" type="text" placeholder="请输入姓名" required />
              </div>
              <div className="field">
                <label htmlFor="phone">手机号</label>
                <input id="phone" name="phone" type="tel" placeholder="请输入手机号" required />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="pet">宠物类型</label>
                <select id="pet" name="pet">
                  <option>小型犬</option>
                  <option>中大型犬</option>
                  <option>短毛猫</option>
                  <option>长毛猫</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="service">预约服务</label>
                <select id="service" name="service">
                  <option>基础净洗</option>
                  <option>洗护造型</option>
                  <option>深层护理</option>
                  <option>单项护理</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="date">预约日期</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={today}
                  value={bookingDate}
                  onChange={(event) => setBookingDate(event.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="time">到店时间</label>
                <select id="time" name="time">
                  <option>10:30</option>
                  <option>12:00</option>
                  <option>14:00</option>
                  <option>16:00</option>
                  <option>18:30</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="note">宠物情况</label>
              <textarea id="note" name="note" placeholder="例如：体重、毛量、是否怕水、是否打结" />
            </div>
            <button className="button" type="submit">
              提交预约
            </button>
            <div className="notice" id="notice" role="status" aria-live="polite">
              {notice}
            </div>
          </form>
        </section>
      </main>

      <footer>
        <strong>沐爪宠物洗护</strong>
        <span>温和洗护 · 透明护理 · 宠物友好空间</span>
        <span>© 2026 Muzhao Pet Grooming</span>
      </footer>
    </>
  );
}
