import Link from 'next/link';
import "./CardList.module.css";

const CardList = ({ items, renderItem, keyExtractor, linkPath }) => {
    return (
        <div className="accordion" id="formAccordion">
            {items?.map((item, index) => (
                <div className="accordion-item" key={keyExtractor(item)}>
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse${index}`}
                        >
                            {item.firstName} {item.lastName}
                        </button>
                    </h2>
                    <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#formAccordion"
                    >
                        <div className="accordion-body">
                            {renderItem(item)}
                            {linkPath && (
                                <Link href={`${linkPath}/${keyExtractor(item)}`} passHref>
                                    <p className="btn btn-primary mt-2">View Details</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardList;