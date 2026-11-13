import { useEffect, useRef, useState, type ReactNode } from "react";

const base = `${import.meta.env.BASE_URL}assets/`;
const asset = (name: string) => `${base}${name}`;

const images = {
  hotel: asset("438bf.png"),
  familiar: asset("a7a7d.png"),
  corridor: asset("2002d.png"),
  room: asset("a1b43.png"),
  pool: asset("25dfa.png"),
  backrooms: asset("18397.png"),
  photo: asset("4e87d.png"),
  internet: asset("104be.png"),
  tour: asset("6bbc5.png"),
  guide: asset("54f39.png"),
  guideGlow: asset("19974.svg"),
};

const galleryImages = [
  "41e79.png",
  "5e8c5.png",
  "3a9d6.png",
  "e72c3.png",
  "81743.png",
  "aa720.png",
  "5fd88.png",
  "5c8c0.png",
  "7abbc.png",
  "67e60.png",
].map(asset);

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Background({
  src,
  eager = false,
  className = "",
}: {
  src: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <img
      className={`section-bg ${className}`}
      src={src}
      alt=""
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
    />
  );
}

function ActionButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button className={`action ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function CheckInSection() {
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <section
      className={`hotel-section checkin ${checkedIn ? "checked-in" : ""}`}
      aria-labelledby="checkin-title"
    >
      <Background src={images.hotel} eager />
      <div className="shade shade-left" />
      <Reveal className="checkin-copy section-copy">
        <p className="eyebrow">ОТЕЛЬ</p>
        <h1 id="checkin-title" className="glitch-title" data-text="ЗЛОВЕЩАЯ ДОЛИНА">
          ЗЛОВЕЩАЯ
          <br />
          ДОЛИНА
        </h1>
        <p>
          Вы когда-нибудь оказывались в пустом школьном коридоре после уроков? Или на ночной
          парковке, где машины стоят ровно, но вокруг ни души? Или в торговом центре за минуту до
          открытия, когда свет уже горит, а людей ещё нет?
          <br />
          <br />В такие моменты место кажется немного странным — будто вы попали в паузу между двумя
          действиями. Это и есть лиминальное пространство.
        </p>
        <ActionButton onClick={() => setCheckedIn(true)}>
          <span className="desktop-label">ПОЛУЧИТЬ КЛЮЧ ↗</span>
          <span className="mobile-label">ПРОЙТИ НА РЕСЕПШЕН ↗</span>
        </ActionButton>
      </Reveal>

      <div className="guide-state" aria-hidden={!checkedIn}>
        <div className="guide-card">
          <strong>ВАС ВСТРЕЧАЕТ ЭКСКУРСОВОД</strong>
          <p>«Добрый вечер! Я покажу вам отель. У нас всё совершенно обычно. Почти.»</p>
        </div>
        <div className="guide-figure">
          <img className="guide-glow" src={images.guideGlow} alt="" />
          <img className="guide-photo" src={images.guide} alt="Девочка-экскурсовод с ключом" />
        </div>
      </div>
    </section>
  );
}

export function FamiliarSection() {
  return (
    <section className="hotel-section familiar align-right" aria-labelledby="familiar-title">
      <Background src={images.familiar} />
      <div className="shade shade-right" />
      <Reveal className="section-copy">
        <h2 id="familiar-title">ПОЧТИ ЗНАКОМО</h2>
        <p>
          Мы назвали отель <em>«Зловещая долина»</em> из-за ощущения чего-то почти привычного, но
          неправильного. Изначально эффект зловещей долины описывал реакцию на человекоподобные
          объекты. Психологи Кардиффского университета предположили, что похожий эффект бывает и у
          мест. Для нашего отеля это метафора, а не синоним лиминальности.
        </p>
      </Reveal>
    </section>
  );
}

export function CorridorSection() {
  const [explored, setExplored] = useState(false);

  return (
    <section
      className={`hotel-section corridor ${explored ? "is-explored" : ""}`}
      aria-labelledby="corridor-title"
    >
      <Background src={images.corridor} className="corridor-bg" />
      <div className="shade shade-left corridor-shade" />
      <Reveal className="section-copy corridor-copy">
        <h2 id="corridor-title">МЕЖДУ МЕСТАМИ</h2>
        <p>
          <em>Лиминальность</em> — состояние перехода: прежнее осталось позади, а новое ещё не
          наступило. Сегодня так часто описывают атмосферу пустых коридоров, лестниц, залов и других
          пространств, которые кажутся знакомыми, но непривычно тихими.
        </p>
        <ActionButton onClick={() => setExplored((value) => !value)}>
          {explored ? "ВЕРНУТЬСЯ ↙" : "ИССЛЕДОВАТЬ КОРИДОР ↗"}
        </ActionButton>
      </Reveal>
    </section>
  );
}

export function RoomSection() {
  return (
    <section className="hotel-section room" aria-labelledby="room-title">
      <Background src={images.room} />
      <div className="shade shade-full" />
      <div className="shade shade-left" />
      <Reveal className="section-copy">
        <h2 id="room-title">ЧТО ЗДЕСЬ НЕ ТАК?</h2>
        <p>
          Пустая спальня кажется обычной, пока не замечаешь: дверь не доходит до пола, ручка слишком
          высоко, а предметы стоят не на своих местах. Нарушенные ожидания могут вызывать ощущение
          странности даже без явной угрозы.
        </p>
      </Reveal>
    </section>
  );
}

export function PoolSection() {
  const [dark, setDark] = useState(false);

  return (
    <section
      className={`hotel-section pool align-right ${dark ? "lights-out" : ""}`}
      aria-labelledby="pool-title"
    >
      <Background src={images.pool} />
      <div className="pool-dark-layer">
        <Background src={images.pool} />
      </div>
      <div className="shade shade-full pool-base-shade" />
      <Reveal className="section-copy">
        <h2 id="pool-title">
          {dark ? (
            <>
              СВЕТ
              <br />
              ПОГАС
            </>
          ) : (
            <>
              СВЕТ
              <br />
              ТЕНЬ
              <br />
              ПУСТОТА
            </>
          )}
        </h2>
        <p>
          {dark
            ? "В темноте глубина и очертания помещения воспринимаются иначе."
            : "Тусклый свет, повторяющиеся узоры, глубокие тени, закрытые от взгляда углы, идеальная симметрия или её внезапный сбой. Это выразительные приёмы лиминальной эстетики, но не обязательные признаки каждого лиминального пространства."}
        </p>
        <ActionButton onClick={() => setDark((value) => !value)}>
          {dark ? "ВКЛЮЧИТЬ СВЕТ ↗" : "ИЗМЕНИТЬ ОСВЕЩЕНИЕ ↗"}
        </ActionButton>
      </Reveal>
    </section>
  );
}

export function BackroomsSection() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <section
      className={`hotel-section backrooms ${galleryOpen ? "gallery-open" : ""}`}
      aria-labelledby="backrooms-title"
    >
      <Background src={images.backrooms} />
      <div className="shade shade-left" />
      <Reveal className="section-copy backrooms-copy">
        <h2 id="backrooms-title" className="glitch-heading">
          ЭТАЖ
          <br />
          НЕ НАЙДЕН
        </h2>
        <p>
          Интернет превратил пустые пространства в самостоятельную эстетику. «Закулисье» (Backrooms)
          с бесконечными жёлтыми комнатами, dreamcore с образами как из сна, weirdcore со знакомым,
          но искажённым миром по-разному используют знакомые образы, ностальгию и тревогу.
          Лиминальность шире этих направлений.
        </p>
        <ActionButton onClick={() => setGalleryOpen(true)}>ОТКРЫТЬ ГАЛЕРЕЮ ↗</ActionButton>
      </Reveal>
      <div className="gallery" aria-hidden={!galleryOpen}>
        {galleryImages.map((src, index) => (
          <img key={src} src={src} alt={`Лиминальное пространство ${index + 1}`} loading="lazy" />
        ))}
        <ActionButton className="gallery-close" onClick={() => setGalleryOpen(false)}>
          НАЗАД
        </ActionButton>
      </div>
    </section>
  );
}

export function PhotoSection() {
  return (
    <section className="hotel-section photo align-right" aria-labelledby="photo-title">
      <Background src={images.photo} />
      <div className="shade shade-right" />
      <Reveal className="section-copy">
        <h2 id="photo-title">ОДНА ФОТОГРАФИЯ</h2>
        <p>
          В <em>2003</em> году на сайт магазина моделей в американском городе Ошкош выложили обычный
          снимок пустой комнаты с жёлтыми обоями.
          <br />
          <br />В мае <em>2019</em> года его опубликовали на форуме 4chan вместе с короткой страшной
          историей: если «выпасть из реальности», окажешься в бесконечных комнатах с гулом ламп и
          запахом сырого ковра. Так появилось «Закулисье».
          <br />
          <br />
          Самой комнаты давно нет: помещение перестроили.
        </p>
      </Reveal>
    </section>
  );
}

export function InternetSection() {
  return (
    <section className="hotel-section internet" aria-labelledby="internet-title">
      <Background src={images.internet} />
      <div className="shade shade-left" />
      <Reveal className="section-copy">
        <h2 id="internet-title">
          ВЫХОД
          <br />
          ИЗ ИНТЕРНЕТА
        </h2>
        <p>
          Эстетика быстро вышла за пределы форумов. В <em>2022</em> году Кейн Парсонс начал снимать
          на YouTube серию видео о «Закулисье».
          <br />
          <br />
          Появились игры: японская The Exit 8, где нужно искать аномалии в бесконечном подземном
          переходе, и POOLS, где по пустым бассейнам бродишь без единого монстра.
          <br />
          <br />В <em>2025</em> году лиминальности посвятили выставки в Москве и Иванове. А в мае{" "}
          <em>2026</em> года студия A24 выпустила фильм «Закулисье», и снял его тот самый Парсонс.
        </p>
      </Reveal>
    </section>
  );
}

export function TourSection() {
  const [started, setStarted] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const videoPath = `${import.meta.env.BASE_URL}videos/hotel-tour.mp4`;

  return (
    <section
      className={`hotel-section tour ${started ? "tour-started" : ""}`}
      aria-labelledby="tour-title"
    >
      <Background src={images.tour} />
      <div className="shade shade-left" />
      <Reveal className="section-copy tour-copy">
        <h2 id="tour-title">
          ТЕПЕРЬ
          <br />
          ПРОХОДИТЕ
        </h2>
        <p>
          «Вы уже знаете, на что смотреть. Осталось увидеть наш отель своими глазами. Только,
          пожалуйста, не отставайте».
        </p>
        <ActionButton onClick={() => setStarted(true)}>НАЧАТЬ ЭКСКУРСИЮ ↗</ActionButton>
      </Reveal>
      <div className="video-state" aria-hidden={!started}>
        <h2>
          ТЕПЕРЬ
          <br />
          ПРОХОДИТЕ
        </h2>
        <div className="video-frame">
          {videoAvailable ? (
            <video controls playsInline preload="metadata" onError={() => setVideoAvailable(false)}>
              <source src={videoPath} type="video/mp4" />
            </video>
          ) : (
            <p>
              Добавьте файл <strong>/videos/hotel-tour.mp4</strong>, чтобы запустить видеоэкскурсию.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

const RUVIKI_ARTICLE_URL = "https://ru.ruwiki.ru/wiki/Лиминальное_пространство";

export function ExitSection() {
  return (
    <section className="hotel-section exit" aria-label="Выход">
      <Background src={images.hotel} />
      <div className="shade shade-full exit-shade" />
      <Reveal className="section-copy">
        <p className="exit-text">
          Выход там же, где вход.
          <br />
          <br />
          Хотите узнать, откуда всё это взялось и что об этом говорят учёные? Читайте нашу статью
          «Лиминальное пространство» на РУВИКИ.
        </p>
        {RUVIKI_ARTICLE_URL ? (
          <a className="action" href={RUVIKI_ARTICLE_URL} target="_blank" rel="noreferrer">
            ЧИТАТЬ СТАТЬЮ ↗
          </a>
        ) : (
          <span className="action is-disabled" title="Укажите URL в константе RUVIKI_ARTICLE_URL">
            ЧИТАТЬ СТАТЬЮ ↗
          </span>
        )}
        <button
            type="button"
            className="action back-to-top"
            onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
            }
        >
          ВЕРНУТЬСЯ В НАЧАЛО ↑
        </button>
      </Reveal>
    </section>
  );
}
