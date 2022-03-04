import React from 'react';

const AccountInfoCard = (props) => {
    let data = props.data;
    return (
        <div className="account-info-container">
            <h5>{data.title}</h5>
            <h4>{data.value}</h4>
        </div>
    );
};

export default AccountInfoCard;
