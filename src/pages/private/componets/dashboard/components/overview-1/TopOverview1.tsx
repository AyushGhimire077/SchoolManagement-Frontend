import { useOverview1Store } from "../../../store";
import LenBox from "./LenBox";
import { UserIcon, UsersIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { LenBoxProps } from "../../../interface";

const TopOverview1 = () => {
    const { totelLenInfo } = useOverview1Store();

    const mappedInfo: (LenBoxProps & { color: "blue" | "orange" | "yellow" })[] = [
        {
            label: "Students",
            len: totelLenInfo?.totalStudents,
            icon: <UsersIcon className="w-8 h-8" />,
            rate: Math.round(totelLenInfo?.studentRateChange || 0),
            color: "blue",
        },
        {
            label: "Teachers",
            len: totelLenInfo?.totalTeachers,
            icon: <UserIcon className="w-8 h-8" />,
            rate: Math.round(totelLenInfo?.teacherRateChange || 0),
            color: "orange",
        },
        {
            label: "Admins",
            len: totelLenInfo?.totalAdmins,
            icon: <ShieldCheckIcon className="w-8 h-8" />,
            rate: Math.round(totelLenInfo?.adminRateChange || 0),
            color: "yellow",
        },
    ];


    return (
        <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-3">
            {mappedInfo.map((item, idx) => (
                <LenBox
                    key={idx}
                    len={item.len}
                    icon={item.icon}
                    label={item.label}
                    rate={item.rate}
                    color={item.color}
                />
            ))}
        </div>
    );
};

export default TopOverview1;
