import './SkeletonLoader.module.css';

const SkeletonLoader = ({ count = 3 }) => {
    return (
        <div className="accordion" id="skeletonAccordion">
            {[...Array(count)].map((_, index) => (
                <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button">
                            <div className="skeleton-text" style={{ width: '200px', height: '24px' }}></div>
                        </button>
                    </h2>
                    <div className="accordion-collapse collapse">
                        <div className="accordion-body">
                            {[...Array(5)].map((_, i) => (
                                <p key={i} className="skeleton-text" style={{ width: '100%', height: '20px', marginBottom: '10px' }}></p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;