import React, { useState } from 'react';
import './index.css';
import { Table, Button } from 'antd';
import OrderInfoModal from '../OrderInfoModal';

const OrdersTable = ({ allOrders }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code - b.code
        },
        {
            title: 'Name',
            key: 'name',
            render: (text, record) => {
                const adult = record.adults[0];
                return `${adult.firstname} ${adult.lastname}`;
            },
            sorter: (a, b) => {
                const nameA = `${a.adults[0].firstname} ${a.adults[0].lastname}`.toLowerCase();
                const nameB = `${b.adults[0].firstname} ${b.adults[0].lastname}`.toLowerCase();
                return nameA.localeCompare(nameB);
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
            title: 'Departure Date',
            dataIndex: ['journeyBus', 'departureDate'],
            key: 'departureDate',
            sorter: (a, b) => a.journeyBus.departureDate.localeCompare(b.journeyBus.departureDate)
        },
        {
            title: 'Subtotal',
            dataIndex: 'subTotal',
            key: 'subTotal',
            sorter: (a, b) => a.subTotal - b.subTotal
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
            <OrderInfoModal selectedOrder={selectedOrder} isModalVisible={isModalVisible} handleCancel={handleCancel} />
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