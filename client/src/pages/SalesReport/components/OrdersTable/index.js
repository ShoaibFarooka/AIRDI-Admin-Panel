import React, { useState } from 'react';
import './index.css';
import { Table, Button, Modal } from 'antd';

const OrdersTable = ({ allOrders }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Subtotal',
            dataIndex: 'subTotal',
            key: 'subTotal',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button onClick={() => handleViewOrder(record)}>View</Button>
            ),
        },
    ];

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    return (
        <div
            className='orders-table'>
            <Table
                dataSource={allOrders}
                columns={columns}
                rowKey="_id"
                pagination={{ pageSize: 10, position: ['bottomCenter'] }}
            />
            <Modal
                title="Order Details"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
            >
                {selectedOrder && (
                    <div>
                        <p><strong>Code:</strong> {selectedOrder.code}</p>
                        <p><strong>Email:</strong> {selectedOrder.email}</p>
                        <p><strong>Subtotal:</strong> {selectedOrder.subTotal}</p>
                        <p><strong>Contact:</strong> {selectedOrder.contact}</p>
                        <p><strong>Trip Type:</strong> {selectedOrder.returnBus ? 'Two Way' : 'One Way'}</p>
                        <p><strong>Journey Date:</strong> {selectedOrder.journeyBus.departureDate}</p>
                        <p><strong>Journey Time:</strong> {selectedOrder.journeyBus.departureTime}</p>
                        <p><strong>Boarding Point:</strong> {selectedOrder.journeyBus.departurePoint}</p>
                        <p><strong>Dropping Point:</strong> {selectedOrder.journeyBus.arrivalPoint}</p>
                        <p><strong>Order Date & Time:</strong> {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
                        <h4>Passengers:</h4>
                        {selectedOrder.adults.map(adult => (
                            <p key={adult._id}>{adult.firstname} {adult.lastname}</p>
                        ))}
                        {selectedOrder.children.length > 0 && (
                            <>
                                <h4>Children:</h4>
                                {selectedOrder.children.map(child => (
                                    <p key={child._id}>{child.firstname} {child.lastname}</p>
                                ))}
                            </>
                        )}
                        {selectedOrder.extras.length > 0 && (
                            <>
                                <h4>Extras:</h4>
                                {selectedOrder.extras.map(extra => (
                                    <p key={extra._id}>{extra.name}: ${extra.price}</p>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default OrdersTable;


// import React from 'react';
// import { Space, Table, Tag } from 'antd';
// const columns = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//         render: (text) => <a>{text}</a>,
//     },
//     {
//         title: 'Age',
//         dataIndex: 'age',
//         key: 'age',
//     },
//     {
//         title: 'Address',
//         dataIndex: 'address',
//         key: 'address',
//     },
//     {
//         title: 'Tags',
//         key: 'tags',
//         dataIndex: 'tags',
//         render: (_, { tags }) => (
//             <>
//                 {tags.map((tag) => {
//                     let color = tag.length > 5 ? 'geekblue' : 'green';
//                     if (tag === 'loser') {
//                         color = 'volcano';
//                     }
//                     return (
//                         <Tag color={color} key={tag}>
//                             {tag.toUpperCase()}
//                         </Tag>
//                     );
//                 })}
//             </>
//         ),
//     },
//     {
//         title: 'Action',
//         key: 'action',
//         render: (_, record) => (
//             <Space size="middle">
//                 <a>Invite {record.name}</a>
//                 <a>Delete</a>
//             </Space>
//         ),
//     },
// ];
// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer'],
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//         tags: ['loser'],
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sydney No. 1 Lake Park',
//         tags: ['cool', 'teacher'],
//     },
// ];
// const OrdersTable = () => (
//     <Table columns={columns} dataSource={data} />
// )
// export default OrdersTable;