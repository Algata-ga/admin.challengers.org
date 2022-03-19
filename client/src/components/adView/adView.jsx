const AdView = ({ ad, dash }) => {
    return (
        <div>
            <h4>{ad.title}</h4>
            <p>{ad.description}</p>
            <img
                src={
                    dash
                        ? "http://localhost:5000" +
                          ad.filename.replace("/api", "")
                        : ad.media
                }
                alt={ad.title}
                loading="lazy"
                width="250px"
            />
        </div>
    );
};

export default AdView;
