import { Banner } from "../../components/Banner";
import { About } from "../../components/About";
import { CometChatWidgetComponent } from "../../components/CometChatWidgetComponent";
import { ProductsPreview } from "../../components/ProductsPreview";

const Home = () => {
    return (
        <>
            <Banner />
            <ProductsPreview />
            <About />
            <CometChatWidgetComponent/>
        </>
    )
}

export default Home;