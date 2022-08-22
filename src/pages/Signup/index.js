import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { checksumVaildateAction, signupPageAction } from "../../store/slice/authSlice";
import Select from 'react-select';

const [EnteringNumber, EnteringWord, ChecksumValidating, Synchronizing] = [1, 2, 3, 4];

const Signup = () => {
    const dispatch = useDispatch();

    const [currentStep, setCurrentStep] = useState(EnteringNumber);
    const [numberArray, setNumberArray] = useState(Array(12).fill(''));
    const [valueArray, setValueArray] = useState(Array(12).fill([]));
    const [validatedWordSets, setValidatedWordSets] = useState([]);
    const [canMoveToChecksumValidating, setCanMoveToChecksumValidating] = useState(false);
    const [options, setOptions] = useState([]);
    const [visibleOptions, setVisibleOptions] = useState([]);


    useEffect(() => {
        signupPageAction();
        let wordlist = localStorage.getItem('wordlist');
        if (wordlist) {
            setOptions(wordlist.split(',').map(word => ({ value: word, label: word })));
            setVisibleOptions(wordlist.split(',').map(word => ({ value: word, label: word })));
        }
    }, []);

    useEffect(() => {
        if (currentStep === ChecksumValidating) {
            let validatedWordSets_ = valueArray[0].map(element => [element]);
            for (let i = 1; i < 12; i++) {
                let validatedWordSets__ = validatedWordSets_;
                validatedWordSets_ = [];
                valueArray[i].forEach(element => {
                    validatedWordSets_ = [...validatedWordSets_, ...validatedWordSets__.map(set => [...set, element])];
                });
            }
            setValidatedWordSets(checksumVaildateAction(validatedWordSets_.map(set => set.map(el => el.value).join(' '))));
        }
    }, [currentStep]);

    const nextStep = () => {
        setCurrentStep(currentStep >= Synchronizing ? Synchronizing : currentStep + 1);
    }

    const enteredNumberChange = (e, i) => {
        let num = parseInt(e.target.value);
        if (num < 1 || num >= 2048) return;
        setNumberArray(numberArray => [...numberArray.slice(0, i), e.target.value, ...numberArray.slice(i + 1, numberArray.length)]);
        // console.log(value, i)

    }

    const enteredValueChange = (e, i) => {
        if (e.length > valueArray[i].length) {
            if ((numberArray[i] === '' && valueArray[i].length > 0) || valueArray[i].length >= parseInt(numberArray[i]))
                return;
            let added = e.slice(valueArray[i].length, e.length).filter(v => {
                for (let j = 0; j < valueArray.length; j++) {
                    if (valueArray[j].includes(v))
                        return false;
                }
                setVisibleOptions(visibleOptions.filter(option => option !== v));
                return true;
            });
            setValueArray([...valueArray.slice(0, i), [...valueArray[i], ...added], ...valueArray.slice(i + 1, valueArray.length)]);
        } else if (e.length < valueArray[i].length) {
            valueArray[i].forEach(v => {
                if (!e.includes(v)) {
                    let result = visibleOptions.concat(v);
                    result.sort((a, b) => {
                        if (a.value < b.value) return -1;
                        else return 1;
                    });
                    // console.log(result);
                    setVisibleOptions(result);
                }
            });
            setValueArray([...valueArray.slice(0, i), e, ...valueArray.slice(i + 1, valueArray.length)]);
        }

        // setVisibleOptions(options.filter(option => {
        //     for (let i = 0; i < valueArray.length; i++){
        //         if()
        //     }
        // }));
    }

    useEffect(() => {
        let canMoveToChecksumValidating_ = true;
        for (let j = 0; j < valueArray.length; j++) {
            if (numberArray[j] === '') {
                if (valueArray[j].length === 0) {
                    canMoveToChecksumValidating_ = false;
                    break;
                }
            } else if (valueArray[j].length !== parseInt(numberArray[j])) {
                canMoveToChecksumValidating_ = false;
                break;
            }
        }
        // console.log(canMoveToChecksumValidating_)

        if (canMoveToChecksumValidating_) setCanMoveToChecksumValidating(true);
        else setCanMoveToChecksumValidating(false);
    }, valueArray);

    return (
        <section className="zl_login_section">
            <div className="zl_login_content container">
                <React.Fragment>
                    <EnteringNumberStep currentStep={currentStep} enteredNumberChange={enteredNumberChange} numberArray={numberArray} />
                    <EnteringWordStep currentStep={currentStep} options={visibleOptions} enteredValueChange={enteredValueChange} valueArray={valueArray} />
                    <ChecksumValidatingStep currentStep={currentStep} mnemonics={validatedWordSets} />
                </React.Fragment>

                <div className="zl_login_btn">
                    {<span className="err_text"></span>}
                    <button
                        className="mx-auto zl_login_btn_link"
                        onClick={nextStep}
                        disabled={(currentStep !== EnteringWord || (currentStep === EnteringWord && canMoveToChecksumValidating)) ? false : true}
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

const EnteringNumberStep = (props) => {


    if (props.currentStep !== EnteringNumber) {
        return null;
    }

    return (
        <div>
            <div className="zl_login_heading_text">
                <h3 className="zl_login_heading">EnteringNumber</h3>
                <p className="zl_login_peregraph">
                    Login De-crypto app with your secret words.
                </p>
            </div>
            <div className="zl_login_row row">
                {props.numberArray.map((inputValue, i) => (
                    <div className="zl_login_col_3 col-lg-3 col-md-6" key={i}>
                        <div className="zl_login_input_content position-relative">
                            <p className="zl_login_input_text">{i + 1}</p>
                            <input
                                type="number"
                                className="zl_login_input"
                                name={`input${i + 1}`}
                                value={inputValue}
                                onChange={(e) => props.enteredNumberChange(e, i)}
                                placeholder="________"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const EnteringWordStep = (props) => {
    if (props.currentStep !== EnteringWord) {
        return null;
    }

    const customStyles = {
        // menu: (provided, state) => ({
        //     ...provided,
        //     width: state.selectProps.width,
        //     borderBottom: '1px dotted pink',
        //     color: state.selectProps.menuColor,
        //     padding: 20,
        // }),

        // control: (_, { selectProps: { width } }) => ({
        //     width: width
        // }),

        // singleValue: (provided, state) => {
        //     const opacity = state.isDisabled ? 0.5 : 1;
        //     const transition = 'opacity 300ms';

        //     return { ...provided, opacity, transition };
        // }
    }

    return (
        <div>
            <div className="zl_login_heading_text">
                <h3 className="zl_login_heading">EnteringWord</h3>
                <p className="zl_login_peregraph">
                    Login De-crypto app with your secret words.
                </p>
            </div>
            <div className="zl_login_row row">
                {Array(12)
                    .fill("input")
                    .map((inputValue, i) => (
                        <div className="zl_login_col_12 col-lg-12 col-md-24" key={i}>

                            <div className="zl_login_input_content position-relative">
                                <p className="zl_login_input_text">{i + 1}</p>
                                <Select styles={customStyles} isMulti={true} placeholder={''} options={props.options} onChange={(e) => props.enteredValueChange(e, i)} value={props.valueArray[i]} />
                                {/* <p className="zl_login_input_text">{i + 1}</p>
                                
                                <input
                                    type="text"
                                    className="zl_login_input"
                                    name={`input${i + 1}`}
                                    placeholder="________"
                                /> */}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

const ChecksumValidatingStep = (props) => {
    if (props.currentStep !== ChecksumValidating) {
        return null;
    }
    return (
        <div>
            <div className="zl_login_heading_text">
                <h3 className="zl_login_heading">ChecksumValidating</h3>
                <p className="zl_login_peregraph">
                    Login De-crypto app with your secret words.
                </p>
            </div>
            {props.mnemonics.map((mnemonic, i) => (
                <div key={i}>
                    <div className="zl_login_input_content position-relative">
                        <div className="zl_login_col_12 col-lg-12 col-md-24" key={i}>
                            <div className="row justify-content-between">
                                <div className="col-11">
                                    {mnemonic.split(' ').map(word => <label key={word} style={{ border: 'solid 1px gray', color: 'black', marginRight: '10px', padding: '10px' }}>{word}</label>)}
                                </div>
                                <div className="col-1">
                                    <input type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
            {/* <div className="zl_login_row row">
                {props.mnemonics.map((mnemonic, i) => (
                    <div className="zl_login_input_content position-relative">
                        <div className="zl_login_col_12 col-lg-12 col-md-24" key={i}>
                            {mnemonic} <input type="checkbox" />
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default Signup;
