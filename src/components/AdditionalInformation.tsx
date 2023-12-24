import { NavLink } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

interface AdditionalInformationProps {
  link: string;
}

export function AdditionalInformation({ link }: AdditionalInformationProps) {
  return (
    <div className="pt-10 pb-10">
      <h2 className="mb-5 text-4xl font-bold">Additional information</h2>
      <div className="flex gap-x-[12px]">
        <NavLink
          to="cast"
          state={{ from: link }}
          className="flex gap-x-[4px] w-[120px] h-[40px] bg-gray-500 text-white font-semibold justify-center items-center rounded-md"
        >
          <GroupIcon />
          Cast
        </NavLink>
        <NavLink
          to="reviews"
          state={{ from: link }}
          className="flex gap-x-[4px] w-[120px] h-[40px] bg-gray-500 text-white font-semibold justify-center items-center rounded-md"
        >
          <FormatListBulletedIcon />
          Reviews
        </NavLink>
      </div>
    </div>
  );
}
