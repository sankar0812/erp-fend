import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { Col } from 'antd'
import { StyledViewTask } from '../style'
import { CustomTag } from '../../../../components/Form/CustomTag'

export const ProjectDetailWithoutHoldandCancelled = ({ projectdetails ,proDetails}) => {
console.log(projectdetails,'projectdetailsprojectdetails');
  return (
    <div>
      <CustomRow space={[12, 12]}>
        <Col span={24} md={12}>
          <StyledViewTask>
            <CustomRow>
              <Col span={24} md={12}>
                <h1>StartDate : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.startDate} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Department Name : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.departmentName}  </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Category : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.category}  </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Employee Name :</h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.employeeName} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Employee Report Name :</h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.employeeReportName} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Type : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.type} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Type Of Project : </h1>
              </Col>
              <Col span={24} md={12}>
                {proDetails.typeOfProject === 'research' ? (
                  <CustomTag color={'yellow'} bordered={'true'} title={'Research'} />
                ) : proDetails.typeOfProject === 'development' ? (
                  <CustomTag color={'grey'} bordered={'true'} title={'Development'} />
                ) : proDetails.typeOfProject === 'project' ? (
                  <CustomTag color={'blue'} bordered={'true'} title={'Project'} />
                ) : proDetails.typeOfProject === 'testing' ? (
                  <CustomTag color={'green'} bordered={'true'} title={'Testing'} />
                ) : proDetails.typeOfProject === 'hosting' ? (
                  <CustomTag color={'orange'} bordered={'true'} title={'Hosting'} />
                ) : null}
              </Col>
            </CustomRow>
          </StyledViewTask>
        </Col>

        <Col span={24} md={12}>
          <StyledViewTask>
            <CustomRow>
              <Col span={24} md={12}>
                <h1>Label : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.label} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 >Priority : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.priority}</h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Status : </h1>
              </Col>
              <Col span={24} md={12}>
                {projectdetails.projectStatus === 'pending' ? (
                  <CustomTag color={'yellow'} bordered={'true'} title={'Pending'} />
                ) : projectdetails.projectStatus === 'todo' ? (
                  <CustomTag color={'grey'} bordered={'true'} title={'Todo'} />
                ) : projectdetails.projectStatus === 'onprocess' ? (
                  <CustomTag color={'blue'} bordered={'true'} title={'On Process'} />
                ) : projectdetails.projectStatus === 'completed' ? (
                  <CustomTag color={'green'} bordered={'true'} title={'Completed'} />
                ) : projectdetails.projectStatus === 'hold' ? (
                  <CustomTag color={'orange'} bordered={'true'} title={'On Hold'} />
                ) : projectdetails.projectStatus === 'cancelled' ? (
                  <CustomTag color={'red'} bordered={'true'} title={'Cancelled'} />
                ) : null}
              </Col>
              <Col span={24} md={12}>
                <h1>Summary : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.summary} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Comments : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.comments}</h1>
              </Col>
            </CustomRow>
          </StyledViewTask>
        </Col>

      </CustomRow>

    </div>
  )
}


export const ProjectDetailHold = ({ projectdetails , proDetails }) => {

  return (
    <div>
      <CustomRow space={[12, 12]}>
        <Col span={24} md={12}>
          <StyledViewTask>
            <CustomRow>
              <Col span={24} md={12}>
                <h1>StartDate : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.startDate} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Department Name : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.departmentName}  </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Category : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.category}  </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Employee Name :</h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.employeeName} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Employee Report Name :</h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.employeeReportName} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Type : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.type} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Label : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.label} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Type Of Project : </h1>
              </Col>
              <Col span={24} md={12}>
              <Col span={24} md={12}>
                <h1>Type Of Project : </h1>
              </Col>
              <Col span={24} md={12}>
                {proDetails.typeOfProject === 'research' ? (
                  <CustomTag color={'yellow'} bordered={'true'} title={'Research'} />
                ) : proDetails.typeOfProject === 'development' ? (
                  <CustomTag color={'grey'} bordered={'true'} title={'Development'} />
                ) : proDetails.typeOfProject === 'project' ? (
                  <CustomTag color={'blue'} bordered={'true'} title={'Project'} />
                ) : proDetails.typeOfProject === 'testing' ? (
                  <CustomTag color={'green'} bordered={'true'} title={'Testing'} />
                ) : proDetails.typeOfProject === 'hosting' ? (
                  <CustomTag color={'orange'} bordered={'true'} title={'Hosting'} />
                ) : null}
              </Col>
              </Col>
            </CustomRow>
          </StyledViewTask>
        </Col>
        <Col span={24} md={12}>
          <StyledViewTask>
            <CustomRow>
              <Col span={24} md={12}>
                <h1>Priority : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.priority}</h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Status : </h1>
              </Col>
              <Col span={24} md={12}>
                {projectdetails.projectStatus === 'pending' ? (
                  <CustomTag color={'yellow'} bordered={'true'} title={'Pending'} />
                ) : projectdetails.projectStatus === 'todo' ? (
                  <CustomTag color={'grey'} bordered={'true'} title={'Todo'} />
                ) : projectdetails.projectStatus === 'onprocess' ? (
                  <CustomTag color={'blue'} bordered={'true'} title={'On Process'} />
                ) : projectdetails.projectStatus === 'completed' ? (
                  <CustomTag color={'green'} bordered={'true'} title={'Completed'} />
                ) : projectdetails.projectStatus === 'hold' ? (
                  <CustomTag color={'orange'} bordered={'true'} title={'On Hold'} />
                ) : projectdetails.projectStatus === 'cancelled' ? (
                  <CustomTag color={'red'} bordered={'true'} title={'Cancelled'} />
                ) : null}
              </Col>
              <Col span={24} md={12}>
                <h1>Summary : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.summary} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Comments : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.comments}</h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Reason For Hold :</h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.holdReason}</h1>
              </Col>
            </CustomRow>
          </StyledViewTask>
        </Col>
      </CustomRow>
    </div>
  )
}


