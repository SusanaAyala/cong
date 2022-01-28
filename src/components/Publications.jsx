
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Publication } from "./Publication";

const recentPubsUrl = "/v3/search?query=q=index_s:publications&sort=timestamp desc&uuid=cb3e6ee0-7d68-11ec-ac30-35aecd126a5a&cuid=cb3e6ee1-7d68-11ec-ac30-35aecd126a5a"

export const Publications = () => {
    const [recentPubs, setRecentPubs] = useState([]);

    const fetchRecentPublications = async () => {
        const { data } = await axios.get(recentPubsUrl);
        setRecentPubs(data?.response.docs);
    };

    useEffect(() => {
        fetchRecentPublications();
    }, []);

    return (
        <div>
            <Publication title={"Recent Publications"} publications={recentPubs} />
        </div>
    )
};