import { Card, Table } from "@themesberg/react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../../actions/userActions";
import Layout from "../../../components/layout";

const users = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, []);
  return (
    <Layout admin>
      <div>Danh sách người dùng</div>
      <div>
        <Card border="light" className="shadow-sm mb-4">
          <Card.Body className="pb-0">
            <Table
              responsive
              className="table-centered table-nowrap rounded mb-0"
            >
              <thead className="thead-light">
                <tr>
                  <th className="border-0">#</th>
                  <th className="border-0">Tên</th>
                  <th className="border-0">Email</th>
                  <th className="border-0">Role</th>

                  <th className="border-0">Giới tính</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, i) => (
                    <tr>
                      <td> {i + 1}</td>
                      <td> {user.name}</td>
                      <td> {user.email}</td>
                      <td> {user.role}</td>

                      <td> {user.gender}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default users;
