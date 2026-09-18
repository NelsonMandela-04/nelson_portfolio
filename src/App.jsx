import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [skillAnimated, setSkillAnimated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const skillsRef = useRef(null);

  const spreads = [
    { id: "toc", type: "toc" },
    { id: "about", type: "about" },
    { id: "education", type: "education" },
    { id: "leadership", type: "leadership" },
    { id: "sports", type: "sports" },
    { id: "story", type: "story" },
    { id: "skills", type: "skills" },
    { id: "services", type: "services" },
    { id: "projects", type: "projects" },
    { id: "creative", type: "creative" },
    { id: "experience", type: "experience" },
    { id: "gallery", type: "gallery" },
    { id: "achievements", type: "achievements" },
    { id: "vision", type: "vision" },
    { id: "contact", type: "contact" }
  ];

  const totalSpreads = spreads.length;

  useEffect(() => {
    const savedTheme = localStorage.getItem("ezitech-theme");

    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "ezitech-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const openBook = () => {
    if (isBookOpen) return;
    setCurrentSpread(0);
    setIsBookOpen(true);
  };

  const closeBook = () => {
    if (!isBookOpen) return;
    setIsBookOpen(false);
    setCurrentSpread(0);
  };

  const nextSpread = () => {
    if (!isBookOpen) {
      openBook();
      return;
    }

    if (currentSpread < totalSpreads - 1) {
      setCurrentSpread((prev) => prev + 1);
    }
  };

  const prevSpread = () => {
    if (currentSpread > 0) {
      setCurrentSpread((prev) => prev - 1);
    }
  };

  const goToSpread = (spreadNumber) => {
    if (
      spreadNumber >= 0 &&
      spreadNumber < totalSpreads
    ) {
      setCurrentSpread(spreadNumber);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();

        if (!isBookOpen) {
          openBook();
        } else {
          nextSpread();
        }
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();

        if (isBookOpen) {
          prevSpread();
        }
      }

      if (e.key === "Escape") {
        e.preventDefault();

        if (isBookOpen) {
          closeBook();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isBookOpen, currentSpread]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillAnimated(true);
          }
        });
      },
      {
        threshold: 0.4
      }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleBookClick = (e) => {
    if (
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.closest("input") ||
      e.target.closest("textarea") ||
      e.target.closest(".toc-item")
    ) {
      return;
    }

    const rect =
      e.currentTarget.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (
      clickX > width * 0.55 &&
      currentSpread < totalSpreads - 1
    ) {
      nextSpread();
    }

    if (
      clickX < width * 0.45 &&
      currentSpread > 0
    ) {
      prevSpread();
    }
  };

  const renderSpread = (spread) => {
    switch (spread.type) {
      case "toc":
        return (
          <TOC
            goToSpread={goToSpread}
          />
        );

      case "about":
        return <About />;

      case "education":
        return <Education />;

      case "leadership":
        return <Leadership />;

      case "sports":
        return <Sports />;

      case "story":
        return <Story />;

      case "skills":
        return (
          <Skills
            skillsRef={skillsRef}
            skillAnimated={skillAnimated}
          />
        );

      case "services":
        return <Services />;

      case "projects":
        return <Projects />;

      case "creative":
        return <Creative />;

      case "experience":
        return <Experience />;

      case "gallery":
        return <Gallery />;

      case "achievements":
        return <Achievements />;

      case "vision":
        return <Vision />;

      case "contact":
        return (
          <Contact
            closeBook={closeBook}
          />
        );

      default:
        return null;
    }
  };

  const getPageLabel = () => {
    if (currentSpread === 0) {
      return "CONTENTS";
    }

    return String(currentSpread).padStart(2, "0");
  };

  return (
    <main
      className={`portfolio-app ${isDarkMode ? "dark-mode" : "light-mode"
        }`}
    >
      {!isBookOpen && (
        <section
          className="closed-book-screen"
          onClick={openBook}
        >
          <div className="background-overlay"></div>

          <button
            className="theme-toggle cover-theme-toggle"
            onClick={(e) => {
              e.stopPropagation();
              toggleTheme();
            }}
            title={
              isDarkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            aria-label={
              isDarkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            <i
              className={`bi ${isDarkMode
                  ? "bi-sun-fill"
                  : "bi-moon-stars-fill"
                }`}
            ></i>
          </button>

          <div className="closed-book-container">
            <div className="book-cover">
              <div className="book-cover-glow"></div>

              <div className="book-cover-content">
                <div className="cover-logo">
                  <img
                    src="/images/ezilogo.jpeg"
                    alt="Ezitech Technologies"
                  />
                </div>

                <span className="cover-small">
                  EZITECH TECHNOLOGIES
                </span>

                <h1>
                  The
                  <br />
                  Journey of
                  <br />
                  Okorie Nelson .T
                </h1>

                <div className="cover-line"></div>

                <p>
                  Okorie Tukwasichukwuobi Nelson
                  <br />
                  Founder & CEO
                </p>

                <button
                  className="open-book-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openBook();
                  }}
                >
                  <i className="bi bi-book-half"></i>
                  Open Portfolio
                </button>

                <div className="cover-hint">
                  <i className="bi bi-mouse"></i>
                  Click any where to open
                </div>

                <div className="cover-year">
                  2026
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {isBookOpen && (
        <section className="opened-book-screen">
          <div className="book-topbar">
            <div className="book-brand">
              <img
                src="/images/ezilogo.jpeg"
                alt="Ezitech Technologies"
                className="brand-logo"
              />

              <span>
                Ezitech Technologies
              </span>
            </div>

            <div className="book-topbar-actions">
              <div className="page-indicator">
                {currentSpread === 0
                  ? "TOC"
                  : `Spread ${currentSpread} of ${totalSpreads - 1
                  }`}
              </div>

              <button
                className="theme-toggle"
                onClick={toggleTheme}
                title={
                  isDarkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                aria-label={
                  isDarkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                <i
                  className={`bi ${isDarkMode
                      ? "bi-sun-fill"
                      : "bi-moon-stars-fill"
                    }`}
                ></i>
              </button>

              <button
                className="close-book-button"
                onClick={closeBook}
                title="Close book"
                aria-label="Close book"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>

          <div
            className="book-opened"
            onClick={handleBookClick}
          >
            <div className="book-shadow"></div>

            <div className="book-page">
              {renderSpread(
                spreads[currentSpread]
              )}

              <div className="page-number">
                {getPageLabel()}
              </div>
            </div>
          </div>

          <div className="book-navigation">
            <button
              className="navigation-button"
              onClick={prevSpread}
              disabled={currentSpread === 0}
            >
              <i className="bi bi-arrow-left"></i>
              <span>Previous</span>
            </button>

            <div className="navigation-dots">
              {spreads.map((spread, index) => (
                <button
                  key={spread.id}
                  className={
                    index === currentSpread
                      ? "navigation-dot active"
                      : "navigation-dot"
                  }
                  onClick={() =>
                    goToSpread(index)
                  }
                  aria-label={`Go to spread ${index + 1
                    }`}
                ></button>
              ))}
            </div>

            <button
              className="navigation-button"
              onClick={nextSpread}
              disabled={
                currentSpread ===
                totalSpreads - 1
              }
            >
              <span>Next</span>
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          <div className="keyboard-help">
            <i className="bi bi-keyboard"></i>
            Use ← → keys to navigate • ESC to close
          </div>
        </section>
      )}
    </main>
  );
}

function TOC({ goToSpread }) {
  const items = [
    ["01", "About Me", 1, "bi-person-circle"],
    ["02", "Education", 2, "bi-mortarboard-fill"],
    ["03", "Leadership", 3, "bi-person-badge-fill"],
    ["04", "Sports", 4, "bi-trophy-fill"],
    ["05", "My Story", 5, "bi-book-half"],
    ["06", "Skills", 6, "bi-code-slash"],
    ["07", "Services", 7, "bi-briefcase-fill"],
    ["08", "Projects", 8, "bi-kanban-fill"],
    ["09", "Creative Work", 9, "bi-palette-fill"],
    ["10", "Experience", 10, "bi-person-workspace"],
    ["11", "Gallery", 11, "bi-images"],
    ["12", "Achievements", 12, "bi-award-fill"],
    ["13", "Vision", 13, "bi-eye-fill"],
    ["14", "Contact", 14, "bi-envelope-fill"]
  ];

  return (
    <div className="spread-content toc-page">
      <PageHeading
        eyebrow="EZITECH TECHNOLOGIES"
        title="Table of Contents"
        text="Explore the journey, education, leadership, technology, sports, creativity and vision of Okorie Tukwasichukwuobi Nelson (AKA) Eziahakaego Obiadada 1."
        icon="bi-journal-bookmark-fill"
      />

      <div className="toc-grid">
        {items.map(
          ([number, title, page, icon]) => (
            <button
              key={number}
              className="toc-item"
              onClick={() =>
                goToSpread(page)
              }
            >
              <span className="toc-number">
                {number}
              </span>

              <span className="toc-icon">
                <i
                  className={`bi ${icon}`}
                ></i>
              </span>

              <span className="toc-title">
                {title}
              </span>

              <i className="bi bi-arrow-right"></i>
            </button>
          )
        )}
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="spread-content">
      <div className="row align-items-center g-5">
        <div className="col-lg-5 text-center">
          <div className="profile-photo-container">
            <div className="profile-photo-ring"></div>

            <img
              src="/images/trust2.jpeg"
              alt="Okorie Tukwasichukwuobi Nelson"
              className="profile-photo"
            />

            <div className="profile-photo-badge">
              <i className="bi bi-patch-check-fill"></i>
              Founder & CEO
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <span className="eyebrow">
            ABOUT ME
          </span>

          <h2 className="spread-title">
            Building ideas into{" "}
            <span>
              meaningful solutions.
            </span>
          </h2>

          <p className="large-text">
            I am Okorie Tukwasichukwuobi
            Nelson, Founder and CEO of
            Ezitech Technologies.
          </p>

          <p>
            I am a computer science
            student, specializing in software development, entrepreneurship,
            leadership and creativity with
            a passion for technology,
            innovation and community impact.
          </p>

          <p>
            My journey combines software
            development, web development and database programming,
            leadership, football, Namibia futsal,
            painting and design.
          </p>

          <div className="about-stats">
            <div>
              <strong>Technology</strong>
              <span>
                Software Engineering / Web Development
              </span>
            </div>

            <div>
              <strong>Leadership</strong>
              <span>
                Community & Organisations
              </span>
            </div>

            <div>
              <strong>Creative</strong>
              <span>
                Mobile App Development & UI/UX Design
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="about-company">
        <div className="company-logo-box">
          <img
            src="/images/ezilogo.jpeg"
            alt="Ezitech Technologies"
          />
        </div>

        <div>
          <span>FOUNDER & CEO</span>

          <h3>
            Ezitech Technologies
          </h3>

          <p>
            A technology focused initiative
            built around software development,
            digital solutions, innovation and
            helping people turn ideas into
            practical technology solutions.
          </p>
        </div>
      </div>
    </div>
  );
}

function Education() {
  const schools = [
    {
      image: "/images/ststephen.jfif",
     
      level: "Nursery & Primary Education",
      name: "Nursery 1 to Primary 2",
      text: "St. Stephen's Nursery & Primary School, Agbudu Udi, Enugu State, Nigeria. Nursery School Certificate."
    },
    {
      image: "/images/community.jfif",
     
      level: "Primary Education",
      name: "Primary School 2 to 3",
      text: "Community Primary School, Ugwueme, Awgu LGA, Enugu State, Nigeria."
    },
    {
      image: "/images/pps.jfif",
      
      level: "Primary Education",
      name: "Primary School 4 to 5",
      text: "Premier Primary School (PPS), Udi, Enugu State, Nigeria."
    },
    {
      image: "/images/idaw.jfif",
      
      level: "Primary Education",
      name: "Primary School 6",
      text: "Idaw River Primary School 1, Achara Layout East, Enugu South Local Government Area (LGA), Enugu State, Nigeria.. Primary School Certificate."
    },
    {
      image: "/images/amry.jfif",
    
      level: "Secondary Education",
      name: "Secondary School JS 1 to JS 3",
      text: "Army Day Secondary School, Awkunanaw (Army Day Gariki) Agbani Road in the Gariki, Awkunanaw axis of Enugu South Local Government Area, Enugu State. But wrote Junior WASC Certificate, in Community Secondary School Ugwueme, Awgu LGA."
    },
    {
      image: "/images/udi.jfif",
     
      level: "Secondary Education",
      name: "Secondary School SS 1 to SS 3",
      text: "Community Secondary School, Agbudu Udi, 2017 – 2019. But wrote Senior Secondary School Certificate (SSCE), and West African Examination Council (WAEC),  at St. Joseph Academy, Umuka Udi Enugu State."
    }

  ];

  return (
    <div className="spread-content">
      <PageHeading
        eyebrow="ACADEMIC JOURNEY"
        title="Education & Academy"
        text="The institutions, training and learning experiences that have shaped my journey."
        icon="bi-mortarboard-fill"
      />

      <div className="education-grid">
        {schools.map((school) => (
          <div
            className="education-card image-card"
            key={school.name}
          >
            <div className="card-image">
              <img
                src={school.image}
                alt={school.name}
              />

              <div className="card-image-placeholder">
                <i
                  className={`bi ${school.icon}`}
                ></i>
              </div>
            </div>

            <div className="education-card-body">
              <span>
                {school.level}
              </span>

              <h3>
                {school.name}
              </h3>

              <p>
                {school.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="universities">
        <div className="university-card image-card">
          <div className="university-image">
            <img
              src="./images/uniben.jfif"
              alt="University of Benin"
            />

            <div className="card-image-placeholder">
            </div>
          </div>

          <div>
            <span>UNIVERSITY</span>

            <h3>
              University of Benin  (UNIBEN)
            </h3>

            <p>
              Diploma programme in Maritime
              studies, University of Benin
              (UNIBEN), Benin City, Edo State, Nigeria. 2020 – 2022.
            </p>
          </div>
        </div>

        <div className="university-card image-card">
          <div className="university-image">
            <img
              src="./images/images.jfif"
              alt="Namibia University of Science and Technology"
            />

            <div className="card-image-placeholder">
    
            </div>
          </div>

          <div>
            <span>UNIVERSITY</span>

            <h3>
              Namibia University of
              Science and Technology
            </h3>

            <p>
              BSc Computer Science /
              Software Engineering journey,
              Faculty of Computing and
              Informatics, Namibia. 2023 - 2025.
            </p>
          </div>
        </div>
      </div>

      <div className="academy-highlight">
        <div className="academy-image">
          <img
            src="/images/lasoplogo.jfif"
            alt="Lagos School of Programming training"
          />
        </div>

        <div>
          <span>
            PROFESSIONAL TRAINING
          </span>

          <h3>
            Lagos School of Programming
          </h3>

          <p>
            FullStack web development
            training covering technologies
            including HTML, CSS, JavaScript,
            React, Node.js, Django Python, mySQL Database and GitHub. 2026 for 6 Months to get more information, visit{" "}
            <a
              href="https://www.lasop.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.lasop.net/
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Leadership() {
  return (
    <div className="spread-content">
      <PageHeading
        eyebrow="LEADERSHIP"
        title="Leadership & Service"
        text="Leadership positions that have helped me develop responsibility, teamwork and organisational skills."
        icon="bi-person-badge-fill"
      />

      <div className="leadership-grid">
        <div className="leadership-card image-card">
          <div className="card-image">
            <img
              src="/images/NSA .jpg"
              alt="NSA Namibia Chapter"
            />

            <div className="card-image-placeholder">
            </div>
          </div>

          <div className="leadership-card-body">
            <span className="year-badge">
              2024 – 2026
            </span>

            <h3>
              Founder & President
            </h3>

            <h4>
              NSA Namibia Chapter
            </h4>

            <p>
              Founded and served as President
              of the NSA Namibia Chapter,
              contributing to student leadership,
              organisation, coordination and
              community development.
            </p>
          </div>
        </div>

        <div className="leadership-card image-card">
          <div className="card-image">
            <img
              src="/images/exect.jpeg"
              alt="Sports leadership"
            />

            <div className="card-image-placeholder">
            </div>
          </div>

          <div className="leadership-card-body">
            <span className="year-badge">
              2021 – 2022
            </span>

            <h3>
              Executive Director of Sports
            </h3>

            <h4>
              Igbo Students Union,
              UNIBEN / UBTH
            </h4>

            <p>
              Served as Executive Director
              of Sports, helping coordinate
              sporting activities while
              promoting teamwork, participation
              and student engagement.
            </p>
          </div>
        </div>

        <div className="leadership-card image-card">
          <div className="card-image">
            <img
              src="/images/exect.jpeg"
              alt="Sports leadership"
            />

            <div className="card-image-placeholder">
            </div>
          </div>

          <div className="leadership-card-body">
            <span className="year-badge">
              2021 – 2022
            </span>

            <h3>
              Executive Director of Sports & Socials
            </h3>

            <h4>
              Ugwueme F
            </h4>

            <p>
              Served as Executive Director
              of Sports, helping coordinate
              sporting activities while
              promoting teamwork, participation
              and student engagement.
            </p>
          </div>
        </div>
        <div className="leadership-card image-card">
          <div className="card-image">
            <img
              src="/images/captain.jpeg"
              alt="Sports leadership"
            />

            <div className="card-image-placeholder">
            
            </div>
          </div>

          <div className="leadership-card-body">
            <span className="year-badge">
              2020 – 2022
            </span>

            <h3>
              Captain
            </h3>

            <h4>
              Martime FC,
              UNIBEN / UBTH
            </h4>

            <p>
              Served as Executive Director
              of Sports, helping coordinate
              sporting activities while
              promoting teamwork, participation
              and student engagement.
            </p>
          </div>
        </div>
      </div>

      <div className="leadership-values">
        <div>
          <i className="bi bi-people-fill"></i>
          <strong>Teamwork</strong>
        </div>

        <div>
          <i className="bi bi-lightbulb-fill"></i>
          <strong>Innovation</strong>
        </div>

        <div>
          <i className="bi bi-shield-check"></i>
          <strong>Responsibility</strong>
        </div>

        <div>
          <i className="bi bi-graph-up-arrow"></i>
          <strong>Growth</strong>
        </div>
      </div>
    </div>
  );
}

function Sports() {
  const sports = [
    {
      image: "/images/trust2.jpeg",
      year: "2021 - 2022",
      title: "Royal Boys FC",
      subtitle: "Top 9"
    },
    {
      image: "/images/samba.jpg",
      year: "2024 - 2025",
      title: "Samba Boys FC/Namibia Futsal",
      subtitle: "Top 9"
    },
    {
      image: "/images/fnb.jpeg",
      year: "2024 - 2025",
      title: "Namibia, FNB FC",
      subtitle: "Top 9 striker"
    },
    {
      image: "/images/martime.jpeg",
      year: "2021 - 2022",
      title: "Faculty of CCT",
      subtitle: "Team Coordination"
    }
  ];

  return (
    <div className="spread-content dark-spread">
      <PageHeading
        eyebrow="SPORTS"
        title="Football & Futsal"
        text="Sports have been an important part of my leadership, teamwork and personal development."
        icon="bi-trophy-fill"
        light
      />

      <div className="sports-grid">
        {sports.map((sport) => (
          <div
            className="sports-card image-card"
            key={`${sport.year}-${sport.title}`}
          >
            <div className="card-image">
              <img
                src={sport.image}
                alt={sport.title}
              />

              <div className="card-image-placeholder">
                <i
                  className={`bi ${sport.icon}`}
                ></i>
              </div>
            </div>

            <div className="sports-card-body">
              <span>{sport.year}</span>

              <h3>
                {sport.title}
              </h3>

              <p>
                {sport.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="sports-quote">
        <i className="bi bi-quote"></i>

        <p>
          Sports taught me that talent can
          open a door, but discipline,
          teamwork and consistency keep
          you moving forward and connected.
        </p>
      </div>
    </div>
  );
}

function Story() {
  const stories = [
    {
      image: "/images/curiosity.jpg",
      label: "THE BEGINNING",
      title: "Curiosity became a passion",
      text: "My interest in technology grew from curiosity and the desire to understand how digital devices and software worked."
    },
    {
      image: "/images/apps.png",
      label: "LEARNING TO CODE",
      title: "Learning through determination",
      text: "I explored programming and web development through tutorials, practice and self-directed learning, gradually building confidence with technologies such as Python, Django, Figma, Canva, HTML, CSS and JavaScript."
    },
    {
      image: "/images/nelson.png",
      label: "EZITECH TECHNOLOGIES",
      title: "Turning an idea into a company",
      text: "Ezitech Technologies grew from my desire to make technology accessible and create practical digital solutions for individuals, businesses and organisations."
    }
  ];

  return (
    <div className="spread-content">
      <PageHeading
        eyebrow="MY STORY"
        title="The Journey"
        text="From curiosity and determination to building Ezitech Technologies."
        icon="bi-book-half"
      />

      <div className="story-grid">
        {stories.map((story) => (
          <div
            className="story-card image-card"
            key={story.label}
          >
            <div className="card-image">
              <img
                src={story.image}
                alt={story.title}
              />

              <div className="card-image-placeholder">
                <i
                  className={`bi ${story.icon}`}
                ></i>
              </div>
            </div>

            <div className="story-card-body">
              <div className="story-number">
                {story.number}
              </div>

              <i
                className={`bi ${story.icon}`}
              ></i>

              <span>{story.label}</span>

              <h3>
                {story.title}
              </h3>

              <p>
                {story.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="ezitech-story">
        <div className="ezitech-logo-mark">
          <img
            src="/images/ezilogo.jpeg"
            alt="Ezitech Technologies"
          />
        </div>

        <div>
          <span>FOUNDER'S NOTE</span>

          <h3>
            The birth of Ezitech Technologies
          </h3>

          <p>
            Named in honor of my late father, Okorie Henry  Eziahakaego, Ezitech is a technology venture rooted in legacy and driven by a future, focused vision. We sit at the intersection of technology, accessibility, creativity, and entrepreneurship. Our journey started humbly with continuous learning, experimentation, and small projects. Today, Ezitech is scaling that foundational spirit to build robust technology solutions designed to create a meaningful impact across the African continent and the global stage.

          </p>
        </div>
      </div>
    </div>
  );
}

function Skills({
  skillsRef,
  skillAnimated
}) {
  const skills = [
    ["Software Development", 90],
    ["Figma", 82],
    ["JavaScript / React", 86],
    ["HTML & CSS", 92],
    ["Database / SQL", 98],
    ["Python / Django", 78],
    ["UI / UX", 80],
    ["Problem Solving", 90],
    ["Canva", 99],
    ["NetBeans", 50]
  ];

  return (
    <div
      className="spread-content"
      ref={skillsRef}
    >
      <PageHeading
        eyebrow="TECHNICAL ABILITIES"
        title="Skills & Expertise"
        text="Technologies and capabilities I continue to develop through academic work, professional training and practical projects."
        icon="bi-code-slash"
      />

      <div className="skills-grid">
        {skills.map(
          ([name, percentage]) => (
            <div
              className="skill-item"
              key={name}
            >
              <div className="skill-label">
                <span>{name}</span>

                <strong>
                  {percentage}%
                </strong>
              </div>

              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{
                    width: skillAnimated
                      ? `${percentage}%`
                      : "0%"
                  }}
                ></div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="technology-icons">
        <div>
          <i className="bi bi-filetype-java"></i>
          <span>Java</span>
        </div>

        <div>
          <i className="bi bi-filetype-js"></i>
          <span>JavaScript</span>
        </div>

        <div>
          <i className="bi bi-filetype-py"></i>
          <span>Python</span>
        </div>

        <div>
          <i className="bi bi-database"></i>
          <span>SQL</span>
        </div>

        <div>
          <i className="bi bi-git"></i>
          <span>Git</span>
        </div>

        <div>
          <i className="bi bi-bootstrap"></i>
          <span>Bootstrap</span>
        </div>
      </div>

      <div className="skill-extra-grid">
        <div>
          <i className="bi bi-palette-fill"></i>
          <strong>UI / UX</strong>
          <span>Design thinking</span>
        </div>

        <div>
          <i className="bi bi-people-fill"></i>
          <strong>Leadership</strong>
          <span>Team coordination</span>
        </div>

        <div>
          <i className="bi bi-chat-dots-fill"></i>
          <strong>Communication</strong>
          <span>Client relations</span>
        </div>

        <div>
          <i className="bi bi-lightbulb-fill"></i>
          <strong>Innovation</strong>
          <span>Creative problem solving</span>
        </div>
      </div>
    </div>
  );
}

function Services() {
  const services = [
    {
      image: "/images/web.jfif",
    
      title: "Web Development",
      text: "Modern websites and web applications designed around real user and business needs."
    },
    {
      image: "/images/responsive.jfif",
     
      title: "Responsive Design",
      text: "Responsive experiences that work across desktops, tablets and mobile devices."
    },
    {
      image: "/images/ecommerce.jfif",
    
      title: "E-Commerce",
      text: "Digital commerce solutions for businesses that want to sell products and services online."
    },
    {
      image: "/images/ul.png",
   
      title: "UI / UX Design",
      text: "Clean interfaces and user experiences focused on usability and visual communication."
    },
    {
      image: "/images/seo.jfif",
     
      title: "SEO",
      text: "Search-friendly websites designed to improve online visibility and discoverability."
    },
    {
      image: "/images/maintenance.jfif",
     
      title: "Hosting & Maintenance",
      text: "Website deployment, maintenance and technical support."
    },
    {
      image: "/images/consult.png",
      
      title: "Technology Consulting",
      text: "Technology guidance for individuals, startups, organisations and businesses."
    },
    {
      image: "/images/gadgets.jfif",
      
      title: "Gadget Sales & Support",
      text: "Technology product support and practical assistance for digital devices."
    }
  ];

  return (
    <div className="spread-content">
      <PageHeading
        eyebrow="EZITECH TECHNOLOGIES"
        title="Services"
        text="Technology services focused on practical solutions, digital growth and innovation."
        icon="bi-briefcase-fill"
      />

      <div className="services-grid">
        {services.map((service) => (
          <div
            className="service-card image-card"
            key={service.title}
          >
            <div className="card-image">
              <img
                src={service.image}
                alt={service.title}
              />

              <div className="card-image-placeholder">
                
              </div>
            </div>

            <div className="service-card-body">
             

              <h3>
                {service.title}
              </h3>

              <p>
                {service.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const projects = [
    {
      image: "/images/job.png",
    
      title: "Ezitech Job Board",
      text: "A platform where companies can post jobs, users can apply, upload resumes and save jobs.",
      tags: ["React", "Django", "API", "Bootstrap", "Database", "JavaScript", "Python", "React Router"],
      link: "https://job-board-frontend-dusky-ten.vercel.app"
    },
    {
      image: "/images/database.png",
     
      title: "Youth Group Database",
      text: "Database solution for attendance tracking, receipt collection and fund request management.",
      tags: ["SQL", "Database", "ERD"],
      link: "https://your-job-board-website.vercel.app"
    },
    {
      image: "/images/barbar.png",
    
      title: "Ezitech042 Barbing Salon",
      text: "From a clean fade to a sharp beard lineup every service is performed with precision, care, and style that speaks for itself.",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      link: "https://ezitech042-barbershop.vercel.app/"
    },
    {
      image: "/images/zobo.png",
      
      title: "Zinny's Bakery",
      text: "Their are passionate about creating delicious cakes, snacks, and beverages that bring joy to every celebration.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://zinnybakey.vercel.app/"
    },
    {
      image: "/images/chibest.png",
    
      title: "Chibest Electrical Accessories",
      text: "A digital platform concept for presenting your trusted supplier of premium chandeliers, lighting solutions, electrical wires, ceiling fans, switches, sockets, and quality electrical materials in Lagos, Nigeria.",
      tags: ["HTML", "CSS", "JavaScript", "Bootstarp"],
      link: "https://mbah-chibest.vercel.app/"
    },
    {
      image: "/images/mental.png",
      
      title: "Mental Health App",
      text: "A digital mental healthcare app,interface concept focused on patient information and user experience to improve in speaking out to professionals.",
      tags: ["UI/UX", "Figma", "Prototype"],
      link: "https://www.figma.com/design/u4w4XS6Cprl6clvlkLSnNf/MOA-Admin?node-id=0-1&p=f&t=NPl5XDPM3sGA0qzD-0"
    },
    {
      image: "/images/blog.png",
    
      title: "Ezitech042 Blogs",
      text: "A digital management solution concept for blog activities, users and administration.",
      tags: ["React", "Django", "SQL Workbench", "API", "Bootstarp"],
      link: "https://ezitect042-lac-eight.vercel.app/"
    },
    {
      image: "/images/portfolio.png",
   
      title: "Ezitech042 Portfolio",
      text: "A personal website that tells all about me and my works.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://ezitech042-portfolio.vercel.app/"
    }
  ];

  return (
    <div className="spread-content">

      <PageHeading
        eyebrow="MY WORK"
        title="Projects"
        text="Selected software, database, web and digital projects."
        icon="bi-kanban-fill"
      />

      <div className="projects-grid">

        {projects.map((project) => (

          <div
            className="project-card image-card"
            key={project.title}
          >

            <div className="project-image">

              <img
                src={project.image}
                alt={project.title}
              />

            </div>


            <div className="project-card-body">

              <div className="project">
               
              </div>


              <h3>
                {project.title}
              </h3>


              <p>
                {project.text}
              </p>


              <div className="project-tags">

                {project.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}

              </div>


              {/* PROJECT LINK */}

              {project.link && (

                <div className="project-links">

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >

                    <i className="bi bi-box-arrow-up-right"></i>

                    View Project

                  </a>

                </div>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

function Creative() {
  return (
    <div className="spread-content">

      <PageHeading
        eyebrow="CREATIVITY"
        title="Painting & Masonry"
        text="Technology is only one part of my creativity."
        icon="bi-palette-fill"
      />

      <div className="creative-grid">

        {/* Painting */}
        <div className="creative-card">

          <div className="creative-image">
            <img
              src="/images/paint.png"
              alt="Nelson painting work"
            />

          </div>

          <div className="creative-body">

            <span>
              <i className="bi bi-brush"></i>
              VISUAL ART
            </span>

            <h3>Painting</h3>

            <p>
              Painting gives me another way
              to express ideas, emotions and
              creativity through visual art.
            </p>

            <div className="creative-action">
              <a
                href="./images/paint.png"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <i className="bi bi-image"></i>
                View my work
              </a>
            </div>

          </div>

        </div>


        {/* Trailor */}
        <div className="creative-card">

          <div className="creative-image">
            <img
              src="/images/trailor.jpeg"
              alt="Nelson Trailor work"
            />

          </div>

          <div className="creative-body">

            <span>
              <i className="bi bi-camera"></i>
              VISUAL STYLING
            </span>

            <h3>Fashion Designer</h3>

            <p>
              Fashion design has transformed my thinking about cloths, into a highly dynamic industry.
            </p>

            <div className="creative-action">
              <a
                href="/images/trailor.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <i className="bi bi-camera"></i>
                View my work
              </a>
            </div>

          </div>

        </div>

      </div>


      {/* Creativity Message */}
      <div className="creative-message">

        <i className="bi bi-stars"></i>

        <div>

          <strong>
            Creativity beyond code
          </strong>

          <p>
            Whether I am writing software,
            designing an interface, painting
            or taking photographs, creativity
            remains at the centre of how I
            approach problems and express ideas.
          </p>

        </div>

      </div>

    </div>
  );
}


function Experience() {
  const experiences = [
    {
      image: "/images/ul.png",
      
      label: "SOFTWARE DEVELOPMENT",
      title: "Developer & Student",
      text: "Building software solutions while studying software engineering and developing practical web, database and programming projects."
    },
    {
      image: "/images/trust2.jpeg",
     
      label: "ENTREPRENEURSHIP",
      title: "Founder & CEO, Ezitech Technologies",
      text: "Developing a technology brand focused on software, digital solutions, innovation and technology services."
    },
    {
      image: "/images/NSA .jpg",
  
      label: "LEADERSHIP",
      title: "Student & Community Leadership",
      text: "Taking responsibility in student organisations, community activities and leadership initiatives."
    }
  ];

  return (
    <div className="spread-content">
      <PageHeading
        eyebrow="JOURNEY"
        title="Experience & Professional Development"
        text="A combination of academic, technical, leadership and continuous-learning experiences."
        icon="bi-briefcase-fill"
      />

      <div className="timeline">
        {experiences.map((experience) => (
          <div
            className="timeline-item image-card"
            key={experience.title}
          >
            <div className="timeline-image">
              <img
                src={experience.image}
                alt={experience.title}
              />

              <div className="card-image-placeholder">
                <i
                  className={`bi ${experience.icon}`}
                ></i>
              </div>
            </div>

            <div className="timeline-icon">
              <i
                className={`bi ${experience.icon}`}
              ></i>
            </div>

            <div className="timeline-content">
              <span>
                {experience.label}
              </span>

              <h3>
                {experience.title}
              </h3>

              <p>
                {experience.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="certification-section">
        <div className="certification-title">
          <i className="bi bi-patch-check-fill"></i>

          <div>
            <span>
              PROFESSIONAL DEVELOPMENT
            </span>

            <h3>
              Training & Certifications
            </h3>
          </div>
        </div>

        <div className="certification-grid">
          <div>
            <strong>
              FullStack Web Development
            </strong>

            <span>
              Lagos School of Programming (LASOP)
            </span>

            <small>
              HTML • CSS • JavaScript • React • Node • Django • Python 
            </small>
          </div>

          <div>
            <strong>
              Google UX Design
            </strong>

            <span>
              Google / Coursera
            </span>

            <small>
              User experience and design principles
            </small>
          </div>

          <div>
            <strong>
              AWS Cloud Practitioner
            </strong>

            <span>
              Amazon Web Services
            </span>

            <small>
              Cloud computing fundamentals
            </small>
          </div>

          <div>
            <strong>
             Database 
            </strong>

            <span>
             SQL
            </span>

            <small>
              Modern backend development data
            </small>
          </div>
        </div>
      </div>

      <div className="workshop-section">
        <span>
          WORKSHOPS & BOOTCAMPS
        </span>

        <div>
          <strong>
            NUST Learning Community
          </strong>

          <strong>
            Database SQL
          </strong>

          <strong>
            Lasop
          </strong>

          <strong>
            Continuous Learning
          </strong>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const images = [
    {
      src: "/images/ET.png",
      title: "Ezitech Technologies"
    },
    {
      src: "/images/leader.png",
      title: "Leadership"
    },
    {
      src: "/images/Cp.png",
      title: "Football"
    },
    {
      src: "/images/curiosity.jpg",
      title: "Creative Work"
    },
    {
      src: "/images/trailor.jpeg",
      title: "Fashion Designer"
    },
    {
      src: "/images/jy.png",
      title: "Journey"
    },
    {
      src: "/images/library.jpeg",
      title: "Library"
    },
    {
      src: "/images/paint.png",
      title: "Painting"
    },
    {
      src: "/images/poster.jpeg",
      title: "Portfolio Poster"
    }
  ];

  return (
    <div className="spread-content">
      <PageHeading
        eyebrow="VISUAL JOURNEY"
        title="Gallery"
        text="A visual collection of moments from my journey."
        icon="bi-images"
      />

      <div className="gallery-grid">
        {images.map((image) => (
          <div
            className="gallery-item"
            key={image.src}
          >
            <img
              src={image.src}
              alt={image.title}
            />

            <div className="gallery-caption">
              <i className="bi bi-image"></i>
              {image.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Achievements() {
  const achievements = [
    {
      image: "/images/trust2.jpeg",
     
      title: "Founder & CEO",
      text: "Ezitech Technologies"
    },
    {
      image: "/images/trust.jpg",
  
      title: "Founder & President",
      text: "NSA Namibia Chapter, 2024 – 2026"
    },
    {
      image: "/images/exect.jpeg",
     
      title: "Executive Director of Sports",
      text: "Igbo Students Union, UNIBEN / UBTH, 2021 – 2022"
    },
    {
      image: "/images/sambafc.jpeg",
    
      title: "Samba Boys FC",
      text: "Top 9, 2024 & 2025"
    }
  ];

  const milestones = [
    ["2020", "Ezitech Technologies journey begins"],
    ["2022", "Major academic and technology experiences"],
    ["2023", "Continued technology education in Namibia"],
    ["2024", "Leadership, football and international exposure"],
    ["2025", "Growth in technical and professional skills"],
    ["2026", "Expanding Ezitech Technologies and building new solutions as a web developer"]
  ];

  return (
    <div className="spread-content">
      <PageHeading
        eyebrow="HIGHLIGHTS"
        title="Achievements & Milestones"
        text="Important experiences and milestones that form part of my journey."
        icon="bi-award-fill"
      />

      <div className="achievement-grid">
        {achievements.map(
          (achievement) => (
            <div
              className="achievement-card image-card"
              key={achievement.title}
            >
              <div className="card-image">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                />
              </div>

              <div className="achievement-card-body">
                <h3>
                  {achievement.title}
                </h3>

                <p>
                  {achievement.text}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="milestone-section">
        <div className="milestone-heading">
          <i className="bi bi-signpost-split-fill"></i>

          <div>
            <span>THE JOURNEY</span>

            <h3>
              Notable Milestones
            </h3>
          </div>
        </div>

        <div className="milestone-grid">
          {milestones.map(
            ([year, text]) => (
              <div
                className="milestone-item"
                key={year}
              >
                <strong>
                  {year}
                </strong>

                <span>
                  {text}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Vision() {
  const values = [
    {
      icon: "bi-lightbulb-fill",
      title: "Innovation",
      text: "Always looking for better ways to solve problems."
    },
    {
      icon: "bi-people-fill",
      title: "People First",
      text: "Technology should improve people's lives."
    },
    {
      icon: "bi-globe2",
      title: "Global Vision",
      text: "Local roots with an ambition to create global impact all over the continent."
    },
    {
      icon: "bi-graph-up-arrow",
      title: "Continuous Learning",
      text: "Growth comes from staying curious and learning new things every single day."
    },
    {
      icon: "bi-shield-check",
      title: "Integrity",
      text: "Building relationships throughtrust, honesty and responsibility."
    },
    {
      icon: "bi-stars",
      title: "Excellence",
      text: "Striving to produce work that creates real value to the people of the world."
    }
  ];

  return (
    <div className="spread-content vision-page">
      <div className="vision-content">
        <span className="eyebrow">
          MY VISION
        </span>

        <h2>
          Technology,
          <br />
          leadership &
          <br />
          creativity.
        </h2>

        <p>
          My vision is to continue growing
          as a technology professional,
          entrepreneur and leader while
          creating solutions that have real
          value for people and communities all over the global.
        </p>
      </div>

      <div className="vision-values">
        {values.map((value) => (
          <div key={value.title}>
            <i
              className={`bi ${value.icon}`}
            ></i>

            <strong>
              {value.title}
            </strong>

            <span>
              {value.text}
            </span>
          </div>
        ))}
      </div>

      <div className="philosophy-box">
        <i className="bi bi-quote"></i>

        <blockquote>
          "Excellence over perfection.
          People first, technology second.
          Local roots, global vision."
        </blockquote>

        <span>
          Okoorie Nelson's Philosophy
        </span>
      </div>
    </div>
  );
}

function Contact({ closeBook }) {
  return (
    <div className="spread-content">
      <PageHeading
        eyebrow="GET IN TOUCH"
        title="Contact Me"
        text="Let's connect, collaborate and build something meaningful together."
        icon="bi-envelope-fill"
      />

      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-icon">
            <i className="bi bi-envelope-fill"></i>
          </div>

          <span>EMAIL</span>

          <a href="mailto:okorietukwasichukwuobi042@gmail.com">
            okorienelson0422@gmail.com
          </a>
        </div>

        <div className="contact-card">
          <div className="contact-icon">
            <i className="bi bi-telephone-fill"></i>
          </div>

          <span>NAMIBIA PHONE</span>

          <a href="tel:+264817086235">
            +264 81 708 6235
          </a>
        </div>

        <div className="contact-card">
          <div className="contact-icon">
            <i className="bi bi-telephone-fill"></i>
          </div>

          <span>NIGERIA PHONE</span>

          <a href="tel:+2348147170527">
            +234 814 717 0527
          </a>
        </div>

        <div className="contact-card">
          <div className="contact-icon">
            <i className="bi bi-buildings-fill"></i>
          </div>

          <span>COMPANY</span>

          <strong>
            Ezitech Technologies
          </strong>
        </div>

        <div className="contact-card">
          <div className="contact-icon">
            <i className="bi bi-person-badge-fill"></i>
          </div>

          <span>POSITION</span>

          <strong>
            Founder & CEO
          </strong>
        </div>

        <div className="contact-card">
          <div className="contact-icon">
            <i className="bi bi-geo-alt-fill"></i>
          </div>

          <span>LOCATION</span>

          <strong>
            Namibia / Nigeria
          </strong>
        </div>
      </div>

      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/tukwasichukwuobi-okorie-983955325/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi bi-linkedin"></i>
          LinkedIn
        </a>

        <a
          href="https://github.com/NelsonMandela-04"
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi bi-github"></i>
          GitHub
        </a>

        <a
          href="https://wa.me/264817086235"
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi bi-whatsapp"></i>
          WhatsApp
        </a>

        <a
          href="https://x.com/Tukwasichu95172"
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi bi-twitter-x"></i>
          X
        </a>

        <a
          href="https://web.facebook.com/profile.php?id=100091634530259"
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi bi-facebook"></i>
          Facebook
        </a>

        <a
          href="https://www.youtube.com/channel/UCmdvxn1PXD7GEHnjN9hj78w"
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi bi-youtube"></i>
          YouTube
        </a>
      </div>

      <div className="contact-actions">
        <a
          className="open-book-button"
          href="/Nelson-CV.pdf"
          download
        >
          <i className="bi bi-download"></i>
          Download CV
        </a>

        <a
          className="open-book-button"
          href="https://wa.me/+264817086235?text=Hello%20Nelson,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-whatsapp"></i>
          Book a Call
        </a>

        <button
          className="open-book-button dark"
          onClick={closeBook}
        >
          <i className="bi bi-book"></i>
          Close Portfolio
        </button>
      </div>
    </div>
  );
}

function PageHeading({
  eyebrow,
  title,
  text,
  icon,
  light = false
}) {
  return (
    <div
      className={
        light
          ? "page-heading light"
          : "page-heading"
      }
    >
      <div className="section-icon">
        <i
          className={`bi ${icon}`}
        ></i>
      </div>

      <span className="eyebrow">
        {eyebrow}
      </span>

      <h2>{title}</h2>

      <p>{text}</p>
    </div>
  );
}

export default App;