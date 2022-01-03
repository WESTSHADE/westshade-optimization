import {useEffect, useState} from "react";

import Image from "next/image";

import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";
import {FormControl} from "baseui/form-control";
import {Notification} from "baseui/notification";

import {
    CustomCheckbox,
    CustomCheckboxLabel,
    CustomInput,
    CustomLabel,
    CustomSubmitButton,
    CustomTextarea,
    CustomFileUploadInput,
    CustomFilePreview
} from "../../Form/parts";

import Utils from "Utils/utils";

const utils = new Utils()

const initialState = {
    firstname: "",
    lastname: "",
    companyName: "",
    phone: "",
    email: "",
    printInstruction: "",
    interests: [],
    contactMethod: [],
    logo: [],
}


const FreeMockupForm = () => {
    const [formState, setFormState] = useState(initialState);
    const [formLoading, setFormLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [fileError, setFileError] = useState({status: false, message: ""});
    const [formError, setFormError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        const {firstname, lastname, companyName, phone, email, interests, logo, printInstruction, contactMethod} = formState;
        if((interests.length !== 0) && (contactMethod.length !== 0) && formState.printInstruction && formState.phone) {
            if (logo.length > 0) {
                handleUpload()
                    .then(async (result) => {
                        console.log("upload success", result)
                        const resultToObj = result.reduce((acc, cur, i) => {
                            acc[12 + i] = cur.url;
                            return acc;
                        }, {});
                        let res = await utils.contact({
                            form_id: "5",
                            status: "active",
                            1.3: firstname,
                            1.6: lastname,
                            2: companyName,
                            3: phone,
                            4: email,
                            6: interests.join(", "),
                            22: contactMethod.join(", "),
                            8: printInstruction,
                            ...resultToObj
                        });
                        console.log(res)
                        setFormLoading(false);
                        setFormState(initialState);
                        setFormSubmitted(true);
                    })
                    .catch(error => {
                        console.log(error)
                        console.log("upload failed", uploadResponse)
                        setFileError({status: true, message: "please try attaching the file again"});
                        setFormLoading(false);
                    })
            } else {
                setFileError({status: true, message: "please attach a file"});
                setFormLoading(false);
            }
        }
        else {
            setErrorMessage("Please fill all the required fields")
            setFormLoading(false);
            setFormError(true)
        }
    }

    const handleInterest = (interest) => {
        if (!formState.interests.includes(interest)) setFormState({...formState, interests: [...formState.interests, interest]})
        else {
            let idx = formState.interests.indexOf(interest);
            let newInterests = [...formState.interests];
            newInterests.splice(idx, 1);
            setFormState({...formState, interests: newInterests})
        }
    }

    const hanndleContactMethod = (method) => {
        if (!formState.contactMethod.includes(method)) setFormState({...formState, contactMethod: [...formState.contactMethod, method]})
        else {
            let idx = formState.contactMethod.indexOf(method);
            let newContactMethod = [...formState.contactMethod];
            newContactMethod.splice(idx, 1);
            setFormState({...formState, contactMethod: newContactMethod})
        }
    }

    const handleUpload = async () => {
        let upload_res = formState.logo.map(async (_, idx) => {
            try {
                const {file, filename} = formState.logo[idx];
                const res = await utils.imageUploadV2(file, filename);
                return {status: res.status, url: res.url}
            } catch (error) {
                console.log(error);
                return {status: 400, error}
            }

        })
        return Promise.all(upload_res)
    }

    const handleFile = (e) => {
        let files = e.target.files;
        let filesState = [];

        if (formState.logo.length >= 10 || (formState.logo.length + files.length) > 10) {
            setFileError({status: true, message: "Maximum reached (10). Please contact us."})
            return
        }
        for (let i = 0; i < files.length; i++) {
            let fileExt = files[i].name.substring(files[i].name.lastIndexOf('.') + 1, files[i].name.length) || files[i].name;
            let fileName = i + "-" + new Date().valueOf() + "-" + files[i].name.split(' ').join('-');

            if (["ai", "psd", "jpg", "png", "jpeg"].includes(fileExt.toLowerCase())) {

                if (files[0].size > 209715200) {
                    setFileError({status: true, message: "Maximum file size is 200 MB"});
                    return;
                } else {
                    filesState.push({file: files[i], filename: fileName, fileExt, id: fileName})
                }
            } else {
                setFormState({...formState, logo: [...formState.logo]});
                setFileError({status: true, message: "please attach a valid file"});
                return;
            }
        }
        setFormState({...formState, logo: [...formState.logo, ...filesState]});
        setFileError(false);
    }

    const removeFile = (id) => {
        let newFiles = [...formState.logo];
        let fileIdx = newFiles.findIndex(e => e.id == id)
        newFiles.splice(fileIdx, 1);
        setFormState({...formState, logo: newFiles});
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

    // useEffect(() => {
    //     console.log(formState.logo.url)
    // }, [formState.logo])

    return (
        <>
            <Block width="100%" display="grid" placeItems="center">
                <Block maxWidth="1520px" width="100%" backgroundColor="MinXBackground" padding={["17px 16px", "36px 16px", "54px 16px", "80px 16px"]}>
                    <Block as="form" onSubmit={handleSubmit} maxWidth="1140px" display="flex" flexWrap="wrap" justifyContent="space-between" margin="0 auto">
                        <Block width={["100%", "48%", "48%"]}>
                            <Block width="100%">
                                <Image src="/images/custom-printing/umbrella-free-mockup.webp" alt="umbrella" width={534} height={345} layout="responsive" objectFit="contain" quality={30}/>
                            </Block>
                            <Block display={["none", "block", "block"]} width="100%" marginTop="35px">
                                <CustomLabel> Contact information </CustomLabel>
                                <Block width="100%" display="flex" justifyContent="space-between" flexWrap="wrap">
                                    <Block marginBottom="16px" width={["48%", "100%", "48%", "48%"]}>
                                        <CustomInput
                                            type="text"
                                            placeholder="First name"
                                            required
                                            backgroundColor="#ededed"
                                            value={formState.firstname}
                                            onChange={(e) => setFormState({...formState, firstname: e.target.value})}
                                        />
                                    </Block>
                                    <Block marginBottom="16px" width={["48%", "100%", "48%", "48%"]}>
                                        <CustomInput
                                            type="text"
                                            placeholder="Last name"
                                            required
                                            backgroundColor="#ededed"
                                            value={formState.lastname}
                                            onChange={(e) => setFormState({...formState, lastname: e.target.value})}
                                        />
                                    </Block>
                                </Block>
                                <Block marginBottom="16px" width="100%">
                                    <CustomInput
                                        type="text"
                                        placeholder="Company name (optional)"
                                        backgroundColor="#ededed"
                                        value={formState.companyName}
                                        onChange={(e) => setFormState({...formState, companyName: e.target.value})}
                                    />
                                </Block>
                                <Block marginBottom="16px" width="100%">
                                    <CustomInput
                                        type="tel"
                                        required
                                        placeholder="Phone (000-000-0000)"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        backgroundColor="#ededed"
                                        value={formState.phone}
                                        onChange={handlePhone}
                                    />
                                </Block>
                                <Block marginBottom="16px" width="100%">
                                    <CustomInput
                                        type="email"
                                        placeholder="Email"
                                        required
                                        backgroundColor="#ededed"
                                        value={formState.email}
                                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    />
                                </Block>
                            </Block>
                            <Block display={["none", "block", "block"]} width="100%" marginTop="35px">
                                <Block width="100%">
                                    <CustomLabel>Preferred contact method</CustomLabel>
                                </Block>
                                <Block width="100%" display="flex" justifyContent="space-between" alignItems="center">
                                    <Block width="32%" maxWidth="167px" marginBottom="16px">
                                        <CustomCheckbox
                                            checked={formState.contactMethod.includes("call")}
                                            onChange={() => hanndleContactMethod("call")}
                                        >
                                            <CustomCheckboxLabel active={formState.contactMethod.includes("call")} backgroundColor="transparent">
                                                Call
                                            </CustomCheckboxLabel>
                                        </CustomCheckbox>
                                    </Block>
                                    <Block width="32%" maxWidth="167px" marginBottom="16px">
                                        <CustomCheckbox
                                            checked={formState.contactMethod.includes("text")}
                                            onChange={() => hanndleContactMethod("text")}
                                        >
                                            <CustomCheckboxLabel active={formState.contactMethod.includes("text")} backgroundColor="transparent">
                                                Text
                                            </CustomCheckboxLabel>
                                        </CustomCheckbox>
                                    </Block>
                                    <Block width="32%" maxWidth="167px" marginBottom="16px">
                                        <CustomCheckbox
                                            checked={formState.contactMethod.includes("email")}
                                            onChange={() => hanndleContactMethod("email")}
                                        >
                                            <CustomCheckboxLabel active={formState.contactMethod.includes("email")} backgroundColor="transparent">
                                                Email
                                            </CustomCheckboxLabel>
                                        </CustomCheckbox>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                        <Block width={["100%", "48%", "48%"]} marginTop={["40px", "0", "0"]}>
                            <Block width="100%">
                                <CustomLabel>Interested in</CustomLabel>
                            </Block>
                            <Block width="100%" display="flex" justifyContent="space-between" flexWrap="wrap">
                                <Block width={["100%", "100%", "48%", "48%"]} marginBottom="16px">
                                    <CustomCheckbox
                                        checked={formState.interests.includes("custom printed tent")}
                                        onChange={() => handleInterest("custom printed tent")}
                                    >
                                        <CustomCheckboxLabel active={formState.interests.includes("custom printed tent")} backgroundColor="transparent">
                                            Custom printed tent
                                        </CustomCheckboxLabel>
                                    </CustomCheckbox>
                                </Block>
                                <Block width={["100%", "100%", "48%", "48%"]} marginBottom="16px">
                                    <CustomCheckbox
                                        checked={formState.interests.includes("custom printed umbrella")}
                                        onChange={() => handleInterest("custom printed umbrella")}
                                    >
                                        <CustomCheckboxLabel active={formState.interests.includes("custom printed umbrella")} backgroundColor="transparent">
                                            Custom printed umbrella
                                        </CustomCheckboxLabel>
                                    </CustomCheckbox>
                                </Block>
                            </Block>
                            <Block width="100%" display="flex" justifyContent="space-between" flexWrap="wrap">
                                <Block width={["100%", "100%", "48%", "48%"]} marginBottom="16px">
                                    <CustomCheckbox
                                        checked={formState.interests.includes("custom printed side wall")}
                                        onChange={() => handleInterest("custom printed side wall")}
                                    >
                                        <CustomCheckboxLabel active={formState.interests.includes("custom printed side wall")} backgroundColor="transparent">
                                            Custom printed side wall
                                        </CustomCheckboxLabel>
                                    </CustomCheckbox>
                                </Block>
                                <Block width={["100%", "100%", "48%", "48%"]} marginBottom="16px">
                                    <CustomCheckbox
                                        checked={formState.interests.includes("custom printed table cover")}
                                        onChange={() => handleInterest("custom printed table cover")}
                                    >
                                        <CustomCheckboxLabel active={formState.interests.includes("custom printed table cover")} backgroundColor="transparent">
                                            Custom printed table cover
                                        </CustomCheckboxLabel>
                                    </CustomCheckbox>
                                </Block>
                            </Block>

                            <Block width="100%" marginTop="40px" marginBottom="40px">
                                <CustomLabel>Logo</CustomLabel>
                                <Block width="100%">
                                    {
                                        formState.logo.map((logo) => (
                                            <CustomFilePreview
                                                key={logo.id}
                                                type={logo.fileExt}
                                                file={logo.file}
                                                removeHandler={() => removeFile(logo.id)}
                                            />
                                        ))
                                    }
                                </Block>
                                <Block margin="0 auto" maxWidth={["295px", "100%", "295px", "295px"]} width="100%">
                                    <Block width="100%" display="grid" placeItems="center">
                                        <CustomFileUploadInput
                                            error={fileError}
                                            removeAttachedFile={() => setFormState({...formState, logo: []})}
                                            id="form-file-upload"
                                            onChange={handleFile} multiple
                                        />
                                    </Block>
                                </Block>
                            </Block>

                            <FormControl
                                label={() => <CustomLabel> {"Print instruction"} </CustomLabel>}
                                overrides={{
                                    ControlContainer: {style: {display: "flex", flexWrap: "wrap", marginBottom: "24px"}}
                                }}
                            >
                                <CustomTextarea
                                    placeholder="Tell us how do you want to get these text and image printed."
                                    id="form-instruction-message"
                                    backgroundColor="#ededed"
                                    value={formState.printInstruction}
                                    onChange={(e) => setFormState({...formState, printInstruction: e.target.value})}
                                    required
                                />
                            </FormControl>
                            <Block display={["block", "none", "none"]} width="100%" marginTop="35px">
                                <CustomLabel> Contact information </CustomLabel>
                                <Block width="100%" display="flex" justifyContent="space-between" flexWrap="wrap">
                                    <Block marginBottom="8px" width={["48%", "100%", "48%", "48%"]}>
                                        <CustomInput
                                            type="text"
                                            placeholder="First name"
                                            required
                                            backgroundColor="#ededed"
                                            value={formState.firstname}
                                            onChange={(e) => setFormState({...formState, firstname: e.target.value})}
                                        />
                                    </Block>
                                    <Block marginBottom="8px" width={["48%", "100%", "48%", "48%"]}>
                                        <CustomInput
                                            type="text"
                                            placeholder="Last name"
                                            required
                                            backgroundColor="#ededed"
                                            value={formState.lastname}
                                            onChange={(e) => setFormState({...formState, lastname: e.target.value})}
                                        />
                                    </Block>
                                </Block>
                                <Block marginBottom="8px" width="100%">
                                    <CustomInput
                                        type="text"
                                        placeholder="Company name (optional)"
                                        backgroundColor="#ededed"
                                        value={formState.companyName}
                                        onChange={(e) => setFormState({...formState, companyName: e.target.value})}
                                    />
                                </Block>
                                <Block marginBottom="8px" width="100%">
                                    <CustomInput
                                        type="tel"
                                        required
                                        placeholder="Phone (000-000-0000)"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        backgroundColor="#ededed"
                                        value={formState.phone}
                                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                                    />
                                </Block>
                                <Block marginBottom="8px" width="100%">
                                    <CustomInput
                                        type="email"
                                        placeholder="Email"
                                        required
                                        backgroundColor="#ededed"
                                        value={formState.email}
                                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    />
                                </Block>
                            </Block>
                            <Block display={["block", "none", "none"]} width="100%" marginTop="35px">
                                <Block width="100%">
                                    <CustomLabel>Preferred contact method</CustomLabel>
                                </Block>
                                <Block width="100%" display="flex" justifyContent="space-between" alignItems="center">
                                    <Block width="32%" maxWidth="167px" marginBottom="16px">
                                        <CustomCheckbox
                                            checked={formState.contactMethod.includes("call")}
                                            onChange={() => hanndleContactMethod("call")}
                                        >
                                            <CustomCheckboxLabel active={formState.contactMethod.includes("call")} backgroundColor="transparent">
                                                Call
                                            </CustomCheckboxLabel>
                                        </CustomCheckbox>
                                    </Block>
                                    <Block width="32%" maxWidth="167px" marginBottom="16px">
                                        <CustomCheckbox
                                            checked={formState.contactMethod.includes("text")}
                                            onChange={() => hanndleContactMethod("text")}
                                        >
                                            <CustomCheckboxLabel active={formState.contactMethod.includes("text")} backgroundColor="transparent">
                                                Text
                                            </CustomCheckboxLabel>
                                        </CustomCheckbox>
                                    </Block>
                                    <Block width="32%" maxWidth="167px" marginBottom="16px">
                                        <CustomCheckbox
                                            checked={formState.contactMethod.includes("email")}
                                            onChange={() => hanndleContactMethod("email")}
                                        >
                                            <CustomCheckboxLabel active={formState.contactMethod.includes("email")} backgroundColor="transparent">
                                                Email
                                            </CustomCheckboxLabel>
                                        </CustomCheckbox>
                                    </Block>
                                </Block>
                            </Block>
                            <Block width="100%">
                                <CustomSubmitButton isLoading={formLoading}>
                                    Submit request
                                </CustomSubmitButton>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
            {/* form success notification */}
            {
                formSubmitted &&
                <Notification
                    onClose={() => setFormSubmitted(false)}
                    autoHideDuration={3000}
                    overrides={{
                        Body: {
                            style: {
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                padding: "52px 0 48px",
                                transform: "translate(-50%, -50%)",
                                boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1);",
                                borderRadius: "16px",
                                backgroundColor: "#ffffff",
                                color: "#23A4AD",
                                width: "auto"
                            }
                        }
                    }}
                >
                    <Block width={["288px", "288px", "580px"]} backgroundColor="#ffffff" display="flex" flexDirection="column" alignItems="center">
                        <Block width="80px">
                            <Image src="/images/icon/yes.png" width={80} height={80} layout="responsive" quality={10} alt="success" objectFit="contain"/>
                        </Block>
                        <Block as="h6" font="MinXHeading24" color="MinXPrimaryText" marginTop="24px">
                            Submitted
                        </Block>
                        <Block as="p" font="MinXParagraph16" color="MinXPrimaryText" marginTop="16px">
                            You will hear from us soon!
                        </Block>
                        <Button
                            onClick={() => setFormSubmitted(false)}
                            shape={SHAPE.pill}
                            overrides={{
                                BaseButton: {
                                    style: ($theme) => ({
                                        marginTop: "24px",
                                        paddingTop: "17px",
                                        paddingBottom: "17px",
                                        paddingLeft: " 48px",
                                        paddingRight: " 48px",
                                        color: "#ffffff !important",
                                        backgroundColor: "#23A4AD",
                                        ":hover": {backgroundColor: "#5FBDBE"}
                                    })
                                },
                            }}
                        >
                            Close (3s)
                        </Button>
                    </Block>
                </Notification>
            }
            {
                formError &&
                <Notification
                    onClose={() => {
                        setFormError(false);
                        setErrorMessage("");
                    }}
                    autoHideDuration={3000}
                    overrides={{
                        Body: {
                            style: {
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                padding: "24px 32px 24px",
                                transform: "translate(-50%, -50%)",
                                boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1);",
                                borderRadius: "16px",
                                backgroundColor: "#ffffff",
                                color: "#23A4AD",
                                width: "auto"
                            }
                        }
                    }}
                >
                    <Block width={["200px", "230px", "250px"]} backgroundColor="#ffffff" display="flex" flexDirection="column" alignItems="center">
                        <Block as="p" font="MinXParagraph16" color="MinXPrimaryText" marginTop="16px">
                            {errorMessage || "Ooops, and unexpected error occured"}
                        </Block>
                        <Button
                            onClick={() => {
                                setFormError(false)
                                setErrorMessage("")
                            }}
                            shape={SHAPE.pill}
                            overrides={{
                                BaseButton: {
                                    style: ($theme) => ({
                                        marginTop: "24px",
                                        paddingTop: "17px",
                                        paddingBottom: "17px",
                                        paddingLeft: " 48px",
                                        paddingRight: " 48px",
                                        color: "#ffffff !important",
                                        backgroundColor: "#EB512A",
                                        ":hover": {opacity: "0.8"}
                                    })
                                },
                            }}
                        >
                            Close (3s)
                        </Button>
                    </Block>
                </Notification>
            }
        </>
    )
}

export default FreeMockupForm;