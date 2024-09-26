import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleOrganisationPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("organisation")
            .get(urlParams.singleOrganisationId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Organisation", type: "error", message: error.message || "Failed get organisation" });
            });
    }, [props,urlParams.singleOrganisationId]);


    const goBack = () => {
        navigate("/organisation");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Organisation</h3>
                </div>
                <p>organisation/{urlParams.singleOrganisationId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Organisation Name</label><p className="m-0 ml-3" >{_entity?.organisationName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">NumberOfEmployees</label><p className="m-0 ml-3" >{_entity?.numberOfEmployees}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">FullTimeTrainers</label><p className="m-0 ml-3" >{_entity?.fullTimeTrainers}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Part Time Trainers</label><p className="m-0 ml-3" >{_entity?.partTimeTrainers}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Business Registration No.</label><p className="m-0 ml-3" >{_entity?.organisationNo}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleOrganisationPage);
