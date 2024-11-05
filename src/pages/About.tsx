import { Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Container from "../components/ui/Container";
import CommonSectionBanner from "../components/helpingCompo/CommonSectionBanner";
import CommonPageBanner from "../components/helpingCompo/CommonPageBanner";
import carWashImg from "../assets/img/quickPass.jpg";
import carWashVideo from "../assets/video/carServiceVideo.mp4";

const { Title, Paragraph, Text } = Typography;

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    isFeatured: true,
    image:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2393", // Replace with an image URL if available
    bio: "With over 15 years in the car service industry, John is dedicated to leading Cleanify with a focus on quality and customer satisfaction.",
  },
  {
    name: "Jane Smith",
    role: "Operations Manager",
    isFeatured: true,
    image:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2393",
    bio: "Jane ensures that every service runs smoothly, upholding our commitment to quality and reliability.",
  },
  {
    name: "Alex Brown",
    role: "Lead Technician",
    isFeatured: false,
    image:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2393",
    bio: "An expert in eco-friendly cleaning techniques, Alex brings a passion for sustainability and precision to every vehicle.",
  },
  {
    name: "Emily White",
    role: "Customer Relations Specialist",
    isFeatured: false,
    image:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2393",
    bio: "Emily is dedicated to providing exceptional customer support, making every client feel valued and informed.",
  },
  {
    name: "Michael Green",
    role: "Technical Specialist",
    isFeatured: false,
    image:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2393",
    bio: "Michael brings cutting-edge technical expertise to Cleanify, keeping our equipment and techniques top-notch.",
  },
  {
    name: "Alex Brown",
    role: "Lead Technician",
    isFeatured: false,
    image:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2393",
    bio: "An expert in eco-friendly cleaning techniques, Alex brings a passion for sustainability and precision to every vehicle.",
  },
  {
    name: "Emily White",
    role: "Customer Relations Specialist",
    isFeatured: false,
    image:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2393",
    bio: "Emily is dedicated to providing exceptional customer support, making every client feel valued and informed.",
  },
  {
    name: "Michael Green",
    role: "Technical Specialist",
    isFeatured: false,
    image:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2393",
    bio: "Michael brings cutting-edge technical expertise to Cleanify, keeping our equipment and techniques top-notch.",
  },
];

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Page Banner */}
      <CommonPageBanner
        title="About Us"
        links={[
          { link: "/", label: "Home" },
          { link: "/about-us", label: "About Us" },
        ]}
      />

      <Container className="py-6">
        {/* About Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between my-16">
          <div className="order-2 md:order-1">
            <CommonSectionBanner
              subTitle="About Cleanify"
              title="Experience the Future of Car Care"
              align="left"
            />
            <Paragraph className="text-lg text-gray-600 leading-relaxed">
              At Cleanify, we redefine car care by offering fast, efficient, and
              eco-friendly cleaning solutions. Utilizing advanced technology and
              sustainable practices, we ensure that your vehicle receives the
              finest treatment, leaving it spotless and revitalized. Our mission
              is to deliver exceptional quality and convenience in every wash.
            </Paragraph>
          </div>
          <figure className="flex items-center justify-center order-1 md:order-2">
            <img
              src={carWashImg}
              alt="Cleanify"
              className="max-w-full md:max-w-[400px] lg:max-w-[550px] min-h-[300px] rounded-md shadow-lg"
            />
          </figure>
        </section>

        {/* Video Section */}
        <section className="my-16 text-center">
          <CommonSectionBanner
            title="Take a Virtual Look"
            subTitle="Quick Overview"
          />
          <div className="flex justify-center mt-8">
            <video
              controls
              className="w-full md:w-3/4 lg:w-1/2 rounded-md shadow-lg"
              src={carWashVideo}
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="my-16">
          <CommonSectionBanner
            title="Our Dedicated Team is Ready to Serve You"
            subTitle="Meet Our Team"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
            {teamMembers.map((member, index: number) => (
              <div
                key={index}
                className={`${
                  member?.isFeatured ? "bg-white border border-primary" : ""
                } rounded-md my-shadow-1`}
              >
                <div className="flex flex-col items-center p-4">
                  <Avatar
                    size={120}
                    src={member.image}
                    icon={<UserOutlined />}
                    className="bg-secondary-100 mb-4"
                  />
                  <Title
                    level={4}
                    className={`${
                      member?.isFeatured ? "!text-primary" : "text-gray-800"
                    }`}
                  >
                    {member.name}
                  </Title>
                  <Text className="text-secondary-200 font-semibold">
                    {member.role}
                  </Text>
                  <Paragraph className="text-gray-500 text-center mt-2 leading-relaxed">
                    {member.bio}
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default About;
