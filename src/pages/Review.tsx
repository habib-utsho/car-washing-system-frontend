import { useState } from "react";
import { TQueryParam } from "../types/index.type";
import Container from "../components/ui/Container";
import { Card, Empty, Pagination, Rate, Skeleton } from "antd";
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
