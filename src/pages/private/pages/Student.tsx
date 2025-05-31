import ClassForm from "../componets/crud/ClassForm"
import GetStudents from "../componets/crud/GetStudents"
import StudentForm from "../componets/crud/StudentForm"

const Student = () => {
  return (
    <div>
      <GetStudents />
      <StudentForm />
      <ClassForm />
    </div>
  )
}

export default Student