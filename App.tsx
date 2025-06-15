
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CarouselControls from './components/CarouselControls';
import CookieBanner from './components/CookieBanner';
import ScrollIndicator from './components/ScrollIndicator';
import NewsSection from './components/NewsSection';
import SocialFeedSection from './components/SocialFeedSection';
import Footer from './components/Footer';
import QuadrantSection from './components/QuadrantSection'; 
import AboutUsSection from './components/AboutUsSection';
import LoadingScreen from './components/LoadingScreen'; // Import the new LoadingScreen
// import IndiaMapIcon from './components/IndiaMapIcon'; // No longer directly used here for this section
import { HeroSlide, NewsArticle, FactItem, SocialPost, FooterLinkCategory, MilestoneItem } from './types'; 
import { 
  FacebookIcon, InstagramIcon, AcademicCapIcon, BriefcaseIcon, TrophyIcon,
  RankingUpIcon, PackageIcon, ClubsIcon, PatentIcon 
} from './constants'; 
import { playClickSound } from './utils/soundUtils'; 

import LnctMapModal from "./components/LnctMap";


const heroSlidesData: HeroSlide[] = [
  {
    tag: "Innovations",
    title: "Pioneering the Future",
    description: "Discover how LNCT Group is leading the charge in technological advancements and sustainable solutions for a brighter tomorrow.",
    image: "https://picsum.photos/seed/techinnovationhub/1920/1080", 
    video: "https://test-videos.co.uk/vids/abstract/mp4/h264/720/Abstract_Plexus_720_10s_1MB.mp4", 
    videoType: "video/mp4",
  },
  {
    tag: "Featured Story",
    title: "Excellence in Education",
    description: "How LNCT Group is setting new standards in innovative learning and student development for a rapidly evolving world.",
    image: "https://picsum.photos/seed/universitycourtyard/1920/1080", 
  },
  {
    tag: "Community Impact",
    title: "Building a Better Tomorrow",
    description: "Learn about our initiatives to empower communities and create a positive societal impact across the globe.",
    image: "https://picsum.photos/seed/globalcommunityhands/1920/1080", 
    video: "https://test-videos.co.uk/vids/people/mp4/h264/720/Technology_Work_720_10s_1MB.mp4", 
    videoType: "video/mp4",
  },
];

const educationalMilestonesData: MilestoneItem[] = [
  {
    id: 'edu1',
    year: 'Top Ranking', 
    title: "MP's No. 1 College",
    description: 'Acknowledged as the premier institution in Madhya Pradesh by leading publications.',
    icon: RankingUpIcon,
    categoryColor: 'text-yellow-500', 
    image: 'https://picsum.photos/seed/lnctrankingachievement/400/300', 
  },
  {
    id: 'edu2',
    year: 'Placements',
    title: 'Highest Package: ₹1.12 Cr',
    description: 'Achieving outstanding placement records with the highest package at ₹1.12 Crore.',
    icon: PackageIcon,
    categoryColor: 'text-green-500', 
  },
  {
    id: 'edu3',
    year: 'Student Life',
    title: 'Vibrant Campus: 40+ Clubs',
    description: 'Fostering a dynamic campus environment with over 40 active student clubs.',
    icon: ClubsIcon,
    categoryColor: 'text-yellow-500', 
  },
  {
    id: 'edu4',
    year: 'Research',
    title: 'Innovation Hub: 300+ Patents',
    description: 'Leading in research with over 300 patents filed by students and faculty.',
    icon: PatentIcon,
    categoryColor: 'text-purple-500', 
  },
  {
    id: 'edu5',
    year: 'National Recognition',
    title: 'NIRF Ranking: 170',
    description: 'Securing a prominent position nationally with a NIRF ranking of 170.',
    icon: RankingUpIcon,
    categoryColor: 'text-teal-500', 
  }
];


const businessMilestonesData: MilestoneItem[] = [
  {
    id: 'biz1',
    year: '2008',
    title: 'LNCT Tech Solutions Est.',
    description: 'Ventured into IT services, leveraging academic expertise for industry needs.',
    icon: BriefcaseIcon,
    categoryColor: 'text-indigo-500', 
  },
  {
    id: 'biz2',
    year: '2012',
    title: 'Global Tech Partnership',
    description: 'Collaborated with a leading global firm for joint R&D projects.',
    icon: BriefcaseIcon,
    categoryColor: 'text-rose-500', 
  },
  {
    id: 'biz3',
    year: '2018',
    title: 'Innovations Hub Inaugurated',
    description: 'Launched an incubation center to support startups and entrepreneurs.',
    icon: TrophyIcon,
    categoryColor: 'text-pink-500', 
  },
  {
    id: 'biz4',
    year: '2020',
    title: 'Excellence in Agro-Processing',
    description: 'Received national award for innovation in agro-processing technologies.',
    icon: TrophyIcon,
    categoryColor: 'text-lime-500',
  },
  {
    id: 'biz5',
    year: '2022',
    title: 'Renewable Energy Expansion',
    description: 'Expanded operations into the renewable energy sector with new solar projects.',
    icon: BriefcaseIcon,
    categoryColor: 'text-orange-500', 
  },
];


