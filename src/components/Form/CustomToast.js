// import { Button } from 'antd'
// import React from 'react'

// export const CustomToast = () => {

//     return (
//         <div>
//             <Button
//                 type="primary"
//                 onClick={() => openNotification('topRight')}
//             >
//                 topRight
//             </Button>
//         </div>
//     )
// }

// import React from 'react';
// import { Button, notification, Space } from 'antd';
// export const CustomToast = () => {
//     const [api, contextHolder] = notification.useNotification();
//     const openNotificationWithIcon = (type) => {
//         api[type]({
//             message: 'Notification Title',
//             description:
//                 'Successfulllllllllll',
//         });
//     };
//     return (
//         <>
//             {contextHolder}
//             <Space>
//                 <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
//                 <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
//                 <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
//                 <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
//             </Space>
//         </>
//     );
// };

import React from 'react';
import { Button, notification, Space } from 'antd';
export const CustomToast = () => {
    // openNotificationWithIcon = (type) => {
    //     notification[type]({
    //         message: 'Notification Title',
    //         description: 'Successful',
    //         style: '' // You can customize the style here
    //     });
    // };
    return (
        <div>
            {/* <button onClick={() => this.openNotificationWithIcon('success')}>
                Show Success Notification
            </button> */}
        </div>
    );
};
