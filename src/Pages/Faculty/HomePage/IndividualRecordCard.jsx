import React from 'react'

export default function IndividualRecordCard({recordSummaryView}) {
    return (
        <div className='individual-record p-3 border'>
            <div className='layer-1 d-flex justify-content-between'>
                <h6>Lecture Date: {recordSummaryView.date.split('T')[0]}</h6>
                <h6>Date Modified: {recordSummaryView.date.split('T')[0]}</h6>
            </div>

            <div className='layer-2'>
                <div className='layer-2 d-flex justify-content-start'>
                    <h6 className='pe-3'>Sem: {recordSummaryView.semester}</h6>
                    <h6 className='pe-3'>Branch: {recordSummaryView.branch}</h6>
                    <h6 className='pe-3'>Div: {recordSummaryView.division}</h6>
                </div>

                <div className='layer-3 d-flex justify-content-between'>
                    <h6 className='pe-3'>Subject: {recordSummaryView.subject}</h6>
                    <h6 className='pe-3'>{recordSummaryView.studentsPresent} / {recordSummaryView.studentsAbsent}</h6>
                </div>
            </div>
        </div>
    )
}
