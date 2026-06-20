"use client";
// src/components/legal/ContentUsageContent.jsx

const ContentUsageContent = () => {
  return (
    <section className="bg-[#FCF9F4] px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-heading font-bold text-[#1D1F26] mb-6">
            Content Usage Policy
          </h1>

          <div className="w-20 h-[3px] bg-primary mx-auto"></div>
        </div>

        {/* BODY */}
        <div className="space-y-16 font-body leading-8 text-[#1D1F26]">

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Ownership of Content
            </h2>

            <p>
              The Success Digest owns all content on this website, including but
              not limited to advertisements, directories, guides, articles,
              opinions, reviews, text, photographs, images, illustrations, logos,
              trademarks, audio clips, videos, HTML, source and object code,
              software, and data. This ownership also extends to the selection,
              arrangement, and overall design (“look and feel”) of the website.
              The Success Digest reserves all copyrights and intellectual property
              rights. Accessing this website does not grant users ownership of
              any content, code, data, or materials available on or through the
              platform.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Limited Usage Rights
            </h2>

            <p>
              Users may access and view the content on <strong>The Success Digest</strong> using
              a computer or mobile device for <strong>personal, non-commercial use</strong>.
              Unless otherwise stated, you may download or print a single copy of
              any content solely for personal reference. Any other use requires
              <strong> explicit permission</strong> from an authorized representative
              of The Success Digest.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Prohibited Usage
            </h2>

            <p className="mb-4">
              Without prior written authorization from The Success Digest, you may not:
            </p>

            <ul className="list-disc pl-8 space-y-2">
              <li>
                Republish content on any <strong>Internet, Intranet, or Extranet site.</strong>
              </li>
              <li>
                Store content in any <strong>database, archive, compilation, or cache.</strong>
              </li>
              <li>
                Modify, copy, reproduce, distribute, sell, transmit, display, or
                otherwise use any portion of the content for commercial or public
                purposes.
              </li>
              <li>
                Remove, alter, or interfere with <strong>display advertisements</strong> on the website.
              </li>
            </ul>

            <p className="mt-6">
              Unauthorized use of any trademarks, logos, service marks, or trade
              names displayed on the website is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Requesting Content Usage
            </h2>

            <p>
              Users may request permission for personal use of content by
              contacting an authorized representative at{" "}
              <strong>info@thesuccessdigest.com</strong>. However, permission
              does not extend to the use of <strong>trademarks, logos, service
              marks, or trade names</strong> displayed on the website.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Editorial Control
            </h2>

            <p className="mb-4">
              The Success Digest reserves the right to <strong>review, edit,
              modify, or remove</strong> any content posted on or through the
              website. While we are not responsible for user-generated content,
              we may take action to:
            </p>

            <ul className="list-disc pl-8 space-y-2">
              <li>Comply with applicable laws, regulations, or government requests.</li>
              <li>
                Remove content deemed <strong>objectionable</strong> or in violation
                of our <strong>Terms of Use.</strong>
              </li>
              <li>Enforce policies and ensure the integrity of the platform.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Changes to Terms and Conditions
            </h2>

            <p>
              The Success Digest reserves the right to <strong>modify, update,
              add, or remove</strong> any portion of the Terms and Conditions at
              any time. Changes will be effective immediately upon posting on the
              website.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Violation of Terms and Conditions
            </h2>

            <p>
              Users are strictly prohibited from unauthorized use, sharing, or
              modification of any content, including but not limited to text,
              images, videos, trademarks, and software. Violating these terms,
              including security breaches, may result in{" "}
              <strong>civil or criminal liability.</strong>
            </p>
          </div>

          <div>
            <p className="mb-2">
              For any queries or concerns regarding The Success Digest, please contact:
            </p>

            <p className="font-semibold">
              📩 info@thesuccessdigest.com
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContentUsageContent;