import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

const defaultFormData = {
  campus_info: {
    university_name: '',
    allowed_email_domains: '',
    contact_name: '',
    contact_title: '',
    contact_email: '',
    contact_phone: '',
    undergraduate_enrollment: null,
    estimated_students: null,
    welcome_message: '',
  },
  cannabis_policy: {
    recreational_legal: '',
    violation_consequences: [],
    violation_consequences_other: '',
    amnesty_policy: '',
    policy_text: '',
    policy_emphasis: '',
  },
  content_priorities: {
    topic_ranking: [],
    additional_topics: '',
  },
  student_population: {
    launch_timing: '',
    launch_timing_other: '',
    populations: [],
    populations_other: '',
  },
  implementation: {
    distribution_methods: [],
    distribution_other: '',
    lms: '',
    lms_other: '',
    sso: '',
    it_contact_name: '',
    it_contact_email: '',
  },
  campus_resources: {
    counseling_center_name: '',
    counseling_center_contact: '',
    health_promotion_name: '',
    health_promotion_contact: '',
    other_resources: '',
  },
};

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(defaultFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 7));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const goToStep = (step) => setCurrentStep(step);

  return (
    <FormContext.Provider value={{
      formData,
      updateSection,
      currentStep,
      nextStep,
      prevStep,
      goToStep,
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
