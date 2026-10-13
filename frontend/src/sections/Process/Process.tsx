import React, { useEffect, useRef, useState } from 'react';
import { Compass, Palette, Code, Rocket, CheckCircle2, Sparkles, RotateCcw } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HoloCard, { HoloPreset } from '../../components/HoloCard/HoloCard';
import { useContent } from '../../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

interface DeliverableItem {
  title: string;
  format: string;
}

interface ProcessStep {
  num: string;
  phase: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: React.ReactNode;
  desc: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  deliverables: string[];
  techPills: string[];
  preset: HoloPreset;
  foilColor: string;
  backMission: string;
  backDeliverables: DeliverableItem[];
  backStack: string[];
  backKpi: string;
  backAxiom: string;
}

export const Process: React.FC = () => {
  const { content } = useContent();
  const processData = content.process;
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepIcons = [
    <Compass size={20} className="text-[#FF3838]" />,
    <Palette size={20} className="text-[#FF3838]" />,
    <Code size={20} className="text-[#FF3838]" />,
    <Rocket size={20} className="text-[#FF3838]" />,
  ];
  const presets: HoloPreset[] = ['cosmos', 'shards', 'bursts', 'gold'];
  const foilColors = ['#FF3838', '#e2e6ec', '#ff4d4d', '#f59e0b'];

  const steps: ProcessStep[] = (processData.steps || []).map((step, idx) => ({
    ...step,
    icon: stepIcons[idx % stepIcons.length],
    preset: presets[idx % presets.length],
    foilColor: foilColors[idx % foilColors.length],
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      const header = sectionRef.current?.querySelector('.section-header-block');
      if (header) {
        gsap.fromTo(
          header.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 2. Timeline spine progress fill animation with scrub
      if (timelineRef.current && progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 65%',
              end: 'bottom 80%',
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Step cards reveal and node activation
      const timelineItems = sectionRef.current?.querySelectorAll('.process-timeline-item');
      timelineItems?.forEach((item, index) => {
        const contentBox = item.querySelector('.process-step-content-card');
        const cardBox = item.querySelector('.process-holo-wrapper');
        const node = item.querySelector('.process-timeline-node');
        const isEven = index % 2 === 0;

        // Content animation
        if (contentBox) {
          gsap.fromTo(
            contentBox,
            { opacity: 0, x: isEven ? -40 : 40, scale: 0.96 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                once: true,
              },
            }
          );
        }

        // HoloCard animation
        if (cardBox) {
          gsap.fromTo(
            cardBox,
            { opacity: 0, x: isEven ? 40 : -40, scale: 0.94 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              delay: 0.1,
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                once: true,
              },
            }
          );
        }

        // Node illumination
        if (node) {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => setActiveStep(index),
            onEnterBack: () => setActiveStep(index),
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="process-section">
      <div className="process-ambient-glow" />

      <div className="process-container">
        {/* Section Header */}
        <div className="section-header-block text-center">
          <div className="section-tag-wrapper">
            <span className="section-tag-text">{processData.sectionTag}</span>
            <span className="section-tag-line" />
          </div>
          <h2 className="section-main-title">{processData.title}</h2>
          <p className="section-subtitle mx-auto">
            {processData.description}
          </p>

          <div className="process-telemetry-pill">
            <Sparkles size={14} className="text-[#FF3838]" />
            <span>INTERACTIVE TIMELINE • HOVER FOR 3D SHIMMER • CLICK CARD TO FLIP BLUEPRINT</span>
          </div>
        </div>

        {/* Vertical Timeline Container */}
        <div ref={timelineRef} className="process-timeline-wrapper">
          {/* Central Animated Timeline Spine */}
          <div className="process-timeline-spine">
            <div className="process-timeline-track">
              <div ref={progressBarRef} className="process-timeline-progress" />
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="process-timeline-items">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeStep >= idx;

              return (
                <div
                  key={step.num}
                  className={`process-timeline-item ${isEven ? 'item-left' : 'item-right'} ${
                    isActive ? 'is-active-step' : ''
                  }`}
                >
                  {/* Center Node on Spine */}
                  <div className="process-timeline-node-wrap">
                    <div className={`process-timeline-node ${isActive ? 'node-lit' : ''}`}>
                      <div className="process-node-pulse" />
                      <span className="process-node-num">{step.num}</span>
                    </div>
                  </div>

                  {/* Two Sides: Content & HoloCard */}
                  <div className="process-timeline-columns">
                    {/* Column 1: Detailed Briefing (without quote, as quote is now strictly on the HoloCard) */}
                    <div className="process-column process-column-content">
                      <div className="process-step-content-card">
                        <div className="process-card-header-bar">
                          <div className="process-phase-badge">
                            <span className="process-phase-tag">{step.phase}</span>
                            <span className="process-duration-chip">{step.duration}</span>
                          </div>
                          <div className="process-icon-box">{step.icon}</div>
                        </div>

                        <div className="process-card-body">
                          <span className="process-step-subtitle">{step.subtitle}</span>
                          <h3 className="process-step-title">{step.title}</h3>
                          <p className="process-step-desc">{step.desc}</p>

                          <div className="process-deliverables-block">
                            <span className="process-deliverables-heading">Key Milestones & Deliverables:</span>
                            <div className="process-deliverables-list">
                              {step.deliverables.map((item, dIdx) => (
                                <div key={dIdx} className="process-deliverable-item">
                                  <CheckCircle2 size={15} className="text-[#FF3838] shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="process-tech-pills">
                            {step.techPills.map((pill, pIdx) => (
                              <span key={pIdx} className="process-tech-pill">
                                {pill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: 3D Holographic Card (Displays Quote on Front & Tactical Dossier on Back) */}
                    <div className="process-column process-column-holo">
                      <div className="process-holo-wrapper">
                        <div className="process-holo-card-container">
                          <HoloCard
                            preset={step.preset}
                            foilColor={step.foilColor}
                            width={320}
                            radius={16}
                            intensity={0.88}
                            scale={1.1}
                            edgeSparkle={0.85}
                            frame={4}
                            glare={0.55}
                            tiltMax={16}
                            hoverScale={1.05}
                            idle={true}
                            shadow={true}
                            backContent={
                              <>
                                <div className="hc-back-header">
                                  <span className="hc-back-protocol">CREFTO // TACTICAL DOSSIER</span>
                                  <span className="hc-back-status">VERIFIED ✓</span>
                                </div>

                                <div className="hc-back-title-block">
                                  <div className="hc-back-title">{step.title}</div>
                                  <p className="hc-back-mission">{step.backMission}</p>
                                </div>

                                <div>
                                  <span className="hc-back-section-label">KEY DELIVERABLES:</span>
                                  <div className="hc-back-deliverables-list">
                                    {step.backDeliverables.map((item, bIdx) => (
                                      <div key={bIdx} className="hc-back-deliverable-item">
                                        <span className="hc-back-del-title">{item.title}</span>
                                        <span className="hc-back-del-format">{item.format}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <span className="hc-back-section-label">APPROVED TOOLCHAIN:</span>
                                  <div className="hc-back-stack-grid">
                                    {step.backStack.map((tech, sIdx) => (
                                      <span key={sIdx} className="hc-back-stack-pill">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="hc-back-sla-box">
                                  <span className="hc-back-sla-target">{step.backKpi}</span>
                                  <span className="hc-back-sla-time">{step.duration}</span>
                                </div>

                                <div className="hc-back-axiom">"{step.backAxiom}"</div>

                                <div className="hc-back-footer">
                                  <RotateCcw size={11} className="text-[#FF3838]" />
                                  <span>CLICK TO RETURN TO FRONT ⟳</span>
                                </div>
                              </>
                            }
                          >
                            {/* Front Face: Quote & Phase Details */}
                            <div className="hc-front-header">
                              <span className="hc-front-tag">{step.phase}</span>
                              <div className="hc-front-icon-box">{step.icon}</div>
                            </div>

                            <div className="hc-front-quote-box">
                              <span className="hc-quote-mark">“</span>
                              <p className="hc-quote-text">"{step.quote}"</p>
                              <div className="hc-quote-author-wrap">
                                <span className="hc-quote-author">— {step.quoteAuthor}</span>
                                <span className="hc-quote-role">{step.quoteRole}</span>
                              </div>
                            </div>

                            <div className="hc-front-footer">
                              <div className="hc-front-title">{step.title}</div>
                              <div className="hc-front-pill-row">
                                {step.techPills.map((pill, pillIdx) => (
                                  <span key={pillIdx} className="hc-front-pill">
                                    {pill}
                                  </span>
                                ))}
                              </div>
                              <div className="hc-flip-prompt">
                                <RotateCcw size={11} className="text-[#FF3838]" />
                                <span>CLICK CARD TO FLIP BLUEPRINT</span>
                              </div>
                            </div>
                          </HoloCard>

                          <div className="holo-flip-hint">
                            <RotateCcw size={12} className="text-[#FF3838] holo-spin-icon" />
                            <span>CLICK CARD TO FLIP // BLUEPRINT DOSSIER</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
