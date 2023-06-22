import StudentTokenCheck from "@/apis/StudentTokenCheck";
import Navbar from "@/layouts/user/Navbar";
import Sidebar from "@/layouts/user/Sidebar";
const StudentLayout = ({ children }) => (
  <div className="student_pages">
    <StudentTokenCheck />
    <Navbar />
    <div className="student_main">{children}</div>
    <Sidebar />
  </div>
);
export default StudentLayout;
