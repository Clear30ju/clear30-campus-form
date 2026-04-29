import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormContext } from '../hooks/useFormState';
import SectionHeader from '../components/SectionHeader';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';
import SubmitButton from '../components/SubmitButton';

const domainPattern = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;

const schema = z.object({
  university_name: z.string().min(1, 'University name is required'),
  allowed_email_domains: z
    .string()
    .min(1, 'At least one email domain is required')
    .refine((val) => {
      const parts = val.split(',').map((s) => s.trim().replace(/^@/, '')).filter(Boolean);
      return parts.length > 0 && parts.every((p) => domainPattern.test(p));
    }, 'Enter one or more valid domains, comma-separated (e.g. uvm.edu, alumni.uvm.edu)'),
  contact_name: z.string().min(1, 'Contact name is required'),
  contact_title: z.string().min(1, 'Title / Role is required'),
  contact_email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  contact_phone: z.string().min(1, 'Phone number is required'),
  undergraduate_enrollment: z.string().min(1, 'Enrollment is required'),
  estimated_students: z.string().optional(),
  welcome_message: z.string().optional(),
});

export default function CampusInfo() {
  const { formData, updateSection, nextStep } = useFormContext();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      university_name: formData.campus_info.university_name,
      allowed_email_domains: formData.campus_info.allowed_email_domains,
      contact_name: formData.campus_info.contact_name,
      contact_title: formData.campus_info.contact_title,
      contact_email: formData.campus_info.contact_email,
      contact_phone: formData.campus_info.contact_phone,
      undergraduate_enrollment: formData.campus_info.undergraduate_enrollment?.toString() || '',
      estimated_students: formData.campus_info.estimated_students?.toString() || '',
      welcome_message: formData.campus_info.welcome_message,
    },
  });

  const onSubmit = (data) => {
    const normalizedDomains = data.allowed_email_domains
      .split(',')
      .map((s) => s.trim().replace(/^@/, '').toLowerCase())
      .filter(Boolean)
      .join(', ');
    updateSection('campus_info', {
      ...data,
      allowed_email_domains: normalizedDomains,
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
        label="Student email domains"
        helperText="Domains your students sign in with, comma-separated. Include every domain that may apply (e.g. uvm.edu, alumni.uvm.edu)."
        error={errors.allowed_email_domains?.message}
        registration={register('allowed_email_domains')}
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
      <TextArea
        label="Welcome message (optional)"
        helperText="A short greeting from your campus shown to students when they begin the program. Leave blank to use the default."
        registration={register('welcome_message')}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
        <SubmitButton type="submit">Next</SubmitButton>
      </div>
    </form>
  );
}
