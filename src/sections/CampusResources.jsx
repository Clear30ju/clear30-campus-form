import { useForm } from 'react-hook-form';
import { useFormContext } from '../hooks/useFormState';
import SectionHeader from '../components/SectionHeader';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';
import SubmitButton from '../components/SubmitButton';
import { submitForm } from '../utils/submitForm';

export default function CampusResources() {
  const { formData, updateSection, nextStep, prevStep } = useFormContext();

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
    updateSection('campus_resources', data);
    const fullData = {
      ...formData,
      campus_resources: data,
    };
    await submitForm(fullData);
    nextStep();
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

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
        <SubmitButton variant="secondary" onClick={prevStep}>Back</SubmitButton>
        <SubmitButton type="submit">Submit</SubmitButton>
      </div>
    </form>
  );
}
