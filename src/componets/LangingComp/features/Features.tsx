import {
  UserGroupIcon,
  BanknotesIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const generalFeatures = [
  {
    title: 'Student & Teacher Management',
    icon: <UserGroupIcon className="h-10 w-10 text-accent" />,
    desc: 'Manage student and teacher records, attendance, and academic performance all in one place.',
  },
  {
    title: 'Fees & Salary Tracking',
    icon: <BanknotesIcon className="h-10 w-10 text-accent" />,
    desc: 'Track fee collection and staff salaries with real-time insights and automation.',
  },
  {
    title: 'Real-time Statistics',
    icon: <ChartBarIcon className="h-10 w-10 text-accent" />,
    desc: 'Get instant access to key statistics like enrollment, performance, and finances.',
  },
  {
    title: 'Parent Interaction',
    icon: <ChatBubbleLeftRightIcon className="h-10 w-10 text-accent" />,
    desc: 'Keep parents informed with updates, notifications, and engagement tools.',
  },
];

const roleBasedFeatures = {
  Admin: [
    {
      title: 'Student & Teacher Management',
      icon: <UserGroupIcon className="h-10 w-10 text-accent" />,
      desc: 'Manage records, attendance, and profiles efficiently.',
    },
    {
      title: 'Fees & Salary Tracking',
      icon: <BanknotesIcon className="h-10 w-10 text-accent" />,
      desc: 'Track fee collections and automate salary disbursement.',
    },
    {
      title: 'Real-time Statistics',
      icon: <ChartBarIcon className="h-10 w-10 text-accent" />,
      desc: 'View data dashboards for admissions, finances, and performance.',
    },
  ],
  Members: [
    {
      title: 'Student Attendance & Performance',
      icon: <ClipboardDocumentCheckIcon className="h-10 w-10 text-accent" />,
      desc: 'Record daily attendance and update marks with ease.',
    },
    {
      title: 'Class Scheduling',
      icon: <CalendarDaysIcon className="h-10 w-10 text-accent" />,
      desc: 'Manage and view class schedules effortlessly.',
    },
    {
      title: 'Parent Interaction',
      icon: <ChatBubbleLeftRightIcon className="h-10 w-10 text-accent" />,
      desc: 'Stay informed via real-time updates and messages.',
    },
    {
      title: 'Performance Tracking',
      icon: <ChartBarIcon className="h-10 w-10 text-accent" />,
      desc: 'View your child’s academic progress and reports.',
    },
  ],
};

const AnimatedCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
    >
      {children}
    </motion.div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-*"> 
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {generalFeatures.map((feature, index) => (
            <AnimatedCard key={index}>
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Role-Based Features
        </h2>

        {Object.entries(roleBasedFeatures).map(([role, features]) => (
          <div key={role} className="mb-16">
            <div className="flex gap-8 justify-center flex-wrap">
              {features.map((feature, idx) => (
                <AnimatedCard key={idx}>
                  <div className="mb-4">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
