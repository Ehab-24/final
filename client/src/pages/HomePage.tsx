import Searchbar from "../components/Searchbar";
import H2 from "../components/typography/H2";

function HomePage() {
    return (
        <div className="flex px-4 md:px-12 flex-col mb-20">
            <Searchbar className="self-center mb-20 mt-12" />
            <div className="self-center">
                <H2>Maybe I could havbe added a search functionality 🤔</H2>
            </div>
        </div>
    )
}

export default HomePage;

