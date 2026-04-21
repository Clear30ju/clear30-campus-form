import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormContext } from '../hooks/useFormState';
import SectionHeader from '../components/SectionHeader';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from '../components/CheckboxGroup';
import SubmitButton from '../components/SubmitButton';

const schema = z.object({
  launch_timing: z.string().min(1, 'This field is required'),
  launch_timing_other: z.string().optional(),
  populations: z.array(z.string()).min(1, 'Please select at least one option'),
  populations_other: z.string().optional(),
});

const launchOptions = [
  { value: 'new_student_orientation', label: 'New student orientation' },
  { value: 'first_two_weeks', label: 'First two weeks of fall semester' },
  { value: 'rolling', label: 'Rolling throughout the semester' },
  { value: 'other', label: 'Other' },
];

const populationOptions = [
  { value: 'incoming_first_year', label: 'All incoming first-year students' },
  { value: 'all_undergraduate', label: 'All undergraduate students' },
  { value: 'student_athletes', label: 'Student athletes' },
  { value: 'greek_life', label: 'Greek life' },
  { value: 'conduct_referral', label: 'Students referred through conduct process' },
  { value: 'other', label: 'Other' },
];

export default function StudentPopulation() {
  const { formData, updateSection, nextStep, prevStep } = useFormContext();

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      launch_timing: formData.student_population.launch_timing,
      launch_timing_other: formData.student_population.launch_timing_other,
      populations: formData.student_population.populations,
      populations_other: formData.student_population.populations_other,
    },
  });

  const launchTiming = watch('launch_timing');
  const populations = watch('populations');

  const onSubmit = (data) => {
    updateSection('student_population', data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader title="Student Population & Timing" />

      <RadioGroup
        label="When do you plan to launch the education?"
        name="launch_timing"
        options={launchOptions}
        error={errors.launch_timing?.message}
        registration={register('launch_timing')}
        otherValue={launchTiming === 'other' ? watch('launch_timing_other') : undefined}
        onOtherChange={launchTiming === 'other' ? (val) => setValue('launch_timing_other', val) : undefined}
      />

      <Controller
        name="populations"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            label="Which student populations will complete the education?"
            name="populations"
            options={populationOptions}
            selectedValues={field.value}
            onChange={field.onChange}
            otherValue={watch('populations_other')}
            onOtherChange={(val) => setValue('populations_other', val)}
            error={errors.populations?.message}
          />
        )}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
        <SubmitButton variant="secondary" onClick={prevStep}>Back</SubmitButton>
        <SubmitButton type="submit">Next</SubmitButton>
      </div>
    </form>
  );
}
