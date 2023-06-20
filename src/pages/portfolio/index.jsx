import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./style.scss"

const Portfolio = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://api.github.com/users/OliverMorla/repos")
                const repos = await res.json();
                setData(repos);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <motion.main
            className="portfolio-w"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {!loading && <h2> Count: {data.length}</h2>}
            {!loading && data?.map((repo, index) => {
                return (
                    <a href={repo.html_url} key={repo?.id} target="_blank">
                        <motion.div className="repo-card"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: .2, duration: .2 * index, staggerChildren: 0.2, delayChildren: 0.5 } }}
                        >
                            <h1> {repo?.name} </h1>
                            <p> {repo?.description} </p>
                        </motion.div>
                    </a>
                )
            })}
        </motion.main>
    );
}

export default Portfolio;