import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grow">
           <Header />
            {children}
            <Footer />
        </div>

    );
}

export default DefaultLayout;