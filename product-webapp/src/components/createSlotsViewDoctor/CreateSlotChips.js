import React from "react";
import { Button } from "react-bootstrap";
import '../../component.css';
import { Tooltip } from "@material-ui/core";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CancelIcon from '@mui/icons-material/Cancel';

function CreateSlotChips(props) {

    return (
        <div className="col mb-4">
            <Button className={props.slotStatus === 'AVAILABLE' ? 'available-button-color btn-secondary create-slot-button' :
                'create-slot-booked-button btn-secondary'}>
                <div className="row">
                    <span className="col-md-2">
                        <Tooltip
                            title="Appointment Time"
                            placement="top">
                            <AccessAlarmIcon className=""
                            />
                        </Tooltip>
                    </span>
                    <span className="col-md-8 text-start">

                        {props.slotStartTime} - {props.slotEndTime}
                    </span>

                    <span className="col-md-2">
                        <CancelIcon />
                    </span>
                </div>

            </Button>
        </div>
    )
}

export default CreateSlotChips;