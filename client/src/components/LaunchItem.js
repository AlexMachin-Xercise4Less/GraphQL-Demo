import React from 'react';
import className from 'classnames';

export default ({launch}) => {
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h4> Mission name: {' '}
                        <span className={className({
                            'text-success' : launch.launch_success,
                            'text-danger': !launch.launch_success
                        })}>
                        {launch.mission_name}
                        </span>
                    </h4>
                    <p>Date: {launch.launch_date_local}</p>
                </div>

                <div className="col-md-3">
                    <button className="btn btn-secondary">
                        Launch Details
                    </button>
                </div>
            </div>
        </div>
    )
}