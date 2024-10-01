import Link from "next/link";

const Hero = () => {
    return (
        <div className="px-4 py-5 my-5 text-center">
            <i className="bi bi-database d-block mx-auto mb-4" style={{ fontSize: '4rem', color: '#0d6efd' }}></i>
            <h1 className="display-5 fw-bold text-body-emphasis">MongoDB CRUD Operations</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">
                    Experience seamless data management with our MongoDB-powered application.
                    Create, Read, Update, and Delete (CRUD) operations are at your fingertips.
                    Submit forms, store data securely, and manipulate it with ease using our
                    intuitive interface built with modern web technologies.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link href="/list_forms" className="btn btn-primary btn-lg px-4 gap-3">
                        <i className="bi bi-table me-2"></i>View Forms
                    </Link>
                    <Link href="/new_form" className="btn btn-outline-secondary btn-lg px-4">
                        <i className="bi bi-plus-circle me-2"></i>New Submission
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;