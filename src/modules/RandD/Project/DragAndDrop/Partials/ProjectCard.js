import React from 'react'

export const ProjectCard = () => {
    const Names = [
        {
            "id":"1",
            "name":"Albin",
            "priority":"high",
            "employeeId":"#0121",
        },
        // {
        //     "id":"2",
        //     "name":"Power",
        //     "priority":"medium",
        //     "employeeId":"#0121",
        // },
        // {
        //     "id":"3",
        //     "name":"Sanjay",
        //     "priority":"low",
        //     "employeeId":"#0121",
        // },
        // {
        //     "id":"4",
        //     "name":"kavin",
        //     "priority":"High",
        //     "employeeId":"#0121",
        // },
    ]
  return (
    <div>
        {Names.map((items,index)=>{
            return(
                <div>
                    <p>{items.name}</p>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <p>{items.employeeId}</p>
                        <p>{items.priority}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
