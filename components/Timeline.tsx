'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
  icon?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      const timeline = timelineRef.current;
      const timelineItems = document.querySelectorAll('.timeline-item');
      
      if (timeline && timelineItems.length > 0) {
        gsap.to(timeline, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
          height: '100%',
          ease: 'none',
        });

        timelineItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                end: 'top center',
                scrub: true,
              },
            }
          );
        });
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="relative py-16">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500">
        <div 
          ref={timelineRef} 
          className="absolute top-0 left-0 w-full bg-white h-0"
          style={{ boxShadow: '0 0 10px rgba(255, 0, 255, 0.5)' }}
        />
      </div>

      {/* Timeline items */}
      <div className="relative">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={`timeline-item relative mb-16 ${
              index % 2 === 0 ? 'ml-auto pl-8 pr-4' : 'mr-auto pr-8 pl-4'
            } w-1/2`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Timeline dot */}
            <div className="absolute top-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg shadow-purple-500/50 flex items-center justify-center"
                 style={{ 
                   left: index % 2 === 0 ? '-3px' : 'auto', 
                   right: index % 2 === 1 ? '-3px' : 'auto',
                   transform: 'translateX(-50%)' 
                 }}>
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>

            {/* Content */}
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <span className="text-sm text-purple-300 bg-purple-900/30 px-2 py-1 rounded-full">
                  {item.date}
                </span>
              </div>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
