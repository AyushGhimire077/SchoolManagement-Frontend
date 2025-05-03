import {
    ChevronRightIcon,
    MagnifyingGlassIcon,
    BellIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

const PrivateNavbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-slate-50  shadow-2xs">
           
            <div aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-gray-600">
                    <li className="flex items-center">
                        <span className="text-sm font-medium transition-colors hover:text-gray-900">
                            Application
                        </span>
                        <ChevronRightIcon
                            className="mx-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </li>
                    <li className="text-sm font-medium text-gray-900" aria-current="page">
                        Dashboard
                    </li>
                </ol>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-5">
                {/* Search Input */}
                <div className="relative max-w-md w-64">
                    <div className="relative rounded-full shadow-sm overflow-hidden">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="global-search"
                            type="text"
                            placeholder="Search..."
                            className="block w-full pl-10 pr-4 py-2 border border-transparent bg-slate-100 outline-none rounded-full text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        />
                    </div>
                </div>


                {/* Action Icons */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="View notifications"
                    >
                        <BellIcon className="h-6 w-6 text-gray-600" />
                    </button>

                    <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Open user menu"
                    >
                        <UserCircleIcon className="h-8 w-8 text-gray-600" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default PrivateNavbar;