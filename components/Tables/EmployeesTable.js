import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Table from "antd/lib/table";
import PropTypes from "prop-types";
import CustomButton from "../Shared/CustomButton";
import WarningModal from "../Shared/WarningModal";
import routes from "../../config/routes";
import {
  useDeleteStudentMutation,
  usePromoteStudentMutation,
} from "../../lib/api/Students/studentsEndpoints";
import { useWindowSize } from "../../helpers/useWindowSize";
import StudentsTableMobile from "./Mobile/StudentsTableMobile";
import CustomModal from "../Shared/CustomModal";
import PromoteStudentForm from "../Forms/PromoteStudentForm";
import { useGetAcademicYearsQuery } from "../../lib/api/AcademicYear/academicYearEndpoints";
import {
  useGetClassesQuery,
  useLazyGetStreamsQuery,
} from "../../lib/api/Classrooms/classroomsEndpoints";
import handleAPIRequests from "../../helpers/handleAPIRequests";

const { Column } = Table;

const EmployeesTable = ({
  employees,
  isFetching,
  setItemToEdit,
  setIsEditModalVisible,
  lang,
  currentAcademicYearId,
  currentClassroomId,
  currentStreamId,
}) => {
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  console.log({ employees })


  const onDeleteStudentSuccess = () => {
    setIsWarningVisible(false);
    setItemToDelete(null);
  };

  const handleDeleteStudents = (item) => {
    setItemToDelete(item);
    setIsWarningVisible(true);
  };

  const handleEditStudent = (item) => {
    setItemToEdit(item);
    setIsEditModalVisible(true);
  };

  const router = useRouter();

  const { width } = useWindowSize();
  const isScreenSmall = width <= 1024;



  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedItems(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };


  const showSelectors =
    currentAcademicYearId && currentClassroomId && currentStreamId;

  return (
    <>
      {/* <WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage={`${lang?.dashboard_shared?.modals?.delete_modal?.title} ${lang?.students_pg?.student}`}
				warningKey={itemToDelete?.fullName}
				itemToDelete={itemToDelete?.id}
				request={deleteStudent}
				loading={isDeleting}
				onSuccess={onDeleteStudentSuccess}
				message={lang?.alert_messages?.success?.delete_student}
			/> */}

      {isScreenSmall ? (
        <p>yy</p>
      ) : (
        <div>
          {/* {!!selectedItems.length && showSelectors && (
						<div className="flex items-center gap-4">
							<CustomButton
								type="primary"
							>
								{lang?.students_pg?.table?.promote_btn}
							</CustomButton>

							<span className="text-sm">
								30 {lang?.students_pg?.table?.selected_items}
							</span>
						</div>
					)} */}

          <CustomButton />
          <Table
            className="data_table"
            dataSource={employees}
            rowKey={(record) => {
              return record?.id;
            }}
            rowClassName="shadow"
            pagination={false}
            loading={isFetching}
            bordered={false}
            scroll={{ x: 0 }}
            rowSelection={
              showSelectors && {
                type: "checkbox",
                ...rowSelection,
              }
            }
          >
            <Column
              title="#"
              key="#"
              width={24}
              render={(text, record, index) => (
                <span className="text-gray-500">{index + 1}.</span>
              )}
            />

            <Column
              title={lang?.students_pg?.table?.name}
              key="name"
              render={(record) => (
                <span className="font-bold">{record?.employeeFullName}</span>
              )}
            />

            <Column
              title={"position"}
              key="Position"
              render={(record) => (
                <span className="font-bold">{record?.Position?.name}</span>
              )}
            />


            <Column
              title={lang?.students_pg?.table?.location}
              key="location"
              render={(record) => <span>{record?.address}</span>}
            />

            <Column
              title={"type"}
              key="employeeSalary"
              render={(record) => (
                <span className="font-bold">{record?.employeeSalary?.map((enu) => enu?.name)}</span>
              )}
            />

            <Column
              title={"amount"}
              key="employeeSalary"
              render={(record) => (
                <span className="font-bold">{record?.employeeSalary?.map((enu) => enu?.amount)} RWF </span>
              )}
            />

            <Column
              title={lang?.students_pg?.table?.actions}
              key="actions"
              width={200}
              render={(record) => (
                <div className="flex gap-4">
                  <CustomButton
                    type="view"
                    onClick={() =>
                      router.push(`${routes.students.url}/${record?.id}`)
                    }
                  >
                    {lang?.dashboard_shared?.buttons?.view}
                  </CustomButton>
                  <CustomButton
                    type="edit"
                  >
                    {lang?.dashboard_shared?.buttons?.edit}
                  </CustomButton>
                  <CustomButton
                    type="delete"
                  >
                    {lang?.dashboard_shared?.buttons?.delete}
                  </CustomButton>
                </div>
              )}
            />
          </Table>
        </div>
      )}
    </>
  );
};

EmployeesTable.propTypes = {
  employees: PropTypes.array,
  isFetching: PropTypes.bool,
  setItemToEdit: PropTypes.func,
  setIsEditModalVisible: PropTypes.func,
};

export default EmployeesTable;
