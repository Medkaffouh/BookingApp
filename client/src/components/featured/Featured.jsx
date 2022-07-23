import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {

    const {data, loading, error} = useFetch("/hotels/countByCity?cities=london,berlin");
    console.log(data);
    return (
        <div className="featured">
            {loading ? "Loading please wait" : <><div className="featuredItem">
                <img src="https://t-cf.bstatic.com/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957149e394d01ac6e8f64f4b09e30ade97a6176f0640&o=" alt="" className="featuredImg" />
                <div className="featuredTitle">
                    <h1>Marrakesh</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://t-cf.bstatic.com/xdata/images/hotel/max500/74148425.jpg?k=a135c36d6f7c6efdbe55690f844c20707754e581c1207357f8cda49d1235113f&o=" alt="" className="featuredImg" />
                <div className="featuredTitle">
                    <h1>Casablanca</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://t-cf.bstatic.com/xdata/images/hotel/max500/112346687.jpg?k=b0c1b36d31151ed463b8960c21e868584043522f4f380c0f382994d4b3e7ada2&o=" alt="" className="featuredImg" />
                <div className="featuredTitle">
                    <h1>Rabat</h1>
                    <h2>531 properties</h2>
                </div>
            </div></>}
        </div>
    )
}

export default Featured