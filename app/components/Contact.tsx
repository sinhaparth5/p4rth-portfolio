// app/components/Contact.tsx
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";

interface LoaderData {
  csrf: string;
}

export default function Contact() {
  const { csrf } = useLoaderData<LoaderData>();
  const actionData = useActionData<{ success: boolean; error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section id="contact" className="py-20 px-4 z-[100] relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          Get in Touch
        </h2>
        
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to reach out!
        </p>

        <Form
          method="post"
          className="space-y-6 backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-purple-500/20"
        >
          <input type="hidden" name="csrf" value={csrf} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 
                         text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 
                         text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 
                       text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              placeholder="Subject of your message"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-300 mb-2">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={5}
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 
                       text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              placeholder="Your message here..."
            />
          </div>

          {actionData?.error && (
            <div className="text-red-500 text-center bg-red-500/10 py-2 rounded">
              {actionData.error}
            </div>
          )}

          {actionData?.success && (
            <div className="text-green-500 text-center bg-green-500/10 py-2 rounded">
              Message sent successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600
                     hover:from-purple-500 hover:to-cyan-500 text-white font-semibold
                     transition-all duration-300 transform hover:scale-[1.02]
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </Form>
      </div>
    </section>
  );
}