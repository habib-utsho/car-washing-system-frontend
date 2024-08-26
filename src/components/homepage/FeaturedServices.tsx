import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, Empty, Skeleton } from "antd";
import Container from "../ui/Container";
import { Link } from "react-router-dom";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { TService } from "../../types/service.type";
import ServiceCard from "../services/ServicesCard";

const FeaturedServices = () => {
  const { data: products, isLoading } = {
    isLoading: false,
    data: {
      meta: {
        total: 2,
      },
      data: [
        {
          _id: "666dd54ce92a6fe624f2e45d",
          name: "Ultra Clean",
          description: "This is our premium service for cleaning your car.",
          price: 5000,
          duration: 120,
          isDeleted: false,
          createdAt: "2024-06-15T17:54:20.519Z",
          updatedAt: "2024-06-15T17:54:20.519Z",
          __v: 0,
        },
        {
          _id: "777dd54ce92a6fe624f2e45e",
          name: "Express Wash",
          description:
            "Quick and efficient exterior wash, perfect for those on the go.",
          price: 1500,
          duration: 30,
          isDeleted: false,
          createdAt: "2024-06-16T12:30:20.519Z",
          updatedAt: "2024-06-16T12:30:20.519Z",
          __v: 0,
        },
        {
          _id: "888dd54ce92a6fe624f2e45f",
          name: "Interior Detailing",
          description:
            "Detailed cleaning of your car's interior, including vacuuming, upholstery cleaning, and dashboard polishing.",
          price: 3000,
          duration: 90,
          isDeleted: false,
          createdAt: "2024-06-17T10:15:20.519Z",
          updatedAt: "2024-06-17T10:15:20.519Z",
          __v: 0,
        },
        {
          _id: "999dd54ce92a6fe624f2e460",
          name: "Full Service Wash",
          description:
            "Comprehensive car wash including exterior wash, interior detailing, and engine cleaning.",
          price: 7000,
          duration: 150,
          isDeleted: false,
          createdAt: "2024-06-18T08:45:20.519Z",
          updatedAt: "2024-06-18T08:45:20.519Z",
          __v: 0,
        },
        {
          _id: "aaaad54ce92a6fe624f2e461",
          name: "Eco Wash",
          description:
            "Environmentally-friendly car wash using minimal water and eco-friendly cleaning products.",
          price: 2500,
          duration: 60,
          isDeleted: false,
          createdAt: "2024-06-19T14:00:20.519Z",
          updatedAt: "2024-06-19T14:00:20.519Z",
          __v: 0,
        },
      ],
    },
  };

  return (
    <div className="py-8 md:py-10 my-[100px]">
      <Container>
        <div className="bg-white my-shadow-1 rounded-md p-4 space-y-6">
          <div className="flex justify-between flex-wrap items-center">
            <CommonSectionBanner title={"Featured services"} />
            <Link to={"/services"}>
              <Button type="primary">Show more services</Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton.Button className="!h-[250px] !w-full" />
              <Skeleton.Button className="!h-[250px] !w-full" />
              <Skeleton.Button className="!h-[250px] !w-full" />
            </div>
          ) : products?.meta?.total === 0 ? (
            <div>
              <Empty />
            </div>
          ) : (
            <Swiper
              breakpoints={{
                // when window width is >= 640px
                640: {
                  width: 640,
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  width: 768,
                  slidesPerView: 3,
                },
              }}
              grabCursor={true}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Navigation, Pagination]}
              className="!pb-8"
            >
              {products?.data?.map((service: TService, ind: number) => (
                <SwiperSlide key={ind}>
                  <ServiceCard service={service} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedServices;
