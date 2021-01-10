import React from 'react';

const ListErrors = (errors)=>{
    return errors ?
        (
            <ul className="error-messages">
                {
                    Object.keys(errors).map(key => (
                        <li key={'error_'+key}>
                            {key} {errors[key]}
                        </li>
                    ))
                }
            </ul>
        ) : null;
}

export default ListErrors