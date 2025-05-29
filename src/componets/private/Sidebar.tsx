import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRightOnRectangleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { usePrivateStore } from "./store";
import { SidebarItem } from "./IPrivate";
import { IconMapper } from "./IconMaper";

const Sidebar: React.FC = () => {
    const [expandedItems, setExpandedItems] = useState<string[]>(["dashboard"]);
    const { activeItem, setActiveItem, getSidebarItems, sidebarItems } = usePrivateStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!sidebarItems.length) getSidebarItems();
    }, [getSidebarItems, sidebarItems.length]);

    useEffect(() => {
        const currentPath = location.pathname.slice(1);
        if (!activeItem && sidebarItems.length) {
            const matchedItem = sidebarItems.find(item => item.id === currentPath) || sidebarItems[0];
            setActiveItem(matchedItem.id);
            setExpandedItems(prev =>
                prev.includes(matchedItem.id) ? prev : [...prev, matchedItem.id]
            );
        }
    }, [activeItem, sidebarItems, location.pathname, setActiveItem]);

    const toggleExpansion = useCallback((itemId: string) => {
        setExpandedItems(prev => (prev.includes(itemId) ? [] : [itemId]));
    }, []);

    const handleItemClick = useCallback(
        (item: SidebarItem) => {
            if (item.children?.length) {
                toggleExpansion(item.id);
            } else {
                navigate(`/${item.id}`);
                setActiveItem(item.id);
            }
        },
        [navigate, setActiveItem, toggleExpansion]
    );

    const SidebarItemComponent = useCallback(
        ({ item }: { item: SidebarItem; depth?: number }) => {
            const isActive = activeItem === item.id;
            const isExpanded = expandedItems.includes(item.id);
            const hasChildren = !!item.children?.length;
            const isAnyChildActive = item.children?.some(child => child.id === activeItem);
            const isParentActive = isActive || isAnyChildActive;

            return (
                <li className="flex flex-col gap-1" role="treeitem" aria-expanded={isExpanded}>
                    <div
                        className={`flex items-center gap-3 text-sm p-3 rounded-l-full cursor-pointer select-none transition-all duration-150 
              ${isParentActive ? "bg-sky-50 text-gray-900" : "text-slate-300 hover:bg-blue-900/50"}`}
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
                                {item?.children?.map(child => {
                                    const isChildActive = activeItem === child.id;
                                    return (
                                        <li
                                            key={child.id}
                                            className={`cursor-pointer rounded-full px-4 py-2 text-sm transition-all duration-300 
                        ${isChildActive ? "text-white  " : "text-slate-300 hover:text-white"}`}
                                            onClick={() => {
                                                navigate(`/${child.id}`);
                                                setActiveItem(child.id);
                                            }}
                                        >
                                            {child.label}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </li>
            );
        },
        [activeItem, expandedItems, handleItemClick, navigate, setActiveItem]
    );

    const renderedItems = useMemo(() => (
        <ul className="flex flex-col gap-2" role="tree">
            {sidebarItems.map(item => (
                <SidebarItemComponent key={item.id} item={item} />
            ))}
        </ul>
    ), [sidebarItems, SidebarItemComponent]);

    return (
        <aside className="w-[17%] pl-4 shadow-2xl shadow-[#0F40A0] bg-[#0e41a7] text-white h-screen flex flex-col">
            <div className="py-8 px-2 text-slate-100 tracking-wide select-none">
                <h1 className="text-2xl font-bold text-shadow-amber-50">LuxoraEd</h1>
            </div>

            <nav className="flex-grow mt-3.5 overflow-auto custom-scroll">
                {renderedItems}
            </nav>

            <div className="flex items-center gap-2 justify-start pb-3 pl-1.5">
                <ArrowRightOnRectangleIcon className="w-8 h-8 text-slate-100 rounded-full p-1.5 shadow-md" />
                <button>Log out</button>
            </div>
        </aside>
    );
};

export default Sidebar;
