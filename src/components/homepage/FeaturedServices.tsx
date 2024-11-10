import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, Empty, Skeleton } from "antd";
import Container from "../ui/Container";
import { Link } from "react-router-dom";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { TService } from "../../types/service.type";
import ServiceCard from "../services/ServicesCard";
import { useGetAllServicesQuery } from "../../redux/features/servicesApi";

const FeaturedServices = () => {
  const { data: services, isLoading: isLoadingServices } =
    useGetAllServicesQuery([
      { name: "isDeleted", value: false },
      { name: "isFeatured", value: true },
    ]);

  return (
    <div className="pb-[1px] pt-8 md:pb-[2px] md:pt-10 mt-[100px] mb-[10px]">
      <Container>
        <div className="bg-white my-shadow-1 rounded-md p-4 space-y-6">
          <div className="flex justify-between flex-wrap items-center">
            <CommonSectionBanner
              title={"Featured services"}
              subTitle="Most wanted services"
              align="left"
            />
            <Link to={"/services"}>
              <Button type="primary">Show more services</Button>
            </Link>
          </div>
          {isLoadingServices ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton.Button className="!h-[250px] !w-full" />
              <Skeleton.Button className="!h-[250px] !w-full" />
              <Skeleton.Button className="!h-[250px] !w-full" />
            </div>
          ) : services?.meta?.total == 0 ? (
            <div>
              <Empty description="No featured services found!" />
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
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{
                delay: 5000,
              }}
              speed={8000}
              className="!pb-8"
            >
              {services?.data?.map((service: TService, ind: number) => (
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
