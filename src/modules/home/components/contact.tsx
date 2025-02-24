import { socialMediaLinks } from "@/constants";
import ContactForm from "@/components/ui/Forms/Contact";
import SectionTitle from "@/components/ui/SectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    <section
      className="w-full bg-[--color-dark-gray] flex justify-between items-center flex-col p-40 max-sm:p-10 max-sm:justify-center max-sm:items-center max-md:gap-4 max-sm:h-auto max-sm:pt-20 gap-4 text-[--text-color]"
      id="contact"
    >
      <SectionTitle
        title={"Contact"}
        desc={
          "Connect with me for collaboration or inquiries. Find all the necessary contact information to discuss your project's needs."
        }
      />
      <div className="flex gap-4 w-full max-sm:flex-col">
        <ContactForm />
        <div className="w-[200px] flex flex-col">
          <h1 className="text-2xl font-bold">Socials</h1>
          <div className="block w-20 h-[1px] bg-[--color-dark-gray]"></div>
          <p>
            Please feel free to reach out to me via email or phone for any
            professional inquiries, collaboration proposals, or if you just want
            to chat about the latest in data engineering.
          </p>
          <ul className="flex text-2xl justify-between mt-4">
            {socialMediaLinks.map((item, index) => (
              <FontAwesomeIcon key={index} icon={item.iconUrl} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
