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
    <div className="flex flex-col h-screen overflow-hidden">
      <ReduxProvider>
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 min-w-0 relative flex flex-col">
            <MainContent />
            <div className="hidden">{children}</div>
          </main>
        </div>
        <Footer />
      </ReduxProvider>
    </div>
  );
}
