import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import ConverterPage from "./features/converter/page";

function App() {
    return (
        <>
            <Header />
            <main>
                <ConverterPage />
            </main>
            <Footer />
        </>
    );
}

export default App;
