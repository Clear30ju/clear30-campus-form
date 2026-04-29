import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormContext } from '../hooks/useFormState';
import SectionHeader from '../components/SectionHeader';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from '../components/CheckboxGroup';
import TextArea from '../components/TextArea';
import SubmitButton from '../components/SubmitButton';

const schema = z.object({
  recreational_legal: z.string().min(1, 'This field is required'),
  violation_consequences: z.array(z.string()).min(1, 'Please select at least one option'),
  violation_consequences_other: z.string().optional(),
  amnesty_policy: z.string().min(1, 'This field is required'),
  policy_text: z.string().optional(),
  policy_emphasis: z.string().optional(),
});

const consequenceOptions = [
  { value: 'educational_program', label: 'Educational program referral' },
  { value: 'judicial_conduct', label: 'Judicial / conduct process' },
  { value: 'probation', label: 'Probation' },
  { value: 'fine', label: 'Fine' },
  { value: 'housing_removal', label: 'Housing removal' },
  { value: 'parental_notification', label: 'Parental notification' },
  { value: 'other', label: 'Other' },
];

export default function CannabisPolicy() {
  const { formData, updateSection, nextStep, prevStep } = useFormContext();

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      recreational_legal: formData.cannabis_policy.recreational_legal,
      violation_consequences: formData.cannabis_policy.violation_consequences,
      violation_consequences_other: formData.cannabis_policy.violation_consequences_other,
      amnesty_policy: formData.cannabis_policy.amnesty_policy,
      policy_text: formData.cannabis_policy.policy_text,
      policy_emphasis: formData.cannabis_policy.policy_emphasis,
    },
  });

  const consequences = watch('violation_consequences');

  const onSubmit = (data) => {
    updateSection('cannabis_policy', data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader title="Campus Cannabis Policy" />

      <RadioGroup
        label="Is recreational cannabis legal in your state?"
        name="recreational_legal"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
        error={errors.recreational_legal?.message}
        registration={register('recreational_legal')}
      />

      <Controller
        name="violation_consequences"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            label="What are the primary consequences for a cannabis policy violation on your campus?"
            name="violation_consequences"
            options={consequenceOptions}
            selectedValues={field.value}
            onChange={field.onChange}
            otherValue={watch('violation_consequences_other')}
            onOtherChange={(val) => setValue('violation_consequences_other', val)}
            error={errors.violation_consequences?.message}
          />
        )}
      />

      <RadioGroup
        label="Does your campus have an amnesty or Good Samaritan policy that covers cannabis-related incidents?"
        name="amnesty_policy"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Unsure' },
        ]}
        error={errors.amnesty_policy?.message}
        registration={register('amnesty_policy')}
      />

      <TextArea
        label="Your campus cannabis policy (optional)"
        helperText="Paste your policy as you'd like it shown to students. It appears verbatim in the module on campus and legal reality. If you'd rather we adapt it from your website, leave this blank and our team will follow up."
        rows={8}
        registration={register('policy_text')}
      />

      <TextArea
        label="Is there anything about your campus policy you'd like emphasized in the student experience?"
        registration={register('policy_emphasis')}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
        <SubmitButton variant="secondary" onClick={prevStep}>Back</SubmitButton>
        <SubmitButton type="submit">Next</SubmitButton>
      </div>
    </form>
  );
}
