
export interface PrivateStore {
    sidebarItems: SidebarItem[];
    setSidebarItems: (items: SidebarItem[]) => void;
    getSidebarItems: () => Promise<void>;

    activeItem: string;
    setActiveItem: (itemId: string) => void;
}
  

export interface SidebarItem {
    id: string;
    label: string;
    icon: keyof typeof iconMapperKeys;
    path: string;
    children?: SidebarItem[];
}
  


export const iconMapperKeys = {
    HomeIcon: null,
    ChartBarIcon: null,
    DocumentChartBarIcon: null,
    ChartPieIcon: null,
    UserGroupIcon: null,
    AcademicCapIcon: null,
    CurrencyDollarIcon: null,
    EnvelopeIcon: null,
    PhoneIcon: null,
    UserIcon: null,
    CalculatorIcon: null,
    CubeIcon: null,
    Cog6ToothIcon: null,
    UserCircleIcon: null,
    CreditCardIcon: null,
    CurrencyEuroIcon: null,
    DocumentTextIcon: null,
    ClipboardDocumentIcon: null,
    BanknotesIcon: null,
    ScaleIcon: null,
    DocumentIcon: null,
    PencilSquareIcon: null,
    Squares2X2Icon: null,
    BookOpenIcon: null,
    ChartBarSquareIcon: null,
    TrendingUpIcon: null,
};
  