import { Typography, Avatar, Card } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Container from "../components/ui/Container";
import CommonSectionBanner from "../components/helpingCompo/CommonSectionBanner";
import CommonPageBanner from "../components/helpingCompo/CommonPageBanner";
import carWashImg from "../assets/img/quickPass.jpg";
import carWashVideo from "../assets/video/carServiceVideo.mp4";
import MyMotion from "../components/helpingCompo/MyMotion";
import Testimonial from "../components/homepage/Testimonial";

const { Title, Paragraph, Text } = Typography;

const teamMembers = [
  {
    name: "Habib Utsho",
    role: "CEO & Founder",
    isFeatured: true,
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQF0XUMaevRy2A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689594587619?e=1736380800&v=beta&t=5IJCZxJyOvfqcVwe1qkd2kJc1bZD6TYOb6yAm0AGFU4",
    bio: "With over 15 years in the car service industry, Habib is passionate about leading Cleanify to new heights, emphasizing innovation and customer care.",
  },
  {
    name: "Jane Smith",
    role: "Director of Operations",
    isFeatured: true,
    image:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2393",
    bio: "Jane drives operational excellence at Cleanify, ensuring that our services are delivered with utmost efficiency and quality.",
  },
  {
    name: "Alex Brown",
    role: "Senior Technician",
    isFeatured: false,
    image:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    bio: "A specialist in eco-friendly cleaning methods, Alex is committed to sustainability and meticulous care in every job.",
  },
  {
    name: "Emily White",
    role: "Client Relations Manager",
    isFeatured: false,
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    bio: "Emily excels at fostering positive relationships with clients, ensuring their needs are met with personalized support.",
  },
  {
    name: "Michael Green",
    role: "Technical Operations Manager",
    isFeatured: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbgk0yfCOe55931lf6q0osfhGRU-fnH8Im1g&s",
    bio: "Michael leads technical operations at Cleanify, integrating advanced technologies to enhance service delivery.",
  },
  {
    name: "Alex Brown",
    role: "Eco-Friendly Solutions Expert",
    isFeatured: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS1psL1Qv49H6UWSme51bCfW473c9MMaRlkw&s",
    bio: "Dedicated to promoting sustainable practices, Alex specializes in eco-friendly solutions for vehicle care.",
  },
  {
    name: "Emily White",
    role: "Customer Success Specialist",
    isFeatured: false,
    image:
      "https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg",
    bio: "Emily is focused on ensuring customer satisfaction, providing support that empowers clients throughout their experience.",
  },
  {
    name: "Michael Green",
    role: "Automotive Technology Specialist",
    isFeatured: false,
    image:
      "https://img.freepik.com/free-photo/auto-mechanic-checking-car_1303-14034.jpg",
    bio: "With expertise in the latest automotive technologies, Michael ensures that Cleanify stays at the forefront of innovation in car care.",
  },
];

const About = () => {
  return (
    <div className="bg-slate-50">
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
        <MyMotion y={50}>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between my-16">
            <div className="order-2 md:order-1">
              <CommonSectionBanner
                subTitle="About Cleanify"
                title="Experience the Future of Car Care"
                align="left"
              />
              <Paragraph className="text-lg text-gray-600 leading-relaxed">
                At Cleanify, we redefine car care by offering fast, efficient,
                and eco-friendly cleaning solutions. Utilizing advanced
                technology and sustainable practices, we ensure that your
                vehicle receives the finest treatment, leaving it spotless and
                revitalized. Our mission is to deliver exceptional quality and
                convenience in every wash.
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
        </MyMotion>

        {/* Video Section */}
        <MyMotion y={50}>
          <section className="my-28 text-center">
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
        </MyMotion>

        {/* Testimonial */}
        <MyMotion y={200}>
          <Testimonial />
        </MyMotion>

        {/* Team Section */}
        <MyMotion y={50}>
          <section className="my-28">
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
        </MyMotion>

        {/* Contact */}
        <MyMotion y={50}>
          <div className="my-4 rounded-md my-shadow-1 py-8 px-6 bg-white">
            <CommonSectionBanner
              title="Contact Info"
              subTitle="Get in touch with us for any queries or assistance. Visit our office, call us, or email us. We're here to help!"
            />
            <div className="flex flex-wrap justify-between gap-4 w-full py-4 items-center">
              <Card className="sm:flex-1 w-full sm:w-fit my-shadow-1 text-slate-800 my-white">
                <div className="mb-4 flex items-center">
                  <HomeOutlined className="text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-700">North Badda, Dhaka</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <PhoneOutlined className="text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-700">0170678-5160</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <InfoCircleOutlined className="text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-700">contact@cleanify.com</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <InfoCircleOutlined className="text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Corporate sale</h3>
                    <p className="text-gray-700">corporate@cleanify.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <InfoCircleOutlined className="text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Retailer sale</h3>
                    <p className="text-gray-700">retailer@cleanify.com</p>
                  </div>
                </div>
              </Card>
              <div className="sm:flex-1 w-full sm:w-fit">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d58414.52756073087!2d90.4298496!3d23.786291199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sbd!4v1720887508064!5m2!1sen!2sbd"
                  className="w-full border-0 h-[380px] md:h-[435px] rounded-lg"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </MyMotion>
      </Container>
    </div>
  );
};

export default About;
