import './index.css';
import { Button, Modal } from 'antd';

const OrderInfoModal = ({ selectedOrder, isModalVisible, handleCancel }) => {
    return (
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
    )
};

export default OrderInfoModal;