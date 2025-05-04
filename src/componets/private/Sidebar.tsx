import {
    HomeIcon,
    UserGroupIcon,
    AcademicCapIcon,
    CurrencyDollarIcon,
    EnvelopeIcon,
    PhoneIcon,
    UsersIcon,
    ChartBarIcon,
    DocumentChartBarIcon,
    ChartPieIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useActiveItem } from "../../store/main/getActiveItem";
import { SidebarItem } from "./IPrivate";



const Sidebar: React.FC = () => {
    const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);
    // const [activeItemId, setActiveItemId] = useState('dashboard');

    // From the store
    const { activeItem, setActiveItem } = useActiveItem();

    console.log(activeItem);

    const sidebarItems: SidebarItem[] = [
        {
            label: "Dashboard",
            id: "dashboard",
            icon: <HomeIcon className="h-5 w-5" />,
            children: [
                { label: "Overview 1", id: "overview1", icon: <ChartBarIcon className="h-5 w-5" /> },
                { label: "Overview 2", id: "overview2", icon: <DocumentChartBarIcon className="h-5 w-5" /> },
                { label: "Overview 3", id: "overview3", icon: <ChartPieIcon className="h-5 w-5" /> },
            ]
        },
        { label: "Students", id: "students", icon: <UserGroupIcon className="h-5 w-5" /> },
        { label: "Teachers", id: "teachers", icon: <AcademicCapIcon className="h-5 w-5" /> },
        { label: "Parents", id: "parents", icon: <UsersIcon className="h-5 w-5" /> },
        { label: "Fees", id: "fees", icon: <CurrencyDollarIcon className="h-5 w-5" /> },
        { label: "Salaries", id: "salaries", icon: <CurrencyDollarIcon className="h-5 w-5" /> },
        { label: "Mail Teachers", id: "mail-teachers", icon: <EnvelopeIcon className="h-5 w-5" /> },
        { label: "WhatsApp Message", id: "whatsapp", icon: <PhoneIcon className="h-5 w-5" /> },
    ];

    const toggleExpansion = (itemId: string) => {
        setExpandedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    return (
        <div className="w-[15%] min-h-screen border-gray-200 py-4 pl-4">
            {/* Logo */}
            <div className="py-8 px-2 shadow-2xs text-slate-100 tracking-wider">
                <h1 className="text-2xl font-bold shadow-accent  text-shadow-amber-50">SkoolPilot</h1>
            </div>


            <ul className={`flex flex-col ${expandedItems.includes('dashboard') ? 'gap-2' : 'gap-4'} `}>
                {sidebarItems.map((item) => (
                    <li key={item.id} className="flex flex-col gap-1">
                        <div
                            className={`flex items-center gap-4 text-sm rounded-l-full p-3 duration-150 cursor-pointer transition-all ${activeItem === item.id
                                ? 'bg-sky-50 text-gray-900'
                                : ' text-slate-300 hover:bg-blue-900/50 '
                                }`}
                            onClick={() => {
                                if (item.children) toggleExpansion(item.id);
                                setActiveItem(item.id);
                            }}
                        >
                            {item.icon}
                            <span className="flex-1">{item.label}</span>
                            {item.children && (
                                <ChevronRightIcon
                                    className={`h-4 w-4 transform transition-transform ${expandedItems.includes(item.id) ? 'rotate-90' : ''
                                        }`}
                                />
                            )}
                        </div>

                        {/* child  */}
                        {item.children && expandedItems.includes(item.id) && (
                            <div className="bg-blue-900/70 rounded-2xl">
                                <ul className=" mt-4 pb-2 flex flex-col gap-3 ">
                                    {item.children.map((child) => (
                                        <li
                                            key={child.id}
                                            className={`flex items-center gap-3  text-sm duration-150 rounded-l-full p-3 cursor-pointer transition-all ${activeItem === child.id
                                                ? 'bg-sky-50 text-gray-900'
                                                : ' text-slate-300 hover:bg-blue-900/50 '
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveItem(child.id);
                                            }}
                                        >
                                            {child.icon}
                                            <span>{child.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
