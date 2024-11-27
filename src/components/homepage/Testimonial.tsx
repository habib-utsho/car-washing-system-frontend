import { Button, Card, Empty, Rate, Skeleton } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { TReview } from "../../types/review.type";
import {
  useGetAllReviewsQuery,
  useGetAverageRatingQuery,
} from "../../redux/features/reviewApi";
import MyMotion from "../helpingCompo/MyMotion";

// import './styles.css';

// import required modules
// import { Autoplay, Navigation } from "swiper/modules";

const Testimonial = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const { data: reviews, isLoading: isLoadingReview } = useGetAllReviewsQuery([
    { name: "limit", value: 10 },
    { name: "sort", value: "createdAt" },
  ]);
  const { data: averageRating, isLoading: isLoadingAverageRating } =
    useGetAverageRatingQuery(undefined);

  useEffect(() => {
    const handleResize = () => {
      // Calculate the number of slides per view based on window width
      if (window.innerWidth >= 992) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 433) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial calculation
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // const testimonials = [
  //   {
  //     name: "Jeshika Do",
  //     title: "Customer Review",
  //     profession: "Software developer",
  //     image: "https://i.ibb.co/WFQQx2w/girl-3-Copy.jpg",
  //     comment:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     rating: 5,
  //   },
  //   {
  //     name: "Jane Smith",
  //     title: "Customer Review",
  //     profession: "Software developer",
  //     image: "https://i.ibb.co/h2b73Mz/man-4.jpg",
  //     comment:
  //       "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     rating: 4,
  //   },
  //   {
  //     name: "Alice Johnson",
  //     title: "Customer Review",
  //     profession: "Software developer",
  //     image: "https://i.ibb.co/khm61t0/man-2-Copy.jpg",
  //     comment:
  //       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  //     rating: 5,
  //   },
  //   {
  //     name: "Bob Moumita",
  //     title: "Customer Review",
  //     profession: "Software developer",
  //     image: "https://i.ibb.co/dBjQf2V/man-1.jpg",
  //     comment:
  //       "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     rating: 3,
  //   },
  // ];

  if (isLoadingReview || isLoadingAverageRating) {
    return <Skeleton.Button className="!w-full !h-[120p]" active />;
  }
  if (reviews?.meta?.total === 0) {
    return <Empty description={"No reviews found!"} />;
  }

  return (
    <div className="my-shadow-1 bg-white py-20 px-10 rounded-md">
      <Container>
        <CommonSectionBanner
          title="Testimonial"
          subTitle={<>What our customer say about us</>}
        />

        <div className="flex items-center gap-4 justify-between flex-wrap">
          <h3 className="font-semibold text-xl">Latest Reviews</h3>
          {averageRating?.data && (
            <h2>
              Average rating{" "}
              <span className="text-primary">
                ({averageRating?.data?.toFixed(2)})
              </span>
            </h2>
          )}
        </div>

        <MyMotion y={20}>
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={15}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, FreeMode, Pagination, Autoplay]}
            speed={8000}
            className="mySwiper mt-10 !pb-8"
            // style={{ minHeight: "300px" }}
          >
            {reviews?.data?.map((review: TReview, ind: number) => {
              return (
                <SwiperSlide key={ind}>
                  <Card
                    bordered={false}
                    className="h-full min-h-[285px] bg-slate-50"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="rounded-full border border-primary p-1">
                        <img
                          className="w-12 h-12 rounded-full"
                          src={review?.user?.img}
                          alt={review?.user?.name}
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-secondary inline-block mb-1">
                          {review?.user?.name}
                        </p>
                        <p className="text-normal-desc">Honorable Customer</p>
                      </div>
                    </div>

                    <br></br>
                    <h2 className="text-left font-bold">Customer Review</h2>
                    <Rate disabled value={review.rating} />
                    <br />
                    <p className="text-left text-slate-700 line-clamp-3">
                      {review.feedback}
                    </p>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </MyMotion>

        <Button
          type="default"
          href="/review"
          className="mt-4"
          onClick={() => {
            /* Redirect to Reviews page */
          }}
        >
          See All Reviews
        </Button>
      </Container>
    </div>
  );
};

export default Testimonial;
