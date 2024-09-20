import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CardForHomePage({title,value,icon,logoColour}) {
    return (
        <div className="card ">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <span className="h6 font-semibold text-muted text-sm d-block mb-2">{title}</span>
                        <span className="h3 font-bold mb-0">{value}</span>
                    </div>
                    <div className="col-auto d-flex align-items-end">
                        <div className="icon icon-shape bg-tertiary text-lg rounded-circle" style={{color:logoColour}}>
                            <FontAwesomeIcon icon={icon} size='2xl' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

