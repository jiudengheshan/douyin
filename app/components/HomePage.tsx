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

const serviceItems = [
  {
    icon: "浴",
    title: "香氛净洗",
    summary: "温水冲洗、专用浴液、护毛素、吹干梳顺，适合日常清洁维护。",
    details: ["皮毛状态检查", "低刺激浴液", "蓬松吹干"],
  },
  {
    icon: "剪",
    title: "精致造型",
    summary: "脸部、脚底、腹底、尾部造型修剪，保留宠物自然轮廓和舒适活动空间。",
    details: ["圆脸修剪", "脚底腹底修整", "尾型整理"],
  },
  {
    icon: "爪",
    title: "基础护理",
    summary: "剪指甲、剃脚毛、清耳、洁眼、肛门腺护理，可单项加购。",
    details: ["指甲打磨", "耳眼清洁", "肛门腺护理"],
  },
  {
    icon: "护",
    title: "皮毛调理",
    summary: "针对换毛、打结、干燥和敏感皮肤，提供去浮毛和深层护理方案。",
    details: ["去浮毛", "开结梳理", "护毛滋养"],
  },
  {
    icon: "猫",
    title: "猫咪低压洗护",
    summary: "独立安静时段，减少噪音和等待，按猫咪情绪分段完成洗护。",
    details: ["低风速吹干", "安抚休息", "防应激节奏"],
  },
  {
    icon: "幼",
    title: "幼宠初体验",
    summary: "为第一次到店的幼犬幼猫设计短流程，建立对洗澡、吹风和触碰的安全感。",
    details: ["短时适应", "轻柔梳洗", "行为引导"],
  },
  {
    icon: "洁",
    title: "口腔与泪痕清洁",
    summary: "温和清洁口周、眼周和泪痕区域，适合浅色毛发或易流泪宠物。",
    details: ["眼周湿敷", "口周清洁", "毛色维护"],
  },
  {
    icon: "养",
    title: "老年宠舒缓护理",
    summary: "缩短站立时间，增加休息和保暖，适合年长、关节敏感或体力较弱的宠物。",
    details: ["分段护理", "保暖吹干", "状态观察"],
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
  const [activeService, setActiveService] = useState(0);
  const [visibleServices, setVisibleServices] = useState(4);
  const [bookingDate, setBookingDate] = useState(today);
  const [arrivalTime, setArrivalTime] = useState("10:30");
  const [notice, setNotice] = useState("");
  const maxServiceIndex = Math.max(0, serviceItems.length - visibleServices);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveService((current) => (current >= maxServiceIndex ? 0 : current + 1));
    }, 3600);

    return () => window.clearInterval(timer);
  }, [maxServiceIndex]);

  useEffect(() => {
    const updateVisibleServices = () => {
      if (window.matchMedia("(max-width: 720px)").matches) {
        setVisibleServices(1);
      } else if (window.matchMedia("(max-width: 980px)").matches) {
        setVisibleServices(2);
      } else {
        setVisibleServices(4);
      }
    };

    updateVisibleServices();
    window.addEventListener("resize", updateVisibleServices);

    return () => window.removeEventListener("resize", updateVisibleServices);
  }, []);

  useEffect(() => {
    setActiveService((current) => Math.min(current, maxServiceIndex));
  }, [maxServiceIndex]);

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
    setArrivalTime("10:30");
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
            <p>护理前先做皮毛检查，洗护中使用低刺激产品；从日常净洗到特殊护理，都按宠物体型、毛量和情绪调整节奏。</p>
          </div>
          <div className="service-carousel" aria-label="常用洗护服务轮播">
            <div className="services" style={{ marginLeft: `calc(-${activeService} * var(--service-step))` }}>
              {serviceItems.map((service) => (
                <article className="service" key={service.title}>
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <ul>
                    {service.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="service-controls" aria-label="切换洗护服务">
              {serviceItems.slice(0, maxServiceIndex + 1).map((service, index) => (
                <button
                  className={`service-dot${index === activeService ? " is-active" : ""}`}
                  type="button"
                  aria-label={service.title}
                  key={service.title}
                  onClick={() => setActiveService(index)}
                />
              ))}
            </div>
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
              <div className="store-map" aria-label="门店位置地图">
                <iframe
                  title="沐爪宠物洗护门店位置"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=121.446%2C31.221%2C121.471%2C31.239&layer=mapnik&marker=31.23%2C121.4585"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  className="map-link"
                  href="https://map.baidu.com/search/%E4%B8%8A%E6%B5%B7%E5%B8%82%E9%9D%99%E5%AE%89%E5%8C%BA%E8%8A%B1%E5%9B%AD%E8%B7%AF%2088%20%E5%8F%B7"
                  target="_blank"
                  rel="noreferrer"
                >
                  打开地图导航
                </a>
              </div>
              <div className="contact-item">
                <strong>联系电话</strong>
                <span>138-0000-8888</span>
              </div>
            </div>
          </div>

          <form className="form" id="bookingForm" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="note">宠物情况</label>
              <textarea id="note" name="note" placeholder="例如：体重、毛量、是否怕水、是否打结" />
            </div>
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
                <label htmlFor="time">期望到店时间</label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  min="10:00"
                  max="19:30"
                  step="1800"
                  value={arrivalTime}
                  onChange={(event) => setArrivalTime(event.target.value)}
                  required
                />
                <span className="field-hint">可选 10:00 - 19:30，提交后前台会电话确认。</span>
              </div>
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