const newsArticleData: NewsArticle = {
  image: "https://picsum.photos/seed/lnctdirectormessage/600/400",
  category: "PRESS RELEASE",
  title: "Director's Message: Envisioning 2025",
  summary: "LNCT Group Director's message to students and faculty for the upcoming year 2025, outlining vision and goals.",
  authorLine: "By LNCT Communications"
};

const factData: FactItem = {
  category: "FACTS",
  title: "Did you know",
  content: "LNCT Group was established with a vision to provide quality technical education and has since become a premier institution in Central India, fostering innovation and excellence.",
  tagline: "Working Towards Being The Best"
};

const socialPostsData: SocialPost[] = [
  {
    id: 'fb1',
    platform: 'facebook',
    platformIcon: FacebookIcon,
    userLogoText: 'LNCT',
    content: "Our commitment to holistic development is core to our values. Here are some highlights from student activities. Which one inspires you? #ThisIsLNCT #LNCTCampus #StudentLife",
    hashtags: ["#ThisIsLNCT", "#LNCTCampus", "#StudentLife"],
    timestamp: "4 days ago",
    postImage: "https://picsum.photos/seed/lnctstudentlife/600/350",
    imageCredit: "Image Credit: LNCT Archives",
    cardClass: "bg-white border border-slate-200 shadow-lg", 
    textClass: "text-slate-700", 
    iconColorClass: "text-yellow-400" 
  },
  {
    id: 'ig1',
    platform: 'instagram',
    platformIcon: InstagramIcon,
    userLogoText: 'LNCT',
    content: "Learning at LNCT is more than classrooms - it's an experience. That first spark of understanding shapes futures. So, tell us — what discovery brightened your day? #ThisIsLNCT #LNCTLearning...",
    hashtags: ["#ThisIsLNCT", "#LNCTLearning"],
    timestamp: "3 days ago",
    backgroundImage: "https://picsum.photos/seed/lnctlearningexp/600/800",
    cardClass: "bg-gradient-to-br from-pink-600 via-red-500 to-yellow-500", 
    textClass: "text-white", 
    iconColorClass: "text-white" 
  }
];

