import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const OrganisationCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.organisationName)) {
                error["organisationName"] = `Organisation Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.numberOfEmployees)) {
                error["numberOfEmployees"] = `NumberOfEmployees field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.fullTimeTrainers)) {
                error["fullTimeTrainers"] = `FullTimeTrainers field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.partTimeTrainers)) {
                error["partTimeTrainers"] = `Part Time Trainers field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.organisationNo)) {
                error["organisationNo"] = `Business Registration No. field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            organisationName: _entity?.organisationName,numberOfEmployees: _entity?.numberOfEmployees,fullTimeTrainers: _entity?.fullTimeTrainers,partTimeTrainers: _entity?.partTimeTrainers,organisationNo: _entity?.organisationNo,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("organisation").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Organisation created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Organisation" });
        }
        setLoading(false);
    };

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Organisation" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="organisation-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="organisationName">Organisation Name:</label>
                <InputText id="organisationName" className="w-full mb-3 p-inputtext-sm" value={_entity?.organisationName} onChange={(e) => setValByKey("organisationName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["organisationName"]) ? (
              <p className="m-0" key="error-organisationName">
                {error["organisationName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="numberOfEmployees">NumberOfEmployees:</label>
                <InputText id="numberOfEmployees" className="w-full mb-3 p-inputtext-sm" value={_entity?.numberOfEmployees} onChange={(e) => setValByKey("numberOfEmployees", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["numberOfEmployees"]) ? (
              <p className="m-0" key="error-numberOfEmployees">
                {error["numberOfEmployees"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="fullTimeTrainers">FullTimeTrainers:</label>
                <InputText id="fullTimeTrainers" className="w-full mb-3 p-inputtext-sm" value={_entity?.fullTimeTrainers} onChange={(e) => setValByKey("fullTimeTrainers", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fullTimeTrainers"]) ? (
              <p className="m-0" key="error-fullTimeTrainers">
                {error["fullTimeTrainers"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="partTimeTrainers">Part Time Trainers:</label>
                <InputText id="partTimeTrainers" className="w-full mb-3 p-inputtext-sm" value={_entity?.partTimeTrainers} onChange={(e) => setValByKey("partTimeTrainers", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["partTimeTrainers"]) ? (
              <p className="m-0" key="error-partTimeTrainers">
                {error["partTimeTrainers"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="organisationNo">Business Registration No.:</label>
                <InputText id="organisationNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.organisationNo} onChange={(e) => setValByKey("organisationNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["organisationNo"]) ? (
              <p className="m-0" key="error-organisationNo">
                {error["organisationNo"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(OrganisationCreateDialogComponent);
