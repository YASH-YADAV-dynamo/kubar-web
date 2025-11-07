import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Please fill the correct details'),
  phone: z.string().regex(/^\d{10,}$/, 'Please fill the correct details'),
  message: z.string().min(1, 'Required'),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccess('');
    try {
      const externalRes = await fetch(process.env.NEXT_PUBLIC_CONTACT_WEB_APP_URL as string, {
        method: 'POST',
        body: JSON.stringify({
          sheetName: 'Sheet1',
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phone,
          email: data.email,
          message: data.message,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      const internalRes = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          message: data.message,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (externalRes.ok && internalRes.ok) {
        setSuccess('Form submitted');
        reset();
      } else {
        console.error('External API status:', externalRes.status);
        console.error('Internal API status:', internalRes.status);
        setSuccess('Submission failed. Please try again.');
      }
    } catch (e) {
      console.error('Error submitting form:', e);
      setSuccess('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[70vh] bg-black flex items-center justify-center pb-20">
      <div className="bg-transparent w-[70%] flex flex-col md:flex-row gap-12 items-stretch">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center md:w-1/2 w-full">
          <Image
            src="/batch_group.png"
            alt="Batch Group"
            width={260}
            height={260}
            className="mb-6"
            priority
          />
          <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-2">
            Let's shape tomorrow's finance
          </h2>
          <p className="text-gray-300 text-center text-base md:text-lg">
            Got a question or idea? We're all ears—reach out and let's make something awesome happen!
          </p>
        </div>
        {/* Right Side (Form) */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#F3F3F3] rounded-xl p-6 flex flex-col gap-4 md:w-1/2 w-full shadow-lg"
        >
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                {...register('lastName')}
                placeholder="Last Name"
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring placeholder-gray-400 text-black"
                disabled={loading}
              />
              {errors.lastName && (
                <span className="text-xs text-red-600">{errors.lastName.message}</span>
              )}
            </div>
            <div className="flex-1">
              <input
                {...register('firstName')}
                placeholder="First Name"
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring placeholder-gray-400 text-black"
                disabled={loading}
              />
              {errors.firstName && (
                <span className="text-xs text-red-600">{errors.firstName.message}</span>
              )}
            </div>
          </div>
          <div>
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring placeholder-gray-400 text-black"
              disabled={loading}
            />
            {errors.email && (
              <span className="text-xs text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div>
            <input
              {...register('phone')}
              placeholder="Phone Number"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring placeholder-gray-400 text-black"
              disabled={loading}
            />
            {errors.phone && (
              <span className="text-xs text-red-600">{errors.phone.message}</span>
            )}
          </div>
          <div>
            <textarea
              {...register('message')}
              placeholder="Message"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring min-h-[80px] placeholder-gray-400 text-black"
              disabled={loading}
            />
            {errors.message && (
              <span className="text-xs text-red-600">{errors.message.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-full font-semibold text-lg hover:bg-blue-800 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Finance it!'}
          </button>
          {success && (
            <div className="text-center text-green-600 text-sm mt-2">{success}</div>
          )}
        </form>
      </div>
    </div>
  );
}