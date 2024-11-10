import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, Skeleton } from "antd";
import Sidebar from "./Sidebar";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { signOut } from "../../redux/features/auth/authSlice";
import logo from "../../assets/img/logo.png";
import FromTop from "../helpingCompo/FromTop";
import moment from "moment";
import { useGetMyBookingQuery } from "../../redux/features/bookingApi";

const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const { data: bookings, isLoading: isLoadingBooking } = useGetMyBookingQuery([
    { name: "upcoming", value: true },
    { name: "limit", value: 1 },
    { name: "sort", value: "-date" },
  ]);

  useEffect(() => {
    // @ts-ignore
    let interval;
    if (!isLoadingBooking) {
      interval = setInterval(() => {
        const now = moment();
        const bookingTime = moment(bookings?.data?.[0]?.slot?.date);
        const duration = moment.duration(bookingTime.diff(now));

        if (duration.asSeconds() <= 0) {
          setTimeRemaining("Expired");
          // @ts-ignore
          clearInterval(interval);
        } else {
          setTimeRemaining(
            `${Math.floor(
              duration.asDays()
            )}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
          );
        }
      }, 1000);
    }

    // @ts-ignore
    return () => clearInterval(interval);
  }, [bookings]);

  return (
    <>
      <Header className="h-auto px-0">
        <Menu mode="horizontal" theme="light" className="px-6 bg-primary">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-2">
              <Link
                to={"/"}
                className="text-black font-semibold flex items-center gap-1 pr-2"
              >
                <img
                  src={logo}
                  alt="Car washing system"
                  className="w-[50px] h-auto"
                />
              </Link>
            </div>

            {user && user.role === "admin" ? (
              ""
            ) : isLoadingBooking ? (
              <Skeleton.Button active className="!w-[250px] !flex" />
            ) : (
              <div>
                <Link to="/user/dashboard/upcoming-booking">
                  <Button type="text" className="">
                    {timeRemaining === "Expired" ? (
                      "No upcoming bookings"
                    ) : (
                      <div className="!text-slate-700 font-normal">
                        <span>Your next booking for </span>
                        <span className="font-semibold">
                          {bookings?.data?.[0]?.service?.name}
                        </span>
                        <span> starts in {timeRemaining}.</span>
                      </div>
                    )}
                  </Button>
                </Link>
              </div>
            )}

            {isAuthLoading ? (
              <Skeleton.Button
                active
                className="!h-8 !w-[150px] bg-primary-2 rounded"
              />
            ) : (
              user && (
                <Button onClick={() => dispatch(signOut())} type="default">
                  Sign out
                </Button>
              )
            )}
          </div>
        </Menu>
      </Header>

      <Layout className="min-h-screen">
        <Sidebar />

        <Layout
          // style={{
          //   marginLeft: 200,
          // }}
          className="min-h-screen"
        >
          <FromTop>
            <Content
              style={{ margin: "24px 16px 0" }}
              className="bg-white rounded-lg shadow p-5"
            >
              <Outlet />
            </Content>
          </FromTop>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
