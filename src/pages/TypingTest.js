import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button } from 'react-bootstrap';


function TypingTest() {
    const navigate = useNavigate();
    const [accuracy, setAccuracy] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const randomText = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.";
    const [userText, setUserText] = useState('');
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const handleTextareaChange = (e) => {
        setUserText(e.target.value);
        if (!isActive) {
            setIsActive(true);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setIsActive(false);
    //     const acc = calculateAccuracy();
    //     setAccuracy(acc);
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userText === "") {
            swal({
                title: "Please Type Text !",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false,
            });
            return; // Exit early if validation fails
        }
        // Calculate and set accuracy
        const acc = calculateAccuracy();
        setAccuracy(acc);

        const formattedTime = formatTime(time);
        // Store accuracy and time in localStorage
        window.localStorage.setItem('accuracy', acc.toFixed(2));
        window.localStorage.setItem('time', formattedTime);
        // Set isActive to false
        setIsActive(false);
        // Navigate to /testPage
        navigate('/testPage');
    };
    useEffect(() => {
        if (accuracy !== null) {
            window.localStorage.setItem('accuracy', accuracy);
            window.localStorage.setItem('time', time);
        }
    }, [accuracy, time]);

    const calculateAccuracy = () => {
        const userWords = userText.trim().split(/\s+/);
        const randomWords = randomText.trim().split(/\s+/);
        const maxLength = Math.max(userWords.length, randomWords.length);
        let correctWords = 0;
        userWords.forEach((word, index) => {
            if (word === randomWords[index]) {
                correctWords++;
            }
        });
        return (correctWords / maxLength) * 100;
    };

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive, time]);

    const handleNext = () => {
        navigate('/testPage');
    };

    const handleShowModal = () => {
        setShowModal(true); 
    }

    return (
        <div className='container-fluid mt-4'>
            <Navbar />
            <div className='timer d-flex justify-content-center align-bottom'>{formatTime(time)}</div>
            <div className="card cardmain_align1">
                <div className='h-100'>
                    <div className='d-grid justify-content-center align-items-end h-100'>
                        <div className="randomText d-grid align-items-center justify-content-around p-3">
                            {randomText}
                        </div>&nbsp;
                        <div className="usertext">
                            <textarea className='p-3' value={userText} onChange={handleTextareaChange} placeholder="Please Type Here"></textarea>
                        </div>&nbsp;
                        <div className='d-flex justify-content-center '>
                            <button
                                type="submit"
                                className="btn btn-primary buttonstyle btn_width submitUser"
                                onClick={handleShowModal}>
                                Submit
                            </button>
                            {/* &nbsp;&nbsp;
                            <button
                                type="submit"
                                className="btn btn-primary buttonstyle btn_width submitUser"
                                onClick={handleNext}
                            >
                                Next
                            </button> */}
                        </div>

                        {accuracy !== null && (
                            <div className='result d-flex justify-content-center align-items-center mt-3'>
                                <p>Total Time Taken: {formatTime(time)}</p>&nbsp;&nbsp;
                                <p>Accuracy: {accuracy.toFixed(2)}%</p>
                            </div>

                        )}
                    </div>&nbsp;

                    <Dialog className='Modal-DialogBox'
                open={showModal} 
                onClose={() => setShowModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogContent className='Dialog-content-box'>
                    <DialogContentText id="alert-dialog-description">
                        <h5>Do you want to Submit?</h5>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className='btn-delete'>
                        <Button className="btn btn-success" onClick={handleSubmit}>Yes</Button>
                    </div>
                    <div className='btn-delete'>
                        <Button className="btn btn-danger" onClick={() => setShowModal(false)}>No</Button>
                    </div>
                </DialogActions>
            </Dialog>
                </div>
            </div>
        </div>

    )
}

export default TypingTest