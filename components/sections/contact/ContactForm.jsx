"use client";
const MailIcon = "/assets/icons/mail.svg";
const PhoneIcon = "/assets/icons/phone.svg";
const MapPinIcon = "/assets/icons/map-pin.svg";

const ContactForm = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="grid lg:grid-cols-2 gap-14 items-start">

        <div className="bg-[#161922] rounded-xl p-8 shadow-lg max-w-[520px]">
          <h2 className="font-heading font-bold text-white text-[32px] mb-8">
            Get In Touch
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="First Name*"
              className="w-full bg-[#4B4E57] text-white px-4 py-3 rounded-md outline-none"
            />

            <input
              type="text"
              placeholder="Last Name*"
              className="w-full bg-[#4B4E57] text-white px-4 py-3 rounded-md outline-none"
            />

            <input
              type="text"
              placeholder="+1 000-000-0000"
              className="w-full bg-[#4B4E57] text-white px-4 py-3 rounded-md outline-none"
            />

            <input
              type="email"
              placeholder="Email Address*"
              className="w-full bg-[#4B4E57] text-white px-4 py-3 rounded-md outline-none"
            />

            <textarea
              rows="4"
              placeholder="Message*"
              className="w-full bg-[#4B4E57] text-white px-4 py-3 rounded-md outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full border border-white text-white py-3 rounded-md hover:bg-white hover:text-black transition"
            >
              Submit
            </button>

          </form>
        </div>

       {/* CONTACT INFO */}
<div className="pt-6">
  <p className="text-[#1D1F26] text-[30px] leading-[1.35] font-heading mb-12 max-w-[520px]">
    Find our contact details and get in touch for any assistance or inquiries.
  </p>

  <div className="space-y-10">

    <div className="flex items-start gap-5">
      <img src={PhoneIcon} alt="Phone" className="w-9 h-9 mt-1" />

      <div>
        <h3 className="font-heading font-bold text-[22px] text-[#1D1F26] mb-2">
          Phone Number
        </h3>

        <p className="text-[18px] text-[#1D1F26]">
          +1 254-628-4555
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5">
      <img src={MailIcon} alt="Mail" className="w-9 h-9 mt-1" />

      <div>
        <h3 className="font-heading font-bold text-[22px] text-[#1D1F26] mb-2">
          Email Address
        </h3>

        <p className="text-[18px] text-[#1D1F26]">
          info@thesuccessdigest.com
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5">
      <img src={MapPinIcon} alt="Location" className="w-9 h-9 mt-1" />

      <div>
        <h3 className="font-heading font-bold text-[22px] text-[#1D1F26] mb-2">
          Our Office
        </h3>

        <p className="text-[18px] text-[#1D1F26] max-w-[420px]">
          Clair Street, Killeen, Texas-76541, United States.
        </p>
      </div>
    </div>

  </div>
</div>

      </div>
    </section>
  );
};

export default ContactForm;