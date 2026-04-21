import { useForm, Controller } from 'react-hook-form';
import { useFormContext } from '../hooks/useFormState';
import SectionHeader from '../components/SectionHeader';
import DragRank from '../components/DragRank';
import TextArea from '../components/TextArea';
import SubmitButton from '../components/SubmitButton';

const topicItems = [
  { id: 'academic_performance', label: 'How cannabis affects academic performance and motivation' },
  { id: 'mental_health', label: 'Cannabis and mental health' },
  { id: 'tolerance_dependence', label: 'Understanding tolerance, dependence, and cannabis use disorder' },
  { id: 'legal_consequences', label: 'Legal and campus-specific consequences' },
  { id: 'harm_reduction', label: 'Harm reduction for students who choose to use' },
  { id: 'social_norms', label: 'Social norms — perception vs. reality of campus use' },
];

export default function ContentPriorities() {
  const { formData, updateSection, nextStep, prevStep } = useFormContext();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      topic_ranking: formData.content_priorities.topic_ranking.length > 0
        ? formData.content_priorities.topic_ranking
        : topicItems.map((i) => i.id),
      additional_topics: formData.content_priorities.additional_topics,
    },
  });

  const onSubmit = (data) => {
    updateSection('content_priorities', data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader title="Content Priorities" />

      <Controller
        name="topic_ranking"
        control={control}
        render={({ field }) => (
          <DragRank
            label="Please rank the following topics in order of importance to your campus"
            helperText="Drag to reorder — your top priority should be first"
            items={topicItems}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <TextArea
        label="Are there any specific topics you'd like emphasized for your students?"
        placeholder="e.g., concentrates and vaping, edibles, social use vs. solo use"
        registration={register('additional_topics')}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
        <SubmitButton variant="secondary" onClick={prevStep}>Back</SubmitButton>
        <SubmitButton type="submit">Next</SubmitButton>
      </div>
    </form>
  );
}
