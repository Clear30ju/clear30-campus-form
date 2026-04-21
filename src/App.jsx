import { AnimatePresence, motion } from 'framer-motion';
import { FormProvider, useFormContext } from './hooks/useFormState';
import FormShell from './components/FormShell';
import CampusInfo from './sections/CampusInfo';
import CannabisPolicy from './sections/CannabisPolicy';
import ContentPriorities from './sections/ContentPriorities';
import StudentPopulation from './sections/StudentPopulation';
import Implementation from './sections/Implementation';
import CampusResources from './sections/CampusResources';
import Confirmation from './sections/Confirmation';

const TOTAL_STEPS = 6;

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function FormContent() {
  const { currentStep } = useFormContext();

  if (currentStep > TOTAL_STEPS) {
    return <Confirmation />;
  }

  const sections = {
    1: CampusInfo,
    2: CannabisPolicy,
    3: ContentPriorities,
    4: StudentPopulation,
    5: Implementation,
    6: CampusResources,
  };

  const CurrentSection = sections[currentStep];

  return (
    <FormShell currentStep={currentStep} totalSteps={TOTAL_STEPS}>
      {currentStep === 1 && (
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: 'var(--text-page-title)',
            fontWeight: 500,
            color: 'var(--black)',
            marginBottom: '16px',
            lineHeight: 1.3,
          }}>
            Clear30 Education — Fall 2026 Campus Customization
          </h1>
          <p style={{
            fontSize: 'var(--text-body)',
            fontWeight: 400,
            color: 'var(--black)',
            lineHeight: 1.7,
            marginBottom: '14px',
          }}>
            To build your campus-specific education experience, we need some information about your university's policies, student population, and content priorities. This takes about 10 minutes and ensures your portal is ready before the fall semester.
          </p>
          <p style={{
            fontSize: 'var(--text-body)',
            fontWeight: 400,
            color: 'var(--black)',
            lineHeight: 1.7,
          }}>
            Once submitted, our team will configure your campus portal and you'll receive a preview before launch.
          </p>
          <hr style={{
            border: 'none',
            borderTop: '1px solid var(--light-gray)',
            margin: '32px 0',
          }} />
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <CurrentSection />
        </motion.div>
      </AnimatePresence>
    </FormShell>
  );
}

export default function App() {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
}
