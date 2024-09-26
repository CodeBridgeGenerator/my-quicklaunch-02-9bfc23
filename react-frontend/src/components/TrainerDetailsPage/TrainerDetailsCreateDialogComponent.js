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

const TrainerDetailsCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.trainerNRIC)) {
                error["trainerNRIC"] = `TrainerNRIC field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.employmentType)) {
                error["employmentType"] = `EmploymentType field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.nationality)) {
                error["nationality"] = `Nationality field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            trainerNRIC: _entity?.trainerNRIC,employmentType: _entity?.employmentType,nationality: _entity?.nationality,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("trainerDetails").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info TrainerDetails created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in TrainerDetails" });
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
        <Dialog header="Create TrainerDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="trainerDetails-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="trainerNRIC">TrainerNRIC:</label>
                <InputText id="trainerNRIC" className="w-full mb-3 p-inputtext-sm" value={_entity?.trainerNRIC} onChange={(e) => setValByKey("trainerNRIC", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["trainerNRIC"]) ? (
              <p className="m-0" key="error-trainerNRIC">
                {error["trainerNRIC"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="employmentType">EmploymentType:</label>
                <InputText id="employmentType" className="w-full mb-3 p-inputtext-sm" value={_entity?.employmentType} onChange={(e) => setValByKey("employmentType", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employmentType"]) ? (
              <p className="m-0" key="error-employmentType">
                {error["employmentType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="nationality">Nationality:</label>
                <InputText id="nationality" className="w-full mb-3 p-inputtext-sm" value={_entity?.nationality} onChange={(e) => setValByKey("nationality", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nationality"]) ? (
              <p className="m-0" key="error-nationality">
                {error["nationality"]}
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

export default connect(mapState, mapDispatch)(TrainerDetailsCreateDialogComponent);
