"use client";
// src/components/privacy/PolicyContent.jsx

const PolicyContent = () => {
  return (
    <section className="bg-[#FCF9F4] px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-heading font-bold text-[#1D1F26] mb-6">
            Privacy Policy
          </h1>

          <p className="max-w-3xl mx-auto text-lg font-body leading-relaxed">
            We’re committed to protecting the privacy and security of our readers.
            This privacy policy explains how we collect, use, and protect the
            information you provide to us when you use our website and subscribe
            to our newsletters.
          </p>

          <div className="w-20 h-[3px] bg-primary mx-auto mt-8"></div>
        </div>

        {/* BODY */}
        <div className="space-y-16 font-body leading-8">

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Information collection and use:
            </h2>

            <p>
              When you subscribe to our newsletters or register for an account on
              our website, we may ask for your name, workplace, and email address.
              You may also choose (optionally) to provide us with your telephone
              number (if you wish to receive communications from us going forward)
              and where you work.
            </p>

            <p className="mt-4">
              We do not collect or store any other personally identifying
              information. We use this information to know who is reading our
              content and to improve our website and newsletters.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Why we collect information
            </h2>

            <h3 className="text-2xl font-heading font-bold mb-4">
              We use it to:
            </h3>

            <ul className="list-disc pl-8 space-y-2">
              <li>Provide you with our service, including access to this website and to email subscriptions;</li>
              <li>Ensure you can log into our website and manage your email subscription;</li>
              <li>Improve and maintain site performance and email deliverability;</li>
              <li>Personalize our products and services;</li>
              <li>Communicate with you about our products and services;</li>
              <li>Recruit you, if you answer one of our job advertisements;</li>
              <li>
                Reach out to you to sell you advertising or advisory services in
                the event that you write us asking that we discuss either of
                these with you;
              </li>
              <li>
                Allow us to reply to your email or calls if you reach out to us
                with an idea, suggestion, story tip or complaint.
              </li>
            </ul>

            <p className="mt-8">
              We track, in aggregate, where our readers are located (by country),
              what they read on our website, and what browser and operating
              systems they use. We use this information to understand our
              readers’ needs and improve our services. We do not track this
              information on a per-user basis.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Who we give your information to
            </h2>

            <ul className="list-disc pl-8 space-y-2">
              <li>
                We <strong>do not sell</strong> your personal information to
                anyone, ever.
              </li>

              <li>
                We may share it with <strong>service providers</strong> with whom
                we contract to deliver you Enterprise, including the provider(s)
                of our mailing list technology or to allow you to share stories
                on WhatsApp, LinkedIn, and other social media platforms.
              </li>

              <li>
                We use it <strong>in aggregate</strong> to speak with our
                advertisers about the size and composition of our audience.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              How long we keep your information
            </h2>

            <p>
              We keep it for as long as you are a subscriber or maintain an
              account with us. If you unsubscribe or close your account, we may
              destroy or retain some or all of your information as required for
              business purposes or as we may be required by local regulations.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Security
            </h2>

            <p>
              We take the security of your information seriously and have
              implemented appropriate technical and organizational measures to
              protect your information from unauthorized access or use.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PolicyContent;