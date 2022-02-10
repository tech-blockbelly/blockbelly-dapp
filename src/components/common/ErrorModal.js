import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { VscError } from 'react-icons/vsc';

const Error = (props) => {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            keyboard={false}
            centered>
            <Modal.Body className="text-center">
                <div className="no-selection">
                    <h1 className="text-danger">
                        <VscError size={70} />
                    </h1>
                    <p>{props.msg}</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="button-wrapper">
                <Button className="proceed-btn btn" onClick={props.action}>
                    {props.actionText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Error;