export const ProjectDetailCancelled = ({ projectdetails , proDetails }) => {

  return (
    <div>
      <CustomRow space={[12, 12]}>
        <Col span={24} md={12}>
          <StyledViewTask>
            <CustomRow>
              <Col span={24} md={12}>
                <h1>StartDate : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.startDate} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Department Name : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.departmentName}  </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Category : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.category}  </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Employee Name :</h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.employeeName} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Employee Report Name :</h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.employeeReportName} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Type : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.type} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Label : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.label} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Type Of Project : </h1>
              </Col>
              <Col span={24} md={12}>
                {proDetails.typeOfProject === 'research' ? (
                  <CustomTag color={'yellow'} bordered={'true'} title={'Research'} />
                ) : proDetails.typeOfProject === 'development' ? (
                  <CustomTag color={'grey'} bordered={'true'} title={'Development'} />
                ) : proDetails.typeOfProject === 'project' ? (
                  <CustomTag color={'blue'} bordered={'true'} title={'Project'} />
                ) : proDetails.typeOfProject === 'testing' ? (
                  <CustomTag color={'green'} bordered={'true'} title={'Testing'} />
                ) : proDetails.typeOfProject === 'hosting' ? (
                  <CustomTag color={'orange'} bordered={'true'} title={'Hosting'} />
                ) : null}
              </Col>
            </CustomRow>
          </StyledViewTask>
        </Col>

        <Col span={24} md={12}>
          <StyledViewTask>
            <CustomRow>
              <Col span={24} md={12}>
                <h1>Priority : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.priority}</h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Status : </h1>
              </Col>
              <Col span={24} md={12}>
                {projectdetails.projectStatus === 'pending' ? (
                  <CustomTag color={'yellow'} bordered={'true'} title={'Pending'} />
                ) : projectdetails.projectStatus === 'todo' ? (
                  <CustomTag color={'grey'} bordered={'true'} title={'Todo'} />
                ) : projectdetails.projectStatus === 'onprocess' ? (
                  <CustomTag color={'blue'} bordered={'true'} title={'On Process'} />
                ) : projectdetails.projectStatus === 'completed' ? (
                  <CustomTag color={'green'} bordered={'true'} title={'Completed'} />
                ) : projectdetails.projectStatus === 'hold' ? (
                  <CustomTag color={'orange'} bordered={'true'} title={'On Hold'} />
                ) : projectdetails.projectStatus === 'cancelled' ? (
                  <CustomTag color={'red'} bordered={'true'} title={'Cancelled'} />
                ) : null}
              </Col>
              <Col span={24} md={12}>
                <h1>Summary : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.summary} </h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Comments : </h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'> {projectdetails?.comments}</h1>
              </Col>
              <Col span={24} md={12}>
                <h1>Reason For Hold :</h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.holdReason}</h1>
              </Col>
              <Col span={24} md={12}>
                <h1 >Reason For Cancellation :</h1>
              </Col>
              <Col span={24} md={12}>
                <h1 className='paraBlue'>{projectdetails?.cancellationReason} </h1>
              </Col>
            </CustomRow>
          </StyledViewTask>
        </Col>
      </CustomRow>

    </div >
  )
}
