import Footer from "@/components/shared/Footer";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grow">
            {children}
            <Footer />
        </div>

    );
}

export default DefaultLayout;