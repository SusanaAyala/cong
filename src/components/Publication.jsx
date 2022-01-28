export const Publication = ({ title, publications }) => {
    return (
        <div>
            {title}
            {publications?.map((pub) => (
                <p>{pub.title_s}</p>
            ))}
        </div>
    )
};