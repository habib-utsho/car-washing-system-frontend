import React, { useState } from "react";
import {
  Rate,
  Button,
  Card,
  Typography,
  Form,
  message,
  Skeleton,
  Empty,
  Divider,
} from "antd";
import { useAppSelector } from "../../redux/hook";
import Container from "../ui/Container";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { Link, useNavigate } from "react-router-dom";
import MyInp from "../ui/Form/MyInp";
import {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useGetAverageRatingQuery,
} from "../../redux/features/reviewApi";
import { TReview } from "../../types/review.type";
import { TResponse } from "../../types/index.type";
import MyMotion from "../helpingCompo/MyMotion";

interface Review {
  rating: number;
  feedback: string;
  user: string; // Assume you want to show the user's name
}

const Review: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: reviews, isLoading: isLoadingReview } = useGetAllReviewsQuery([
    { name: "limit", value: 2 },
    { name: "sort", value: "createdAt" },
  ]);
  const { data: averageRating } = useGetAverageRatingQuery(undefined);
  const [createReview, { isLoading: isLoadingCreateReview }] =
    useCreateReviewMutation();
  const [rating, setRating] = useState<number>(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: { feedback: string }) => {
    if (!user) {
      message.error("Please login to leave a review");
      navigate("/signin", { state: { from: location } });
      return;
    }

    try {
      const res = (await createReview({
        user: user?._id,
        rating,
        feedback: values.feedback,
      }).unwrap()) as TResponse<TReview>;
      if (res.success) {
        message.success(res.message);
        form.resetFields();
      }
    } catch (e: any) {
      message.error(e.message || e.data?.message || "Something went wrong");
    } finally {
      form.resetFields();
      setRating(0);
    }
  };


  return (
    <div className="" id="review">
      <Container>
        <div className="relative bg-white my-shadow-1 rounded-md p-4">
          <CommonSectionBanner
            title="Review"
            subTitle="Share your thoughts and help us improve!"
            align="left"
          />

          {!user && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-md z-50">
              <Typography.Title level={4} style={{ color: "white" }}>
                Please log in to leave a review
              </Typography.Title>
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                className="cursor-pointer"
                onClick={() => navigate("/signin")}
              >
                Signin
              </Button>
            </div>
          )}

          <div className={`${!user && "opacity-50"}`}>
            <Form
              form={form}
              onFinish={handleSubmit}
              className="my-2"
              layout="vertical"
            >
              <Rate onChange={setRating} value={rating} disabled={!user} />

              <MyInp
                type="textarea"
                name={"feedback"}
                placeholder="Leave your feedback..."
                disabled={!user}
              />
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                disabled={!user}
                htmlType="submit"
                loading={isLoadingCreateReview}
              >
                Submit
              </Button>
            </Form>

            <Divider className="my-8" />

            <div className="mt-6">
              <div className="flex items-center gap-4 justify-between flex-wrap">
                <h3 className="font-semibold text-xl">Latest Reviews</h3>
                {averageRating?.data && (
                  <h2>
                    Average rating{" "}
                    <span className="text-primary">
                      ({averageRating?.data})
                    </span>
                  </h2>
                )}
              </div>
              {isLoadingReview ? (
                <Skeleton active />
              ) : reviews?.meta?.total === 0 ? (
                <Empty description={"No reviews found!"} />
              ) : (
                <MyMotion y={20}>
                  {" "}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {reviews?.data?.map((review: TReview, index: number) => (
                      <Card key={index} style={{ marginBottom: "10px" }}>
                        <img
                          src={review?.user?.img}
                          alt={review?.user?.name}
                          className="h-[120px] w-auto rounded-md"
                        />
                        <Typography.Text type="secondary">
                          - {review.user?.name}
                        </Typography.Text>
                        <br /> <br />
                        <Rate disabled value={review.rating} />
                        <Typography.Paragraph>
                          {review.feedback}
                        </Typography.Paragraph>
                      </Card>
                    ))}
                  </div>
                </MyMotion>
              )}
            </div>
          </div>

          <Link to={"/review"}>
            <Button
              type="default"
              onClick={() => {
                /* Redirect to Reviews page */
              }}
            >
              See All Reviews
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Review;
