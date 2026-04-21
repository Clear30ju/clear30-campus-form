export async function submitForm(formData) {
  const payload = {
    ...formData,
    submitted_at: new Date().toISOString(),
  };

  console.log('Form Submission Payload:', JSON.stringify(payload, null, 2));

  // For production: POST to an API endpoint
  // const response = await fetch('/api/submit', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // return response.json();

  return payload;
}
