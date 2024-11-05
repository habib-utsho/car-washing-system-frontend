import React, { useState } from "react";
import { Rate, Button, Typography, Form, message, Divider } from "antd";
import { useAppSelector } from "../../redux/hook";
import Container from "../ui/Container";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { useNavigate } from "react-router-dom";
import MyInp from "../ui/Form/MyInp";
import { useCreateReviewMutation } from "../../redux/features/reviewApi";
import { TReview } from "../../types/review.type";
import { TResponse } from "../../types/index.type";
import Testimonial from "./Testimonial";

interface Review {
  rating: number;
  feedback: string;
  user: string; // Assume you want to show the user's name
}

const Review: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
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

            <Testimonial />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Review;
