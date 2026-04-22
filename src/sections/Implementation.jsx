import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormContext } from '../hooks/useFormState';
import SectionHeader from '../components/SectionHeader';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from '../components/CheckboxGroup';
import TextInput from '../components/TextInput';
import SubmitButton from '../components/SubmitButton';
import Card from '../components/Card';

const schema = z.object({
  distribution_methods: z.array(z.string()).min(1, 'Please select at least one option'),
  distribution_other: z.string().optional(),
  lms: z.string().optional(),
  lms_other: z.string().optional(),
  sso: z.string().optional(),
  it_contact_name: z.string().optional(),
  it_contact_email: z.string().optional().refine(
    (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    'Please enter a valid email'
  ),
});

const distributionOptions = [
  { value: 'email_health_promotion', label: 'Email from health promotion or wellness office' },
  { value: 'orientation', label: 'Integrated into orientation programming' },
  { value: 'lms', label: 'Through your LMS' },
  { value: 'residence_life', label: 'Through residence life' },
  { value: 'other', label: 'Other' },
];

const lmsOptions = [
  { value: 'canvas', label: 'Canvas' },
  { value: 'blackboard', label: 'Blackboard' },
  { value: 'moodle', label: 'Moodle' },
  { value: 'brightspace', label: 'Brightspace (D2L)' },
  { value: 'other', label: 'Other' },
  { value: 'not_sure', label: 'Not sure' },
];

const ssoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'not_sure', label: 'Not sure' },
];

export default function Implementation() {
  const { formData, updateSection, nextStep, prevStep } = useFormContext();

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      distribution_methods: formData.implementation.distribution_methods,
      distribution_other: formData.implementation.distribution_other,
      lms: formData.implementation.lms,
      lms_other: formData.implementation.lms_other,
      sso: formData.implementation.sso,
      it_contact_name: formData.implementation.it_contact_name,
      it_contact_email: formData.implementation.it_contact_email,
    },
  });

  const lms = watch('lms');

  const onSubmit = (data) => {
    updateSection('implementation', data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader
        title="Distribution & Implementation"
        description="Our implementation team handles all technical setup and integration. The following helps us prepare your campus — answer what you can, and we'll follow up on the rest."
      />

      <Controller
        name="distribution_methods"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            label="How do you plan to distribute the education to students?"
            name="distribution_methods"
            options={distributionOptions}
            selectedValues={field.value}
            onChange={field.onChange}
            otherValue={watch('distribution_other')}
            onOtherChange={(val) => setValue('distribution_other', val)}
            error={errors.distribution_methods?.message}
          />
        )}
      />

      <RadioGroup
        label="Which LMS does your campus use?"
        name="lms"
        options={lmsOptions}
        registration={register('lms')}
        otherValue={lms === 'other' ? watch('lms_other') : undefined}
        onOtherChange={lms === 'other' ? (val) => setValue('lms_other', val) : undefined}
        error={errors.lms?.message}
      />

      <RadioGroup
        label="Does your campus use SSO (single sign-on) for student platforms?"
        name="sso"
        options={ssoOptions}
        registration={register('sso')}
        error={errors.sso?.message}
      />

      <Card
        color="var(--surface-tint)"
        shadow={false}
        padding="20px 22px"
        style={{ marginTop: 'var(--space-md)', border: '1px solid var(--hairline)' }}
      >
        <p style={{
          fontSize: 'var(--text-small)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '4px',
        }}>
          IT contact for integration (optional)
        </p>
        <p style={{
          fontSize: 'var(--text-micro)',
          color: 'var(--text-secondary)',
          marginBottom: '18px',
          lineHeight: 1.5,
        }}>
          If you have a contact on your IT team, share their info below — our team will coordinate directly with them to make setup seamless.
        </p>
        <TextInput
          label="Name"
          registration={register('it_contact_name')}
        />
        <TextInput
          label="Email"
          type="email"
          error={errors.it_contact_email?.message}
          registration={register('it_contact_email')}
        />
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
        <SubmitButton variant="secondary" onClick={prevStep}>Back</SubmitButton>
        <SubmitButton type="submit">Next</SubmitButton>
      </div>
    </form>
  );
}
