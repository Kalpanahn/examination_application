import React, { useEffect } from 'react';
import AdminResultPage from './AdminResultPage';
import Navbar from '../components/Navbar';
import AddQuestions from './AddQuestions';

export default function DepartmentAdmin() {

    useEffect(() => {
        const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                const tabId = tab.getAttribute('data-bs-target');
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                document.querySelector(tabId).classList.add('show', 'active');
            });
        });

        return () => {
            tabs.forEach(tab => tab.removeEventListener('click', () => { }));
        };
    }, []);

    return (
        <div>
            <div className="container-fluid mt-4">
                <Navbar />
                <div className="row">
                    <div className="col-12">&nbsp;
                        <ul className="nav nav-underline justify-content-end" id="myTab" role="tablist">

                            <li className="nav-item" role="presentation">
                                <button className="btn btn-primary buttonstyle" id="form-tab" data-bs-toggle="tab" data-bs-target="#form"
                                    type="button" role="tab" aria-controls="form" aria-selected="true">Add Question</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="btn btn-primary buttonstyle" id="booking-tab" data-bs-toggle="tab" data-bs-target="#booking"
                                    type="button" role="tab" aria-controls="booking" aria-selected="false">Result</button>
                            </li>

                        </ul>&nbsp;

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="form" role="tabpanel" aria-labelledby="form-tab">
                                <AddQuestions />
                            </div>

                            <div className="tab-pane fade" id="booking" role="tabpanel" aria-labelledby="booking-tab">
                                <AdminResultPage />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
