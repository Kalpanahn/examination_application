import React, { useState } from 'react';

function Guidelines() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div className='container-fluid mt-4'>
            {/* <Navbar /> */}
            <section class="guidelines-section">
                <div class="container-fluid">
                    <div class="row">
                        <div class="guidelines-helpsec col-md-12 col-lg-12">
                            <div class="guidelines-border"><div class="guidelines-heading"><h4>Guidelines for the Online Test</h4></div></div>
                            <div class="guidelines-list">
                                <ol>
                                    <li>There are 20 multiple choice questions with 20 minutes time</li>
                                    <li>No use of mobile phones </li>
                                    <li style={{ color: 'red' }}>If you try to switch or reload  the tab, test will be ended automatically</li>
                                    <li>First 10 questions  are aptitude followed by 10 technical questions </li>
                                    <li>Test will be automatically submitted if you fail to complete the Test</li>
                                </ol>
                                <input id="inputVacationPercentage" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />&nbsp;
                                <label for="inputVacationPercentage" class="switch switch-default">I agree with the above guidelines and hereby I give my consent to follow the guidelines.</label>
                            </div>

                            <div className="row rowalign">
                                <div className="nav nav-underline justify-content-center">
                                    {isChecked && (
                                        <a href='/TypingTest'>
                                            <button type="submit" className="btn btn-info">
                                                Start Typing
                                            </button>
                                        </a>)}
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Guidelines