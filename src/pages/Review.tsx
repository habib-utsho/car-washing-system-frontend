import { useState } from "react";
import { TQueryParam } from "../types/index.type";
import Container from "../components/ui/Container";
import { Card, Empty, Pagination, Rate, Skeleton, Typography } from "antd";
import { TReview } from "../types/review.type";
import { useGetAllReviewsQuery } from "../redux/features/reviewApi";
import CommonSectionBanner from "../components/helpingCompo/CommonSectionBanner";

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

  return (
    <div>
      <Container className="my-10">
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
              {reviewData?.data?.map((review: TReview, index: number) => (
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
                  <Typography.Paragraph>{review.feedback}</Typography.Paragraph>
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
