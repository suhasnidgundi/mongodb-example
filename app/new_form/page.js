import StudentDetailsForm from '@/components/StudentDetailsForm/StudentDetailsForm'
import "./page.module.css"

export const metadata = {
    title: "Student Details Form",
    description: "",
};

const submitForm = () => {
    return (
        <StudentDetailsForm />
    )
}

export default submitForm
