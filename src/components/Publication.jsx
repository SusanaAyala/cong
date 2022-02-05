export const Publication = ({ title, publications }) => {
    return (
        <div>
            {title}
            {publications?.map((pub) => (
                <p key={pub.id}>{pub.title_s}</p>
            ))}
        </div>
    )
};