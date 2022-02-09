import React, {useState} from "react";

import {Block} from "baseui/block";
import {FormControl} from "baseui/form-control";

import {CustomCheckbox, CustomCheckboxLabel, CustomInput, CustomSubmitButton} from "../../../Form/parts";

import Utils from "Utils/utils";

const utils = new Utils();

export default function Content() {
    const [formState, setFormState] = useState({
        firstname: "",
        lastname: "",
        companyName: "",
        phone: "",
        email: "",
        zipcode: "",
        competitor: "",
        contactMethod: []
    })

    const [formError, setFormError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleContactMethod = (method) => {
        if (!formState.contactMethod.includes(method)) setFormState({...formState, contactMethod: [...formState.contactMethod, method]})
        else {
            let idx = formState.contactMethod.indexOf(method);
            let newContactMethod = [...formState.contactMethod];
            newContactMethod.splice(idx, 1);
            setFormState({...formState, contactMethod: newContactMethod})
        }
    }

    const handleContactForm = async (e) => {
        e.preventDefault();
        setFormLoading(true)
        const {firstname, lastname, message, companyName, email, phone, zipcode, competitor, contactMethod} = formState;
        if (contactMethod.length > 0 && !!firstname && !!lastname && !!email && !!phone) {
            let result = await utils.contact({
                form_id: "7",
                status: "active",
                1.3: firstname,
                1.6: lastname,
                2: companyName,
                3: phone,
                4: email,
                5: zipcode,
                6: competitor,
                7: contactMethod.join(", "),
            });
            setFormLoading(false);
            setFormState({
                firstname: "",
                lastname: "",
                companyName: "",
                phone: "",
                email: "",
                zipcode: "",
                competitor: "",
                contactMethod: []
            });
            setFormSubmitted(true);
        } else {
            setErrorMessage("Please fill all the required fields")
            setFormError(true);
            setFormLoading(false)
        }
    }

    //for auto formatting the phone number
    const handlePhone = (e) => {
        let cleanVal = [...e.target.value.split("-")].join("").replace(/\D/g, '');
        let cleanValLength = cleanVal.length;
        if (cleanValLength <= 10) {
            if (cleanValLength >= 7) {
                cleanVal = `${cleanVal.slice(0, 3)}-${cleanVal.slice(3, 6)}-${cleanVal.slice(6)}`;
            } else if (cleanValLength > 3 && cleanValLength <= 6) {
                cleanVal = `${cleanVal.slice(0, 3)}-${cleanVal.slice(3, 6)}`;
            }
            setFormState({...formState, phone: cleanVal})
        }
    }

    return (
        <Block paddingTop="32px" paddingLeft={["16px", null, "32px"]} paddingBottom="12px" paddingRight={["16px", null, "32px"]}>
            <Block className="text-center" marginBottom="24px" font="MinXParagraph20" color="#356DB6">Price beat guarantee</Block>
            <Block marginBottom="16px" font="MinXHeading16">Contact information</Block>
            <Block as="form" width="100%" maxWidth="340px" onSubmit={handleContactForm}>
                <FormControl overrides={{
                    ControlContainer: {style: {marginBottom: "24px"}}
                }}
                >
                    <Block display="grid" gridRowGap="10px" gridTemplateColumns="1fr">
                        <CustomInput
                            type="text"
                            value={formState.firstname}
                            onChange={(e) => setFormState({...formState, firstname: e.target.value})}
                            error={formError && !!formState.firstname}
                            required
                            placeholder="First name"
                            inputStyle={{
                                borderRadius: "4px",
                                borderColor: "#BFBFBF",
                                ":focus": {borderColor: "#BFBFBF"},
                                "::placeholder": {color: "#BFBFBF"}
                            }}
                        />
                        <CustomInput
                            type="text"
                            value={formState.lastname}
                            onChange={(e) => setFormState({...formState, lastname: e.target.value})}
                            error={formError && !!formState.lastname}
                            required
                            placeholder="Last name"
                            inputStyle={{
                                borderRadius: "4px",
                                borderColor: "#BFBFBF",
                                ":focus": {borderColor: "#BFBFBF"},
                                "::placeholder": {color: "#BFBFBF"}
                            }}
                        />
                        <CustomInput
                            type="text"
                            value={formState.companyName}
                            onChange={(e) => setFormState({...formState, companyName: e.target.value})}
                            error={formError && !!formState.companyName}
                            placeholder="Company name (optional)"
                            inputStyle={{
                                borderRadius: "4px",
                                borderColor: "#BFBFBF",
                                ":focus": {borderColor: "#BFBFBF"},
                                "::placeholder": {color: "#BFBFBF"}
                            }}
                        />
                        <CustomInput
                            type="tel"
                            value={formState.phone}
                            onChange={handlePhone}
                            error={formError && !!formState.phone}
                            required
                            placeholder="Phone (000-000-0000)"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            inputStyle={{
                                borderRadius: "4px",
                                borderColor: "#BFBFBF",
                                ":focus": {borderColor: "#BFBFBF"},
                                "::placeholder": {color: "#BFBFBF"}
                            }}
                        />
                        <CustomInput
                            type="email"
                            value={formState.email}
                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                            error={formError && !!formState.email}
                            required
                            placeholder="Email"
                            inputStyle={{
                                borderRadius: "4px",
                                borderColor: "#BFBFBF",
                                ":focus": {borderColor: "#BFBFBF"},
                                "::placeholder": {color: "#BFBFBF"}
                            }}
                        />
                        <CustomInput
                            type="text"
                            value={formState.zipcode}
                            onChange={(e) => setFormState({...formState, zipcode: e.target.value})}
                            error={formError && !!formState.zipcode}
                            placeholder="ZIP code (Optional)"
                            inputStyle={{
                                borderRadius: "4px",
                                borderColor: "#BFBFBF",
                                ":focus": {borderColor: "#BFBFBF"},
                                "::placeholder": {color: "#BFBFBF"}
                            }}
                        />
                        <CustomInput
                            type="text"
                            value={formState.competitor}
                            onChange={(e) => setFormState({...formState, competitor: e.target.value})}
                            error={formError && !!formState.competitor}
                            placeholder="Competitor (Optional)"
                            inputStyle={{
                                borderRadius: "4px",
                                borderColor: "#BFBFBF",
                                ":focus": {borderColor: "#BFBFBF"},
                                "::placeholder": {color: "#BFBFBF"}
                            }}
                        />
                    </Block>
                </FormControl>
                <Block marginBottom="16px" font="MinXHeading16">Preferred contact method</Block>
                <FormControl>
                    <Block display="grid" gridColumnGap="8px" gridTemplateColumns="repeat(3, 1fr)">
                        <CustomCheckbox checked={formState.contactMethod.includes("call")}
                                        onChange={() => handleContactMethod("call")}
                        >
                            <CustomCheckboxLabel style={{display: "flex", alignItems: "center", justifyContent: "center", height: "36px"}}
                                                 active={formState.contactMethod.includes("call")}
                            >Call</CustomCheckboxLabel>
                        </CustomCheckbox>
                        <CustomCheckbox checked={formState.contactMethod.includes("text")}
                                        onChange={() => handleContactMethod("text")}
                        >
                            <CustomCheckboxLabel style={{display: "flex", alignItems: "center", justifyContent: "center", height: "36px"}}
                                                 active={formState.contactMethod.includes("text")}
                            >Text</CustomCheckboxLabel>
                        </CustomCheckbox>
                        <CustomCheckbox checked={formState.contactMethod.includes("email")}
                                        onChange={() => handleContactMethod("email")}
                        >
                            <CustomCheckboxLabel style={{display: "flex", alignItems: "center", justifyContent: "center", height: "36px"}}
                                                 active={formState.contactMethod.includes("email")}
                            >Email</CustomCheckboxLabel>
                        </CustomCheckbox>
                    </Block>
                </FormControl>
                <CustomSubmitButton isLoading={formLoading} style={{borderRadius: "8px", fontWeight: 400}}>Submit</CustomSubmitButton>
            </Block>
        </Block>
    )
}
