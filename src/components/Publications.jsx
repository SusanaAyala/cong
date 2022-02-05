
import axios from "axios";
import { useEffect, useState } from "react";
import { Publication } from "./Publication";
import { Search } from "./Search";

export const Publications = () => {
    const user = localStorage.getItem("user");
    const [recentPubs, setRecentPubs] = useState([]);
    const [filteredPubs, setFilteredPubs] = useState(null);

    const fetchRecentPublications = async () => {
        const { data } = await axios.get("/publications", {
            headers: {
                skey: JSON.parse(user)?.skey
            }
        });
        setRecentPubs(data?.response.docs);
    };

    useEffect(() => {
        fetchRecentPublications();
    }, []);

    const handleSearch = (value) => {
        if (value == "") {
            return setFilteredPubs(null);
        }
        const filtered = recentPubs.filter((pub) => pub.title_s.toLowerCase().includes(value.toLowerCase()));
        setFilteredPubs(filtered);
    }

    return (
        <div>
            <Search handleSearch={handleSearch} />
            <Publication title={"Recent Publications"} publications={filteredPubs || recentPubs} />
        </div>
    )
};