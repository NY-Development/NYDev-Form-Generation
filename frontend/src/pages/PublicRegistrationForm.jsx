import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { createRegistration } from "../services/registrationService";
import { getForm } from "../services/formService";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const PublicRegistrationForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    referrer: "Social Media",
    accessibility: ""
  });

  useEffect(() => {
    if (!formId) {
      return;
    }

    const fetchForm = async () => {
      setIsLoadingForm(true);
      setErrorMessage("");
      try {
        const data = await getForm(formId);
        setFormDetails(data.form);
      } catch (error) {
        setErrorMessage("Unable to load form details. Please try again.");
      } finally {
        setIsLoadingForm(false);
      }
    };

    fetchForm();
  }, [formId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formId) {
      setErrorMessage("Missing form identifier.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        attendee: {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          phone: formValues.phone
        },
        answers: [
          { label: "referrer", value: formValues.referrer },
          { label: "accessibility", value: formValues.accessibility }
        ]
      };
      const data = await createRegistration(formId, payload);
      navigate(`/forms/${formId}/success`, {
        state: {
          registrationId: data.registration?.registrationId,
          qrPayload: data.qrPayload
        }
      });
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display antialiased text-slate-900 dark:text-slate-100 selection:bg-primary/30" {...pageFade}>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-4 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">church</span>
          </div>
          <h2 className="text-[#111318] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
            {formDetails?.title || "Real Worship Ministry"}
          </h2>
        </div>
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 transition-colors">
          <span className="truncate">Login</span>
        </button>
      </header>
      <main className="flex-1 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div className="w-full max-w-3xl flex flex-col gap-8" variants={staggerContainer} initial="initial" animate="animate">
          <motion.div className="rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800" variants={fadeUp}>
            <div
              className="h-48 w-full bg-gradient-to-r from-blue-600 to-indigo-700 relative flex items-end p-8"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                data-alt="Concert crowd with hands raised in worship lighting"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1510590337019-5ef2d3977e2e?q=80&w=2670&auto=format&fit=crop)"
                }}
              ></div>
              <div className="relative z-10 text-white">
                <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium ring-1 ring-inset ring-white/30 mb-3">
                  Free Event
                </span>
                <h1 className="text-4xl font-black leading-tight tracking-tight mb-2 text-shadow-sm">
                  {formDetails?.title || "Worship Night 2024"}
                </h1>
                <p className="text-blue-100 text-lg font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">calendar_month</span>
                  October 24, 2024 • 7:00 PM
                </p>
              </div>
            </div>
            <div className="p-8">
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                {formDetails?.description ||
                  "Join us for an evening of praise and worship. We are gathering together to lift the name of Jesus high. Invite your friends and family for a night that will refresh your soul."}
              </p>
            </div>
          </motion.div>
          <motion.form
            className="rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-8"
            onSubmit={handleSubmit}
            variants={fadeUp}
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Guest Registration</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Please fill in your details below to secure your spot.</p>
            </div>
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            {isLoadingForm && <p className="text-sm text-slate-500">Loading form details...</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-semibold">
                  First Name <span className="text-red-500">*</span>
                </span>
                <input
                  className="form-input block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary shadow-sm h-11"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="Jane"
                  required
                  type="text"
                  value={formValues.firstName}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-semibold">
                  Last Name <span className="text-red-500">*</span>
                </span>
                <input
                  className="form-input block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary shadow-sm h-11"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  type="text"
                  value={formValues.lastName}
                />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-semibold">
                  Email Address <span className="text-red-500">*</span>
                </span>
                <input
                  className="form-input block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary shadow-sm h-11"
                  name="email"
                  onChange={handleChange}
                  placeholder="jane.doe@example.com"
                  required
                  type="email"
                  value={formValues.email}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-semibold">Phone Number</span>
                <input
                  className="form-input block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary shadow-sm h-11"
                  name="phone"
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  type="tel"
                  value={formValues.phone}
                />
              </label>
            </div>
            <div className="flex flex-col gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-semibold">How did you hear about this event?</span>
                <select
                  className="form-select block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary shadow-sm h-11"
                  name="referrer"
                  onChange={handleChange}
                  value={formValues.referrer}
                >
                  <option>Social Media</option>
                  <option>Friend / Family</option>
                  <option>Church Announcement</option>
                  <option>Website</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-semibold">Do you have any accessibility requirements?</span>
                <textarea
                  className="form-textarea block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary shadow-sm min-h-[100px]"
                  name="accessibility"
                  onChange={handleChange}
                  placeholder="Please let us know if you need wheelchair access, etc."
                  value={formValues.accessibility}
                ></textarea>
              </label>
            </div>
            <div className="mt-4 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined text-green-600 text-lg">verified_user</span>
                <span className="text-xs font-medium uppercase tracking-wide">Secure &amp; QR Enabled</span>
              </div>
              <button
                className="w-full md:w-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Submitting..." : "Complete Registration"}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </motion.form>
          <footer className="flex flex-col items-center justify-center gap-2 py-6 opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
              <span className="text-xs font-medium uppercase tracking-widest">Powered by</span>
              <span className="font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">terminal</span>
                NYDev Form Generator
              </span>
            </div>
            <a className="text-[10px] text-primary hover:underline" href="#">Create your own free form</a>
          </footer>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default PublicRegistrationForm;
