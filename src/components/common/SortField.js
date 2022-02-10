import React from 'react';
import { Image, InputGroup, FormControl, Button } from 'react-bootstrap';

const SortField = () => {
    return (
        <div className="search-input-container float-left">
            <InputGroup className="search-input-group">
                <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    className="search-input"
                />
                <Button className="search-btn">
                    <Image src={searchIcon} className="search-icon"></Image>
                </Button>
            </InputGroup>
        </div>
    );
};

export default SortField;
