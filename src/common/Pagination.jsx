const Pagination = ({ meta, onPageChange }) => {
    const renderPageNumbers = () => {
        return meta?.links?.filter((link) => !link.label.includes("&")) 
            .map((link, index) => {
                const pageNumber = parseInt(link.label, 10); // Convert label to page number
                return (
                    <button
                        key={index}
                        onClick={() => onPageChange(pageNumber)}
                        disabled={link.active}
                        style={{
                            margin: "0 5px",
                            padding: "5px 10px",
                            backgroundColor: link.active ? "lightgray" : "white",
                        }}
                    >
                        {link.label}
                    </button>
                );
            });
    };

    return (
        <div >
            <button
                onClick={() => onPageChange(meta?.current_page - 1)}
                disabled={meta?.current_page === 1}
                style={{ margin: "0 5px", padding: "5px 10px" }}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => onPageChange(meta?.current_page + 1)}
                disabled={meta.current_page === meta?.last_page}
                style={{ margin: "0 5px", padding: "5px 10px" }}
            >
                Next
            </button>
        </div>
    );
};
  

export default Pagination;
