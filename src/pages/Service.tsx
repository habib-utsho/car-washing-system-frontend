import { Link, useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../redux/features/servicesApi";
import Container from "../components/ui/Container";
import { Skeleton, Card, Typography, Rate, Button, Breadcrumb } from "antd";
import banner from "../assets/img/serviceDetailsBanner.jpg";
import { CheckCircleFilled, SafetyCertificateFilled } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Service = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleServiceQuery(id);
  const { _id, name, duration, description, createdAt, img } = data?.data || {};

  return (
    <div className="py-8">
      {/* Banner */}
      <div
        className="mb-8 w-full h-[450px] bg-slate-800 bg-blend-overlay bg-no-repeat bg-center bg-cover p-4 py-8 text-white"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <Container className="space-y-4">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to="/" className="!text-gray">
                    Home
                  </Link>
                ),
              },
              {
                title: (
                  <Link to="/services" className="!text-gray">
                    Services
                  </Link>
                ),
              },
              {
                title: <span className="text-white">{name}</span>,
              },
            ]}
            className="text-gray"
          />
          <h2 className="font-semibold text-3xl md:text-4xl">{name}</h2>
          <p className="flex gap-2 items-center">
            <span className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center ">
              <SafetyCertificateFilled />
            </span>{" "}
            Safely wash
          </p>
          <ul className="text-gray space-y-2 my-3">
            {["Fast service", "Quality service", "Professional service"].map(
              (item) => {
                return (
                  <li className="flex gap-2 items-center">
                    <span className="h-7 w-7 rounded-full bg-success text-white flex items-center justify-center ">
                      <CheckCircleFilled />
                    </span>{" "}
                    {item}
                  </li>
                );
              }
            )}
          </ul>
        </Container>
      </div>

      <Container>
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 15 }} />
        ) : (
          <div>
            <Card
              cover={
                <img
                  alt={name}
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw3OdJ3nAPLc94ubUz-4AvNAz_0IzTkNBSqQ&s"
                  }
                  className="w-full h-[200px]"
                />
              }
              className="rounded-md my-shadow-1"
            >
              <Title level={2}>
                Overview of <span className="text-primary">{name}</span>
              </Title>

              <h2>FAQ</h2>

              <Paragraph strong>{`Duration: ${duration} mins`}</Paragraph>
              <Rate allowHalf defaultValue={4.5} />
              <Paragraph>{description}</Paragraph>
              <Button type="primary">Book Now</Button>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Service;
