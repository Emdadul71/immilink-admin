import { FiChevronRight } from "react-icons/fi";
import { ReactSVG } from "react-svg";
import { useGetProfileQuery } from "../../appstore/auth/auth_api";

export const Dashboard = () => {
  const { data: profileData } = useGetProfileQuery({});

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Status</p>
      </div>

      <div className="p-[30px] bg-[#F6F7FA] rounded-[10px] mt-6">
        <h1 className="text-primary">Hi {profileData?.name}!</h1>
        <h4 className="font-normal leading-[36px]">
          Welcome to Immi Link's admin dashboard!
        </h4>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="flex justify-between gap-4 bg-[#009EF0] py-[50px] pl-[30px] pr-[20px] rounded-[10px]">
          <div>
            <h5 className="font-normal leading-[30px] text-white">
              Total Post
            </h5>
            <h2 className="text-white leading-[63px]">120</h2>
            <p className="text-white">
              This count shows the total number of uploaded posts
            </p>
          </div>
          <div className="w-[90px] h-[90px] bg-white flex items-center justify-center rounded-full shrink-0	">
            <div>
              <ReactSVG src="temp/dashboard/total-post.svg" />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 bg-[#FFA73F] py-[50px] pl-[30px] pr-[20px] rounded-[10px]">
          <div>
            <h5 className="font-normal leading-[30px] text-white">
              Total Post
            </h5>
            <h2 className="text-white leading-[63px]">120</h2>
            <p className="text-white">
              This count shows the total number of subscriber
            </p>
          </div>
          <div className="w-[90px] h-[90px] bg-white flex items-center justify-center rounded-full shrink-0	">
            <div>
              <ReactSVG src="temp/dashboard/total-subscriber.svg" />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 bg-[#7460EE] py-[50px] pl-[30px] pr-[20px] rounded-[10px]">
          <div>
            <h5 className="font-normal leading-[30px] text-white">
              Total Post
            </h5>
            <h2 className="text-white leading-[63px]">120</h2>
            <p className="text-white">
              This count shows the total number of uploaded posts
            </p>
          </div>
          <div className="w-[90px] h-[90px] bg-white flex items-center justify-center rounded-full shrink-0	">
            <div>
              <ReactSVG src="temp/dashboard/total-sites.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
