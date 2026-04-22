import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormContext } from '../hooks/useFormState';
import SectionHeader from '../components/SectionHeader';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';
import SubmitButton from '../components/SubmitButton';
import { submitForm } from '../utils/submitForm';

export default function CampusResources() {
  const { formData, updateSection, nextStep, prevStep } = useFormContext();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      counseling_center_name: formData.campus_resources.counseling_center_name,
      counseling_center_contact: formData.campus_resources.counseling_center_contact,
      health_promotion_name: formData.campus_resources.health_promotion_name,
      health_promotion_contact: formData.campus_resources.health_promotion_contact,
      other_resources: formData.campus_resources.other_resources,
    },
  });

  const onSubmit = async (data) => {
    setSubmitError(null);
    setSubmitting(true);
    updateSection('campus_resources', data);
    const fullData = {
      ...formData,
      campus_resources: data,
    };
    try {
      await submitForm(fullData);
      nextStep();
    } catch (err) {
      setSubmitError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader
        title="Campus Resources"
        description="We include campus-specific resources in the student experience so students know exactly where to go for support. Please share what's available on your campus."
      />

      <TextInput
        label="Campus counseling center name"
        registration={register('counseling_center_name')}
      />
      <TextInput
        label="Campus counseling center URL or phone"
        registration={register('counseling_center_contact')}
      />
      <TextInput
        label="Health promotion or wellness office name"
        registration={register('health_promotion_name')}
      />
      <TextInput
        label="Health promotion or wellness office URL or phone"
        registration={register('health_promotion_contact')}
      />
      <TextArea
        label="Any other campus resources you'd like students directed to?"
        registration={register('other_resources')}
      />

      {submitError && (
        <p style={{
          fontSize: 'var(--text-micro)',
          color: 'var(--red)',
          marginTop: '-4px',
          marginBottom: '12px',
          lineHeight: 1.5,
        }}>
          {submitError}
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
        <SubmitButton variant="secondary" onClick={prevStep} disabled={submitting}>Back</SubmitButton>
        <SubmitButton type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </SubmitButton>
      </div>
    </form>
  );
}