const footerLinkData: FooterLinkCategory[] = [
  {
    title: "About LNCT",
    links: [
      { name: "The LNCT Group", href: "https://lnct.ac.in/" },
      { name: "Vision & Mission", href: "#" },
      { name: "Leadership", href: "#" },
      { name: "Heritage", href: "#" },
      { name: "Sustainability", href: "#" },
      { name: "Innovation", href: "#" },
    ],
  },
  {
    title: "Academics",
    links: [
      { name: "Programs Offered", href: "#" },
      { name: "Admissions", href: "#" },
      { name: "Faculty", href: "#" },
      { name: "Research", href: "#" },
      { name: "Departments", href: "#" },
    ],
  },
  {
    title: "Student Life",
    links: [
      { name: "Campus Facilities", href: "#" },
      { name: "Clubs & Societies", href: "#" },
      { name: "Hostel Life", href: "#" },
      { name: "Events", href: "#" },
      { name: "Alumni", href: "#" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { name: "Careers at LNCT", href: "#" },
      { name: "News & Updates", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Sitemap", href: "#" },
    ],
  },
];


const App: React.FC = () => {
  const [appIsLoading, setAppIsLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0); 
  const [isCarouselPaused, setIsCarouselPaused] = useState<boolean>(false);
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [showMap, setShowMap] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const indiaMapSectionRef = useRef<HTMLDivElement>(null); 
  const aboutUsRef = useRef<HTMLDivElement>(null); 
  const quadrantSectionRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const socialFeedRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const sectionData = [
    { name: "Home", ref: heroRef, id: "home" },
    { name: "India Map", ref: indiaMapSectionRef, id: "india-map" }, 
    { name: "About Us", ref: aboutUsRef, id: "about" }, 
    { name: "Achievements", ref: quadrantSectionRef, id: "achievements" }, 
    { name: "News", ref: newsRef, id: "news" },
    { name: "Connect", ref: socialFeedRef, id: "connect" },
    { name: "Info", ref: footerRef, id: "info" },
  ];
  const sectionRefs = sectionData.map(s => s.ref);


  const handleNextSlideWithSound = useCallback(() => {
    playClickSound();
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlidesData.length);
  }, []);

  const handlePrevSlideWithSound = useCallback(() => {
    playClickSound();
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + heroSlidesData.length) % heroSlidesData.length);
  }, []);

  const handlePauseToggleWithSound = useCallback(() => {
    playClickSound();
    setIsCarouselPaused((prevPaused) => !prevPaused);
  }, []);

  useEffect(() => {
    if (isCarouselPaused) {
      return;
    }
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlidesData.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isCarouselPaused]);

  const handleAcceptCookies = () => {
    playClickSound();
    setShowCookieBanner(false);
  };

  const handleDeclineCookies = () => {
    playClickSound();
    setShowCookieBanner(false);
  };

  const handleScroll = useCallback(() => {
    const viewportCenterY = window.scrollY + window.innerHeight / 2;
    let newActiveIndex = 0;
    let smallestDistance = Infinity;

    sectionRefs.forEach((ref, index) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const sectionGlobalTop = rect.top + window.scrollY; 
        const sectionHeight = ref.current.offsetHeight;
        const sectionCenterY = sectionGlobalTop + sectionHeight / 2;
        const distance = Math.abs(viewportCenterY - sectionCenterY);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          newActiveIndex = index;
        }
      }
    });
    setActiveSectionIndex(newActiveIndex);
  }, [sectionRefs]); 

  useEffect(() => {
    if (appIsLoading) return; 
    handleScroll(); 
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true }); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [appIsLoading, handleScroll]);

  const handleSectionNavigation = useCallback((index: number) => {
    playClickSound();
    const sectionRef = sectionData[index]?.ref;
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start', 
      });
    }
  }, [sectionData]); // Added sectionData to dependencies

  const handleLoadingComplete = () => {
    setAppIsLoading(false);
  };

  if (appIsLoading) {
    return <LoadingScreen onLoaded={handleLoadingComplete} duration={4500} />;
  }
  
  return (
    <div className="bg-white min-h-screen text-slate-700 antialiased overflow-x-hidden flex flex-col"> 
      <Navbar navigateToSection={handleSectionNavigation} /> 
      <main className="relative pt-20 md:pt-24 flex-grow"> 
        <div ref={heroRef} id="home">
          <HeroSection slide={heroSlidesData[currentSlideIndex]} />
          <CarouselControls
            currentSlide={currentSlideIndex}
            totalSlides={heroSlidesData.length}
            onPrev={handlePrevSlideWithSound}
            onNext={handleNextSlideWithSound}
            onPauseToggle={handlePauseToggleWithSound}
            isPaused={isCarouselPaused}
          />
        </div>

        {/* India Map Section - Updated with image */}
        <div ref={indiaMapSectionRef} id="india-map" className="relative h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 md:mb-6 text-center">
            India: <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">Digital Nexus</span>
          </h2>
          <div 
            className="w-full max-w-xl md:max-w-2xl aspect-square roun  ded-lg shadow-2xl overflow-hidden bg-slate-900 border-2 border-slate-700"
            // className="w-full h-full rounded-none shadow-none overflow-hidden bg-slate-900"
            // className="w-screen h-screen overflow-hidden bg-slate-900"
          >
            {/* <img
              src="./img/mapl.png"
              alt="Stylized map of India with highlighted region of Madhya Pradesh"
              className="object-contain w-full h-full"
            /> */}

              {/* Clickable image that opens the map modal */}
              {/* <div onClick={() => setShowMap(true)} className="cursor-pointer w-full h-full"> */}
                <img
                  onClick={() => setShowMap(true)}
                  src="/mapl.png"
                  alt="Stylized map"
                  className="object-contain w-full h-full transition hover:opacity-90 cursor-pointer"
                />
              {/* </div> */}

              {/* Modal that appears on click */}
              {showMap && <LnctMapModal onClose={() => setShowMap(false)} />}




            {/* <gmp-map center="37.4220656,-122.0840897" zoom="10" map-id="DEMO_MAP_ID" style="height: 400px"></gmp-map> */}

          </div>
          <p className="text-sm text-slate-600 mt-4 text-center">
            Visualizing India's connectivity, featuring LNCT.
          </p>
        </div>

        <div ref={aboutUsRef} id="about">
          <AboutUsSection />
        </div>
        
        <div ref={quadrantSectionRef} id="achievements"> 
          <QuadrantSection 
            educationalMilestones={educationalMilestonesData}
            businessMilestones={businessMilestonesData}
          />
        </div>

        <div ref={newsRef} id="news">
          <NewsSection newsArticle={newsArticleData} fact={factData} />
        </div>
        
        <div ref={socialFeedRef} id="connect">
          <SocialFeedSection posts={socialPostsData} />
        </div>
      </main>
      <div ref={footerRef} id="info">
        <Footer footerLinkData={footerLinkData} />
      </div>
      <ScrollIndicator 
        numSections={sectionData.length}
        activeSectionIndex={activeSectionIndex}
        onDotClick={handleSectionNavigation}
        sectionNames={sectionData.map(s => s.name)}
      />
      {showCookieBanner && (
        <CookieBanner onAccept={handleAcceptCookies} onDecline={handleDeclineCookies} />
      )}
    </div>
  );
};

export default App;