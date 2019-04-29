import React from "react";
import { Pagination } from "react-bootstrap";

const MyPaging = props => (
  <Pagination className="mt-5 mb-5 justify-content-center ">
    <Pagination.First />
    <Pagination.Prev />
    <Pagination.Item active>{1}</Pagination.Item>
    <Pagination.Ellipsis />

    <Pagination.Item>{1}</Pagination.Item>
    <Pagination.Item>{2}</Pagination.Item>
    <Pagination.Item>{4}</Pagination.Item>
    <Pagination.Item>{5}</Pagination.Item>
    <Pagination.Item>{6}</Pagination.Item>

    <Pagination.Ellipsis />
    <Pagination.Item>{10}</Pagination.Item>
    <Pagination.Next />
    <Pagination.Last />
  </Pagination>
);
export default MyPaging;
