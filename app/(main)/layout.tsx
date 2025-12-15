import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { ReduxProvider } from "./providers";
import MainContent from "@/app/components/mainContent";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ReduxProvider>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            <MainContent />
            {children}
          </div>
        </div>
        <Footer />
      </ReduxProvider>
    </div>
  );
}
