import { Card, Table } from "@themesberg/react-bootstrap";
import React from "react";
import styles from "../../styles/ListingTable.module.scss";
const ListingTable = ({ headers, attributes, data, open, update, del }) => {
  const handleAttribute = (attribute, item) => {
    const str = attribute.split(".");
    let temp = { ...item };
    str.map((att) => {
      temp = temp[att];
    });
    return temp;
  };

  return (
    <Table responsive className="table-centered table-nowrap rounded mb-0">
      <thead className="thead-light">
        <tr>
          {headers &&
            headers.map((header) => <th className="border-0">{header}</th>)}
        </tr>
      </thead>
      <tbody className={styles.tb_body}>
        {data &&
          data.map((item, i) => (
            <tr>
              <td> {i + 1}</td>
              {attributes.map((att) => (
                <td> {handleAttribute(att, item)}</td>
              ))}

              <td>
                {open && (
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => open(item._id)}
                  >
                    <i class="fas fa-external-link-square-alt"></i>
                  </button>
                )}

                {update && (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => update(item._id)}
                  >
                    <i class="fas fa-pen-square"></i>
                  </button>
                )}

                {del && (
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => del(item._id)}
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ListingTable;
