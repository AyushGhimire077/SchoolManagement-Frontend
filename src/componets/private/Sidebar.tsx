import React, { useEffect, useCallback, useMemo, useState } from "react";
import { ArrowRightOnRectangleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { usePrivateStore } from "./store";
import { SidebarItem } from "./IPrivate";
import { IconMapper } from "./IconMaper";

const Sidebar: React.FC = () => {
    const [expandedItems, setExpandedItems] = useState<string[]>(["dashboard"]);
    const { activeItem, setActiveItem, getSidebarItems, sidebarItems } = usePrivateStore();

    useEffect(() => {
        if (!sidebarItems.length) getSidebarItems();
    }, [getSidebarItems, sidebarItems.length]);

    useEffect(() => {
        if (!activeItem && sidebarItems.length) {
            setActiveItem("dashboard");
            setExpandedItems((prev) => (prev.includes("dashboard") ? prev : [...prev, "dashboard"]));
        }
    }, [activeItem, sidebarItems, setActiveItem]);

    const toggleExpansion = useCallback((itemId: string) => {
        setExpandedItems((prev) =>
            prev.includes(itemId) ? [] : [itemId]
        );
    }, []);
    

    const handleItemClick = useCallback((item: SidebarItem) => {
        if (item.children) toggleExpansion(item.id);
        setActiveItem(item.id);
    }, [toggleExpansion, setActiveItem]);

    const SidebarItemComponent = useCallback(({ item, depth = 0 }: { item: SidebarItem; depth?: number }) => {
        const isActive = activeItem === item.id;
        const isExpanded = expandedItems.includes(item.id);
        const hasChildren = !!item.children?.length;

        return (
            <li className="flex flex-col gap-1" role="treeitem" aria-expanded={isExpanded}>
                <div
                    className={`flex items-center gap-3 text-sm p-3 rounded-l-full cursor-pointer select-none transition-all duration-150 ${isActive ? "bg-sky-50 text-gray-900" : "text-slate-300 hover:bg-blue-900/50"
                        }`}
                    onClick={() => handleItemClick(item)}
                >
                    {IconMapper[item.icon] ?? <div className="h-5 w-5" />}
                    <span className="flex-1 truncate">{item.label}</span>
                    {hasChildren && (
                        <ChevronRightIcon
                            className={`h-4 w-4 transform transition-transform ${isExpanded ? "rotate-90" : ""}`}
                        />
                    )}
                </div>

                {hasChildren && isExpanded && (
                    <div className="bg-blue-900/70 hover:bg-blue-900/50 duration-300 rounded-2xl max-h-[210px] overflow-auto no-scrollbar">
                        <ul className="flex flex-col pl-5 gap-3 mt-2">
                            {item.children?.map((child) => (
                                <SidebarItemComponent key={child.id} item={child} depth={depth + 1} />
                            ))} 
                        </ul>
                    </div>
                )}


            </li>
        );
    }, [activeItem, expandedItems, handleItemClick]);

    const renderedItems = useMemo(() => (
        <ul className="flex flex-col gap-2" role="tree">
            {sidebarItems.map((item) => (
                <SidebarItemComponent key={item.id} item={item} />
            ))}
        </ul>
    ), [sidebarItems, SidebarItemComponent]);

    return (
        <aside className="w-[17%] py- pl-4 shadow-2xl shadow-[#0F40A0] bg-[#0e41a7] text-white h-screen flex flex-col">
            <div className="py-8 px-2 text-slate-100 tracking-wide select-none">
                <h1 className="text-2xl font-bold text-shadow-amber-50">LuxoraEd</h1>
            </div>

            <nav className="flex-grow overflow-auto custom-scroll">
                {renderedItems}
            </nav>
            <div className="flex items-center gap-2 justify-start pb-3 pl-1.5">
                <ArrowRightOnRectangleIcon className="w-8 h-8 text-slate-100 rounded-full p-1.5 shadow-md" />
             <button>Logout out</button>
            </div>
        </aside>
    );
};

export default Sidebar;
