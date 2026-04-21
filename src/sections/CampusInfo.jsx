import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormContext } from '../hooks/useFormState';
import SectionHeader from '../components/SectionHeader';
import TextInput from '../components/TextInput';
import SubmitButton from '../components/SubmitButton';

const schema = z.object({
  university_name: z.string().min(1, 'University name is required'),
  contact_name: z.string().min(1, 'Contact name is required'),
  contact_title: z.string().min(1, 'Title / Role is required'),
  contact_email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  contact_phone: z.string().min(1, 'Phone number is required'),
  undergraduate_enrollment: z.string().min(1, 'Enrollment is required'),
  estimated_students: z.string().optional(),
});

export default function CampusInfo() {
  const { formData, updateSection, nextStep } = useFormContext();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      university_name: formData.campus_info.university_name,
      contact_name: formData.campus_info.contact_name,
      contact_title: formData.campus_info.contact_title,
      contact_email: formData.campus_info.contact_email,
      contact_phone: formData.campus_info.contact_phone,
      undergraduate_enrollment: formData.campus_info.undergraduate_enrollment?.toString() || '',
      estimated_students: formData.campus_info.estimated_students?.toString() || '',
    },
  });

  const onSubmit = (data) => {
    updateSection('campus_info', {
      ...data,
      undergraduate_enrollment: data.undergraduate_enrollment ? Number(data.undergraduate_enrollment) : null,
      estimated_students: data.estimated_students ? Number(data.estimated_students) : null,
    });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader title="Campus Information" />

      <TextInput
        label="University name"
        error={errors.university_name?.message}
        registration={register('university_name')}
      />
      <TextInput
        label="Primary contact name"
        error={errors.contact_name?.message}
        registration={register('contact_name')}
      />
      <TextInput
        label="Title / Role"
        error={errors.contact_title?.message}
        registration={register('contact_title')}
      />
      <TextInput
        label="Email"
        type="email"
        error={errors.contact_email?.message}
        registration={register('contact_email')}
      />
      <TextInput
        label="Phone number"
        type="tel"
        error={errors.contact_phone?.message}
        registration={register('contact_phone')}
      />
      <TextInput
        label="Estimated undergraduate enrollment"
        type="number"
        error={errors.undergraduate_enrollment?.message}
        registration={register('undergraduate_enrollment')}
      />
      <TextInput
        label="Estimated number of students who will complete the education"
        type="number"
        helperText="If different from total enrollment — e.g., incoming first-year class only"
        error={errors.estimated_students?.message}
        registration={register('estimated_students')}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
        <SubmitButton type="submit">Next</SubmitButton>
      </div>
    </form>
  );
}
