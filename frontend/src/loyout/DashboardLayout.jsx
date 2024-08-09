import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  CircleUser,
  HomeIcon,
  Menu,
  Package,
  Search,
  User,
  View,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/auth/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/white.png";

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }

      logout();
      toast.success("Logout successful");
      navigate("/auth/login");
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr]  border-2 lg:grid-cols-[280px_1fr] bg-white">
      <div className="hidden border-r bg-gray-100 md:block rounded-xl ">
        <div className="flex h-full max-h-screen flex-col gap-4 ">
          <div className="flex h-14 items-center border-b px-4 py-4 lg:h-[60px] lg:px-6 bg-[#BA0D09] rounded-b-sm">
            <Link to="/dashboard/home" className="flex items-center gap-2 font-semibold">
              <img src={logo} alt="Logo" className="h-12 rounded-lg w-auto pt-1" />
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium lg:px-6">
              <Link
                to="/dashboard/home"
                className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
              >
                <HomeIcon className="h-6 w-6 text-[#BA0D09]" />
                <i class="bi bi-house-heart"></i>
                Home
              </Link>
              <Link
                to="/dashboard/projects"
                className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
              >
                <Package className="h-6 w-6 text-[#BA0D09]" />
                Manage Projects
              </Link>
              <Link
                to="/dashboard/team"
                className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
              >
                <User className="h-6 w-6 text-[#BA0D09]" />
                Manage Team
              </Link>
              <Link
                to="/dashboard/leaves"
                className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
              >
                <Package className="h-6 w-6 text-[#BA0D09]" />
                Manage Leave
              </Link>
              <Link
                to="/dashboard/attendance"
                className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
              >
                <View className="h-6 w-6 text-[#BA0D09]" />
                Manage Attendance
              </Link>
              <Link
                to="/dashboard/performance"
                className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
              >
                <Package className="h-6 w-6 text-[#BA0D09]" />
                Performance
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-50  px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5 text-[#BA0D09]" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-white">
              <nav className="grid gap-2 text-lg font-medium">
                <div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-6 bg-white">
                  <Link to="/dashboard/home" className="flex items-center gap-2 font-semibold"></Link>
                </div>
                <Link
                  to="/dashboard/home"
                  className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
                >
                  <HomeIcon className="h-5 w-5 text-[#BA0D09]" />
                  Home
                </Link>
                <Link
                  to="/dashboard/projects"
                  className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
                >
                  <Package className="h-6 w-6 text-[#BA0D09]" />
                  Manage Projects
                </Link>
                <Link
                  to="/dashboard/team"
                  className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
                >
                  <User className="h-6 w-6 text-[#BA0D09]" />
                  Manage Users
                </Link>
                <Link
                  to="/dashboard/leaves"
                  className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
                >
                  <Package className="h-6 w-6 text-[#BA0D09]" />
                  Manage Leave
                </Link>
                <Link
                  to="/dashboard/performance"
                  className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-700 transition-all hover:bg-green-100 hover:text-green-700"
                >
                  <Package className="h-6 w-6 text-[#BA0D09]" />
                  Performance
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1 ">
            <form>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search Projects ..."
                  className="w-full appearance-none rounded-3xl bg-white pl-8 shadow-sm border border-gray-300 focus:border-green-500 md:w-2/3 lg:w-1/3"
                />
                
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5 text-[#BA0D09]" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-md border border-gray-300">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <Button variant="link" className="text-[#BA0D09]">
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-50   ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
