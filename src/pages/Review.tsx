import { useState } from "react";
import { TQueryParam, TResponse } from "../types/index.type";
import Container from "../components/ui/Container";
import {
  Button,
  Card,
  Divider,
  Empty,
  Form,
  message,
  Pagination,
  Rate,
  Skeleton,
  Typography,
} from "antd";
import { TReview } from "../types/review.type";
import {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} from "../redux/features/reviewApi";
import CommonSectionBanner from "../components/helpingCompo/CommonSectionBanner";
import { useAppSelector } from "../redux/hook";
import { useNavigate } from "react-router-dom";
import MyInp from "../components/ui/Form/MyInp";

const Review = () => {
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 10 }
  );
  // @ts-ignore
  const [params, setParams] = useState<TQueryParam[]>([]);

  const {
    data: reviewData,
    isLoading: isLoadingReview,
    isFetching,
  } = useGetAllReviewsQuery([
    { name: "page", value: pagination.page },
    { name: "limit", value: pagination.limit },
    ...params,
  ]);

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
    <div>
      <Container className="my-10">
        <div className="relative bg-white my-shadow-1 rounded-md p-4 mb-[60px]">
          <CommonSectionBanner
            title="Review"
            subTitle="Share your thoughts and help us to improve!"
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

            {/* <Testimonial /> */}
          </div>
        </div>

        <CommonSectionBanner
          title="Customer Reviews"
          subTitle="What our customers are saying"
        />

        {isLoadingReview || isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton.Button active className="!h-[250px] !w-full" />
            <Skeleton.Button active className="!h-[250px] !w-full" />
            <Skeleton.Button active className="!h-[250px] !w-full" />
          </div>
        ) : reviewData?.meta?.total === 0 ? (
          <div className="h-[75vh] flex items-center justify-center">
            <Empty description="No review found!" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewData?.data?.map((review: TReview) => (
                <Card
                  bordered={false}
                  className="h-full min-h-[250px] bg-slate-50"
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
                      <p className="font-bold my-text-gradient-2 inline-block mb-1">
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
              ))}
            </div>

            <div className="rounded-md p-4 bg-primary bg-opacity-5 my-10 flex justify-center">
              <Pagination
                current={pagination.page}
                pageSize={pagination.limit}
                total={reviewData?.meta?.total}
                onChange={(page, pageSize) =>
                  setPagination({ page, limit: pageSize })
                }
                className=""
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Review;
