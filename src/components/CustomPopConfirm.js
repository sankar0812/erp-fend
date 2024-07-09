import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const CustomPopconfirm = ({ okText,children, record, confirm, cancel, title, description,cancelText }) => (
    <Popconfirm
        title={title}
        description={description}
        onConfirm={() => confirm(record)}
        onCancel={() => cancel(record)}
        icon={
            <QuestionCircleOutlined
                style={{
                    color: 'red',
                }}
            />
        }
        placement="topLeft"
        okText={okText || 'Delete'}
        cancelText={cancelText||"Cancel"}
    >
        {children}
    </Popconfirm>
);
